const { WebSocketServer } = require('ws');
const { verifyToken } = require('../middleware/auth.middleware');
const { User } = require('../models/User');
const Message = require('../models/Message');
const { generateReply } = require('../services/gemini.service');

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

        ws.send(JSON.stringify({ type: 'typing', content: true }));
        const reply = await generateReply(
          past.map((m) => ({ role: m.role, content: m.content })),
          msg.content
        );
        await Message.create({ userId: ws.userId, role: 'assistant', content: reply });
        ws.send(JSON.stringify({ type: 'typing', content: false }));
        ws.send(JSON.stringify({ type: 'assistant', content: reply }));
      } catch (err) {
        console.error('[ws.chat]', err.message);
        ws.send(JSON.stringify({ type: 'error', content: 'AI service error' }));
      }
    });
  });

  return wss;
}

module.exports = { attachChatSocket };
