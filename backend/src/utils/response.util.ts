import { Response } from 'express';
import { CustomError } from '../errors/custom.error';

export const handleResponse = (
  res: Response,
  statusCode: number,
  messageKey?: string,
  messageVars: Record<string, any> = {},
  dataValue: any = null,
  dataKey: string = 'data'
): void => {
  const responseBody: Record<string, any> = { success: true };
  if (messageKey) responseBody.message = res.__(messageKey, messageVars);
  if (dataValue != null) responseBody[dataKey] = dataValue;
  res.status(statusCode).json(responseBody);
};

export const handleErrorResponse = (res: Response, error: unknown): void => {
  if (error instanceof CustomError) res.status(error.code).json({ success: false, message: error.message });
  else if (error instanceof Error) res.status(500).json({ success: false, message: error.message });
  else res.status(500).json({ success: false, message: 'An unknown error occurred' });
};
