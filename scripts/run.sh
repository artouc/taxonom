#!/bin/bash

# Taxonom プロジェクト管理スクリプト
# CLAUDE.mdの規約に従い、単一ファイルでサブコマンド管理

set -e

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ヘルプ表示
show_help() {
    echo -e "${BLUE}Taxonom プロジェクト管理スクリプト${NC}"
    echo ""
    echo "使用方法: ./scripts/run.sh [コマンド]"
    echo ""
    echo "利用可能なコマンド:"
    echo "  setup           初期セットアップを実行"
    echo "  install         依存関係をインストール"
    echo "  build           全パッケージをビルド"
    echo "  dev             playground の開発サーバーを起動"
    echo "  dev:parser      taxonom パッケージの開発モード"
    echo "  dev:style       taxonom-style パッケージの開発モード"
    echo "  test            全パッケージのテストを実行"
    echo "  typecheck       型チェックを実行"
    echo "  clean           ビルド成果物を削除"
    echo "  help            このヘルプを表示"
    echo ""
}

# セットアップ
setup() {
    echo -e "${GREEN}🚀 初期セットアップを開始します...${NC}"
    
    # Node.js バージョンチェック
    node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    required_version=16
    
    if [ "$node_version" -lt "$required_version" ]; then
        echo -e "${RED}❌ Node.js v16以上が必要です。現在のバージョン: $(node -v)${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Node.js バージョン確認完了: $(node -v)${NC}"
    
    # 依存関係インストール
    install
    
    echo -e "${GREEN}🎉 セットアップが完了しました！${NC}"
    echo -e "${YELLOW}💡 開発を開始するには: ./scripts/run.sh dev${NC}"
}

# 依存関係インストール
install() {
    echo -e "${GREEN}📦 依存関係をインストールしています...${NC}"
    npm install
    echo -e "${GREEN}✅ インストール完了${NC}"
}

# ビルド実行
build() {
    echo -e "${GREEN}🔨 全パッケージをビルドしています...${NC}"
    npm run build
    echo -e "${GREEN}✅ ビルド完了${NC}"
}

# 開発サーバー起動
dev() {
    echo -e "${GREEN}🚀 playground 開発サーバーを起動しています...${NC}"
    npm run dev
}

# parser 開発モード
dev_parser() {
    echo -e "${GREEN}🔧 taxonom パッケージの開発モードを開始...${NC}"
    npm run dev:parser
}

# style 開発モード
dev_style() {
    echo -e "${GREEN}🎨 taxonom-style パッケージの開発モードを開始...${NC}"
    npm run dev:style
}

# テスト実行
test() {
    echo -e "${GREEN}🧪 テストを実行しています...${NC}"
    npm run test
    echo -e "${GREEN}✅ テスト完了${NC}"
}

# 型チェック
typecheck() {
    echo -e "${GREEN}🔍 型チェックを実行しています...${NC}"
    npm run typecheck
    echo -e "${GREEN}✅ 型チェック完了${NC}"
}

# クリーンアップ
clean() {
    echo -e "${YELLOW}🧹 ビルド成果物を削除しています...${NC}"
    npm run clean
    echo -e "${GREEN}✅ クリーンアップ完了${NC}"
}

# メイン処理
case "${1:-help}" in
    "setup")
        setup
        ;;
    "install")
        install
        ;;
    "build")
        build
        ;;
    "dev")
        dev
        ;;
    "dev:parser")
        dev_parser
        ;;
    "dev:style")
        dev_style
        ;;
    "test")
        test
        ;;
    "typecheck")
        typecheck
        ;;
    "clean")
        clean
        ;;
    "help"|*)
        show_help
        ;;
esac