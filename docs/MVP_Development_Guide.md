# MVP 开发指南

## 项目概述

本项目旨在创建一个全球化、多语言支持的游戏攻略平台。我们将使用 Next.js 作为前端框架，MongoDB 作为数据库，并使用 TypeScript 和 TSX 文件来编写网页文件。

## 技术栈

- 前端框架：Next.js
- 数据库：MongoDB
- 编程语言：TypeScript
- 页面文件：TSX

## 开发步骤

### 第一步：项目初始化

- [x] **创建 Next.js 项目**
    ```bash
    npx create-next-app@latest my-game-guide --typescript
    cd my-game-guide
    ```

- [x] **安装 MongoDB 客户端**
    ```bash
    npm install mongodb
    ```

- [x] **创建 `docs` 文件夹**
    ```bash
    mkdir docs
    ```

- [x] **在 `docs` 文件夹中创建 `MVP_Development_Guide.md` 文件**
    ```bash
    touch docs/MVP_Development_Guide.md
    ```

### 第二步：配置 MongoDB

- [x] **在项目根目录创建 `.env.local` 文件**
    ```bash
    touch .env.local
    ```

- [x] **在 `.env.local` 文件中添加 MongoDB 连接字符串**
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    ```

- [x] **创建数据库连接文件 `lib/mongodb.ts`**
    ```typescript:lib/mongodb.ts
    import { MongoClient } from 'mongodb';

    const uri = process.env.MONGODB_URI as string;
    let client: MongoClient;
    let clientPromise: Promise<MongoClient>;

    declare global {
        // eslint-disable-next-line no-var
        var _mongoClientPromise: Promise<MongoClient>;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('Please add your Mongo URI to .env.local');
    }

    if (process.env.NODE_ENV === 'development') {
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        client = new MongoClient(uri);
        clientPromise = client.connect();
    }

    export default clientPromise;
    ```

### 第三步：创建基本页面

- [x] **创建首页 `pages/index.tsx`**
    ```typescript:pages/index.tsx
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
    ```

- [x] **创建攻略详情页 `pages/guides/[id].tsx`**
    ```typescript:pages/guides/[id].tsx
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
    ```

### 第四步：测试与部署

- [ ] **本地测试**
    ```bash
    npm run dev
    ```

- [ ] **部署到 Vercel**
    - 登录 [Vercel](https://vercel.com/)
    - 新建项目并选择 GitHub 仓库
    - 配置环境变量 `MONGODB_URI`
    - 部署项目

## 结语

通过以上步骤，您将完成一个基本的游戏攻略平台的 MVP 版本。希望这个指南能帮助您顺利启动项目，祝您开发顺利！