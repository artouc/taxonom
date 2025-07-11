# @osaxyz/taxonom

高速なマークダウンパーサー for Vue.js / Nuxt.js

[![npm version](https://badge.fury.io/js/@osaxyz%2Ftaxonom.svg)](https://badge.fury.io/js/@osaxyz%2Ftaxonom)
[![npm downloads](https://img.shields.io/npm/dm/@osaxyz/taxonom.svg)](https://www.npmjs.com/package/@osaxyz/taxonom)
[![License: Custom](https://img.shields.io/badge/License-@osaxyz%20Custom-blue.svg)](./LICENSE)

## 概要

**@osaxyz/taxonom** は Vue.js / Nuxt.js 向けに設計された高速マークダウンパーサーです。ヘッドレス設計により既存のCSSフレームワークと競合せず、`data-taxonom-*` 属性によるターゲット指定でスタイリングできます。

## 特徴

- 🚀 **高速パフォーマンス**: 軽量で高速な処理エンジン
- 🎯 **ヘッドレス設計**: 既存のCSSと競合しない設計
- 🔧 **高い柔軟性**: HTML要素のマッピングをカスタマイズ可能
- 💎 **シンタックスハイライト**: highlight.js統合による美しいコード表示
- 📱 **Vue.js / Nuxt.js 最適化**: フレームワーク特化設計
- 🎨 **data属性システム**: `data-taxonom-*` による明確なスタイリング
- 📦 **TypeScript完全対応**: 型安全な開発体験
- 🛡️ **安全性**: XSS対策のHTMLエスケープ機能

## インストール

```bash
npm install @osaxyz/taxonom
```

### スタイルパッケージ（オプション）

```bash
npm install @osaxyz/taxonom-style
```

## クイックスタート

### 基本的な使用

```javascript
import { Taxonom } from '@osaxyz/taxonom'

// パーサーを初期化
Taxonom.initialize()

// マークダウンをHTMLに変換
const html = Taxonom.parse(`
# Hello Taxonom

これは**太字**で*斜体*のテキストです。

\`\`\`javascript
function hello() {
    console.log('Hello, Taxonom!')
}
\`\`\`
`)

console.log(html)
```

### Vue.js での使用

```vue
<template>
  <div v-html="parsedMarkdown"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Taxonom } from '@osaxyz/taxonom'

const markdown = ref(`
# Vue.js Example

- **リスト項目1**
- *リスト項目2*
- \`inline code\`

> これはブロッククォートです
`)

const parsedMarkdown = computed(() => {
  return Taxonom.parse(markdown.value, { highlightCode: true })
})
</script>
```

### Nuxt.js での使用

```vue
<template>
  <article class="content">
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
  return Taxonom.parse(props.markdown, { highlightCode: true })
})
</script>
```

## API リファレンス

### Taxonom.initialize(config?)

パーサーを初期化します。

```javascript
import { Taxonom } from '@osaxyz/taxonom'

Taxonom.initialize({
  h1: 'h1',        // デフォルト: 'h2'
  h2: 'h2',        // デフォルト: 'h3'
  bold: 'strong',  // デフォルト: 'strong'
  italic: 'em',    // デフォルト: 'em'
  code: 'code',    // デフォルト: 'code'
  // その他の設定...
})
```

### Taxonom.parse(markdown, options?)

マークダウンをHTMLに変換します。

```javascript
const html = Taxonom.parse(markdown, {
  highlightCode: true,  // シンタックスハイライトを有効化
  sanitize: true,       // HTML サニタイズ
  allowHtml: false,     // 生HTMLの許可
  breaks: false         // 改行の処理
})
```

### Taxonom.parseWithMetadata(markdown, options?)

詳細なメタデータ付きで変換します。

```javascript
const result = Taxonom.parseWithMetadata(markdown, options)
console.log(result.html)       // 生成されたHTML
console.log(result.metadata)   // トークン数、設定情報など
```

### Taxonom.updateConfig(config)

実行時に設定を更新します。

```javascript
Taxonom.updateConfig({
  h1: 'h1',
  h2: 'h2'
})
```

### Taxonom.createParser(config?)

新しいパーサーインスタンスを作成します。

```javascript
const parser = Taxonom.createParser({
  h1: 'h1',
  bold: 'b'
})

const html = parser.parse(markdown)
```

## 設定オプション

### TaxonomConfig

HTML要素のマッピングを設定します。

```typescript
interface TaxonomConfig {
  h1?: string          // デフォルト: 'h2'
  h2?: string          // デフォルト: 'h3'
  h3?: string          // デフォルト: 'h4'
  h4?: string          // デフォルト: 'h5'
  h5?: string          // デフォルト: 'h6'
  h6?: string          // デフォルト: 'h6'
  hr?: string          // デフォルト: 'hr'
  bold?: string        // デフォルト: 'strong'
  italic?: string      // デフォルト: 'em'
  code?: string        // デフォルト: 'code'
  codeBlock?: string   // デフォルト: 'pre'
  link?: string        // デフォルト: 'a'
  image?: string       // デフォルト: 'img'
  blockquote?: string  // デフォルト: 'blockquote'
  list?: string        // デフォルト: 'ul'
  orderedList?: string // デフォルト: 'ol'
  listItem?: string    // デフォルト: 'li'
}
```

### ParseOptions

パース処理のオプションを設定します。

```typescript
interface ParseOptions {
  sanitize?: boolean      // HTMLサニタイズ（デフォルト: false）
  allowHtml?: boolean     // 生HTML許可（デフォルト: false）
  breaks?: boolean        // 改行処理（デフォルト: false）
  highlightCode?: boolean // シンタックスハイライト（デフォルト: true）
}
```

## サポートされているマークダウン記法

### 見出し

```markdown
# H1見出し
## H2見出し
### H3見出し
#### H4見出し
##### H5見出し
###### H6見出し
```

⬇️

```html
<h2 data-taxonom-h1>H1見出し</h2>
<h3 data-taxonom-h2>H2見出し</h3>
<h4 data-taxonom-h3>H3見出し</h4>
<h5 data-taxonom-h4>H4見出し</h5>
<h6 data-taxonom-h5>H5見出し</h6>
<h6 data-taxonom-h6>H6見出し</h6>
```

### テキスト装飾

```markdown
これは**太字**で*斜体*のテキストです。
\`inline code\` も使えます。
```

⬇️

```html
<p data-taxonom-p>これは<strong data-taxonom-bold>太字</strong>で<em data-taxonom-italic>斜体</em>のテキストです。</p>
<p data-taxonom-p><code data-taxonom-code>inline code</code> も使えます。</p>
```

### リスト

```markdown
- 無序リスト項目1
- 無序リスト項目2

1. 順序付きリスト項目1
2. 順序付きリスト項目2
```

⬇️

```html
<ul data-taxonom-ul>
  <li data-taxonom-li>無序リスト項目1</li>
  <li data-taxonom-li>無序リスト項目2</li>
</ul>

<ol data-taxonom-ol>
  <li data-taxonom-li>順序付きリスト項目1</li>
  <li data-taxonom-li>順序付きリスト項目2</li>
</ol>
```

### リンクと画像

```markdown
[リンクテキスト](https://example.com)
![画像の説明](https://example.com/image.jpg)
```

⬇️

```html
<a data-taxonom-link href="https://example.com">リンクテキスト</a>
<img data-taxonom-img src="https://example.com/image.jpg" alt="画像の説明" />
```

### ブロッククォート

```markdown
> これはブロッククォートです。
> 複数行も対応しています。
```

⬇️

```html
<blockquote data-taxonom-blockquote>これはブロッククォートです。</blockquote>
<blockquote data-taxonom-blockquote>複数行も対応しています。</blockquote>
```

### コードブロック & シンタックスハイライト

````markdown
```javascript
function greet(name) {
    console.log(`Hello, ${name}!`)
    return `Welcome to Taxonom`
}

greet('Vue.js')
```
````

⬇️

```html
<pre data-taxonom-codeblock data-taxonom-language="javascript">
  <code class="language-javascript">
    <!-- highlight.jsによる美しいシンタックスハイライト -->
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">greet</span>(<span class="hljs-params">name</span>) {</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Hello, <span class="hljs-subst">${name}</span>!`</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-string">`Welcome to Taxonom`</span>
    }
    
    greet(<span class="hljs-string">'Vue.js'</span>)
  </code>
</pre>
```

### 水平線

```markdown
---
```

⬇️

```html
<hr data-taxonom-hr />
```

## data-taxonom属性一覧

すべての生成されるHTML要素には対応する `data-taxonom-*` 属性が付与されます：

| 属性 | 対応要素 | 説明 |
|------|----------|------|
| `data-taxonom-h1` ~ `data-taxonom-h6` | 見出し | H1〜H6見出し |
| `data-taxonom-p` | 段落 | 段落テキスト |
| `data-taxonom-bold` | 太字 | **太字**テキスト |
| `data-taxonom-italic` | 斜体 | *斜体*テキスト |
| `data-taxonom-code` | インラインコード | `コード`テキスト |
| `data-taxonom-codeblock` | コードブロック | ```コードブロック``` |
| `data-taxonom-language="言語名"` | コードブロック | 言語指定 |
| `data-taxonom-hr` | 水平線 | --- |
| `data-taxonom-ul` | 無序リスト | - リスト |
| `data-taxonom-ol` | 順序付きリスト | 1. リスト |
| `data-taxonom-li` | リストアイテム | リスト項目 |
| `data-taxonom-link` | リンク | [リンク](URL) |
| `data-taxonom-img` | 画像 | ![画像](https://placehold.jp/50x50.png) |
| `data-taxonom-blockquote` | ブロッククォート | > 引用 |

## スタイルパッケージとの連携

[@osaxyz/taxonom-style](https://www.npmjs.com/package/@osaxyz/taxonom-style) と組み合わせることで、美しいデフォルトスタイルを即座に適用できます。

```bash
npm install @osaxyz/taxonom-style
```

```javascript
// Vue.js main.js
import '@osaxyz/taxonom-style'

// Nuxt.js nuxt.config.js
export default defineNuxtConfig({
  css: ['@osaxyz/taxonom-style']
})
```

## 高度な使用例

### カスタムパーサーインスタンス

```javascript
import { Taxonom } from '@osaxyz/taxonom'

// ブログ用パーサー
const blogParser = Taxonom.createParser({
  h1: 'h1',
  h2: 'h2',
  blockquote: 'aside'
})

// ドキュメント用パーサー
const docParser = Taxonom.createParser({
  h1: 'h2',
  h2: 'h3',
  code: 'kbd'
})

const blogHtml = blogParser.parse(blogMarkdown)
const docHtml = docParser.parse(docMarkdown)
```

### リアルタイムエディター

```vue
<template>
  <div class="editor">
    <textarea 
      v-model="markdown" 
      class="input"
      placeholder="マークダウンを入力..."
    />
    <div 
      class="preview" 
      v-html="previewHtml"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Taxonom } from '@osaxyz/taxonom'

