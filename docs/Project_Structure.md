# 项目文件结构指南

本指南将详细描述项目的文件结构，帮助您了解各个文件和文件夹的用途和组织方式。

## 根目录

- `README.md`：项目的基本介绍和使用说明。
- `package.json`：项目的依赖管理和脚本配置文件。
- `package-lock.json`：记录项目依赖的确切版本，确保一致的依赖安装。
- `tsconfig.json`：TypeScript 配置文件。
- `.env.local`：环境变量配置文件，包含 MongoDB 连接字符串等敏感信息。
- `.eslintrc.json`：ESLint 配置文件，用于代码质量和风格检查。
- `.gitignore`：Git 忽略文件，指定哪些文件和文件夹不应提交到版本控制。
- `next.config.js`：Next.js 配置文件。
- `postcss.config.mjs`：PostCSS 配置文件，用于处理 CSS。
- `tailwind.config.js`：Tailwind CSS 配置文件。

## `app/` 文件夹

- `layout.tsx`：全局布局组件。
- `page.tsx`：主页面组件，包含整个主页的结构和逻辑。
- `globals.css`：全局样式文件。

## `components/` 文件夹

- `ui/`：UI 组件文件夹。
  - `input.tsx`：输入框组件。
  - `button.tsx`：按钮组件。

## `lib/` 文件夹

- `mongodb.ts`：MongoDB 数据库连接文件。
- `dbConnect.ts`：数据库连接辅助函数。
- `crawler.ts`：网页爬虫功能实现。
- `utils.ts`：通用工具函数。

## `models/` 文件夹

- `Category.ts`：分类模型。
- `Comment.ts`：评论模型。
- `Game.ts`：游戏模型。
- `Guide.ts`：攻略模型。
- `User.ts`：用户模型。

## `pages/` 文件夹

- `api/`：API 路由文件夹。
  - `crawl-guide.ts`：爬取攻略的 API 路由。
  - `guides/index.ts`：攻略列表的 API 路由。
- `guides/[id].tsx`：攻略详情页面。

## `public/` 文件夹

- `placeholder.svg`：占位图片文件。

## `docs/` 文件夹

- `MVP_Development_Guide.md`：MVP 开发指南，详细描述了项目的开发步骤。
- `Long_Term_Plan.md`：长期计划指南，描述了项目的长期发展步骤。
- `Command_Guide.md`：命令指南，记录了项目开发过程中常用的命令。
- `Project_Structure.md`：项目文件结构指南（本文件）。

## `.vscode/` 文件夹

- `settings.json`：VS Code 编辑器设置文件。

## `types/` 文件夹

- `global.d.ts`：全局类型声明文件。

## 结语

这个项目结构反映了当前的开发进度。随着项目的发展，我们可能会添加新的文件和文件夹，或者调整现有的结构以适应新的需求。请定期查看此文档以获取最新的项目结构信息。