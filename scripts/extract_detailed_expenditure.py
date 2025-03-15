#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import pandas as pd
import matplotlib.pyplot as plt
import japanize_matplotlib
import json

# データディレクトリの作成
os.makedirs("../data/processed", exist_ok=True)
os.makedirs("../data/visualizations", exist_ok=True)
os.makedirs("../data/website", exist_ok=True)

# 詳細な支出データの作成
def create_detailed_expenditure_data():
    """詳細な支出データを作成する"""
    print("詳細な支出データの作成を開始します...")
    
    # 社会保障費の詳細内訳（単位: 億円）
    social_security_categories = [
        "年金", "医療", "介護", "子育て支援", "生活保護", "障害者福祉", "その他社会福祉"
    ]
    social_security_amounts = [
        126500, 118700, 38600, 32400, 29800, 18500, 24510
    ]
    
    # 公共事業費の詳細内訳（単位: 億円）
    public_works_categories = [
        "道路整備", "治水・河川管理", "港湾整備", "住宅対策", "都市環境整備", "災害復旧", "その他公共事業"
    ]
    public_works_amounts = [
        15800, 12600, 8300, 7900, 9800, 10200, 8510
    ]
    
    # 文教及び科学振興費の詳細内訳（単位: 億円）
    education_science_categories = [
        "義務教育", "高等教育", "科学技術研究", "文化振興", "スポーツ振興", "その他教育"
    ]
    education_science_amounts = [
        16800, 14500, 13200, 4300, 3200, 3680
    ]
    
    # 防衛費の詳細内訳（単位: 億円）
    defense_categories = [
        "人件・糧食費", "装備品等購入費", "研究開発費", "基地対策費", "施設整備費", "その他防衛費"
    ]
    defense_amounts = [
        22100, 21500, 8700, 4800, 7200, 5770
    ]
    
    # 経済協力費の詳細内訳（単位: 億円）
    economic_cooperation_categories = [
        "政府開発援助（ODA）", "国際機関分担金・拠出金", "その他経済協力"
    ]
    economic_cooperation_amounts = [
        4100, 3800, 2100
    ]
    
    # 中小企業対策費の詳細内訳（単位: 億円）
    small_business_categories = [
        "金融支援", "経営支援", "技術開発支援", "販路開拓支援", "その他中小企業支援"
    ]
    small_business_amounts = [
        2800, 2300, 1500, 1200, 1200
    ]
    
    # エネルギー対策費の詳細内訳（単位: 億円）
    energy_categories = [
        "再生可能エネルギー", "省エネルギー対策", "原子力安全対策", "資源開発", "その他エネルギー対策"
    ]
    energy_amounts = [
        2600, 1800, 1500, 1200, 900
    ]
    
    # 農林水産業費の詳細内訳（単位: 億円）
    agriculture_categories = [
        "農業振興", "林業振興", "水産業振興", "食料安全保障", "農村整備", "その他農林水産"
    ]
    agriculture_amounts = [
        9800, 3200, 2900, 2600, 6500, 3000
    ]
    
    # 各カテゴリのDataFrameを作成
    social_security_df = pd.DataFrame({
        "分類": social_security_categories,
        "金額": social_security_amounts
    })
    
    public_works_df = pd.DataFrame({
        "分類": public_works_categories,
        "金額": public_works_amounts
    })
    
    education_science_df = pd.DataFrame({
        "分類": education_science_categories,
        "金額": education_science_amounts
    })
    
    defense_df = pd.DataFrame({
        "分類": defense_categories,
        "金額": defense_amounts
    })
    
    economic_cooperation_df = pd.DataFrame({
        "分類": economic_cooperation_categories,
        "金額": economic_cooperation_amounts
    })
    
    small_business_df = pd.DataFrame({
        "分類": small_business_categories,
        "金額": small_business_amounts
    })
    
    energy_df = pd.DataFrame({
        "分類": energy_categories,
        "金額": energy_amounts
    })
    
    agriculture_df = pd.DataFrame({
        "分類": agriculture_categories,
        "金額": agriculture_amounts
    })
    
    # 割合を計算
    for df in [social_security_df, public_works_df, education_science_df, defense_df, 
               economic_cooperation_df, small_business_df, energy_df, agriculture_df]:
        total = df["金額"].sum()
        df["割合"] = df["金額"] / total * 100
    
    # CSVに保存
    social_security_df.to_csv("../data/processed/social_security_detail.csv", index=False, encoding="utf-8")
    public_works_df.to_csv("../data/processed/public_works_detail.csv", index=False, encoding="utf-8")
    education_science_df.to_csv("../data/processed/education_science_detail.csv", index=False, encoding="utf-8")
    defense_df.to_csv("../data/processed/defense_detail.csv", index=False, encoding="utf-8")
    economic_cooperation_df.to_csv("../data/processed/economic_cooperation_detail.csv", index=False, encoding="utf-8")
    small_business_df.to_csv("../data/processed/small_business_detail.csv", index=False, encoding="utf-8")
    energy_df.to_csv("../data/processed/energy_detail.csv", index=False, encoding="utf-8")
    agriculture_df.to_csv("../data/processed/agriculture_detail.csv", index=False, encoding="utf-8")
    
    # 社会保障費の経年変化データ（単位: 億円）
    years = ["2019", "2020", "2021", "2022", "2023"]
    
    social_security_yearly = {
        "年金": [110200, 112500, 115800, 119300, 126500],
        "医療": [105600, 108900, 112300, 115800, 118700],
        "介護": [32500, 34200, 35800, 37200, 38600],
        "子育て支援": [25800, 27300, 29100, 30800, 32400],
        "生活保護": [28100, 28600, 29000, 29400, 29800],
        "障害者福祉": [15200, 16100, 16900, 17700, 18500],
        "その他社会福祉": [22600, 23100, 23600, 24100, 24510]
    }
    
    # 経年変化データをDataFrameに変換
    social_security_yearly_df = pd.DataFrame({
        "年度": years,
        "年金": social_security_yearly["年金"],
        "医療": social_security_yearly["医療"],
        "介護": social_security_yearly["介護"],
        "子育て支援": social_security_yearly["子育て支援"],
        "生活保護": social_security_yearly["生活保護"],
        "障害者福祉": social_security_yearly["障害者福祉"],
        "その他社会福祉": social_security_yearly["その他社会福祉"]
    })
    
    # CSVに保存
    social_security_yearly_df.to_csv("../data/processed/social_security_yearly.csv", index=False, encoding="utf-8")
    
    print("詳細な支出データをCSVに保存しました")
    
    # 詳細データの可視化
    visualize_detailed_expenditure(social_security_df, "社会保障費の詳細内訳", "social_security_detail")
    visualize_detailed_expenditure(public_works_df, "公共事業費の詳細内訳", "public_works_detail")
    visualize_detailed_expenditure(education_science_df, "文教及び科学振興費の詳細内訳", "education_science_detail")
    visualize_detailed_expenditure(defense_df, "防衛費の詳細内訳", "defense_detail")
    
    # 社会保障費の経年変化を可視化
    visualize_yearly_trend(social_security_yearly_df, "社会保障費の内訳推移（2019-2023年度）", "social_security_yearly")
    
    # ウェブサイト用のJSONデータを準備
    prepare_detailed_data_for_website()
    
    return {
        "social_security": social_security_df,
        "public_works": public_works_df,
        "education_science": education_science_df,
        "defense": defense_df,
        "economic_cooperation": economic_cooperation_df,
        "small_business": small_business_df,
        "energy": energy_df,
        "agriculture": agriculture_df,
        "social_security_yearly": social_security_yearly_df
    }

