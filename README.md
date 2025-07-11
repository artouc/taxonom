# Taxonom

高速なマークダウンパーサー for Vue.js / Nuxt.js

[![npm version](https://badge.fury.io/js/@osaxyz%2Ftaxonom.svg)](https://badge.fury.io/js/@osaxyz%2Ftaxonom)
[![License: Custom](https://img.shields.io/badge/License-@osaxyz%20Custom-blue.svg)](./LICENSE)

## 概要

**Taxonom** は Vue.js / Nuxt.js 向けに設計された高速マークダウンパーサーです。ヘッドレス設計により既存のCSSフレームワークと競合せず、`data-taxonom-*` 属性によるターゲット指定でスタイリングできます。

## 特徴

- 🚀 **高速パフォーマンス**: 軽量で高速な処理
- 🎯 **ヘッドレス設計**: 既存のCSSと競合しない
- 🔧 **高い柔軟性**: HTML要素のマッピングをカスタマイズ可能
- 💎 **シンタックスハイライト**: highlight.js統合による美しいコード表示
- 📱 **Vue.js / Nuxt.js 最適化**: フレームワーク特化設計
- 🎨 **data属性システム**: `data-taxonom-*` による明確なスタイリング

## モノレポ構成

このリポジトリは3つのパッケージで構成されています：

### 📦 [@osaxyz/taxonom](./taxonom/)
メインのマークダウンパーサー

```bash
npm install @osaxyz/taxonom
```

- TypeScript完全対応
- highlight.js統合
- Vue.js / Nuxt.js 最適化
- カスタマイズ可能なHTML要素マッピング

### 🎨 [@osaxyz/taxonom-style](./taxonom-style/)
デフォルトスタイルパッケージ

```bash
npm install @osaxyz/taxonom-style
```

- GitHub Darkテーマベースのシンタックスハイライト
- CSS変数によるテーマカスタマイズ
- レスポンシブ対応
- data-taxonom属性専用設計

### 🎮 [playground](./playground/)
Vue.js デモアプリケーション - [ライブデモ](https://taxonom.osa.xyz)

```bash
cd playground && npm install && npm run dev
```

- リアルタイムプレビュー
- 設定パネル
- 3カラムレイアウト
- レスポンシブ対応

> **Vercelデプロイ**: Root Directory を `playground` に設定してデプロイしてください。詳細は [DEPLOYMENT.md](./DEPLOYMENT.md) を参照。

## クイックスタート

### Vue.js での使用

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import '@osaxyz/taxonom-style'

createApp(App).mount('#app')
```

```vue
<template>
  <div v-html="parsedMarkdown"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Taxonom } from '@osaxyz/taxonom'

const markdown = ref(`
# Hello Taxonom

これは**太字**で*斜体*のテキストです。

\`\`\`javascript
function hello() {
    console.log('Hello, Taxonom!')
}
\`\`\`
`)

const parsedMarkdown = computed(() => {
  return Taxonom.parse(markdown.value, { highlightCode: true })
})
</script>
```

### Nuxt.js での使用

```javascript
// nuxt.config.js
export default defineNuxtConfig({
  css: [
    '@osaxyz/taxonom-style'
  ]
})
```

```vue
<template>
  <article v-html="content"></article>
</template>

<script setup>
import { Taxonom } from '@osaxyz/taxonom'

const props = defineProps({
  markdown: String
})

const content = computed(() => {
  return Taxonom.parse(props.markdown, { highlightCode: true })
})
</script>
```

## サポートされているマークダウン記法

| 記法 | 出力 | data属性 |
|------|------|----------|
| `# 見出し` | `<h2 data-taxonom-h1>` | `data-taxonom-h1` ~ `h6` |
| `**太字**` | `<strong data-taxonom-bold>` | `data-taxonom-bold` |
| `*斜体*` | `<em data-taxonom-italic>` | `data-taxonom-italic` |
| `` `コード` `` | `<code data-taxonom-code>` | `data-taxonom-code` |
| `![画像](url)` | `<img data-taxonom-img>` | `data-taxonom-img` |
| `[リンク](url)` | `<a data-taxonom-link>` | `data-taxonom-link` |
| `> 引用` | `<blockquote data-taxonom-blockquote>` | `data-taxonom-blockquote` |
| `- リスト` | `<ul data-taxonom-ul>` | `data-taxonom-ul` |
| `1. 番号リスト` | `<ol data-taxonom-ol>` | `data-taxonom-ol` |
| `---` | `<hr data-taxonom-hr>` | `data-taxonom-hr` |

### コードブロック & シンタックスハイライト

````markdown
```javascript
function greet(name) {
    console.log(`Hello, ${name}!`)
}
```
````

⬇️

```html
<pre data-taxonom-codeblock data-taxonom-language="javascript">
  <code class="language-javascript">
    <!-- highlight.jsによる美しいシンタックスハイライト -->
  </code>
</pre>
```

## 設定のカスタマイズ

HTML要素のマッピングをカスタマイズできます：

```javascript
import { Taxonom } from '@osaxyz/taxonom'

// カスタム設定
Taxonom.initialize({
  h1: 'h1',        // デフォルトは 'h2'
  h2: 'h2',        // デフォルトは 'h3'
  bold: 'b',       // デフォルトは 'strong'
  italic: 'i'      // デフォルトは 'em'
})

const html = Taxonom.parse(markdown, { highlightCode: true })
```

## CSS テーマのカスタマイズ

CSS変数でテーマをカスタマイズできます：

```css
:root {
  /* プライマリカラー */
  --color-primary: #your-color;
  --color-primary-50: #your-color-light;
  --color-primary-600: #your-color-dark;
  
  /* グレースケール */
  --color-gray-50: #your-gray-light;
  --color-gray-700: #your-gray-dark;
  --color-gray-900: #your-gray-darkest;
}
```

## 開発者向けセットアップ

### 要件

- Node.js v16以上
- npm v8以上

### 初期セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/artouc/taxonom.git
cd taxonom

# セットアップスクリプトを実行
./scripts/run.sh setup
```

## 開発者向けコマンド

```bash
# 開発サーバー起動（playground）
./scripts/run.sh dev

# パーサーの開発モード
./scripts/run.sh dev:parser

# スタイルの開発モード
./scripts/run.sh dev:style

# 全パッケージをビルド
./scripts/run.sh build

# テスト実行
./scripts/run.sh test

# 型チェック
./scripts/run.sh typecheck

# クリーンアップ
./scripts/run.sh clean
```

## プロジェクト構造

```
taxonom/
├── README.md                      # このファイル
├── CLAUDE.md                      # 開発ルール・規約
├── BLUEPRINT.md                   # プロジェクト仕様
├── scripts/
│   └── run.sh                     # 開発用スクリプト
├── taxonom/                       # メインパーサーパッケージ
│   ├── src/
│   │   ├── index.ts               # API エクスポート
│   │   ├── parser.ts              # パーサー実装
│   │   └── types.ts               # 型定義
│   ├── dist/                      # ビルド出力
│   └── package.json
├── taxonom-style/                 # スタイルパッケージ
│   ├── src/
│   │   └── index.sass             # メインスタイル
│   ├── dist/
│   │   └── index.css              # ビルド出力
│   └── package.json
├── playground/                     # デモアプリケーション
│   ├── src/
│   │   └── components/
│   │       └── TaxonomDemo.vue    # デモコンポーネント
│   └── package.json
└── llm/                           # AI作業管理
    ├── context.yaml               # プロジェクトコンテキスト
    └── history/                   # 開発履歴
```

## ロードマップ

### 実装済み ✅
- [x] 基本マークダウン記法（見出し、太字、斜体、コード）
- [x] リスト機能（ul/ol/li）
- [x] リンク・画像・ブロッククォート
- [x] シンタックスハイライト（highlight.js統合）
- [x] data-taxonom属性システム
- [x] NPMパッケージ公開

### 予定 🚧
- [ ] テーブル機能（table/thead/tbody/tr/th/td）
- [ ] ネストしたリスト対応
- [ ] カスタムレンダラー機能
- [ ] パフォーマンス最適化
- [ ] プラグインシステム

## 貢献

プルリクエストや Issue を歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ライセンス

**@osaxyz カスタムライセンス** - 詳細は [LICENSE](LICENSE) ファイルを参照

### 利用に関する重要な注意事項

**非営利利用の場合:**
- インストール・使用・改変: ✅ 許可
- 再配布: ❌ 禁止

**営利利用の場合:**
- 事前に著作権者（大内あら生）への許可取得が必要です
- 許可条件には使用料の支払いも含まれる場合があります

**著作権者の権利:**
- 本ソフトウェアが組み込まれたプロダクトについて、著作権者はいつでも利用の差し止めを要求する権利を有します
- 利用者は差し止め要求に72時間以内に応じる義務があります

営利利用に関するお問い合わせ: noreply@osaxyz.com

## 関連リンク

- [NPM: @osaxyz/taxonom](https://www.npmjs.com/package/@osaxyz/taxonom)
- [NPM: @osaxyz/taxonom-style](https://www.npmjs.com/package/@osaxyz/taxonom-style)
- [ライブデモ](https://taxonom.osa.xyz)
- [highlight.js](https://highlightjs.org/)

---

Made with ❤️ by [大内あら生 (Ouchi Arata)](https://osa.xyz)