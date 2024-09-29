import { GetServerSideProps } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { ParsedUrlQuery } from 'querystring';

interface Guide {
    _id: string;
    title: string;
    content: string;
}

interface GuideProps {
    guide: Guide;
}

interface Params extends ParsedUrlQuery {
    id: string;
}

export default function Guide({ guide }: GuideProps) {
    return (
        <div>
            <h1>{guide.title}</h1>
            <p>{guide.content}</p>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as Params;
    const client = await clientPromise;
    const db = client.db('game-guides');
    const guide = await db.collection('guides').findOne({ _id: new ObjectId(id) });

    return {
        props: {
            guide: JSON.parse(JSON.stringify(guide)),
        },
    };
};