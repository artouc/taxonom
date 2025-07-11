# Taxonom Deployment Guide

## Vercel へのプレイグラウンドデプロイ

### 1. Vercel プロジェクト設定

Vercel ダッシュボードで以下の設定を行ってください：

#### Framework Preset
- **Framework**: Vite

#### Root Directory  
- **Root Directory**: `playground`

#### Build Settings
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2. 重要な設定

#### ワークスペース設定
- playgroundは**ワークスペースから独立**しています
- NPMパッケージ `@osaxyz/taxonom@^0.2.0` を直接使用
- ローカル開発とデプロイで同じ依存関係を保証

#### 環境変数（必要に応じて）

```bash
# 本番環境用の設定
NODE_ENV=production
```

### 3. デプロイ手順

#### 自動デプロイ（推奨）

1. GitHubリポジトリをVercelにインポート
2. Root Directoryを `playground` に設定
3. デプロイ実行

#### 手動デプロイ

```bash
# Vercel CLI をインストール
npm i -g vercel

# プロジェクトルートから
cd playground
vercel --prod
```

### 4. カスタムドメイン設定

```bash
# Vercel CLI でドメイン設定
vercel domains add taxonom.yourdomain.com
vercel domains assign taxonom.yourdomain.com
```

## その他のプラットフォーム

### Netlify

#### netlify.toml

```toml
[build]
  base = "playground"
  command = "npm install && npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd playground
          npm install
          
      - name: Build
        run: |
          cd playground  
          npm run build
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: playground/dist
```

### Firebase Hosting

```bash
# Firebase CLI インストール
npm install -g firebase-tools

# プロジェクト初期化
firebase init hosting

# firebase.json 設定
{
  "hosting": {
    "public": "playground/dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

# デプロイ
firebase deploy
```

## パフォーマンス最適化

### バンドルサイズ分析

```bash
cd playground
npm run build
npx vite-bundle-analyzer dist
```

### 最適化設定

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
          highlight: ['highlight.js'],
          taxonom: ['@osaxyz/taxonom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

## セキュリティ設定

### CSP Headers

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
        }
      ]
    }
  ]
}
```

## 監視・分析

### Vercel Analytics

```javascript
// main.ts
import { inject } from '@vercel/analytics'

inject()
```

### Google Analytics

```javascript
// main.ts
import { gtag } from 'vue-gtag'

app.use(gtag, {
  config: {
    id: 'GA_MEASUREMENT_ID'
  }
})
```

## トラブルシューティング

### よくある問題

**Q: ビルドが失敗する**

```bash
# ローカルでビルドテスト
cd playground
npm install
npm run build
```

**Q: 404エラーが出る**

- SPA のリライト設定を確認
- vercel.json の rewrites 設定を確認

**Q: 依存関係のエラー**

```bash
# package-lock.json を削除して再インストール
rm package-lock.json
npm install
```

## 環境別設定

### 開発環境

```bash
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true
```

### ステージング環境

```bash
VITE_API_URL=https://staging-api.example.com
VITE_DEBUG=false
```

### 本番環境

```bash
VITE_API_URL=https://api.example.com
VITE_DEBUG=false
NODE_ENV=production
```

---

Made with ❤️ by [OSA](https://osa.xyz)