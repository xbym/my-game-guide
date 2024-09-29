import { GetServerSideProps } from 'next';
import clientPromise from '../lib/mongodb';

interface Guide {
    _id: string;
    title: string;
}

interface HomeProps {
    guides: Guide[];
}

export default function Home({ guides }: HomeProps) {
    return (
        <div>
            <h1>游戏攻略平台</h1>
            <ul>
                {guides.map((guide) => (
                    <li key={guide._id}>{guide.title}</li>
                ))}
            </ul>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const client = await clientPromise;
    const db = client.db('game-guides');
    const guides = await db.collection('guides').find({}).toArray();

    return {
        props: {
            guides: JSON.parse(JSON.stringify(guides)),
        },
    };
};