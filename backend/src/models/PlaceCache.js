const mongoose = require('mongoose');

const placeCacheSchema = new mongoose.Schema({
  placeId:     { type: String, required: true },
  name:        String,
  category:    String,
  description: String,
  distance:    Number,
  rating:      Number,
  emoji:       String,
  address:     String,
  openNow:     Boolean,
  tags:        [String],
  travelTime:  { car: Number, bike: Number, walk: Number },
  lat:         Number,
  lng:         Number,
  // Cache key fields
  cacheLat:    { type: Number, required: true },
  cacheLng:    { type: Number, required: true },
  cacheRadius: { type: Number, required: true },
  cachedAt:    { type: Date, default: Date.now },
});

// TTL: MongoDB auto-deletes after 24 h
placeCacheSchema.index({ cachedAt: 1 }, { expireAfterSeconds: 86400 });
// Query index: cache-key lookup sorted by distance (small → large)
placeCacheSchema.index({ cacheLat: 1, cacheLng: 1, cacheRadius: 1, distance: 1 });

module.exports = mongoose.model('PlaceCache', placeCacheSchema);
