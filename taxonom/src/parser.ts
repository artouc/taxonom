import { TaxonomConfig, ParseOptions, ParseResult, MarkdownToken } from './types'
import hljs from 'highlight.js'

class TaxonomParser {
    private config: TaxonomConfig
    
    constructor(config: TaxonomConfig = {}) {
        // デフォルト設定
        this.config = {
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
            listItem: 'li',
            table: 'table',
            tableHeader: 'th',
            tableRow: 'tr',
            tableCell: 'td',
            ...config
        }
    }

    // NOTE: 設定を更新する関数
    updateConfig(newConfig: Partial<TaxonomConfig>): void {
        this.config = { ...this.config, ...newConfig }
    }

    // NOTE: マークダウンをパースしてHTMLに変換
    parse(markdown: string, options: ParseOptions = {}): ParseResult {
        const tokens = this.tokenize(markdown)
        const html = this.tokensToHtml(tokens, options)
        
        return {
            html,
            metadata: {
                tokenCount: tokens.length,
                config: this.config
            }
        }
    }

    // NOTE: マークダウンをトークンに分解
    private tokenize(markdown: string): MarkdownToken[] {
        const tokens: MarkdownToken[] = []
        const lines = markdown.split('\n')

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            
            // コードブロックの開始
            const codeBlockMatch = line.match(/^```(\w*)/)
            if (codeBlockMatch) {
                const language = codeBlockMatch[1] || ''
                const codeLines: string[] = []
                
                // コードブロックの終了まで読み取り
                i++
                while (i < lines.length && !lines[i].match(/^```$/)) {
                    codeLines.push(lines[i])
                    i++
                }
                
