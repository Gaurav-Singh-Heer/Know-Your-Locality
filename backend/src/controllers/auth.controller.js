const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
const { signToken } = require('../middleware/auth.middleware');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/auth/google { credential: <google_id_token> }
async function googleSignIn(req, res) {
  try {
    const { credential } = req.body || {};
    if (!credential) return res.status(400).json({ error: 'Missing credential' });

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email_verified) return res.status(401).json({ error: 'Email not verified' });

    const { sub: googleId, email, name, picture } = payload;
    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      user = await User.create({
        googleId,
        email,
        name: name || email.split('@')[0],
        avatar: picture,
      });
    } else if (!user.googleId) {
      user.googleId = googleId;
      if (picture && !user.avatar) user.avatar = picture;
      await user.save();
    }

    const token = signToken(user._id.toString());
    res.json({ token, user: user.toClient() });
  } catch (err) {
    console.error('[auth.google]', err.message);
    res.status(401).json({ error: 'Google sign-in failed' });
  }
}

// POST /api/auth/signup { email, password, name }
async function signup(req, res) {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: normalizedEmail,
      passwordHash,
      name: String(name).trim(),
    });

    const token = signToken(user._id.toString());
    res.status(201).json({ token, user: user.toClient() });
  } catch (err) {
    console.error('[auth.signup]', err.message);
    res.status(500).json({ error: 'Sign-up failed' });
  }
}

// POST /api/auth/signin { email, password }
async function signin(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

    const token = signToken(user._id.toString());
    res.json({ token, user: user.toClient() });
  } catch (err) {
    console.error('[auth.signin]', err.message);
    res.status(500).json({ error: 'Sign-in failed' });
  }
}

// GET /api/auth/me
async function me(req, res) {
  res.json({ user: req.user.toClient() });
}

module.exports = { googleSignIn, signup, signin, me };
