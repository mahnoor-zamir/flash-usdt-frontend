import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongodb';
import Transaction from '@/models/transaction';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      await connectDB();
      const transaction = await Transaction.create(req.body);
      res.status(201).json({ success: true, data: transaction });
    } catch (error: unknown) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      await connectDB();
      const transactions = await Transaction.find({});
      res.status(200).json({ success: true, data: transactions });
    } catch (error: unknown) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}