                tokens.push({
                    type: 'codeBlock',
                    content: codeLines.join('\n'),
                    language
                })
                continue
            }
            
            // 見出しの処理
            const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
            if (headingMatch) {
                tokens.push({
                    type: 'heading',
                    content: headingMatch[2],
                    level: headingMatch[1].length
                })
                continue
            }

            // 水平線の処理
            if (line.match(/^---+$/)) {
                tokens.push({
                    type: 'hr',
                    content: ''
                })
                continue
            }

            // ブロッククォートの処理
            const blockquoteMatch = line.match(/^>\s*(.*)$/)
            if (blockquoteMatch) {
                tokens.push({
                    type: 'blockquote',
                    content: blockquoteMatch[1]
                })
                continue
            }

            // リストアイテムの処理
            const unorderedListMatch = line.match(/^[\s]*[-*+]\s+(.+)$/)
            const orderedListMatch = line.match(/^[\s]*(\d+)\.\s+(.+)$/)
            
            if (unorderedListMatch || orderedListMatch) {
                const content = unorderedListMatch ? unorderedListMatch[1] : orderedListMatch![2]
                const isOrdered = !!orderedListMatch
                const indent = line.match(/^(\s*)/)?.[1]?.length || 0
                
                tokens.push({
                    type: 'listItem',
                    content,
                    ordered: isOrdered,
                    level: Math.floor(indent / 2)
                })
                continue
            }

            // 通常のテキスト
            if (line.trim()) {
                tokens.push({
                    type: 'paragraph',
                    content: line
                })
            }
        }

        return this.processListGroups(tokens)
    }

    // NOTE: リストアイテムをグループ化
    private processListGroups(tokens: MarkdownToken[]): MarkdownToken[] {
        const result: MarkdownToken[] = []
        let i = 0
        
        while (i < tokens.length) {
            const token = tokens[i]
            
            if (token.type === 'listItem') {
                const listItems: MarkdownToken[] = []
                const isOrdered = token.ordered
                
                // 連続するリストアイテムを収集
                while (i < tokens.length && tokens[i].type === 'listItem' && tokens[i].ordered === isOrdered) {
                    listItems.push(tokens[i])
                    i++
                }
                
                result.push({
                    type: 'list',
                    content: '',
                    ordered: isOrdered,
                    items: listItems
                })
            } else {
                result.push(token)
                i++
            }
        }
        
        return result
    }

    // NOTE: トークンをHTMLに変換
    private tokensToHtml(tokens: MarkdownToken[], options: ParseOptions): string {
        return tokens.map(token => {
            switch (token.type) {
                case 'heading':
                    const headingTag = this.getHeadingTag(token.level || 1)
                    const headingDataAttr = `data-taxonom-h${token.level || 1}`
                    return `<${headingTag} ${headingDataAttr}>${this.processInlineElements(token.content)}</${headingTag}>`
                
                case 'hr':
                    return `<${this.config.hr} data-taxonom-hr />`
                
                case 'codeBlock':
                    const languageClass = token.language ? ` class="language-${token.language}"` : ''
                    const languageDataAttr = token.language ? ` data-taxonom-language="${token.language}"` : ''
                    const codeContent = this.highlightCode(token.content, token.language, options)
                    return `<${this.config.codeBlock} data-taxonom-codeblock${languageDataAttr}><code${languageClass}>${codeContent}</code></${this.config.codeBlock}>`
                
                case 'blockquote':
                    return `<${this.config.blockquote} data-taxonom-blockquote>${this.processInlineElements(token.content)}</${this.config.blockquote}>`
                
                case 'list':
                    const listTag = token.ordered ? this.config.orderedList : this.config.list
                    const listDataAttr = token.ordered ? 'data-taxonom-ol' : 'data-taxonom-ul'
                    const listItems = token.items?.map(item => 
                        `<${this.config.listItem} data-taxonom-li>${this.processInlineElements(item.content)}</${this.config.listItem}>`
                    ).join('\n') || ''
                    return `<${listTag} ${listDataAttr}>\n${listItems}\n</${listTag}>`
                
                case 'paragraph':
                    return `<p data-taxonom-p>${this.processInlineElements(token.content)}</p>`
                
                default:
                    return token.content
            }
        }).join('\n')
    }

    // NOTE: 見出しレベルに応じたHTMLタグを取得
    private getHeadingTag(level: number): string {
        const tagMap: Record<number, keyof TaxonomConfig> = {
            1: 'h1',
            2: 'h2', 
            3: 'h3',
            4: 'h4',
            5: 'h5',
            6: 'h6'
        }
        return this.config[tagMap[level]] || 'h6'
    }

    // NOTE: インライン要素（太字、斜体など）を処理
    private processInlineElements(text: string): string {
        // インラインコードの処理（最優先で処理）
        text = text.replace(/`(.+?)`/g, `<${this.config.code} data-taxonom-code>$1</${this.config.code}>`)
        
        // 太字の処理（斜体より先に処理）
        text = text.replace(/\*\*(.+?)\*\*/g, `<${this.config.bold} data-taxonom-bold>$1</${this.config.bold}>`)
        
        // 斜体の処理
        text = text.replace(/\*(.+?)\*/g, `<${this.config.italic} data-taxonom-italic>$1</${this.config.italic}>`)
        
        // 画像の処理（リンクより先に処理）
        text = text.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, (match, alt, src) => {
            return `<${this.config.image} data-taxonom-img src="${src}" alt="${alt}" />`
        })
        
        // リンクの処理
        text = text.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (match, linkText, href) => {
            return `<${this.config.link} data-taxonom-link href="${href}">${linkText}</${this.config.link}>`
        })
        
        return text
    }

    // NOTE: HTMLエスケープ処理
    private escapeHtml(text: string): string {
        const htmlEscapes: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }
        
        return text.replace(/[&<>"']/g, char => htmlEscapes[char])
    }

    // NOTE: コードのシンタックスハイライト処理
    private highlightCode(code: string, language?: string, options: ParseOptions = {}): string {
        // ハイライトが無効化されている場合はエスケープのみ
        if (options.highlightCode === false) {
            return this.escapeHtml(code)
        }

        try {
            if (language && hljs.getLanguage(language)) {
                // 指定された言語でハイライト
                const highlighted = hljs.highlight(code, { language })
                return highlighted.value
            } else {
                // 言語自動検出
                const highlighted = hljs.highlightAuto(code)
                return highlighted.value
            }
        } catch (error) {
            // ハイライトに失敗した場合はエスケープのみ
            console.warn('Code highlighting failed:', error)
            return this.escapeHtml(code)
        }
    }
}

export { TaxonomParser }