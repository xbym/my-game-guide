import { GetServerSideProps } from 'next';
import { useState } from 'react';
import dbConnect from '@/lib/dbConnect';
import Guide from '@/models/Guide';
import Navigation from '@/components/Navigation';
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';

interface GuideProps {
  guide: {
    _id: string
    title: string
    content: string
    game: {
      name: string
    }
    author: {
      username: string
    }
    createdAt: string
  }
}

export default function GuidePage({ guide }: GuideProps) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />

      <main className="pt-16 pb-8 md:pb-16">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">{guide.title}</h1>
              <div className="flex flex-wrap items-center text-sm text-gray-400 mb-4">
                <span className="mr-4">游戏: {guide.game.name}</span>
                <span className="mr-4">作者: {guide.author.username}</span>
                <span>发布时间: {new Date(guide.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" onClick={() => setLikes(likes + 1)}>
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {likes}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setDislikes(dislikes + 1)}>
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  {dislikes}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  分享
                </Button>
              </div>
            </header>

            <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: guide.content }} />
          </article>
        </div>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2023 GameGuides. 保留所有权利。</p>
        </div>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  const guide = await Guide.findById(context.params?.id).populate('game').populate('author').lean();

  if (!guide) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      guide: JSON.parse(JSON.stringify(guide)),
    },
  };
};