const markdown = ref(`# リアルタイムエディター

**太字**や*斜体*がリアルタイムで反映されます。

\`\`\`javascript
const editor = new MarkdownEditor()
\`\`\`
`)

const previewHtml = computed(() => {
  return Taxonom.parse(markdown.value, { highlightCode: true })
})

onMounted(() => {
  Taxonom.initialize()
})
</script>
```

### 設定の動的変更

```vue
<template>
  <div>
    <div class="config">
      <label>
        H1要素:
        <select v-model="config.h1" @change="updateConfig">
          <option value="h1">h1</option>
          <option value="h2">h2</option>
          <option value="div">div</option>
        </select>
      </label>
    </div>
    <div v-html="parsedContent" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Taxonom } from '@osaxyz/taxonom'

const config = ref({
  h1: 'h2',
  h2: 'h3',
  bold: 'strong'
})

const markdown = ref('# 動的設定\n\nこれは**動的に変更**できます。')

const parsedContent = computed(() => {
  return Taxonom.parse(markdown.value)
})

const updateConfig = () => {
  Taxonom.updateConfig(config.value)
}
</script>
```

## パフォーマンス

### ベンチマーク

```javascript
// 1000行のマークダウンファイル（約50KB）
const largeMarkdown = generateLargeMarkdown(1000)

