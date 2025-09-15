import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    tags: { type: [String], default: [] }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

linkSchema.index({ userId: 1, createdAt: -1 });
linkSchema.index({ userId: 1, tags: 1 });
linkSchema.index({ userId: 1, title: 'text', description: 'text' });

export default mongoose.model('Link', linkSchema);


