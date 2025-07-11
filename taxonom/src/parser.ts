import { TaxonomConfig, ParseOptions, ParseResult, MarkdownToken } from './types'

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

            // 通常のテキスト
            if (line.trim()) {
                tokens.push({
                    type: 'paragraph',
                    content: line
                })
            }
        }

        return tokens
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
                    return `<${this.config.codeBlock} data-taxonom-codeblock${languageDataAttr}><code${languageClass}>${this.escapeHtml(token.content)}</code></${this.config.codeBlock}>`
                
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
        // 太字の処理
        text = text.replace(/\*\*(.+?)\*\*/g, `<${this.config.bold} data-taxonom-bold>$1</${this.config.bold}>`)
        
        // 斜体の処理
        text = text.replace(/\*(.+?)\*/g, `<${this.config.italic} data-taxonom-italic>$1</${this.config.italic}>`)
        
        // インラインコードの処理
        text = text.replace(/`(.+?)`/g, `<${this.config.code} data-taxonom-code>$1</${this.config.code}>`)
        
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
}

export { TaxonomParser }