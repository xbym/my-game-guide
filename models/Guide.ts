import mongoose from 'mongoose';

const GuideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  tags: [{ type: String }],
  sourceURL: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Guide || mongoose.model('Guide', GuideSchema);