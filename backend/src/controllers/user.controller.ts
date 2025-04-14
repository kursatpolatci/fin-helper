import { Request, Response } from 'express';
import { handleErrorResponse, handleResponse } from '../utils/response.util';
import { updateProfileService } from '../services/user.service';
import { deleteImage } from '../utils/image.util';
import { AuthenticatedRequest } from '../types/request.interface';
import { IUpdateProfileInput } from '../types/input.interface';

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const { fullName, username, email, newPassword, oldPassword } = req.body;
  const { file, userId } = req as AuthenticatedRequest;
  const userData: IUpdateProfileInput = {
    fullName,
    username,
    email,
    newPassword,
    oldPassword,
    profileImage: file?.path,
  };
  try {
    const updatedUser = await updateProfileService(userData, userId, res);
    handleResponse(res, 200, 'user.updateProfile', undefined, updatedUser, 'user');
  } catch (error: unknown) {
    deleteImage(file?.path);
    handleErrorResponse(res, error);
  }
};
