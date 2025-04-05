import { NextFunction, Response, Request } from 'express';
import { CustomError } from '../errors/custom.error';
import jwt from 'jsonwebtoken';
import { envconfig } from '../config/env.config';
import { handleErrorResponse } from '../utils/response.util';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) throw new CustomError(`Unauthorized: No user token provided`, 401);
    const decoded = jwt.verify(token, envconfig.JWT_SECRET) as jwt.JwtPayload;
    if (!decoded) throw new CustomError(`Unauthorized: Invalid token`, 401);
    req.userId = decoded.userId;
    next();
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};
