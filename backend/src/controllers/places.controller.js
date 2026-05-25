const PLACES_URL = 'https://places.googleapis.com/v1/places:searchNearby';
const FIELD_MASK = 'places.id,places.displayName,places.formattedAddress,places.rating,places.regularOpeningHours,places.types,places.location,places.businessStatus,places.editorialSummary';

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

// Split into more granular groups — each fetches 20, giving ~240 total
const TYPE_GROUPS = [
  { category: 'restaurant', types: ['restaurant'] },
  { category: 'restaurant', types: ['fast_food_restaurant'] },
  { category: 'cafe',       types: ['cafe', 'bakery'] },
  { category: 'club',       types: ['bar'] },
  { category: 'club',       types: ['night_club'] },
  { category: 'park',       types: ['park'] },
  { category: 'park',       types: ['national_park'] },
  { category: 'museum',     types: ['museum'] },
  { category: 'museum',     types: ['art_gallery', 'tourist_attraction'] },
  { category: 'gym',        types: ['gym', 'fitness_center'] },
  { category: 'shopping',   types: ['shopping_mall', 'department_store'] },
  { category: 'shopping',   types: ['supermarket'] },
];

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

async function fetchGroup(category, types, lat, lng, radiusM, apiKey) {
  const resp = await fetch(PLACES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': FIELD_MASK,
    },
    body: JSON.stringify({
      includedTypes: types,
      maxResultCount: 20,
      locationRestriction: {
        circle: { center: { latitude: lat, longitude: lng }, radius: radiusM },
      },
    }),
  });

  const data = await resp.json();
  if (!resp.ok) {
    console.error(`[places:${category}]`, data.error?.message);
    return [];
  }

  return (data.places || []).map((p) => {
    const plat = p.location?.latitude;
    const plng = p.location?.longitude;
    const dist = plat && plng ? Math.round(haversineKm(lat, lng, plat, plng) * 10) / 10 : 0;
    return {
      id: p.id,
      name: p.displayName?.text || 'Unknown',
      category,
      description: p.editorialSummary?.text || CATEGORY_FALLBACK_DESC[category] || '',
      distance: dist,
      rating: p.rating || 4.0,
      emoji: CATEGORY_EMOJIS[category],
      address: p.formattedAddress || '',
      openNow: p.regularOpeningHours?.openNow ?? true,
      tags: (p.types || []).slice(0, 3).map((t) => t.replace(/_/g, ' ')),
      travelTime: travelTimes(dist),
    };
  });
}

async function nearby(req, res) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey || apiKey === 'YOUR_MAPS_API_KEY_HERE') {
    return res.status(500).json({ error: 'GOOGLE_MAPS_API_KEY not configured in .env' });
  }

  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radiusKm = Math.min(parseFloat(req.query.radius) || 10, 50);
  const radiusM = Math.min(radiusKm * 1000, 50000);

  if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({ error: 'lat and lng are required' });
  }

  try {
    const results = await Promise.all(
      TYPE_GROUPS.map(({ category, types }) =>
        fetchGroup(category, types, lat, lng, radiusM, apiKey)
      )
    );

    const seen = new Set();
    const places = results
      .flat()
      .filter((p) => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      })
      .sort((a, b) => a.distance - b.distance);

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
