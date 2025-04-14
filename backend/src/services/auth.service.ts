import { CustomError } from '../errors/custom.error';
import { comparePassword, hashPassword } from '../helpers/hash.helper';
import User, { IUser } from '../models/user.model';
import { generateToken, setTokenCookie } from '../helpers/token.helper';
import { Response } from 'express';
import { ILoginInput, ISignupInput } from '../types/input.interface';
import { passwordControl } from '../helpers/validation.helper';

export const signupService = async (input: ISignupInput, res: Response): Promise<IUser> => {
  const { username, fullName, email, profileImage, password } = input;
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) throw new CustomError(res.__('error.existing-user'), 404);
  passwordControl(password, res);
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ ...input, password: hashedPassword });
  await newUser.save();
  const token = generateToken(newUser.id);
  setTokenCookie(token, res);
  return newUser;
};

export const loginService = async (input: ILoginInput, res: Response): Promise<IUser> => {
  const { email, password } = input;
  const relatedUser = await User.findOne({ email });
  if (!relatedUser) throw new CustomError(res.__('error.user-not-found'), 404);
  const isPasswordValid = await comparePassword(password, relatedUser.password);
  if (!isPasswordValid) throw new CustomError(res.__('error.wrong-password'), 400);
  const token = generateToken(relatedUser.id);
  setTokenCookie(token, res);
  return relatedUser;
};

export const logoutService = (res: Response): void => {
  res.clearCookie('token');
};

export const checkAuthService = async (userId: string, res: Response): Promise<IUser> => {
  const relatedUser = await User.findById(userId);
  if (!relatedUser) throw new CustomError(res.__('error.user-not-found'), 404);
  return relatedUser;
};
