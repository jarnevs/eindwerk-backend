import * as mongoose from 'mongoose';

export const ArtistsSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, ref: 'User'},
  genreId: { type: mongoose.Types.ObjectId, ref: 'Genre' },
  description: String,
}, { _id: false })

export interface Artist extends mongoose.Document {
  _id: string,
  genreId: string,
  description: string,
}

export interface ArtistData {
  artistId: string,
  genre: string,
  description: string,
}

