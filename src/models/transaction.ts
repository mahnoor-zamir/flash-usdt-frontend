import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  txHash: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Transaction || 
  mongoose.model('Transaction', TransactionSchema);