import { Request, Response } from 'express';
import { checkAuthService, loginService, logoutService, signupService } from '../services/auth.service';
import { handleErrorResponse, handleResponse } from '../utils/response.util';
import { validateInput } from '../helpers/validation.helper';
import { AuthenticatedRequest } from '../types/request.interface';
import { ILoginInput, ISignupInput } from '../types/input.interface';
import { deleteImage } from '../utils/image.util';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, username, password } = req.body;
  const { file } = req;
  const userData: ISignupInput = { fullName, email, username, password, profileImage: file?.path };
  try {
    validateInput<ISignupInput>(userData, res);
    const user = await signupService(userData, res);
    handleResponse(res, 201, 'auth.signup', { name: user.fullName }, user, 'user');
  } catch (error: unknown) {
    deleteImage(file?.path);
    handleErrorResponse(res, error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const userData = { email, password };
  try {
    validateInput<ILoginInput>(userData, res);
    const user = await loginService(userData, res);
    handleResponse(res, 200, 'auth.login', { name: user.username }, user, 'user');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    logoutService(res);
    handleResponse(res, 200, 'auth.logout');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req as AuthenticatedRequest;
  try {
    const user = await checkAuthService(userId, res);
    handleResponse(res, 200, 'auth.checkAuth', { name: user.fullName }, user, 'user');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};
