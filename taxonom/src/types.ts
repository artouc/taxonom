// Taxonomパーサーの型定義

export interface TaxonomConfig {
    h1?: string
    h2?: string
    h3?: string
    h4?: string
    h5?: string
    h6?: string
    hr?: string
    bold?: string
    italic?: string
    code?: string
    link?: string
    image?: string
    blockquote?: string
    list?: string
    listItem?: string
    table?: string
    tableHeader?: string
    tableRow?: string
    tableCell?: string
}

export interface ParseOptions {
    sanitize?: boolean
    allowHtml?: boolean
    breaks?: boolean
}

export interface ParseResult {
    html: string
    metadata?: Record<string, any>
}

export type MarkdownToken = {
    type: string
    content: string
    level?: number
    href?: string
    title?: string
    alt?: string
}