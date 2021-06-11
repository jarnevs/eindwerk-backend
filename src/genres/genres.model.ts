import * as mongoose from 'mongoose';

export const GenresSchema = new mongoose.Schema({
  name: String,
})

export interface Genre extends mongoose.Document {
  id: string,
  name: string,
}

export interface GenreData {
  id: string,
  name: string,
}
