const mongoose = require('mongoose');

const TRAVEL_MODES = ['car', 'bike', 'walk'];
const DISTANCE_CAPS = { car: 80, bike: 40, walk: 20 };

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, index: true, unique: true, sparse: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, select: false },
    name: { type: String, required: true, trim: true },
    avatar: { type: String },
    age: { type: Number, min: 13, max: 120 },
    location: { type: String },
    coords: {
      lat: { type: Number },
      lng: { type: Number },
    },
    interests: { type: [String], default: [] },
    travelMode: { type: String, enum: TRAVEL_MODES, default: 'walk' },
    maxDistance: { type: Number, default: 5, min: 1 },
    bio: { type: String, maxlength: 500 },
    preferencesSet: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Enforce per-mode caps before save
userSchema.pre('save', function (next) {
  const cap = DISTANCE_CAPS[this.travelMode] || 20;
  if (this.maxDistance > cap) this.maxDistance = cap;
  next();
});

userSchema.methods.toClient = function () {
  return {
    id: this._id.toString(),
    email: this.email,
    name: this.name,
    avatar: this.avatar,
    age: this.age,
    location: this.location,
    coords: this.coords,
    interests: this.interests,
    travelMode: this.travelMode,
    maxDistance: this.maxDistance,
    bio: this.bio,
    preferencesSet: this.preferencesSet,
  };
};

const User = mongoose.model('User', userSchema);
module.exports = { User, TRAVEL_MODES, DISTANCE_CAPS };
