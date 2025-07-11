import { TaxonomParser } from './parser'
import { TaxonomConfig, ParseOptions, ParseResult } from './types'

// NOTE: グローバルパーサーインスタンス
let globalParser: TaxonomParser | null = null

export const Taxonom = {
    // NOTE: パーサーを初期化
    initialize(config: TaxonomConfig = {}): void {
        globalParser = new TaxonomParser(config)
    },

    // NOTE: マークダウンをHTMLに変換
    parse(markdown: string, options: ParseOptions = {}): string {
        if (!globalParser) {
            // 初期化されていない場合はデフォルト設定で初期化
            this.initialize()
        }
        
        const result = globalParser!.parse(markdown, options)
        return result.html
    },

    // NOTE: 詳細な結果を取得
    parseWithMetadata(markdown: string, options: ParseOptions = {}): ParseResult {
        if (!globalParser) {
            this.initialize()
        }
        
        return globalParser!.parse(markdown, options)
    },

    // NOTE: 設定を更新
    updateConfig(config: Partial<TaxonomConfig>): void {
        if (!globalParser) {
            this.initialize(config)
        } else {
            globalParser.updateConfig(config)
        }
    },

    // NOTE: 新しいパーサーインスタンスを作成
    createParser(config: TaxonomConfig = {}): TaxonomParser {
        return new TaxonomParser(config)
    }
}

// 型定義をエクスポート
export type { TaxonomConfig, ParseOptions, ParseResult, MarkdownToken } from './types'
export { TaxonomParser }

// デフォルトエクスポート
export default Taxonom