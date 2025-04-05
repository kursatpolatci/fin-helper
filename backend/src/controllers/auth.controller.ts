import { Request, Response } from 'express';
import { validateLoginInput, validateSignupInput } from '../helpers/validation.helper';
import { checkAuthService, loginService, logoutService, signupService } from '../services/auth.service';
import { handleErrorResponse, handleResponse } from '../utils/response.util';
import { ILoginInput, ISignupInput } from '../types/auth.interface';
import { AuthenticatedRequest } from '../middlewares/authenticate.middleware';

export const signup = async (req: Request<{}, {}, ISignupInput>, res: Response): Promise<void> => {
  const { fullName, email, username, password } = req.body;
  const userData = { fullName, email, username, password };
  try {
    validateSignupInput(userData);
    const user = await signupService(userData, res);
    handleResponse(res, 201, 'Signed Up successfully', user, 'user');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};

export const login = async (req: Request<{}, {}, ILoginInput>, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const userData = { email, password };
  try {
    validateLoginInput(userData);
    const user = await loginService(userData, res);
    handleResponse(res, 200, 'Login successfully', user, 'user');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    logoutService(res);
    handleResponse(res, 200, 'Logout successfully');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};

export const checkAuth = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { userId } = req;
  try {
    const user = await checkAuthService(userId!);
    handleResponse(res, 200, undefined, user, 'user');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};