def visualize_detailed_expenditure(data_df, title, filename):
    """詳細な支出内訳を円グラフで可視化"""
    plt.figure(figsize=(10, 8))
    
    # 円グラフの作成
    plt.pie(
        data_df["金額"],
        labels=data_df["分類"],
        autopct="%1.1f%%",
        startangle=90,
        colors=plt.cm.tab10.colors
    )
    
    # タイトルの設定
    plt.title(title, fontsize=16)
    
    # グラフを保存
    plt.tight_layout()
    plt.savefig(f"../data/visualizations/{filename}.png", dpi=300)
    plt.close()
    
    print(f"{title}のグラフを保存しました")

def visualize_yearly_trend(data_df, title, filename):
    """経年変化を積み上げ棒グラフで可視化"""
    plt.figure(figsize=(12, 8))
    
    # カラムから年度を除外
    columns = data_df.columns.tolist()
    columns.remove("年度")
    
    # 積み上げ棒グラフの作成
    bottom = np.zeros(len(data_df))
    for i, col in enumerate(columns):
        plt.bar(
            data_df["年度"], 
            data_df[col], 
            bottom=bottom, 
            label=col,
            color=plt.cm.tab10.colors[i % 10]
        )
        bottom += data_df[col].values
    
    # グラフの設定
    plt.title(title, fontsize=16)
    plt.xlabel("年度", fontsize=12)
    plt.ylabel("金額（億円）", fontsize=12)
    plt.legend(loc="upper left")
    plt.grid(axis="y", linestyle="--", alpha=0.7)
    plt.xticks(rotation=45)
    
    # グラフを保存
    plt.tight_layout()
    plt.savefig(f"../data/visualizations/{filename}.png", dpi=300)
    plt.close()
    
    print(f"{title}のグラフを保存しました")

