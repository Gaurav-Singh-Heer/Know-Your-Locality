const express = require('express');
const cors = require('cors');
const routes = require('./routes');

function createApp() {
  const app = express();
  app.use(cors({ origin: process.env.CLIENT_ORIGIN || true, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use('/api', routes);
  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  });
  return app;
}

module.exports = { createApp };
