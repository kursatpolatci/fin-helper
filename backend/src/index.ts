import app from './app';
import { connectDb } from './config/database.config';
import { envconfig } from './config/env.config';

const startServer = async (): Promise<void> => {
  try {
    await connectDb(envconfig.MONGODB_URI);
    console.log(`Server is running on port ${envconfig.PORT}`);
  } catch (error: unknown) {
    console.error(`App Listen Error: ${error}`);
    process.exit(1);
  }
};

app.listen(envconfig.PORT, async () => {
  await startServer();
});
