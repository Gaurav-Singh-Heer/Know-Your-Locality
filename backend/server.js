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
