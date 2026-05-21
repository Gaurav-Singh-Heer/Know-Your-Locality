const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

const CATEGORY_EMOJIS = {
  park: '🌳', restaurant: '🍽️', cafe: '☕', club: '🎵',
  museum: '🏛️', gym: '💪', shopping: '🛍️',
};

function tagToCategory(tags) {
  if (tags.amenity === 'restaurant' || tags.amenity === 'fast_food' || tags.amenity === 'food_court') return 'restaurant';
  if (tags.amenity === 'cafe') return 'cafe';
  if (tags.amenity === 'nightclub' || tags.amenity === 'bar') return 'club';
  if (tags.tourism === 'museum' || tags.tourism === 'gallery' || tags.amenity === 'theatre') return 'museum';
  if (tags.leisure === 'park' || tags.leisure === 'garden' || tags.leisure === 'nature_reserve') return 'park';
  if (tags.leisure === 'fitness_centre' || tags.leisure === 'sports_centre' || tags.leisure === 'gym') return 'gym';
  if (tags.shop === 'mall' || tags.shop === 'supermarket' || tags.shop === 'department_store') return 'shopping';
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
    car: Math.max(1, Math.round(distKm / 40 * 60)),
    bike: Math.max(1, Math.round(distKm / 15 * 60)),
    walk: Math.max(1, Math.round(distKm / 5 * 60)),
  };
}

async function nearby(req, res) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radiusKm = Math.min(parseFloat(req.query.radius) || 10, 80);
  const radiusM = radiusKm * 1000;

  if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({ error: 'lat and lng are required' });
  }

  const query = `
[out:json][timeout:25];
(
  node["amenity"~"restaurant|fast_food|cafe|nightclub|bar|museum|theatre"](around:${radiusM},${lat},${lng});
  node["leisure"~"park|garden|fitness_centre|sports_centre|gym|nature_reserve"](around:${radiusM},${lat},${lng});
  node["tourism"~"museum|gallery"](around:${radiusM},${lat},${lng});
  node["shop"~"mall|supermarket|department_store"](around:${radiusM},${lat},${lng});
);
out body;
  `.trim();

  try {
    const resp = await fetch(OVERPASS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'KYK-App/1.0',
        'Accept': 'application/json',
      },
      body: `data=${encodeURIComponent(query)}`,
    });
    const data = await resp.json();

    const places = [];
    const seen = new Set();

    for (const el of data.elements) {
      if (!el.tags?.name) continue;
      const category = tagToCategory(el.tags);
      if (!category) continue;
      const key = `${el.tags.name}-${Math.round(el.lat * 1000)}-${Math.round(el.lon * 1000)}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const dist = Math.round(haversineKm(lat, lng, el.lat, el.lon) * 10) / 10;
      const address = [el.tags['addr:housenumber'], el.tags['addr:street'], el.tags['addr:city']]
        .filter(Boolean).join(', ') || el.tags['addr:full'] || '';
      const tags = [el.tags.cuisine, el.tags.sport, el.tags.leisure, el.tags.shop]
        .filter(Boolean).map(t => t.replace(/_/g, ' '));

      places.push({
        id: String(el.id),
        name: el.tags.name,
        category,
        description: el.tags.description || el.tags['description:en'] || '',
        distance: dist,
        rating: 4.0,
        emoji: CATEGORY_EMOJIS[category],
        address,
        openNow: true,
        tags,
        travelTime: travelTimes(dist),
      });
    }

    places.sort((a, b) => a.distance - b.distance);
    res.json(places.slice(0, 60));
  } catch (err) {
    console.error('[places]', err.message);
    res.status(502).json({ error: 'Failed to fetch nearby places' });
  }
}

module.exports = { nearby };
