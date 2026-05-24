const express = require('express');
const cors = require('cors');
const routes = require('./routes');

function createApp() {
  const app = express();
  const allowedOrigins = (process.env.CLIENT_ORIGIN || '').split(',').map(o => o.trim()).filter(Boolean);
  app.use(cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (origin.endsWith('.vercel.app') || origin.endsWith('.onrender.com')) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }));
  app.use(express.json({ limit: '1mb' }));
  app.use('/api', routes);
  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  });
  return app;
}

module.exports = { createApp };
