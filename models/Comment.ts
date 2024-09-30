import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);