import mongoose from 'mongoose';

const connectDb = async (uri: string): Promise<void> => {
  if (!uri) throw `MONGO_URI is not defined in environment variables.`;
  const conn = await mongoose.connect(uri);
  console.log(`MongoDB connected: ${conn.connection.name}`);
};

export { connectDb };
