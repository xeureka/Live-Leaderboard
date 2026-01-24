import mongoose, { Document, Schema, model } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Users = model('User', userSchema);

export default Users;
