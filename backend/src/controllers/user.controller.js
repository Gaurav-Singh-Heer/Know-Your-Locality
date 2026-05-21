const { User, DISTANCE_CAPS } = require('../models/User');

// PATCH /api/users/me  body: partial user
async function updateMe(req, res) {
  const allowed = ['name', 'age', 'location', 'coords', 'interests', 'travelMode', 'maxDistance', 'bio', 'avatar'];
  const patch = {};
  for (const k of allowed) if (k in req.body) patch[k] = req.body[k];

  if (patch.travelMode && !['car', 'bike', 'walk'].includes(patch.travelMode)) {
    return res.status(400).json({ error: 'Invalid travelMode' });
  }
  // Apply per-mode cap server-side too
  const mode = patch.travelMode || req.user.travelMode;
  const cap = DISTANCE_CAPS[mode];
  if (typeof patch.maxDistance === 'number') {
    patch.maxDistance = Math.min(Math.max(1, patch.maxDistance), cap);
  }
  patch.preferencesSet = true;

  Object.assign(req.user, patch);
  await req.user.save();
  res.json({ user: req.user.toClient() });
}

// GET /api/users/caps
function caps(_req, res) {
  res.json(DISTANCE_CAPS);
}

// GET /api/users/matches
async function matches(req, res) {
  const me = req.user;
  const others = await User.find({ _id: { $ne: me._id }, preferencesSet: true }).limit(100);

  const results = others.map((u) => {
    const mutual = me.interests.filter((i) => u.interests.includes(i));
    const score = me.interests.length
      ? Math.round((mutual.length / me.interests.length) * 100)
      : 0;
    return {
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      age: u.age,
      location: u.location,
      interests: u.interests,
      travelMode: u.travelMode,
      maxDistance: u.maxDistance,
      bio: u.bio,
      preferencesSet: u.preferencesSet,
      compatibility: score,
      mutualInterests: mutual,
    };
  });

  results.sort((a, b) => b.compatibility - a.compatibility);
  res.json(results.slice(0, 20));
}

module.exports = { updateMe, caps, matches };
