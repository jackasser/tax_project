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

# 税収データの手動作成
def create_tax_revenue_data():
    """税収推移データを手動で作成する"""
    print("税収データの作成を開始します...")
    
    # 過去10年間の税収データ（単位: 兆円）
    years = ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]
    income_tax = [13.7, 15.5, 17.5, 17.8, 18.9, 19.2, 19.9, 19.2, 20.1, 21.3, 22.5]
    corporate_tax = [9.4, 10.8, 11.4, 10.3, 12.0, 12.3, 12.6, 11.2, 13.6, 14.8, 15.9]
    consumption_tax = [10.8, 16.0, 17.4, 17.2, 17.7, 17.6, 18.4, 20.2, 21.0, 21.8, 22.4]
    other_tax = [13.3, 12.5, 14.5, 13.9, 14.0, 14.6, 14.8, 14.0, 15.3, 15.6, 16.2]
    
    # DataFrameの作成
    tax_data = pd.DataFrame({
        "年度": years,
        "所得税": income_tax,
        "法人税": corporate_tax,
        "消費税": consumption_tax,
        "その他": other_tax
    })
    
    # 合計値を計算
    tax_data["合計"] = tax_data["所得税"] + tax_data["法人税"] + tax_data["消費税"] + tax_data["その他"]
    
    # CSVに保存
    csv_path = "../data/processed/tax_revenue_data.csv"
    tax_data.to_csv(csv_path, index=False, encoding="utf-8")
    
    print(f"税収データをCSVに保存しました: {csv_path}")
    return tax_data

def create_budget_data():
    """予算の歳入歳出データを作成する"""
    print("予算データの作成を開始します...")
    
    # 令和6年度一般会計予算 歳入の構成（単位: 億円）
    revenue_categories = ["税収", "公債金", "その他収入"]
    revenue_amounts = [693600, 344760, 87640]
    
    # 令和6年度一般会計予算 歳出の構成（単位: 億円）
    expenditure_categories = ["社会保障", "国債費", "地方交付税交付金等", "公共事業", "文教及び科学振興", "防衛", "その他"]
    expenditure_amounts = [389010, 255240, 170830, 73110, 55680, 70070, 112060]
    
    # DataFrameの作成
    revenue_data = pd.DataFrame({
        "分類": revenue_categories,
        "金額": revenue_amounts
    })
    
    expenditure_data = pd.DataFrame({
        "分類": expenditure_categories,
        "金額": expenditure_amounts
    })
    
    # 割合を計算
    revenue_total = sum(revenue_amounts)
    revenue_data["割合"] = revenue_data["金額"] / revenue_total * 100
    
    expenditure_total = sum(expenditure_amounts)
    expenditure_data["割合"] = expenditure_data["金額"] / expenditure_total * 100
    
    # CSVに保存
    revenue_csv_path = "../data/processed/budget_revenue_data.csv"
    revenue_data.to_csv(revenue_csv_path, index=False, encoding="utf-8")
    
    expenditure_csv_path = "../data/processed/budget_expenditure_data.csv"
    expenditure_data.to_csv(expenditure_csv_path, index=False, encoding="utf-8")
    
    print(f"予算歳入データをCSVに保存しました: {revenue_csv_path}")
    print(f"予算歳出データをCSVに保存しました: {expenditure_csv_path}")
    
    return revenue_data, expenditure_data

# 地方税データの作成
def create_local_tax_data():
    """地方税データを作成する"""
    print("地方税データの作成を開始します...")
    
    # 地方税の内訳（単位: 億円）
    local_tax_categories = ["住民税", "固定資産税", "地方消費税", "自動車税", "その他"]
    local_tax_amounts = [124500, 98700, 56300, 16500, 45000]
    
    # DataFrameの作成
    local_tax_data = pd.DataFrame({
        "分類": local_tax_categories,
        "金額": local_tax_amounts
    })
    
    # 割合を計算
    local_tax_total = sum(local_tax_amounts)
    local_tax_data["割合"] = local_tax_data["金額"] / local_tax_total * 100
    
    # CSVに保存
    csv_path = "../data/processed/local_tax_data.csv"
    local_tax_data.to_csv(csv_path, index=False, encoding="utf-8")
    
    print(f"地方税データをCSVに保存しました: {csv_path}")
    return local_tax_data

