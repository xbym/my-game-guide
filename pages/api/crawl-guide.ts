import { NextApiRequest, NextApiResponse } from 'next';
import { crawlGuide } from '@/lib/crawler';
import dbConnect from '@/lib/dbConnect';
import Guide from '@/models/Guide';
import Game from '@/models/Game';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await dbConnect();

      const { url } = req.body;
      console.log('Received URL for crawling:', url);

      const crawledData = await crawlGuide(url);

      if (!crawledData) {
        console.error('Crawled data is null');
        return res.status(400).json({ success: false, error: 'Failed to crawl the guide' });
      }

      const title = crawledData.metadata.title || 'Untitled Guide';

      // 查找或创建一个默认的游戏
      let game = await Game.findOne({ name: '待定' });
      if (!game) {
        game = await Game.create({ name: '待定' });
      }

      // 查找或创建一个系统用户
      let author = await User.findOne({ username: '系统爬虫' });
      if (!author) {
        author = await User.create({ 
          username: '系统爬虫', 
          email: 'system@example.com', 
          password: 'defaultpassword' // 注意：在实际应用中，应该使用加密的密码
        });
      }

      // 创建新的 Guide 文档
      const guide = new Guide({
        title: title,
        content: crawledData.markdown,
        sourceURL: url,
        game: game._id,
        author: author._id,
      });

      await guide.save();

      res.status(200).json({ success: true, guide, id: guide._id });
    } catch (error: unknown) {
      console.error('Error in crawl-guide API:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to crawl and save guide', 
        details: error instanceof Error ? error.message : String(error)
      });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}