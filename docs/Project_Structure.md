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
- `docs/`：文档文件夹，包含项目的开发指南、长久计划、命令指南等文档。
- `app/`：应用文件夹，包含全局布局和样式文件。
- `lib/`：库文件夹，包含数据库连接文件。
- `pages/`：页面文件夹，包含 Next.js 页面文件。

## `docs/` 文件夹

- `MVP_Development_Guide.md`：MVP 开发指南，详细描述了项目的开发步骤。
- `Long_Term_Plan.md`：长久计划指南，描述了项目的长期发展步骤。
- `Command_Guide.md`：命令指南，记录了项目开发过程中常用的命令。
- `Project_Structure.md`：项目文件结构指南，描述了项目的文件结构和各个文件的用途。

## `pages/` 文件夹

- `index.tsx`：首页文件，展示游戏攻略列表。
- `guides/`：攻略详情页文件夹，包含各个攻略的详情页。
  - `[id].tsx`：攻略详情页文件，根据攻略 ID 动态生成页面。

## `lib/` 文件夹

- `mongodb.ts`：数据库连接文件，负责与 MongoDB 建立连接。

## `app/` 文件夹

- `layout.tsx`：布局文件，定义全局布局。
- `globals.css`：全局样式文件，定义全局样式。

## 其他文件和文件夹

- `public/`：静态资源文件夹，存放项目的静态文件，如图片、字体等。
- `styles/`：样式文件夹，存放项目的全局样式文件。
- `fonts/`：字体文件夹，存放项目使用的字体文件。

## 结语

通过以上文件结构的描述，您可以清晰地了解项目的组织方式和各个文件的用途。希望这个指南能帮助您更好地管理和开发项目。