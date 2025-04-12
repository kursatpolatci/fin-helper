import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  profileImage: string;
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: 'default-avatar.png' },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
