export const validateInput = <T extends object>(input: T): void => {
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    if (!value) throw new Error(`Invalid value: ${String(key)} cannot be empty or invalid`);
  }
};

export const emailControl = (email: string): void => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) throw new Error('Email format is not valid');
};

export const passwordControl = (password: string): void => {
  if (password.length < 6) throw new Error('Password length must be at least 6');
};
