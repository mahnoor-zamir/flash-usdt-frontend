import { NextApiRequest, NextApiResponse } from 'next';
import { getOwner, getContractBalance, sendTransaction } from '../../app/utils/flashusdtService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { action } = req.query;

    try {
      if (action === 'owner') {
        const owner = await getOwner();
        res.status(200).json({ owner });
      } else if (action === 'balance') {
        const balance = await getContractBalance();
        res.status(200).json({ balance });
      } else {
        res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    const { recipient, amount, sender, privateKey } = req.body;

    try {
      await sendTransaction(recipient, amount, sender, privateKey);
      res.status(200).json({ message: 'Transaction sent successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};