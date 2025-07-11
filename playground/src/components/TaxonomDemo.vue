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
    "#": 'h2',
    "##": 'h3',
    "###": 'h4',
    "####": 'h5',
    "#####": 'h6',
    "######": 'h6',
    "---": 'hr',
    "**": 'strong',
    "*": 'em',
    "`": 'code',
    "```": 'pre'
})

const show_config = ref(true)

// 計算プロパティ
const parsed_html = computed(() => {
    try {
        Taxonom.initialize(config.value)
        return Taxonom.parse(markdown_input.value)
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

// NOTE: 設定をデフォルトに戻す
const resetConfig = (): void => {
    config.value = {
        "#": 'h2',
        "##": 'h3', 
        "###": 'h4',
        "####": 'h5',
        "#####": 'h6',
        "######": 'h6',
        "---": 'hr',
        "**": 'strong',
        "*": 'em',
        "`": 'code',
        "```": 'pre'
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
インラインコードとコードブロックを組み合わせた表現も可能です。`
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
                        v-model="config[key]"
                        type="text"
                        :placeholder="value"
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
        
        // プレビュー内のスタイル（データ属性セレクター）
        :deep([data-taxonom-h1])
            font-size: osa.harmonic(3)
            margin-top: osa.fibo(2)
            margin-bottom: osa.fibo(1)
            color: var(--color-gray-900, #111827)
            border-bottom: 2px solid var(--color-gray-300, #d1d5db)
            
        :deep([data-taxonom-h2])
            font-size: osa.harmonic(2)
            margin-top: osa.fibo(2)
            margin-bottom: osa.fibo(1)
            color: var(--color-gray-900, #111827)
            
        :deep([data-taxonom-h3])
            font-size: osa.harmonic(1)
            margin-top: osa.fibo(2)
            margin-bottom: osa.fibo(1)
            color: var(--color-gray-800, #1f2937)
            
        :deep([data-taxonom-h4])
            font-size: osa.harmonic(0)
            margin-top: osa.fibo(1)
            margin-bottom: osa.fibo(0)
            color: var(--color-gray-800, #1f2937)
            
        :deep([data-taxonom-h5])
            font-size: osa.harmonic(-1)
            margin-top: osa.fibo(1)
            margin-bottom: osa.fibo(0)
            color: var(--color-gray-800, #1f2937)
            
        :deep([data-taxonom-h6])
            font-size: osa.harmonic(-1)
            margin-top: osa.fibo(1)
            margin-bottom: osa.fibo(0)
            color: var(--color-gray-800, #1f2937)
            
        :deep([data-taxonom-p])
            margin-top: osa.fibo(1)
            margin-bottom: osa.fibo(1)
            color: var(--color-gray-700, #374151)
            line-height: 1.6
            
        :deep([data-taxonom-bold])
            font-weight: 700
            color: var(--color-gray-900, #111827)
            
        :deep([data-taxonom-italic])
            font-style: italic
            
        :deep([data-taxonom-code])
            padding: osa.fibo(-2) osa.fibo(-1)
            background: var(--color-gray-100, #f3f4f6)
            border-radius: 3px
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace
            font-size: 0.9em
            
        :deep([data-taxonom-hr])
            margin: osa.fibo(2) 0
            border: none
            border-top: 2px solid var(--color-gray-300, #d1d5db)
            
        :deep([data-taxonom-codeblock])
            margin: osa.fibo(2) 0
            padding: osa.fibo(1)
            background: var(--color-gray-900, #111827)
            border-radius: 6px
            overflow-x: auto
            
            code
                display: block
                color: var(--color-green-400, #4ade80)
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace
                font-size: osa.harmonic(-1)
                line-height: 1.5
                background: none
                padding: 0
                border-radius: 0
        
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