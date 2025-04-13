import { Response } from 'express';

export const validateInput = <T extends object>(input: T): void => {
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    if (!value) throw new Error(`Invalid value: ${String(key)} cannot be empty or invalid`);
  }
};

export const emailControl = (email: string, res: Response): void => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) throw new Error(res.__('errors.email-format'));
};

export const passwordControl = (password: string, res: Response): void => {
  if (password.length < 6) throw new Error(res.__('errors.password-length'));
};