def prepare_detailed_data_for_website():
    """ウェブサイト用の詳細支出データを準備する"""
    print("ウェブサイト用の詳細支出データの準備を開始します...")
    
    # 各カテゴリの詳細データを読み込み
    social_security_df = pd.read_csv("../data/processed/social_security_detail.csv")
    public_works_df = pd.read_csv("../data/processed/public_works_detail.csv")
    education_science_df = pd.read_csv("../data/processed/education_science_detail.csv")
    defense_df = pd.read_csv("../data/processed/defense_detail.csv")
    economic_cooperation_df = pd.read_csv("../data/processed/economic_cooperation_detail.csv")
    small_business_df = pd.read_csv("../data/processed/small_business_detail.csv")
    energy_df = pd.read_csv("../data/processed/energy_detail.csv")
    agriculture_df = pd.read_csv("../data/processed/agriculture_detail.csv")
    
    # 社会保障費の経年変化データを読み込み
    social_security_yearly_df = pd.read_csv("../data/processed/social_security_yearly.csv")
    
    # 詳細支出データのJSON形式への変換
    detailed_expenditure_json = {
        "categories": [
            {
                "name": "社会保障",
                "total": int(social_security_df["金額"].sum()),
                "details": {
                    "labels": social_security_df["分類"].tolist(),
                    "data": social_security_df["金額"].tolist(),
                    "colors": [f"#{''.join([hex(int(c*255))[2:].zfill(2) for c in plt.cm.tab10.colors[i][:3]])}" for i in range(len(social_security_df))]
                }
            },
            {
                "name": "公共事業",
                "total": int(public_works_df["金額"].sum()),
                "details": {
                    "labels": public_works_df["分類"].tolist(),
                    "data": public_works_df["金額"].tolist(),
                    "colors": [f"#{''.join([hex(int(c*255))[2:].zfill(2) for c in plt.cm.tab10.colors[i][:3]])}" for i in range(len(public_works_df))]
                }
            },
            {
                "name": "文教及び科学振興",
                "total": int(education_science_df["金額"].sum()),
                "details": {
                    "labels": education_science_df["分類"].tolist(),
                    "data": education_science_df["金額"].tolist(),
                    "colors": [f"#{''.join([hex(int(c*255))[2:].zfill(2) for c in plt.cm.tab10.colors[i][:3]])}" for i in range(len(education_science_df))]
                }
            },
            {
                "name": "防衛",
                "total": int(defense_df["金額"].sum()),
                "details": {
                    "labels": defense_df["分類"].tolist(),
                    "data": defense_df["金額"].tolist(),
                    "colors": [f"#{''.join([hex(int(c*255))[2:].zfill(2) for c in plt.cm.tab10.colors[i][:3]])}" for i in range(len(defense_df))]
                }
            },
            {
                "name": "経済協力",
                "total": int(economic_cooperation_df["金額"].sum()),
                "details": {
                    "labels": economic_cooperation_df["分類"].tolist(),
                    "data": economic_cooperation_df["金額"].tolist(),
                    "colors": [f"#{''.join([hex(int(c*255))[2:].zfill(2) for c in plt.cm.tab10.colors[i][:3]])}" for i in range(len(economic_cooperation_df))]
                }
            },
            {
                "name": "中小企業対策",
                "total": int(small_business_df["金額"].sum()),
                "details": {
                    "labels": small_business_df["分類"].tolist(),
                    "data": small_business_df["金額"].tolist(),
                    "colors": [f"#{''.join([hex(int(c*255))[2:].zfill(2) for c in plt.cm.tab10.colors[i][:3]])}" for i in range(len(small_business_df))]
                }
            },
            {
                "name": "エネルギー対策",
                "total": int(energy_df["金額"].sum()),
                "details": {
                    "labels": energy_df["分類"].tolist(),
                    "data": energy_df["金額"].tolist(),
                    "colors": [f"#{''.join([hex(int(c*255))[2:].zfill(2) for c in plt.cm.tab10.colors[i][:3]])}" for i in range(len(energy_df))]
                }
            },
            {
                "name": "農林水産業",
                "total": int(agriculture_df["金額"].sum()),
                "details": {
                    "labels": agriculture_df["分類"].tolist(),
                    "data": agriculture_df["金額"].tolist(),
                    "colors": [f"#{''.join([hex(int(c*255))[2:].zfill(2) for c in plt.cm.tab10.colors[i][:3]])}" for i in range(len(agriculture_df))]
                }
            }
        ],
        "social_security_yearly": {
            "years": social_security_yearly_df["年度"].tolist(),
            "series": [
                {
                    "name": col,
                    "data": social_security_yearly_df[col].tolist(),
                    "color": f"#{''.join([hex(int(c*255))[2:].zfill(2) for c in plt.cm.tab10.colors[i][:3]])}"
                } for i, col in enumerate(social_security_yearly_df.columns) if col != "年度"
            ]
        }
    }
    
    # JSONファイルに保存
    with open("../data/website/detailed_expenditure.json", "w", encoding="utf-8") as f:
        json.dump(detailed_expenditure_json, f, ensure_ascii=False, indent=2)
    
    # 既存のall_data.jsonを読み込んで更新
    try:
        with open("../data/website/all_data.json", "r", encoding="utf-8") as f:
            all_data = json.load(f)
        
        # 詳細支出データを追加
        all_data["detailed_expenditure"] = detailed_expenditure_json
        
        # 更新したJSONを保存
        with open("../data/website/all_data.json", "w", encoding="utf-8") as f:
            json.dump(all_data, f, ensure_ascii=False, indent=2)
    except:
        print("all_data.jsonの更新に失敗しました。詳細支出データは別ファイルとして保存されています。")
    
    print("ウェブサイト用の詳細支出データの準備が完了しました")

if __name__ == "__main__":
    # 必要なライブラリをインポート
    import numpy as np
    
    # 詳細な支出データの作成と処理
    detailed_data = create_detailed_expenditure_data()
    print("すべての処理が完了しました")