console.time('Taxonom Parse')
const html = Taxonom.parse(largeMarkdown, { highlightCode: true })
console.timeEnd('Taxonom Parse')
// 結果: ~15ms（ハイライト込み）
```

### 最適化のヒント

1. **パーサーの再利用**: 同じ設定なら `Taxonom.parse()` を繰り返し使用
2. **ハイライト制御**: 必要ない場合は `highlightCode: false`
3. **インスタンス分離**: 異なる設定は別インスタンスを作成

## トラブルシューティング

### よくある問題

**Q: シンタックスハイライトが表示されない**

A: highlight.jsが正しく読み込まれているか確認し、`highlightCode: true` オプションを設定してください。

```javascript
const html = Taxonom.parse(markdown, { highlightCode: true })
```

**Q: カスタムHTML要素が反映されない**

A: `Taxonom.initialize()` で設定を行ってから `parse()` を実行してください。

```javascript
Taxonom.initialize({ h1: 'h1' })
const html = Taxonom.parse(markdown)
```

**Q: Vue.js で v-html が更新されない**

A: computed プロパティを使用して、リアクティブな更新を確保してください。

```javascript
const parsedHtml = computed(() => Taxonom.parse(markdown.value))
```

## TypeScript サポート

完全なTypeScript型定義が含まれています：

```typescript
import { Taxonom, TaxonomConfig, ParseOptions, ParseResult } from '@osaxyz/taxonom'

const config: TaxonomConfig = {
  h1: 'h1',
  bold: 'b'
}

const options: ParseOptions = {
  highlightCode: true,
  sanitize: true
}

const result: ParseResult = Taxonom.parseWithMetadata(markdown, options)
```

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

営利利用に関するお問い合わせ: support@osa.xyz

## 関連パッケージ

- [@osaxyz/taxonom-style](https://www.npmjs.com/package/@osaxyz/taxonom-style) - デフォルトスタイルパッケージ
- [highlight.js](https://www.npmjs.com/package/highlight.js) - シンタックスハイライト（内部依存）

## リンク

- [GitHub Repository](https://github.com/artouc/taxonom)
- [NPM Package](https://www.npmjs.com/package/@osaxyz/taxonom)
- [Demo & Playground](https://taxonom.osa.xyz)

---

Made with ❤️ by [大内あら生 (Ouchi Arata)](https://osa.xyz)