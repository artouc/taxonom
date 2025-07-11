# @osaxyz/taxonom-style

Taxonomパーサー用のデフォルトスタイルパッケージ（data-taxonom属性専用）

## 特徴

- **データ属性のみサポート**: `data-taxonom-*` 属性に特化した設計
- **ヘッドレス対応**: 既存のHTMLタグスタイルと競合しない
- **カスタマイズ可能**: CSS変数による柔軟なテーマ変更
- **軽量**: データ属性のみに絞った最小限のCSS

## インストール

```bash
npm install @osaxyz/taxonom-style
```

## 使用方法

### Vue.js プロジェクトでの使用

#### 1. main.js/main.ts でインポート（推奨）

```javascript
// src/main.js または src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import '@osaxyz/taxonom-style'  // スタイルをインポート

createApp(App).mount('#app')
```

#### 2. コンポーネント内でインポート

```vue
<template>
  <div v-html="parsedMarkdown"></div>
</template>

<script setup>
import { Taxonom } from '@osaxyz/taxonom'
import '@osaxyz/taxonom-style'  // このコンポーネントで使用

const parsedMarkdown = Taxonom.parse('# 見出し\n段落テキスト')
</script>
```

### Nuxt.js プロジェクトでの使用

#### 1. nuxt.config.js/ts での設定（推奨）

```javascript
// nuxt.config.js または nuxt.config.ts
export default defineNuxtConfig({
  css: [
    '@osaxyz/taxonom-style'  // グローバルにスタイルを適用
  ]
})
```

#### 2. plugins/ ディレクトリでの設定

```javascript
// plugins/taxonom-style.client.js
import '@osaxyz/taxonom-style'
```

#### 3. コンポーネント内での使用

```vue
<template>
  <div v-html="parsedContent"></div>
</template>

<script setup>
import { Taxonom } from '@osaxyz/taxonom'

const parsedContent = Taxonom.parse(props.markdown)
</script>
```

### その他の環境

#### HTML直接読み込み

```html
<link rel="stylesheet" href="node_modules/@osaxyz/taxonom-style/dist/index.css">
```

#### CSS ファイル内

```css
@import '@osaxyz/taxonom-style';
```

## 対応するdata-taxonom属性

| 属性 | 説明 |
|------|------|
| `[data-taxonom-h1]` ~ `[data-taxonom-h6]` | 見出し（H1〜H6） |
| `[data-taxonom-p]` | 段落 |
| `[data-taxonom-bold]` | 太字 |
| `[data-taxonom-italic]` | 斜体 |
| `[data-taxonom-code]` | インラインコード |
| `[data-taxonom-codeblock]` | コードブロック |
| `[data-taxonom-hr]` | 水平線 |
| `[data-taxonom-ul]` | 順序なしリスト |
| `[data-taxonom-ol]` | 順序付きリスト |
| `[data-taxonom-li]` | リストアイテム |
| `[data-taxonom-link]` | リンク |
| `[data-taxonom-img]` | 画像 |
| `[data-taxonom-blockquote]` | ブロッククォート |

## 使用例

```html
<!-- Taxonomパーサーが生成するHTML -->
<h2 data-taxonom-h1>メイン見出し</h2>
<p data-taxonom-p>これは段落テキストです。</p>
<strong data-taxonom-bold>太字テキスト</strong>
<em data-taxonom-italic>斜体テキスト</em>
<code data-taxonom-code>インラインコード</code>
<ul data-taxonom-ul>
  <li data-taxonom-li>リストアイテム1</li>
  <li data-taxonom-li>リストアイテム2</li>
</ul>
```

## カスタマイズ

CSS変数を使用してカラーテーマをカスタマイズできます：

```css
:root {
  /* プライマリカラー */
  --color-primary: #your-primary-color;
  --color-primary-50: #your-primary-light;
  --color-primary-600: #your-primary-dark;
  
  /* グレーカラー */
  --color-gray-50: #your-gray-light;
  --color-gray-100: #your-gray-100;
  --color-gray-300: #your-gray-300;
  --color-gray-700: #your-gray-700;
  --color-gray-800: #your-gray-800;
  --color-gray-900: #your-gray-dark;
}
```

## デザイン思想

このパッケージは**データ属性のみ**に特化することで：

- 🎯 **競合回避**: 既存サイトのHTMLタグスタイルと競合しない
- 🔧 **柔軟性**: 既存のCSSフレームワークと共存可能
- 🎨 **制御性**: Taxonom生成コンテンツのみをスタイリング
- 📦 **軽量性**: 必要最小限のCSSで高性能

## Taxonomパーサーとの連携

[@osaxyz/taxonom](https://npmjs.com/package/@osaxyz/taxonom) パーサーと組み合わせて使用します。

### Vue.js での実装例

```vue
<template>
  <div class="markdown-content">
    <div v-html="parsedMarkdown"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Taxonom } from '@osaxyz/taxonom'

const markdown = ref(`
# メイン見出し

これは**太字**で*斜体*のテキストです。

## リスト例
- アイテム1
- アイテム2

> これはブロッククォートです。
`)

const parsedMarkdown = computed(() => {
  return Taxonom.parse(markdown.value)
})
</script>
```

### Nuxt.js での実装例

```vue
<template>
  <article class="post-content">
    <div v-html="content"></div>
  </article>
</template>

<script setup>
import { Taxonom } from '@osaxyz/taxonom'

const props = defineProps({
  markdown: {
    type: String,
    required: true
  }
})

const content = computed(() => {
  return Taxonom.parse(props.markdown)
})
</script>
```

### 生成されるHTML例

上記のマークダウンが以下のHTMLに変換されます：

```html
<h2 data-taxonom-h1>メイン見出し</h2>
<p data-taxonom-p>これは<strong data-taxonom-bold>太字</strong>で<em data-taxonom-italic>斜体</em>のテキストです。</p>
<h3 data-taxonom-h2>リスト例</h3>
<ul data-taxonom-ul>
  <li data-taxonom-li>アイテム1</li>
  <li data-taxonom-li>アイテム2</li>
</ul>
<blockquote data-taxonom-blockquote>これはブロッククォートです。</blockquote>
```

## ライセンス

MIT