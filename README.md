# 日本の税金可視化プロジェクト

日本の税金の流れと使い道を視覚的に理解するためのウェブアプリケーションです。このプロジェクトでは税収の推移、予算の内訳、税金の流れなどを、グラフやチャートを使って分かりやすく表示します。

**デモ**: [https://tax-project-ten.vercel.app/](https://tax-project-ten.vercel.app/)

## 概要

このプロジェクトの目的は、一般の方々に日本の税金制度と予算配分をより理解しやすく伝えることです。データの可視化により、以下のような点を明らかにしています：

- 過去10年間の税収推移と税目別の内訳
- 予算の使い道と分野別支出の詳細
- 税金の流れと国と地方の関係

## プロジェクト構成

```
tax_project/
├── data/                 # 元データと処理済みデータ
│   ├── processed/        # 処理済みCSVファイル
│   ├── visualizations/   # 生成されたグラフ画像
│   └── website/          # ウェブサイト用JSONデータ
├── scripts/              # データ処理スクリプト
│   ├── extract_tax_data.py
│   └── extract_detailed_expenditure.py
└── web/                  # ウェブアプリケーション
    └── new-japan-tax-visualizer/  # Next.jsアプリケーション
```

## 機能

- **税収推移**: 過去10年間の国税収入の推移をグラフで表示
- **税金の使い道**: 予算の内訳と支出目的別の詳細を表示
- **税金の流れ**: 国税・地方税の関係や予算の流れを視覚的に解説

## 技術スタック

- **フロントエンド**: Next.js, React, Recharts, Tailwind CSS
- **データ処理**: Python, pandas, matplotlib
- **データ形式**: JSON, CSV
- **ホスティング**: Vercel

## デプロイ情報

このプロジェクトは[Vercel](https://vercel.com/)を使用して公開されています。デモサイトは以下のURLからアクセスできます：
- [https://tax-project-ten.vercel.app/](https://tax-project-ten.vercel.app/)

## 貢献方法

このプロジェクトはオープンソースであり、どなたでも貢献いただけます。以下の方法で参加できます：

1. **データの追加・更新**: 新しい年度のデータや、より詳細な分類のデータを追加
2. **機能の追加**: 新しい可視化方法や分析機能の実装
3. **UI/UXの改善**: より使いやすく、分かりやすいインターフェースへの改善
4. **ドキュメントの充実**: 解説やチュートリアルの追加・改善

### 貢献の手順

1. リポジトリをフォーク
2. 機能追加やバグ修正のブランチを作成
3. 変更を加え、テスト
4. プルリクエストを送信

## 開発環境のセットアップ

### データ処理部分

```bash
# 必要なライブラリのインストール
pip install pandas matplotlib japanize_matplotlib tabula-py

# スクリプトの実行
cd scripts
python extract_tax_data.py
python extract_detailed_expenditure.py
```

### ウェブアプリケーション

```bash
# 依存関係のインストール
cd web/new-japan-tax-visualizer
npm install

# 開発サーバーの起動
npm run dev
```

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。

## コンタクト

質問や提案がある場合は、Issueを作成してください。

## 謝辞

このプロジェクトは多くのオープンソースライブラリとデータソースに支えられています。すべての貢献者とデータ提供者に感謝します。
