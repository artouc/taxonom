# Taxonom

Vue.js向け高速マークダウンパーサー

## 概要

Taxonomは、Vue.js・Nuxt.jsアプリケーション向けの高速なマークダウンパーサーです。ヘッドレス設計により、スタイルはユーザーが自由に設定できます。

## 特徴

- 🚀 **高速**: 最適化されたパフォーマンス
- 🎨 **ヘッドレス**: スタイルは完全にカスタマイズ可能
- ⚙️ **設定可能**: マークダウン記法とHTML要素のマッピングを自由に設定
- 📦 **モノレポ**: パーサーとスタイルパッケージを分離
- 🔧 **Vue 3対応**: Composition APIに完全対応

## パッケージ構成

このプロジェクトはモノレポとして構成されています：

- **`@osaxyz/taxonom`**: メインのマークダウンパーサー
- **`@osaxyz/taxonom-style`**: デフォルトスタイル（オプション）
- **`playground`**: デモアプリケーション

## セットアップ

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

## 開発

### 利用可能なコマンド

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

### ディレクトリ構造

```
taxonom/
├── CLAUDE.md           # プロジェクト規約
├── BLUEPRINT.md        # 仕様書
├── README.md          # このファイル
├── package.json       # ワークスペース設定
├── .gitignore
├── scripts/
│   └── run.sh         # 管理スクリプト
├── llm/               # LLM作業管理
│   ├── context.yaml
│   ├── structure/
│   └── history/
├── taxonom/           # メインパーサー
│   ├── package.json
│   └── src/
├── taxonom-style/     # スタイルパッケージ  
│   ├── package.json
│   └── src/
└── playground/        # デモアプリ（Nuxt.js）
    ├── package.json
    └── src/
```

## 使用方法

### 基本的な使い方

```javascript
import { Taxonom } from '@osaxyz/taxonom'

// パーサーを初期化
Taxonom.initialize({
    h1: 'h2',  // #見出し → h2要素
    hr: 'hr',  // --- → hr要素
    // その他の設定...
})

// マークダウンをHTMLに変換
const html = Taxonom.parse('# Hello World\n\nThis is **bold** text.')
```

### スタイル適用

```javascript
// デフォルトスタイルを使用する場合
import '@osaxyz/taxonom-style'
```

## ライセンス

MIT License

## 作者

Original SIN Architecture ([osa.xyz](https://osa.xyz))

## リンク

- [GitHub](https://github.com/artouc/taxonom)
- [デモ](https://taxonom.vercel.app)