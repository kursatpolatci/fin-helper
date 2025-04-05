import jwt from 'jsonwebtoken';
import { envconfig } from '../config/env.config';
import { Response } from 'express';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, envconfig.JWT_SECRET, { expiresIn: '15d' });
};

export const setTokenCookie = (token: string, res: Response): void => {
  res.cookie('token', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: false,
  });
};
