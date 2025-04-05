import app from './app';
import { connectDb } from './config/database.config';
import { envconfig } from './config/env.config';

const port = envconfig.PORT;

app.listen(port, async () => {
  try {
    await connectDb(envconfig.MONGODB_URI);
    console.log(`Server is running on port ${port}`);
  } catch (error: unknown) {
    console.error(`App Listen Error: ${error}`);
    process.exit(1);
  }
});
