import { Response } from 'express';
import { comparePassword } from '../helpers/hash.helper';
import { passwordControl } from '../helpers/validation.helper';
import User, { IUser } from '../models/user.model';
import { IUpdateProfileInput } from '../types/input.interface';
import { deleteImage } from '../utils/image.util';

export const updateProfileService = async (
  input: IUpdateProfileInput,
  userId: string,
  res: Response
): Promise<IUser> => {
  const relatedUser = await User.findById(userId);
  if (!relatedUser) throw new Error(res.__('error.user-not-found'));
  const { username, email, oldPassword, newPassword, fullName, profileImage } = input;
  if (username) {
    const isUsernameExist = await User.findOne({ username });
    if (!isUsernameExist) relatedUser.username = username;
    else throw new Error('This username is already using.');
  }
  if (email) {
    const isEmailExist = await User.findOne({ email });
    if (!isEmailExist) relatedUser.email = email;
    else throw new Error('This email is already using.');
  }
  if (newPassword) {
    if (!oldPassword) throw new Error('Both password fields are required');
    passwordControl(newPassword, res);
    const isPasswordValid = comparePassword(oldPassword, relatedUser.password);
    if (!isPasswordValid) throw new Error('Your old password does not match your new password.');
    relatedUser.password = newPassword;
  }
  if (fullName) relatedUser.fullName = fullName;
  if (profileImage) {
    if (relatedUser.profileImage !== 'default-avatar.jpg') deleteImage(relatedUser.profileImage);
    relatedUser.profileImage = profileImage;
  }
  return await relatedUser.save();
};
