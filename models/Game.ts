import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  releaseDate: { type: Date },
  developer: { type: String },
  publisher: { type: String },
  genres: [{ type: String }],
  platforms: [{ type: String }],
  coverImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Game || mongoose.model('Game', GameSchema);