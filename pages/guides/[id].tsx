import { GetServerSideProps } from 'next';
import { useState } from 'react';
import dbConnect from '@/lib/dbConnect';
import Guide from '@/models/Guide';
import { marked } from 'marked';

interface GuideProps {
  guide: {
    title: string;
    content: string;
    sourceURL: string;
    game: string;
    author: string;
  };
}

export default function GuidePage({ guide }: GuideProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{guide.title}</h1>
      <p className="text-gray-600 mb-2">游戏: {guide.game}</p>
      <p className="text-gray-600 mb-4">作者: {guide.author}</p>
      <div className={`prose max-w-none ${isExpanded ? '' : 'max-h-96 overflow-hidden'}`}>
        <div dangerouslySetInnerHTML={{ __html: marked(guide.content) }} />
      </div>
      {!isExpanded && (
        <button
          className="mt-4 text-blue-500 hover:text-blue-700"
          onClick={() => setIsExpanded(true)}
        >
          展开阅读更多
        </button>
      )}
      <p className="mt-8 text-sm text-gray-500">
        原文链接: <a href={guide.sourceURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">{guide.sourceURL}</a>
      </p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  await dbConnect();

  const guide = await Guide.findById(id).lean();

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