<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Taxonom, type TaxonomConfig } from '@osaxyz/taxonom'

// リアクティブなデータ
const markdown_input = ref(`# Taxonom デモ

このデモでは、**Taxonom**の基本機能を体験できます。

## 機能一覧

- **見出し** (H1〜H6)
- **太字** と *斜体*
- \`Inline Code\`
- 水平線

---

## サンプルテキスト

左のエディタでマークダウンを編集すると、右側にリアルタイムでHTMLが表示されます。

### 設定のカスタマイズ

上の設定パネルで、マークダウン記法とHTML要素のマッピングを変更できます。`)

const config = ref<TaxonomConfig>({
    h1: 'h2',
    h2: 'h3',
    h3: 'h4',
    h4: 'h5',
    h5: 'h6',
    h6: 'h6',
    hr: 'hr',
    bold: 'strong',
    italic: 'em',
    code: 'code',
    codeBlock: 'pre',
    link: 'a',
    image: 'img',
    blockquote: 'blockquote',
    list: 'ul',
    orderedList: 'ol',
    listItem: 'li'
})

// 計算プロパティ
const parsed_html = computed(() => {
    try {
        Taxonom.initialize(config.value)
        return Taxonom.parse(markdown_input.value, { highlightCode: true })
    } catch (error) {
        return `<p style="color: red;">エラー: ${error}</p>`
    }
})

const formatted_html = computed(() => {
    return parsed_html.value
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>')
})

// ライフサイクル
onMounted(() => {
    Taxonom.initialize(config.value)
})

// NOTE: 設定値を更新する関数
const updateConfigValue = (key: string, value: string): void => {
    const typedKey = key as keyof TaxonomConfig
    config.value[typedKey] = value as any
}

// NOTE: 設定をデフォルトに戻す
const resetConfig = (): void => {
    config.value = {
        h1: 'h2',
        h2: 'h3', 
        h3: 'h4',
        h4: 'h5',
        h5: 'h6',
        h6: 'h6',
        hr: 'hr',
        bold: 'strong',
        italic: 'em',
        code: 'code',
        codeBlock: 'pre',
        link: 'a',
        image: 'img',
        blockquote: 'blockquote',
        list: 'ul',
        orderedList: 'ol',
        listItem: 'li'
    }
}

// NOTE: サンプルマークダウンをロード
const loadSample = (): void => {
    markdown_input.value = `# サンプル記事

これは**Taxonom**を使用したマークダウンパーサーのデモです。

## 基本的な記法

### 見出し
# H1見出し
## H2見出し
### H3見出し

### テキスト装飾
- **太字テキスト**
- *斜体テキスト*
- \`Inline Code\`

### リスト機能

#### 無序リスト
- アイテム1
- アイテム2
- アイテム3

#### 順序付きリスト
1. 第一項目
2. 第二項目
3. 第三項目

### リンクと画像

- [公式サイト](https://osa.xyz)
- [Vue.js](https://vuejs.org)
- ![Dummy Image](https://placehold.jp/150x150.png)

### ブロッククォート

> これはブロッククォートの例です。
> **重要な情報**や*強調*したい内容を表示できます。

### コードブロック

\`\`\`javascript
function greet(name) {
    console.log('Hello, ' + name + '!');
    return 'Welcome to Taxonom';
}

greet('Vue.js');
\`\`\`

\`\`\`typescript
interface User {
    id: number;
    name: string;
    email: string;
}

const user: User = {
    id: 1,
    name: 'Taxonom User',
    email: 'user@example.com'
};
\`\`\`

### 水平線
---

### 複雑な例

**太字の中に*斜体*を含む**例や、\`console.log('Hello World')\`のような
インラインコードとコードブロックを組み合わせた表現も可能です。

#### 新機能の組み合わせ

1. **リスト**に[リンク](https://example.com)を含める
2. *斜体*と**太字**を組み合わせたテキスト
3. ブロッククォート内でコード例を参照

> 全ての機能が**統合的**に動作し、\`data-taxonom-*\`属性で簡単にスタイリング可能です。`
}
</script>

