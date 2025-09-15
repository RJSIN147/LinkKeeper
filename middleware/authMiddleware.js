import { verifyAuthToken } from '../config/token.js';

export function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.['auth_token'];

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = verifyAuthToken(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}


