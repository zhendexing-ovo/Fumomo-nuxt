# Nuxt Minimal Starter

# Haku Fumomo - 个人主页

一个基于 Nuxt 4 + Vue 3 + Tailwind CSS 构建的现代化个人主页，支持 RSS 订阅文章功能。

## ✨ 功能特点

- 🎨 现代化设计，支持响应式布局
- 📱 移动端友好
- 📖 RSS 文章订阅功能
- 🚀 基于 Nuxt 4，性能优秀
- 🎯 TypeScript 支持
- 🌈 Tailwind CSS 样式

## 🛠️ 技术栈

- **前端框架**: Nuxt 4 + Vue 3
- **样式**: Tailwind CSS v3
- **类型**: TypeScript
- **部署**: Vercel
- **RSS解析**: fast-xml-parser

## 📦 安装和运行

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
```

### 构建生产版本

```bash
# 构建项目
pnpm build

# 预览构建结果
pnpm preview
```

## 🚀 部署到 Vercel

### 自动部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 导入你的 GitHub 仓库
3. Vercel 会自动检测 Nuxt 项目并进行部署
4. 部署完成后会获得一个 `.vercel.app` 域名

### 手动部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

## ⚙️ 配置

### RSS 订阅配置

在 `app/config/index.ts` 中修改 RSS 相关配置：

```typescript
articles: {
  // 修改为你的博客 RSS 地址
  rssUrl: "https://your-blog.com/rss.xml",
  pageTitle: "我的文章",
  pageDescription: "技术分享与生活感悟",
  postsPerPage: 10,
  sourceDescription: "文章内容来自我的博客"
}
```

### 个人信息配置

在 `app/config/index.ts` 中修改个人信息：

```typescript
personal: {
  name: "你的名字",
  nickname: "昵称",
  bio: "个人简介",
  avatar: "头像URL",
  social: {
    github: "https://github.com/your-username",
    email: "your-email@example.com"
  }
}
```

## 📁 项目结构

```
fumomo-nuxt/
├── app/
│   ├── assets/
│   │   └── styles/          # 全局样式
│   ├── components/          # Vue 组件
│   │   ├── Footer.vue
│   │   ├── Navbar.vue
│   │   ├── Myjourney.vue
│   │   └── Qualification.vue
│   ├── config/
│   │   └── index.ts         # 网站配置
│   ├── layouts/
│   │   └── default.vue      # 默认布局
│   ├── pages/               # 页面路由
│   │   ├── index.vue        # 首页
│   │   ├── about.vue        # 关于页面
│   │   ├── articles.vue     # 文章页面
│   │   ├── projects.vue     # 项目页面
│   │   └── website.vue      # 网站页面
│   └── app.vue              # 根组件
├── server/
│   └── api/
│       └── rss.get.ts       # RSS API 路由
├── public/                  # 静态资源
├── nuxt.config.ts           # Nuxt 配置
└── package.json
```

## 🔧 自定义配置

### 修改主题色彩

在 `app/config/index.ts` 中的 `theme` 部分：

```typescript
theme: {
  primaryColor: "#8b5a8c",      // 主色调
  secondaryColor: "#f0f9ff",    // 次要色
  accentColor: "#ffeef8",       // 强调色
  textColor: "#666",            // 文字色
  fontFamily: "'Comic Sans MS', 'XiaokeNailao', cursive, sans-serif"
}
```

### 修改导航菜单

在 `app/config/index.ts` 中的 `navigation` 部分：

```typescript
navigation: [
  { name: "首页", href: "/", key: "home"},
  { name: "文章", href: "/articles", key: "articles"},
  { name: "关于", href: "/about", key: "about"},
  // 添加更多导航项...
]
```

## 📝 RSS 功能说明

项目支持从外部博客获取 RSS 数据并在文章页面展示：

1. **RSS 数据获取**: 通过 `/api/rss` 接口获取
2. **XML 解析**: 使用 `fast-xml-parser` 解析 RSS XML
3. **自动分页**: 支持文章列表分页显示
4. **错误处理**: 网络错误时显示友好的错误信息
5. **缓存优化**: Vercel 部署时会自动缓存 API 响应

## 🌐 Vercel 部署优化

项目已针对 Vercel 部署进行优化：

- 使用 `vercel-edge` 预设，提升性能
- 预渲染首页，提高 SEO
- 自动缓存静态资源
- 支持 Serverless Functions

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
