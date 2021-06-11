import * as mongoose from 'mongoose';

export const EventsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Number, required: true },
  description: { type: String, required: true },
  artistId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
  going: [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
  maybe: [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
  notGoing: [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
})

export interface Event extends mongoose.Document {
  id: string;
  title: string;
  location: string;
  date: number;
  description: string;
  artistId: string;
  going: string[];
  maybe: string[];
  notGoing: string[];
}

export interface EventData {
  title: string;
  location: string;
  date: string;
  description: string;
}
