import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Guide from '@/models/Guide';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const guides = await Guide.find({}).populate('game').populate('author', 'username');
      res.status(200).json(guides);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}