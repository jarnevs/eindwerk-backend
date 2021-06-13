import * as mongoose from 'mongoose';

export const CarpoolSchema = new mongoose.Schema({
  concert: { type: mongoose.Schema.Types.ObjectId, ref:'Event', required: true },
  seats: Number,
  time: Number,
  location: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  accepted: [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
})

export interface Carpool extends mongoose.Document {
  id: string,
  concert: string,
  seats: number,
  time: number,
  location: string,
  userId: string,
  accepted: [string]
}

export interface CarpoolData {
  concert: string,
  seats: number,
  time: number,
  location: string,
}
