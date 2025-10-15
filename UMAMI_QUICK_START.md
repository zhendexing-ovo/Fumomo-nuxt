# 快速配置指南

## ⚡ 快速开始

### 第一步：获取 API 密钥
1. 访问 https://cloud.umami.is
2. 进入 Settings → API Keys
3. 创建新密钥并复制

### 第二步：获取网站 ID
1. 在 Umami Cloud 中选择你的网站
2. 在设置中找到 Website ID
3. 复制网站 ID

### 第三步：配置项目
打开 `app/config/index.ts`，填入你的信息：

```typescript
umami: {
    enable: true,
    apiKey: "your-api-key-here",        // 粘贴你的 API 密钥
    websiteId: "your-website-id-here",  // 粘贴你的网站 ID
    apiEndpoint: "https://api.umami.is",
},
```

### 第四步：更新跟踪脚本
打开 `app/layouts/default.vue`，更新 `data-website-id`：

```vue
script: [
  {
    defer: true,
    src: 'https://cloud.umami.is/script.js',
    'data-website-id': 'your-website-id-here'  // 使用相同的网站 ID
  }
]
```

### Debug
localhost:3000/debug-umami

## ✅ 完成！

重启开发服务器，你的 Umami V3 统计就配置完成了。

---

详细文档请查看：[UMAMI_V3_SETUP.md](./UMAMI_V3_SETUP.md)
