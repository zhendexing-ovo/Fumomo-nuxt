好的，这是该内容的英文版本，同样保留了原始格式。

# Haku Fumomo - Personal Homepage

A modern personal homepage built with Nuxt 4 + Vue 3 + Tailwind CSS, featuring RSS article subscription.

[English](./docs/README.en.md) | [日本語](./docs/README.ja.md)

## Features

- Modern design with responsive layout support
- Mobile-friendly
- RSS article subscription functionality
- Built with Nuxt 4 for excellent performance
- TypeScript support
- Styled with Tailwind CSS
- Friendly Links: from [RhenCloud](https://github.com/RhenCloud)
- Visitor Analytics: from [yCENzh](https://github.com/yCENzh)

## Tech Stack

- **Frontend Framework**: Nuxt 4 + Vue 3
- **Styling**: Tailwind CSS v3
- **Typing**: TypeScript
- **Deployment**: Vercel
- **RSS Parsing**: fast-xml-parser

## Installation and Usage

### Local Development

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Visit http://localhost:3000
```

### Building for Production

```bash
# Build the project
pnpm build

# Preview the build
pnpm preview
```

## Deploy to Vercel

### Automatic Deployment (Recommended)

1. Push your code to a GitHub repository
2. Import your GitHub repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect the Nuxt project and deploy it
4. After deployment, you will get a `.vercel.app` domain

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Configuration

### RSS Subscription and Email Configuration

Modify the relevant settings in the `.env` file.

### Personal Information Configuration

Modify your personal information in `app/config/index.ts`:

```typescript
personal: {
  name: "Your Name",
  nickname: "Nickname",
  bio: "Personal bio",
  avatar: "Avatar URL",
  social: {
    github: "https://github.com/your-username",
    email: "your-email@example.com"
  }
}
```

## Project Structure

```
fumomo-nuxt/
├── app/
│   ├── assets/
│   │   └── styles/          # Global styles
│   ├── components/          # Vue components
│   ├── config/
│   │   └── index.ts         # Site configuration
│   ├── layouts/
│   │   └── default.vue      # Default layout
│   └── pages/               # Page routes
├── server/
│   └── api/
│       └── rss.get.ts       # RSS API route
├── public/                  # Static assets
├── nuxt.config.ts           # Nuxt configuration
└── package.json
```

## Customization

### Modifying Theme Colors

In the `theme` section of `app/config/index.ts`:

```typescript
theme: {
  primaryColor: "#8b5a8c",      // Primary color
  secondaryColor: "#f0f9ff",    // Secondary color
  accentColor: "#ffeef8",       // Accent color
  textColor: "#666",            // Text color
  fontFamily: "'Comic Sans MS', 'XiaokeNailao', cursive, sans-serif"
}
```

### Modifying Navigation Menu

In the `navigation` section of `app/config/index.ts`:

```typescript
navigation: [
  { name: "Home", href: "/", key: "home"},
  { name: "Articles", href: "/articles", key: "articles"},
  { name: "About", href: "/about", key: "about"},
  // Add more navigation items...
]
```

## Vercel Deployment Optimizations

This project is optimized for Vercel deployment:

- Uses the `vercel-edge` preset for improved performance
- Pre-renders the homepage for better SEO
- Automatic caching of static assets
- Supports Serverless Functions

## License

MIT License

## Contributing

Issues and Pull Requests are welcome!

---

If this project helps you, please give it a Star to show your support