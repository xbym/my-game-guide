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
- `next.config.mjs`：Next.js 配置文件。
- `postcss.config.mjs`：PostCSS 配置文件，用于处理 CSS。
- `tailwind.config.ts`：Tailwind CSS 配置文件。

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

## `public/` 文件夹

- `placeholder.svg`：占位图片文件。

## `docs/` 文件夹

- `MVP_Development_Guide.md`：MVP 开发指南，详细描述了项目的开发步骤。
- `Long_Term_Plan.md`：长期计划指南，描述了项目的长期发展步骤。
- `Command_Guide.md`：命令指南，记录了项目开发过程中常用的命令。
- `Project_Structure.md`：项目文件结构指南（本文件）。

## 待开发的文件和文件夹

根据 MVP 开发指南，以下是未来可能需要创建的文件和文件夹：

- `pages/`：用于存放其他页面组件，如攻略详情页、用户个人资料页等。
- `models/`：用于存放数据库模型文件。
- `utils/`：用于存放工具函数和辅助方法。
- `hooks/`：用于存放自定义 React hooks。
- `contexts/`：用于存放 React 上下文文件，如用户认证上下文。
- `styles/`：用于存放其他样式文件，如主题配置等。
- `tests/`：用于存放测试文件。
- `locales/`：用于存放多语言翻译文件。

## 结语

这个项目结构反映了当前的开发进度，并为未来的扩展预留了空间。随着项目的发展，我们可能会添加新的文件和文件夹，或者调整现有的结构以适应新的需求。请定期查看此文档以获取最新的项目结构信息。