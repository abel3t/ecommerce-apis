import jwt, { SignOptions } from 'jsonwebtoken';

import { InvalidTokenError } from './Errors';

export const signToken = (payload: object, options?: SignOptions): string => {
  const { JWT_SECRET = '' } = process.env;
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '5 minutes',
    ...options,
  });
};

export const verifyToken = (token: string): { [key: string]: any } => {
  try {
    const { JWT_SECRET = '' } = process.env;
    const payload = jwt.verify(token, JWT_SECRET);

    if (!payload) {
      new Error();
    }

    return payload as { [key: string]: any };
  } catch (error) {
    throw new InvalidTokenError();
  }
};