const router = require('express').Router();
const { requireAuth } = require('../middleware/auth.middleware');
const auth = require('../controllers/auth.controller');
const users = require('../controllers/user.controller');
const chat = require('../controllers/chat.controller');
const places = require('../controllers/places.controller');

router.get('/health', (_req, res) => res.json({ ok: true }));

// Auth
router.post('/auth/google', auth.googleSignIn);
router.post('/auth/signup', auth.signup);
router.post('/auth/signin', auth.signin);
router.get('/auth/me', requireAuth, auth.me);

// Users
router.get('/users/caps', users.caps);
router.patch('/users/me', requireAuth, users.updateMe);
router.get('/users/matches', requireAuth, users.matches);

// Places
router.get('/places', places.nearby);

// Chat (REST)
router.get('/chat/history', requireAuth, chat.history);
router.post('/chat', requireAuth, chat.send);

module.exports = router;