# 使途別支出データの作成
def create_expenditure_by_purpose_data():
    """使途別支出データを作成する"""
    print("使途別支出データの作成を開始します...")
    
    # 使途別支出の時系列データ（単位: 兆円）
    years = ["2019", "2020", "2021", "2022", "2023"]
    
    # 各分野の支出額
    social_security = [34.1, 35.8, 36.9, 37.8, 38.9]
    debt_service = [23.5, 23.8, 24.3, 25.1, 25.5]
    local_allocation = [15.9, 16.1, 16.8, 17.0, 17.1]
    public_works = [6.9, 7.0, 7.1, 7.2, 7.3]
    education = [5.3, 5.4, 5.5, 5.6, 5.7]
    defense = [5.3, 5.4, 5.7, 6.2, 7.0]
    other = [10.1, 10.5, 10.8, 11.0, 11.2]
    
    # DataFrameの作成
    expenditure_data = pd.DataFrame({
        "年度": years,
        "社会保障": social_security,
        "国債費": debt_service,
        "地方交付税交付金等": local_allocation,
        "公共事業": public_works,
        "文教及び科学振興": education,
        "防衛": defense,
        "その他": other
    })
    
    # CSVに保存
    csv_path = "../data/processed/expenditure_by_purpose_data.csv"
    expenditure_data.to_csv(csv_path, index=False, encoding="utf-8")
    
    print(f"使途別支出データをCSVに保存しました: {csv_path}")
    return expenditure_data

def visualize_tax_revenue_trend(tax_data):
    """税収推移の可視化"""
    print("税収推移の可視化を開始します...")
    
    plt.figure(figsize=(12, 8))
    
    # 積み上げ棒グラフの作成
    plt.bar(tax_data["年度"], tax_data["所得税"], label="所得税", color="#4472C4")
    plt.bar(tax_data["年度"], tax_data["法人税"], bottom=tax_data["所得税"], label="法人税", color="#ED7D31")
    
    bottom_values = tax_data["所得税"] + tax_data["法人税"]
    plt.bar(tax_data["年度"], tax_data["消費税"], bottom=bottom_values, label="消費税", color="#A5A5A5")
    
    bottom_values = bottom_values + tax_data["消費税"]
    plt.bar(tax_data["年度"], tax_data["その他"], bottom=bottom_values, label="その他", color="#FFC000")
    
    # 合計値の折れ線グラフ
    plt.plot(tax_data["年度"], tax_data["合計"], marker="o", color="red", linewidth=2, label="合計")
    
    # グラフの設定
    plt.title("日本の税収推移（2013-2023年度）", fontsize=16)
    plt.xlabel("年度", fontsize=12)
    plt.ylabel("税収（兆円）", fontsize=12)
    plt.legend(loc="upper left")
    plt.grid(axis="y", linestyle="--", alpha=0.7)
    plt.xticks(rotation=45)
    
    # グラフを保存
    plt.tight_layout()
    plt.savefig("../data/visualizations/tax_revenue_trend.png", dpi=300)
    plt.close()
    
    print("税収推移のグラフを保存しました")

def visualize_budget_composition(revenue_data, expenditure_data):
    """予算の歳入歳出構成の可視化"""
    print("予算構成の可視化を開始します...")
    
    # 歳入と歳出の円グラフを作成
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 8))
    
    # カラーマップの設定
    revenue_colors = ["#4472C4", "#ED7D31", "#A5A5A5"]
    expenditure_colors = ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47", "#7030A0"]
    
    # 歳入の円グラフ
    wedges1, texts1, autotexts1 = ax1.pie(
        revenue_data["金額"], 
        labels=revenue_data["分類"],
        autopct="%1.1f%%",
        startangle=90,
        colors=revenue_colors
    )
    
    # 歳出の円グラフ
    wedges2, texts2, autotexts2 = ax2.pie(
        expenditure_data["金額"], 
        labels=expenditure_data["分類"],
        autopct="%1.1f%%",
        startangle=90,
        colors=expenditure_colors
    )
    
    # フォントサイズの調整
    plt.setp(autotexts1, size=10, weight="bold")
    plt.setp(autotexts2, size=10, weight="bold")
    
    # タイトルの設定
    ax1.set_title("令和6年度一般会計予算 歳入の構成", fontsize=14)
    ax2.set_title("令和6年度一般会計予算 歳出の構成", fontsize=14)
    
    # グラフを保存
    plt.tight_layout()
    plt.savefig("../data/visualizations/budget_composition.png", dpi=300)
    plt.close()
    
    print("予算構成のグラフを保存しました")

def visualize_local_tax_composition(local_tax_data):
    """地方税構成の可視化"""
    print("地方税構成の可視化を開始します...")
    
    plt.figure(figsize=(10, 8))
    
    # 円グラフの作成
    plt.pie(
        local_tax_data["金額"],
        labels=local_tax_data["分類"],
        autopct="%1.1f%%",
        startangle=90,
        colors=["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5"]
    )
    
    # タイトルの設定
    plt.title("地方税の構成", fontsize=16)
    
    # グラフを保存
    plt.tight_layout()
    plt.savefig("../data/visualizations/local_tax_composition.png", dpi=300)
    plt.close()
    
    print("地方税構成のグラフを保存しました")

