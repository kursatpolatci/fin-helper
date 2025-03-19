import mongoose from 'mongoose';

const connectDb = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw `MONGO_URI is not defined in environment variables.`;
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.name}`);
  } catch (error: unknown) {
    throw error;
  }
};

export { connectDb };
