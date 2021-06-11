import * as mongoose from 'mongoose';

export const PostsSchema = new mongoose.Schema({
  message: { type: String, required: true },
  artistId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref:'Post', default: null },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
  createdOn: { type: Number }
})

export interface Post extends mongoose.Document {
  id: string;
  message: string;
  artistId: string;
  userId: string;
  parentId: string;
  createdOn: number;
  likedBy: string[];
}

export interface PostData {
  message: string;
  artistId: string;
  userId: string;
  parentId?: string;
  createdOn: number;
}