def visualize_expenditure_by_purpose(expenditure_data):
    """使途別支出の可視化"""
    print("使途別支出の可視化を開始します...")
    
    # データの準備
    years = expenditure_data["年度"]
    categories = ["社会保障", "国債費", "地方交付税交付金等", "公共事業", "文教及び科学振興", "防衛", "その他"]
    
    plt.figure(figsize=(12, 8))
    
    # 積み上げ面グラフの作成
    plt.stackplot(
        years,
        [expenditure_data[cat] for cat in categories],
        labels=categories,
        colors=["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47", "#7030A0"]
    )
    
    # グラフの設定
    plt.title("使途別支出の推移（2019-2023年度）", fontsize=16)
    plt.xlabel("年度", fontsize=12)
    plt.ylabel("支出額（兆円）", fontsize=12)
    plt.legend(loc="upper left")
    plt.grid(axis="y", linestyle="--", alpha=0.7)
    
    # グラフを保存
    plt.tight_layout()
    plt.savefig("../data/visualizations/expenditure_by_purpose.png", dpi=300)
    plt.close()
    
    print("使途別支出のグラフを保存しました")

def prepare_data_for_website():
    """ウェブサイト用のJSONデータを準備する"""
    print("ウェブサイト用データの準備を開始します...")
    
    # 税収推移データの読み込み
    tax_data = pd.read_csv("../data/processed/tax_revenue_data.csv")
    
    # 歳入歳出データの読み込み
    revenue_data = pd.read_csv("../data/processed/budget_revenue_data.csv")
    expenditure_data = pd.read_csv("../data/processed/budget_expenditure_data.csv")
    
    # 地方税データの読み込み
    local_tax_data = pd.read_csv("../data/processed/local_tax_data.csv")
    
    # 使途別支出データの読み込み
    expenditure_by_purpose_data = pd.read_csv("../data/processed/expenditure_by_purpose_data.csv")
    
    # 税収推移データのJSON形式への変換
    tax_trend_json = {
        "years": tax_data["年度"].tolist(),
        "series": [
            {
                "name": "所得税",
                "data": tax_data["所得税"].tolist(),
                "color": "#4472C4"
            },
            {
                "name": "法人税",
                "data": tax_data["法人税"].tolist(),
                "color": "#ED7D31"
            },
            {
                "name": "消費税",
                "data": tax_data["消費税"].tolist(),
                "color": "#A5A5A5"
            },
            {
                "name": "その他",
                "data": tax_data["その他"].tolist(),
                "color": "#FFC000"
            },
            {
                "name": "合計",
                "data": tax_data["合計"].tolist(),
                "color": "red",
                "type": "line"
            }
        ]
    }
    
    # 歳入データのJSON形式への変換
    revenue_json = {
        "labels": revenue_data["分類"].tolist(),
        "data": revenue_data["金額"].tolist(),
        "colors": ["#4472C4", "#ED7D31", "#A5A5A5"]
    }
    
    # 歳出データのJSON形式への変換
    expenditure_json = {
        "labels": expenditure_data["分類"].tolist(),
        "data": expenditure_data["金額"].tolist(),
        "colors": ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47", "#7030A0"]
    }
    
    # 地方税データのJSON形式への変換
    local_tax_json = {
        "labels": local_tax_data["分類"].tolist(),
        "data": local_tax_data["金額"].tolist(),
        "colors": ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5"]
    }
    
    # 使途別支出データのJSON形式への変換
    categories = ["社会保障", "国債費", "地方交付税交付金等", "公共事業", "文教及び科学振興", "防衛", "その他"]
    expenditure_by_purpose_json = {
        "years": expenditure_by_purpose_data["年度"].tolist(),
        "categories": categories,
        "series": [
            {
                "name": cat,
                "data": expenditure_by_purpose_data[cat].tolist(),
                "color": color
            } for cat, color in zip(categories, ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47", "#7030A0"])
        ]
    }
    
    # 全データをまとめたJSONの作成
    all_data_json = {
        "tax_trend": tax_trend_json,
        "budget_revenue": revenue_json,
        "budget_expenditure": expenditure_json,
        "local_tax": local_tax_json,
        "expenditure_by_purpose": expenditure_by_purpose_json
    }
    
    # JSONファイルに保存
    with open("../data/website/all_data.json", "w", encoding="utf-8") as f:
        json.dump(all_data_json, f, ensure_ascii=False, indent=2)
    
    print("ウェブサイト用データの準備が完了しました")

def main():
    """メイン処理"""
    print("日本の税金データ処理を開始します...")
    
    # 税収データの作成と処理
    tax_data = create_tax_revenue_data()
    
    # 予算データの作成と処理
    revenue_data, expenditure_data = create_budget_data()
    
    # 地方税データの作成と処理
    local_tax_data = create_local_tax_data()
    
    # 使途別支出データの作成と処理
    expenditure_by_purpose_data = create_expenditure_by_purpose_data()
    
    # 税収推移の可視化
    visualize_tax_revenue_trend(tax_data)
    
    # 予算構成の可視化
    visualize_budget_composition(revenue_data, expenditure_data)
    
    # 地方税構成の可視化
    visualize_local_tax_composition(local_tax_data)
    
    # 使途別支出の可視化
    visualize_expenditure_by_purpose(expenditure_by_purpose_data)
    
    # ウェブサイト用データの準備
    prepare_data_for_website()
    
    print("すべての処理が完了しました")

if __name__ == "__main__":
    main()
