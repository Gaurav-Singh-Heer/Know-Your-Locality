
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

function createApp() {
    const app = express();

    const allowedOrigins = [
        'https://know-your-locality.vercel.app',
        'http://localhost:4200'
    ];

    // CORS configuration — must come before API routes
    app.use(cors({
        origin: (origin, callback) => {
            // Allow requests without an Origin header, such as server-to-server
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.warn(`CORS blocked origin: ${origin}`);
            return callback(new Error('Not allowed by CORS'));
        },
        methods: [
            'GET',
            'POST',
            'PATCH',
            'PUT',
            'DELETE',
            'OPTIONS'
        ],
        allowedHeaders: [
            'Content-Type',
            'Authorization'
        ],
        credentials: true,
        optionsSuccessStatus: 204
    }));

    // Parse JSON request bodies
    app.use(express.json({ limit: '1mb' }));

    // Mount existing API routes
    app.use('/api', routes);

    // Handle unknown API endpoints
    app.use('/api', (req, res) => {
        res.status(404).json({
            error: 'API endpoint not found',
            path: req.originalUrl
        });
    });

    // Central error handler
    app.use((err, req, res, next) => {
        console.error('Backend error:', err.message);

        if (err.message === 'Not allowed by CORS') {
            return res.status(403).json({
                error: 'Origin not allowed by CORS'
            });
        }

        if (res.headersSent) {
            return next(err);
        }

        res.status(500).json({
            error: 'Internal server error'
        });
    });

    return app;
}

module.exports = { createApp };
