import jwt from 'jsonwebtoken';
import { envconfig } from '../config/env.config';
import { Response } from 'express';
import { Types } from 'mongoose';

const { NODE_ENV, JWT_SECRET } = envconfig;

export const generateToken = (userId: Types.ObjectId): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15d' });
};

export const setTokenCookie = (token: string, res: Response): void => {
  res.cookie('token', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: NODE_ENV === 'production',
  });
};
