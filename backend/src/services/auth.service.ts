import { CustomError } from '../errors/custom.error';
import { comparePassword, hashPassword } from '../helpers/hash.helper';
import User, { IUser } from '../models/user.model';
import { ILoginInput, ISignupInput } from '../types/auth.interface';
import { generateToken, setTokenCookie } from '../helpers/token.helper';
import { Response } from 'express';

export const signupService = async (input: ISignupInput, res: Response): Promise<IUser> => {
  const existingUser = await User.findOne({ $or: [{ email: input.email }, { username: input.username }] });
  if (existingUser) throw new CustomError('Email or username is already using', 404);
  const hashedPassword = await hashPassword(input.password);
  const newUser = new User({ ...input, password: hashedPassword });
  await newUser.save();
  const token = generateToken(newUser.id);
  setTokenCookie(token, res);
  return newUser;
};

export const loginService = async (input: ILoginInput, res: Response): Promise<IUser> => {
  const { email, password } = input;
  const relatedUser = await User.findOne({ email });
  if (!relatedUser) throw new CustomError('User not found', 404);
  const isPasswordValid = await comparePassword(password, relatedUser.password);
  if (!isPasswordValid) throw new CustomError('Password is not correct', 400);
  const token = generateToken(relatedUser.id);
  setTokenCookie(token, res);
  return relatedUser;
};

export const logoutService = (res: Response): void => {
  res.clearCookie('token');
};

export const checkAuthService = async (userId: string): Promise<IUser> => {
  const relatedUser = await User.findById(userId);
  if (!relatedUser) throw new CustomError('User not found', 404);
  return relatedUser;
};
