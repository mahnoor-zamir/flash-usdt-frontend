import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: String, required: true },
  hash: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  }
});

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);