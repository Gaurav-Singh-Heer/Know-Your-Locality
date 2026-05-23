const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

// In-memory cache: key → { places, expiresAt }
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const _cache = new Map();

function cacheKey(lat, lng, radiusM) {
  return `${lat.toFixed(3)}_${lng.toFixed(3)}_${radiusM}`;
}

function getCached(key) {
  const entry = _cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { _cache.delete(key); return null; }
  return entry.places;
}

function setCached(key, places) {
  _cache.set(key, { places, expiresAt: Date.now() + CACHE_TTL_MS });
}

const CATEGORY_EMOJIS = {
  park: '🌳', restaurant: '🍽️', cafe: '☕', club: '🎵',
  museum: '🏛️', gym: '💪', shopping: '🛍️',
};

const CATEGORY_FALLBACK_DESC = {
  restaurant: 'A local restaurant serving a variety of meals.',
  cafe:       'A cozy café for coffee, snacks, and good vibes.',
  club:       'A lively bar or nightclub for evenings out.',
  park:       'An open green space perfect for walks and relaxation.',
  museum:     'A cultural venue showcasing art, history, or heritage.',
  gym:        'A fitness facility for workouts and staying active.',
  shopping:   'A shopping destination with multiple stores and brands.',
};

// OSM tag → app category mapping (first match wins)
const OSM_CATEGORIES = [
  { category: 'restaurant', key: 'amenity', values: ['restaurant', 'fast_food'] },
  { category: 'cafe',       key: 'amenity', values: ['cafe'] },
  { category: 'cafe',       key: 'shop',    values: ['bakery'] },
  { category: 'club',       key: 'amenity', values: ['bar', 'nightclub', 'pub'] },
  { category: 'park',       key: 'leisure', values: ['park', 'nature_reserve', 'garden'] },
  { category: 'museum',     key: 'tourism', values: ['museum', 'gallery', 'attraction'] },
  { category: 'gym',        key: 'leisure', values: ['fitness_centre', 'sports_centre'] },
  { category: 'shopping',   key: 'shop',    values: ['mall', 'supermarket', 'department_store', 'convenience'] },
];

function buildOverpassQuery(lat, lng, radiusM) {
  const lines = [];
  for (const { key, values } of OSM_CATEGORIES) {
    for (const val of values) {
      lines.push(`  node["${key}"="${val}"](around:${radiusM},${lat},${lng});`);
      lines.push(`  way["${key}"="${val}"](around:${radiusM},${lat},${lng});`);
    }
  }
  return `[out:json][timeout:30];\n(\n${lines.join('\n')}\n);\nout body center;`;
}

function categorize(tags) {
  for (const { category, key, values } of OSM_CATEGORIES) {
    if (tags[key] && values.includes(tags[key])) return category;
  }
  return null;
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function travelTimes(distKm) {
  return {
    car:  Math.max(1, Math.round(distKm / 40 * 60)),
    bike: Math.max(1, Math.round(distKm / 15 * 60)),
    walk: Math.max(1, Math.round(distKm / 5  * 60)),
  };
}

function mapElement(el, originLat, originLng) {
  const tags = el.tags || {};
  const name = tags.name || tags['name:en'];
  if (!name) return null;

  const elat = el.lat ?? el.center?.lat;
  const elng = el.lon ?? el.center?.lon;
  if (!elat || !elng) return null;

  const category = categorize(tags);
  if (!category) return null;

  const dist = Math.round(haversineKm(originLat, originLng, elat, elng) * 10) / 10;
  const addrParts = [tags['addr:housenumber'], tags['addr:street'], tags['addr:city']].filter(Boolean);
  const osmTags = [tags.amenity, tags.shop, tags.leisure, tags.tourism].filter(Boolean).map(t => t.replace(/_/g, ' '));

  return {
    id: String(el.id),
    name,
    category,
    description: tags.description || CATEGORY_FALLBACK_DESC[category],
    distance: dist,
    rating: 4.0,
    emoji: CATEGORY_EMOJIS[category],
    address: addrParts.length ? addrParts.join(', ') : (tags['addr:full'] || ''),
    openNow: true,
    tags: osmTags.slice(0, 3),
    travelTime: travelTimes(dist),
  };
}

// GET /api/places?lat=&lng=&radius=
async function nearby(req, res) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radiusKm = Math.min(parseFloat(req.query.radius) || 10, 50);
  const radiusM = Math.min(radiusKm * 1000, 50000);

  if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({ error: 'lat and lng are required' });
  }

  const key = cacheKey(lat, lng, radiusM);
  const cached = getCached(key);
  if (cached) {
    console.log(`[places] cache hit for ${key}`);
    return res.json(cached);
  }

  try {
    const query = buildOverpassQuery(lat, lng, radiusM);
    const resp = await fetch(OVERPASS_URL, {
      method: 'POST',
      headers: { 'User-Agent': 'KYK-App/1.0' },
      body: new URLSearchParams({ data: query }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('[places] Overpass error:', text.slice(0, 200));
      return res.status(502).json({ error: 'Failed to fetch nearby places' });
    }

    const data = await resp.json();
    const seen = new Set();
    const places = (data.elements || [])
      .map(el => mapElement(el, lat, lng))
      .filter(p => {
        if (!p || seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 150);

    if (places.length > 0) setCached(key, places);
    res.json(places);
  } catch (err) {
    console.error('[places]', err.message);
    res.status(502).json({ error: 'Failed to fetch nearby places' });
  }
}

// GET /api/places/geocode?q=chandigarh
async function geocode(req, res) {
  const q = (req.query.q || '').trim();
  if (!q) return res.status(400).json({ error: 'q is required' });

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`;
    const resp = await fetch(url, { headers: { 'User-Agent': 'KYK-App/1.0' } });
    const data = await resp.json();
    if (!data.length) return res.status(404).json({ error: 'Location not found' });
    const item = data[0];
    res.json({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      name: item.display_name.split(',').slice(0, 2).join(', ').trim(),
    });
  } catch (err) {
    console.error('[geocode]', err.message);
    res.status(502).json({ error: 'Geocoding failed' });
  }
}

module.exports = { nearby, geocode };
