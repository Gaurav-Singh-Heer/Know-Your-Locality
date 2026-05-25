const mongoose = require('mongoose');
const DirectMessage = require('../models/DirectMessage');
const { User } = require('../models/User');
const { notifyUser } = require('../sockets/chat.socket');

// GET /api/dm/conversations
async function conversations(req, res) {
  const me = req.user._id;

  const msgs = await DirectMessage.aggregate([
    { $match: { $or: [{ from: me }, { to: me }] } },
    {
      $addFields: {
        partner: { $cond: [{ $eq: ['$from', me] }, '$to', '$from'] },
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: '$partner',
        lastMessage: { $first: '$content' },
        lastTime: { $first: '$createdAt' },
        lastFrom: { $first: '$from' },
      },
    },
    { $sort: { lastTime: -1 } },
  ]);

  const partnerIds = msgs.map((m) => m._id);
  const [partners, unreadAgg] = await Promise.all([
    User.find({ _id: { $in: partnerIds } }).select('name interests'),
    DirectMessage.aggregate([
      { $match: { to: me, readAt: null, from: { $in: partnerIds } } },
      { $group: { _id: '$from', count: { $sum: 1 } } },
    ]),
  ]);

  const partnerMap = {};
  for (const u of partners) partnerMap[u._id.toString()] = u;
  const unreadMap = {};
  for (const u of unreadAgg) unreadMap[u._id.toString()] = u.count;

  const myInterests = req.user.interests || [];

  const result = msgs.map((m) => {
    const id = m._id.toString();
    const partner = partnerMap[id];
    const name = partner?.name || 'Unknown';
    const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
    const mutual = myInterests.filter((i) => (partner?.interests || []).includes(i));
    const compatibility = myInterests.length
      ? Math.round((mutual.length / myInterests.length) * 100)
      : 0;
    return {
      userId: id,
      userName: name,
      userAvatar: initials,
      compatibility,
      lastMessage: m.lastMessage,
      lastTime: formatTime(m.lastTime),
      unread: unreadMap[id] || 0,
      online: false,
    };
  });

  res.json(result);
}

// GET /api/dm/:partnerId/messages
async function messages(req, res) {
  const me = req.user._id;
  const partnerId = req.params.partnerId;

  if (!mongoose.Types.ObjectId.isValid(partnerId)) {
    return res.status(400).json({ error: 'Invalid partnerId' });
  }
  const partner = new mongoose.Types.ObjectId(partnerId);

  const msgs = await DirectMessage.find({
    $or: [
      { from: me, to: partner },
      { from: partner, to: me },
    ],
  })
    .sort({ createdAt: 1 })
    .limit(100);

  // Mark unread messages as read
  await DirectMessage.updateMany(
    { from: partner, to: me, readAt: null },
    { $set: { readAt: new Date() } }
  );

  const result = msgs.map((m) => ({
    id: m._id.toString(),
    senderId: m.from.toString(),
    content: m.content,
    timestamp: m.createdAt,
    isOwn: m.from.equals(me),
  }));

  res.json(result);
}

// POST /api/dm/:partnerId
async function send(req, res) {
  const me = req.user._id;
  const partnerId = req.params.partnerId;

  if (!mongoose.Types.ObjectId.isValid(partnerId)) {
    return res.status(400).json({ error: 'Invalid partnerId' });
  }

  const partner = await User.findById(partnerId);
  if (!partner) return res.status(404).json({ error: 'User not found' });

  const { content } = req.body || {};
  if (!content || typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({ error: 'content required' });
  }

  const msg = await DirectMessage.create({ from: me, to: partnerId, content: content.trim() });

  // Notify recipient in real-time via WebSocket
  notifyUser(partnerId, {
    type: 'dm',
    message: {
      id: msg._id.toString(),
      senderId: me.toString(),
      senderName: req.user.name,
      content: msg.content,
      timestamp: msg.createdAt,
    },
  });

  res.status(201).json({
    id: msg._id.toString(),
    senderId: me.toString(),
    content: msg.content,
    timestamp: msg.createdAt,
    isOwn: true,
  });
}

function formatTime(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

module.exports = { conversations, messages, send };
