import * as jwt from 'jsonwebtoken';
export interface JwtPayload {
  sub: string;
  companyId: string;
  role: string;
}
export const signJwt = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};
export const verifyJwt = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || 'dev-secret',
    ) as JwtPayload;
  } catch {
    return null;
  }
};
