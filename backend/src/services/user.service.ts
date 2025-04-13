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
  const isAnyFieldEmpty = Object.values(input).every((value) => !value);
  if (isAnyFieldEmpty) throw new Error('Cannot not updated.');
  const relatedUser = await User.findById(userId);
  if (!relatedUser) throw new Error('User not found');
  const { username, email, oldPassword, newPassword, fullName, image } = input;
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
  if (image) {
    if (relatedUser.profileImage !== 'default-avatar.jpg') deleteImage(relatedUser.profileImage);
    relatedUser.profileImage = image;
  }
  return await relatedUser.save();
};
