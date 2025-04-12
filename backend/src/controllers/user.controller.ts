import { Response } from 'express';
import { handleErrorResponse, handleResponse } from '../utils/response.util';
import { updateProfileService } from '../services/user.service';
import { deleteImage } from '../utils/image.util';
import { AuthenticatedRequest } from '../types/request.interface';

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { userId } = req;
  const { fullName, username, email, newPassword, oldPassword } = req.body;
  const { file } = req;
  const userData = { fullName, username, email, newPassword, oldPassword, image: file ? file.path : '' };
  try {
    const updatedUser = await updateProfileService(userData, userId!);
    handleResponse(res, 200, 'Profile updated successfully', updatedUser, 'user');
  } catch (error: unknown) {
    deleteImage(file?.path);
    handleErrorResponse(res, error);
  }
};