<template lang="pug">
.p-demo
    .p-demo__controls
        .c-controls
            button.c-controls__button.c-controls__button--primary(
                @click="loadSample"
            ) サンプルロード
            button.c-controls__button(
                @click="resetConfig"
            ) 設定リセット
    
    .p-demo__config
        .c-config
            h3.c-config__title 設定パネル
            .c-config__grid
                .c-config__item(
                    v-for="(value, key) in config"
                    :key="key"
                )
                    label.c-config__label {{ key }}
                    input.c-config__input(
                        :value="config[key]"
                        @input="(event) => updateConfigValue(key, event.target.value)"
                        type="text"
                        :placeholder="String(value)"
                    )
    
    .p-demo__editor
        .c-editor
            h3.c-editor__title マークダウン入力
            textarea.c-editor__textarea(
                v-model="markdown_input"
                placeholder="ここにマークダウンを入力してください..."
            )
            
            
        .c-editor
            h3.c-editor__title 生成されたHTML
            pre.c-editor__code(v-html="formatted_html")
        .c-editor
            h3.c-editor__title プレビュー
            .c-editor__preview(v-html="parsed_html")
</template>

<style scoped lang="sass">
@use "@osaxyz/universtyle" as osa
@use "@osaxyz/mediaquery" as *

.p-demo
    &__controls
        margin-bottom: osa.fibo(3)
        
    &__config
        margin-bottom: osa.fibo(3)
        
    &__editor
        display: grid
        grid-template-columns: 1fr 1fr 1fr
        gap: osa.fibo(0)
        
        @media (max-width: 1024px)
            grid-template-columns: 1fr
            gap: osa.fibo(3)

.c-controls
    display: flex
    gap: osa.fibo(1)
    flex-wrap: wrap
    
    &__button
        padding: osa.fibo(0) osa.fibo(1)
        border: 2px solid var(--color-gray-300, #d1d5db)
        background: white
        border-radius: 4px
        cursor: pointer
        font-size: osa.harmonic(-1)
        transition: all 0.2s ease
        
        &:hover
            border-color: var(--color-primary, #2563eb)
            background: var(--color-primary-50, #eff6ff)
            
        &--primary
            background: var(--color-primary, #2563eb)
            color: white
            border-color: var(--color-primary, #2563eb)
            
            &:hover
                background: var(--color-primary-600, #1d4ed8)

.c-config
    padding: osa.fibo(2)
    border: 2px solid var(--color-gray-200, #e5e7eb)
    border-radius: 8px
    background: var(--color-gray-50, #f9fafb)
    
    &__title
        margin: 0
        margin-bottom: osa.fibo(2)
        font-size: osa.harmonic(1)
        
    &__grid
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
        gap: osa.fibo(1)
        
    &__item
        display: flex
        flex-direction: column
        gap: osa.fibo(-1)
        
    &__label
        font-size: osa.harmonic(-1)
        font-weight: 600
        color: var(--color-gray-700, #374151)
        
    &__input
        padding: osa.fibo(-1) osa.fibo(0)
        border: 1px solid var(--color-gray-300, #d1d5db)
        border-radius: 4px
        font-size: osa.harmonic(-1)
        
        &:focus
            outline: none
            border-color: var(--color-primary, #2563eb)
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1)

.c-editor
    display: flex
    flex-direction: column
    min-height: 1000px
    @include mq(iPadPro)
        min-height: 500px
    @include mq(iPad)
        min-height: 300px
        
    &__title
        margin: 0
        margin-bottom: osa.fibo(1)
        font-size: osa.harmonic(0)
        color: var(--color-gray-700, #374151)
        
    &__textarea
        flex: 1
        padding: osa.fibo(1)
        border: 2px solid var(--color-gray-300, #d1d5db)
        border-radius: 6px
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace
        font-size: osa.harmonic(-1)
        line-height: 1.5
        resize: vertical
        
        &:focus
            outline: none
            border-color: var(--color-primary, #2563eb)
            
    &__preview
        flex: 1
        padding: osa.fibo(1)
        border: 2px solid var(--color-gray-300, #d1d5db)
        border-radius: 6px
        background: white
        overflow-y: auto
        line-height: 1.6
        resize: vertical
        
        // NOTE: スタイルは@osaxyz/taxonom-styleパッケージで提供
        
    &__code
        flex: 1
        padding: osa.fibo(1)
        border: 2px solid var(--color-gray-300, #d1d5db)
        border-radius: 6px
        background: var(--color-gray-900, #111827)
        color: var(--color-green-400, #4ade80)
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace
        font-size: osa.harmonic(-2)
        line-height: 1.4
        overflow-y: auto
        white-space: pre-wrap
        margin: 0
        resize: vertical
</style>