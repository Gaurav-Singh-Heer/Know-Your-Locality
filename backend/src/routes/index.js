const router = require('express').Router();
const { requireAuth } = require('../middleware/auth.middleware');
const auth = require('../controllers/auth.controller');
const users = require('../controllers/user.controller');
const chat = require('../controllers/chat.controller');
const places = require('../controllers/places.controller');
const dm = require('../controllers/dm.controller');

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
router.get('/places/geocode', places.geocode);

// AI Chat (REST fallback)
router.get('/chat/history', requireAuth, chat.history);
router.post('/chat', requireAuth, chat.send);

// Direct Messages
router.get('/dm/conversations', requireAuth, dm.conversations);
router.get('/dm/:partnerId/messages', requireAuth, dm.messages);
router.post('/dm/:partnerId', requireAuth, dm.send);

module.exports = router;
