import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  title: { type: String, default: '' }, 
  firstname: { type: String, default: '' },
  lastname: { type: String, default: '' },
  artistName: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

export interface User extends mongoose.Document {
  id: string,
  title: string, 
  firstname: string,
  lastname: string,
  artistName: string,
  phone: string,
  email: string,
  password: string,
  type: string,
  following: string[], 
}

interface Data {
  email: string,
  password: string,
  type: string,
}

export interface UserData extends Data {
  title: string,
  lastname: string,
  firstname: string,
  phone: string,
}

export interface ArtistData extends Data {
  artistName: string,
  genre: string,
  description: string,
}
