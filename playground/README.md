# Taxonom Playground

Vue.js で作成された Taxonom マークダウンパーサーのデモアプリケーション

## 概要

このプレイグラウンドは [@osaxyz/taxonom](https://www.npmjs.com/package/@osaxyz/taxonom) パーサーの機能をリアルタイムで体験できるデモアプリケーションです。

## 機能

- 📝 **リアルタイムプレビュー**: マークダウン入力と同時にHTMLが生成される
- ⚙️ **設定パネル**: HTML要素マッピングをリアルタイムで変更可能
- 💎 **シンタックスハイライト**: highlight.js による美しいコード表示
- 📱 **レスポンシブ対応**: PC・タブレット・スマートフォンに対応
- 🎨 **3カラムレイアウト**: 入力・HTML・プレビューを同時表示

## 技術スタック

- **Vue.js 3**: Composition API
- **TypeScript**: 型安全な開発
- **Vite**: 高速ビルドツール
- **Sass**: CSSプリプロセッサ
- **Pug**: HTMLテンプレート
- **@osaxyz/taxonom**: マークダウンパーサー
- **@osaxyz/taxonom-style**: デフォルトスタイル

## ローカル開発

### 要件

- Node.js v16以上
- npm v8以上

### セットアップ

```bash
# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

### 利用可能なコマンド

```bash
npm run dev       # 開発サーバー起動
npm run build     # プロダクションビルド
npm run preview   # ビルド結果をプレビュー
npm run typecheck # TypeScript型チェック
```

## Vercel デプロイ

このプロジェクトはVercelで自動的にデプロイされます。

### 自動デプロイ

1. GitHubにプッシュ
2. Vercelが自動的にビルド・デプロイ
3. プレビューURLが生成される

### 手動デプロイ

```bash
# Vercel CLIをインストール
npm i -g vercel

# プロジェクトルートから
vercel --prod
```

### デプロイ設定

プロジェクトルートの `vercel.json` でデプロイ設定を管理：

```json
{
  "buildCommand": "cd playground && npm ci && npm run build",
  "outputDirectory": "playground/dist",
  "installCommand": "cd playground && npm ci",
  "framework": "vite"
}
```

## 主要コンポーネント

### TaxonomDemo.vue

メインのデモコンポーネント：

- **マークダウン入力**: リアクティブなテキストエリア
- **HTML出力**: エスケープされたHTML表示
- **プレビュー**: レンダリング結果表示
- **設定パネル**: リアルタイム設定変更

### 主要機能

#### リアルタイム変換

```javascript
const parsed_html = computed(() => {
    try {
        Taxonom.initialize(config.value)
        return Taxonom.parse(markdown_input.value, { highlightCode: true })
    } catch (error) {
        return `<p style="color: red;">エラー: ${error}</p>`
    }
})
```

#### 設定の動的変更

```javascript
const updateConfigValue = (key: string, value: string): void => {
    const typedKey = key as keyof TaxonomConfig
    config.value[typedKey] = value as any
}
```

#### サンプルロード機能

豊富なマークダウンサンプルをワンクリックで読み込み：

- 見出し・段落
- リスト（無序・順序付き）
- リンク・画像
- ブロッククォート
- コードブロック（JavaScript・TypeScript）

## スタイル設計

### CSS設計思想

- **Scoped CSS**: コンポーネント間の競合を防止
- **CSS変数**: 一貫したデザインシステム
- **レスポンシブファースト**: モバイル対応を優先
- **ユーティリティクラス**: 効率的なスタイリング

### カラーパレット

```sass
// プライマリカラー
--color-primary: #2563eb
--color-primary-50: #eff6ff
--color-primary-600: #1d4ed8

// グレースケール
--color-gray-50: #f9fafb
--color-gray-300: #d1d5db
--color-gray-700: #374151
--color-gray-900: #111827
```

### レスポンシブブレークポイント

```sass
// デスクトップ
@media (max-width: 1024px)
    grid-template-columns: 1fr

// タブレット・モバイル
@include mq(iPadPro)
    min-height: 500px

@include mq(iPad)  
    min-height: 300px
```

## パフォーマンス最適化

### バンドルサイズ最適化

- **Tree Shaking**: 未使用コードの除去
- **Code Splitting**: 動的インポートの活用
- **Asset Optimization**: 画像・フォントの最適化

### 実行時パフォーマンス

- **Computed Properties**: リアクティブな更新
- **デバウンス**: 入力処理の最適化
- **Virtual Scrolling**: 大容量テキスト対応

## ブラウザサポート

- **Chrome**: 最新版
- **Firefox**: 最新版  
- **Safari**: 最新版
- **Edge**: 最新版
- **iOS Safari**: 14+
- **Android Chrome**: 最新版

## トラブルシューティング

### よくある問題

**Q: 開発サーバーが起動しない**

```bash
# ポートが使用中の場合
npm run dev -- --port 3001
```

**Q: ビルドが失敗する**

```bash
# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install
```

**Q: TypeScriptエラーが出る**

```bash
# 型チェックを実行
npm run typecheck
```

## 貢献

バグ報告や機能提案は Issue でお知らせください。

## ライセンス

MIT License

## 関連リンク

- [本体リポジトリ](https://github.com/artouc/taxonom)
- [@osaxyz/taxonom](https://www.npmjs.com/package/@osaxyz/taxonom)
- [@osaxyz/taxonom-style](https://www.npmjs.com/package/@osaxyz/taxonom-style)
- [ライブデモ](https://taxonom.vercel.app)

---

Made with ❤️ by [OSA](https://osa.xyz)