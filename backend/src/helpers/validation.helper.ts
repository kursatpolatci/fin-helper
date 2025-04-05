import { ILoginInput, ISignupInput } from '../types/auth.interface';

export const validateSignupInput = (input: ISignupInput): void => {
  const requiredFields: Array<keyof ISignupInput> = Object.keys(input) as Array<keyof ISignupInput>;
  for (const field of requiredFields) {
    if (!(field in input)) throw new Error(`Missing required field: ${field} is required`);
    if (!input[field]) throw new Error(`Invalid value: ${field} cannot be empty`);
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(input.email)) throw new Error('Email format is not valid');
  if (input.password.length < 6) throw new Error('Password length must be at least 6');
};

export const validateLoginInput = (input: ILoginInput): void => {
  const requiredFields: Array<keyof ILoginInput> = Object.keys(input) as Array<keyof ILoginInput>;
  for (const field of requiredFields) {
    if (!(field in input)) throw new Error(`Missing required field: ${field} is required`);
    if (!input[field]) throw new Error(`Invalid value: ${field} cannot be empty`);
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(input.email)) throw new Error('Email format is not valid');
};
