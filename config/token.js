import jwt from 'jsonwebtoken';

export function createAuthToken(payload, secret, expiresIn = '7d') {
  if (!secret) {
    throw new Error('JWT secret not configured');
  }
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyAuthToken(token, secret) {
  return jwt.verify(token, secret);
}


