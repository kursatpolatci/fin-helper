import i18n from '../config/i18n.config';
import { NextFunction, Response, Request } from 'express';

const supportedLanguages = ['en', 'tr'];

export const localizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const langHeader = req.headers['accept-language'];
  const rawLang = langHeader?.split(',')[0]?.toLowerCase();
  const lang = rawLang?.split('-')[0]?.toLowerCase();
  if (lang && supportedLanguages.includes(lang)) req.setLocale(lang);
  else req.setLocale(i18n.getLocale());
  next();
};
