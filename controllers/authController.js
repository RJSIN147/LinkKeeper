import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { createAuthToken } from '../config/token.js';

const COOKIE_NAME = 'auth_token';
const COOKIE_OPTS = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 // seconds
};

export async function signup(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });

    const token = createAuthToken({ id: user._id, email: user.email }, process.env.JWT_SECRET);
    res.cookie(COOKIE_NAME, token, COOKIE_OPTS);
    return res.status(201).json({ id: user._id, email: user.email, createdAt: user.createdAt });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create account' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = createAuthToken({ id: user._id, email: user.email }, process.env.JWT_SECRET);
    res.cookie(COOKIE_NAME, token, COOKIE_OPTS);
    return res.json({ id: user._id, email: user.email, createdAt: user.createdAt });
  } catch (err) {
    return res.status(500).json({ error: 'Authentication failed' });
  }
}

export async function logout(_req, res) {
  res.clearCookie(COOKIE_NAME, { path: '/', sameSite: 'strict', secure: true, httpOnly: true });
  return res.status(200).json({ message: 'Logged out' });
}

export async function me(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return res.json({ id: req.user.id, email: req.user.email });
}


