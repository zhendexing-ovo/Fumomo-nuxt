好的，这是翻译成日文并保留原始格式的内容：

# Haku Fumomo - パーソナルホームページ

Nuxt 4 + Vue 3 + Tailwind CSS をベースに構築されたモダンなパーソナルホームページで、RSSフィードによる記事購読機能をサポートしています。

[English](./docs/README.en.md) | [日本語](./docs/README.ja.md)

## 機能・特徴

- モダンなデザイン、レスポンシブレイアウト対応
- モバイルフレンドリー
- RSSによる記事購読機能
- Nuxt 4ベース、優れたパフォーマンス
- TypeScript サポート
- Tailwind CSSによるスタイリング
- フレンドリンク：[RhenCloud](https://github.com/RhenCloud)様より
- アクセス統計：[yCENzh](https://github.com/yCENzh)様より

## 技術スタック

- **フロントエンドフレームワーク**: Nuxt 4 + Vue 3
- **スタイリング**: Tailwind CSS v3
- **型定義**: TypeScript
- **デプロイ**: Vercel
- **RSS解析**: fast-xml-parser

## インストールと実行

### ローカル開発

```bash
# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev

# http://localhost:3000 にアクセス
```

### プロダクションビルド

```bash
# プロジェクトをビルド
pnpm build

# ビルド結果をプレビュー
pnpm preview
```

## Vercelへのデプロイ

### 自動デプロイ（推奨）

1. コードをGitHubリポジトリにプッシュします
2. [Vercel](https://vercel.com) であなたのGitHubリポジトリをインポートします
3. VercelがNuxtプロジェクトを自動的に検出し、デプロイを行います
4. デプロイが完了すると、`.vercel.app` ドメインが取得できます

### 手動デプロイ

```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel --prod
```

## 設定

### RSSフィード設定、メール送受信設定

`.env` で関連する設定を変更します

### 個人情報の設定

`app/config/index.ts` で個人情報を変更します：

```typescript
personal: {
  name: "あなたの名前",
  nickname: "ニックネーム",
  bio: "自己紹介",
  avatar: "アバターURL",
  social: {
    github: "https://github.com/your-username",
    email: "your-email@example.com"
  }
}
```

## プロジェクト構成

```
fumomo-nuxt/
├── app/
│   ├── assets/
│   │   └── styles/          # グローバルスタイル
│   ├── components/          # Vueコンポーネント
│   ├── config/
│   │   └── index.ts         # サイト設定
│   ├── layouts/
│   │   └── default.vue      # デフォルトレイアウト
│   └── pages/               # ページルート
├── server/
│   └── api/
│       └── rss.get.ts       # RSS APIルート
├── public/                  # 静的リソース
├── nuxt.config.ts           # Nuxt設定
└── package.json
```

## カスタマイズ

### テーマカラーの変更

`app/config/index.ts` の `theme` 部分で変更します：

```typescript
theme: {
  primaryColor: "#8b5a8c",      // プライマリーカラー
  secondaryColor: "#f0f9ff",    // セカンダリーカラー
  accentColor: "#ffeef8",       // アクセントカラー
  textColor: "#666",            // テキストカラー
  fontFamily: "'Comic Sans MS', 'XiaokeNailao', cursive, sans-serif"
}
```

### ナビゲーションメニューの変更

`app/config/index.ts` の `navigation` 部分で変更します：

```typescript
navigation: [
  { name: "ホーム", href: "/", key: "home"},
  { name: "記事", href: "/articles", key: "articles"},
  { name: "概要", href: "/about", key: "about"},
  // さらにナビゲーション項目を追加...
]
```

## Vercelデプロイの最適化

このプロジェクトはVercelへのデプロイに最適化されています：

- `vercel-edge` プリセットを使用し、パフォーマンスを向上
- ホームページをプリレンダリングし、SEOを向上
- 静的リソースの自動キャッシング
- サーバーレスファンクションに対応

## ライセンス

MIT License

## コントリビュート

IssueやPull Requestをお待ちしています！

---

もしこのプロジェクトが役に立ったなら、ぜひStarを付けて応援してください！