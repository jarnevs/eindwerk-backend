import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

export interface User extends mongoose.Document {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserObject {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}
