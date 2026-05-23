const { WebSocketServer } = require('ws');
const { verifyToken } = require('../middleware/auth.middleware');
const { User } = require('../models/User');
const Message = require('../models/Message');
const { generateReply } = require('../services/gemini.service');

// Map userId (string) → Set of WebSocket connections
const connectedUsers = new Map();

function attachChatSocket(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', async (req, socket, head) => {
    try {
      const parsed = new URL(req.url, 'http://localhost');
      const pathname = parsed.pathname;
      const query = Object.fromEntries(parsed.searchParams);
      if (pathname !== '/ws/chat') return socket.destroy();
      const token = query.token;
      if (!token) return socket.destroy();
      const payload = verifyToken(token);
      const user = await User.findById(payload.sub);
      if (!user) return socket.destroy();
      wss.handleUpgrade(req, socket, head, (ws) => {
        ws.userId = user._id;
        wss.emit('connection', ws, req);
      });
    } catch (e) {
      socket.destroy();
    }
  });

  wss.on('connection', (ws) => {
    // Track connected user
    const uid = ws.userId.toString();
    if (!connectedUsers.has(uid)) connectedUsers.set(uid, new Set());
    connectedUsers.get(uid).add(ws);

    ws.send(JSON.stringify({ type: 'system', content: 'connected' }));

    ws.on('message', async (raw) => {
      let msg;
      try {
        msg = JSON.parse(raw.toString());
      } catch {
        return ws.send(JSON.stringify({ type: 'error', content: 'invalid json' }));
      }
      if (msg.type !== 'user' || !msg.content) return;

      try {
        const past = await Message.find({ userId: ws.userId }).sort({ createdAt: 1 }).limit(20);
        await Message.create({ userId: ws.userId, role: 'user', content: msg.content });

        const user = await User.findById(ws.userId);
        const userContext = {
          name: user?.name,
          location: user?.location,
          interests: user?.interests || [],
          travelMode: user?.travelMode,
          maxDistance: user?.maxDistance,
          nearbyPlaces: msg.context?.places || [],
          matches: msg.context?.matches || [],
        };

        ws.send(JSON.stringify({ type: 'typing', content: true }));
        const reply = await generateReply(
          past.map((m) => ({ role: m.role, content: m.content })),
          msg.content,
          userContext
        );
        await Message.create({ userId: ws.userId, role: 'assistant', content: reply });
        ws.send(JSON.stringify({ type: 'typing', content: false }));
        ws.send(JSON.stringify({ type: 'assistant', content: reply }));
      } catch (err) {
        console.error('[ws.chat]', err.message);
        ws.send(JSON.stringify({ type: 'error', content: 'AI service error' }));
      }
    });

    ws.on('close', () => {
      const set = connectedUsers.get(uid);
      if (set) {
        set.delete(ws);
        if (set.size === 0) connectedUsers.delete(uid);
      }
    });
  });

  return wss;
}

/** Push a DM notification to a user if they're connected via WebSocket. */
function notifyUser(userId, payload) {
  const set = connectedUsers.get(userId.toString());
  if (!set) return;
  const data = JSON.stringify(payload);
  for (const ws of set) {
    if (ws.readyState === 1) ws.send(data);
  }
}

module.exports = { attachChatSocket, notifyUser };
