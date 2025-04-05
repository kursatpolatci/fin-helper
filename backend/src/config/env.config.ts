import dotenv from 'dotenv';

dotenv.config();

interface IEnvConfig {
  MONGODB_URI: string;
  PORT: string;
  JWT_SECRET: string;
}

export const envconfig: IEnvConfig = {
  PORT: process.env.PORT || '5000',
  MONGODB_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
};
