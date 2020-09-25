import jwt from 'jsonwebtoken';

export function generateJwt(userToken: any) {
  return jwt.sign(userToken, process.env.JWT_SECRET || '');
}

export function verifyToken(token: string) {
  return jwt.decode(token);
}