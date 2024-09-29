# 命令指南

本指南将记录项目开发过程中常用的命令，方便您在开发和部署过程中查阅和使用。

## 项目初始化

- 创建 Next.js 项目
- 安装 MongoDB 客户端
- 创建 `docs` 文件夹
- 在 `docs` 文件夹中创建 `MVP_Development_Guide.md` 文件

## 配置 MongoDB

- 创建 `.env.local` 文件
- 添加 MongoDB 连接字符串
- 创建数据库连接文件 `lib/mongodb.ts`

## 创建基本页面

- 创建首页 `pages/index.tsx`
- 创建攻略详情页 `pages/guides/[id].tsx`

## 添加打卡功能

- 在 `pages/api` 文件夹中创建 `checkin.ts`
- 在首页添加打卡按钮

## 测试与部署

- 本地测试
- 部署到 Vercel

## 其他常用命令

- 启动开发服务器
- 构建项目
- 部署项目
- 运行测试

## 结语

本指南将随着项目的进展不断更新和完善，确保您在开发和部署过程中有一个清晰的参考。希望这个指南能帮助您顺利完成项目开发。