import path from 'path';
import i18n from 'i18n';

i18n.configure({
  locales: ['en', 'tr'],
  directory: path.join(__dirname, '../locales'),
  defaultLocale: 'en',
  objectNotation: true,
  autoReload: true,
  syncFiles: true,
  header: '',
  queryParameter: undefined,
});

export default i18n;
