// Dev only: bypass corporate proxy TLS interception
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}
require('dotenv').config();
const http = require('http');
const { connectDB } = require('./src/config/db');
const { createApp } = require('./src/app');
const { attachChatSocket } = require('./src/sockets/chat.socket');

async function main() {
  await connectDB();
  const app = createApp();
  const server = http.createServer(app);
  attachChatSocket(server);
  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`[api] http://localhost:${port}`));
}

main().catch((err) => {
  console.error('[fatal]', err);
  process.exit(1);
});

// Vercel serverless export
let _app;
module.exports = async (req, res) => {
  if (!_app) { await connectDB(); _app = createApp(); }
  _app(req, res);
};
