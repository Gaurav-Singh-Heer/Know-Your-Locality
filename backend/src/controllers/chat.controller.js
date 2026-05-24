const Message = require('../models/Message');
const { generateReply } = require('../services/gemini.service');

// GET /api/chat/history
async function history(req, res) {
  const items = await Message.find({ userId: req.user._id }).sort({ createdAt: 1 }).limit(200);
  res.json({ messages: items.map((m) => ({ role: m.role, content: m.content, at: m.createdAt })) });
}

// POST /api/chat  body: { content, places?, matches? }
// REST fallback for non-WS clients
async function send(req, res) {
  const { content, places, matches } = req.body || {};
  if (!content || typeof content !== 'string') return res.status(400).json({ error: 'content required' });

  const past = await Message.find({ userId: req.user._id }).sort({ createdAt: 1 }).limit(20);
  await Message.create({ userId: req.user._id, role: 'user', content });

  // Build user context for personalized responses
  const me = req.user;
  const userContext = {
    name: me.name,
    location: me.location,
    interests: me.interests || [],
    travelMode: me.travelMode,
    maxDistance: me.maxDistance,
    nearbyPlaces: places || [],
    matches: matches || [],
  };

  try {
    const reply = await generateReply(
      past.map((m) => ({ role: m.role, content: m.content })),
      content,
      userContext
    );
    await Message.create({ userId: req.user._id, role: 'assistant', content: reply });
    res.json({ reply });
  } catch (err) {
    console.error('[chat.send]', err.message);
    res.status(502).json({ error: 'AI service error' });
  }
}

module.exports = { history, send };
