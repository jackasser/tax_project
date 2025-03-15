'use client';

import Link from 'next/link';
import { useState } from 'react';
import PieChart from '../../components/charts/PieChart';
import { 
  getBudgetRevenueData, 
  getBudgetExpenditureData, 
  getLocalTaxData 
} from '../../utils/dataUtils';

export default function TaxFlowPage() {
  // データの取得
  const budgetRevenueData = getBudgetRevenueData();
  const budgetExpenditureData = getBudgetExpenditureData();
  const localTaxData = getLocalTaxData();

  return (
    <div>
      <h1>税金の流れ</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          日本の税金システムは国税と地方税に大きく分けられ、集められた税金は様々な経路で
          国民に還元されています。このページでは、税金の集め方と使い方の全体像を解説します。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="mb-4">歳入の構成</h2>
          <PieChart data={budgetRevenueData} title="令和6年度一般会計予算 歳入の構成" unit="億円" />
          <div className="mt-4">
            <p>
              令和6年度の国の一般会計予算における歳入総額は約112.6兆円です。
              その内訳は税収が約69.4兆円、公債金（借金）が約34.5兆円、その他収入が約8.8兆円となっています。
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="mb-4">歳出の構成</h2>
          <PieChart data={budgetExpenditureData} title="令和6年度一般会計予算 歳出の構成" unit="億円" />
          <div className="mt-4">
            <p>
              歳出面では、社会保障関係費が最大の約38.9兆円、国債費（借金の返済）が約25.5兆円、
              地方交付税交付金等が約17.1兆円などとなっています。
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-8 rounded-md mb-12">
        <h2 className="mb-6 text-center">税金の流れの概要</h2>
        
        <div className="relative">
          {/* 流れ図のためのフレックスボックス */}
          <div className="flex flex-col items-center">
            {/* 徴税 */}
            <div className="flex justify-center w-full mb-12">
              <div className="bg-white p-4 rounded-md shadow max-w-sm text-center">
                <h3 className="text-lg font-medium mb-2">国民・企業</h3>
                <p>所得税、法人税、消費税などを納税</p>
              </div>
            </div>
            
            {/* 矢印 */}
            <div className="w-0 h-10 border-l-2 border-gray-400 mb-2"></div>
            
            {/* 国と地方の予算 */}
            <div className="flex flex-col md:flex-row justify-center w-full gap-8 mb-12">
              <div className="bg-white p-4 rounded-md shadow flex-1 max-w-sm">
                <h3 className="text-lg font-medium mb-2 text-center">国の予算（一般会計）</h3>
                <p className="mb-2">総額: 約112.6兆円</p>
                <ul className="list-disc pl-6">
                  <li>税収: 69.4兆円</li>
                  <li>公債金: 34.5兆円</li>
                  <li>その他: 8.8兆円</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow flex-1 max-w-sm">
                <h3 className="text-lg font-medium mb-2 text-center">地方の予算</h3>
                <p className="mb-2">地方税収: 約44.2兆円</p>
                <ul className="list-disc pl-6">
                  <li>住民税: 12.5兆円</li>
                  <li>固定資産税: 9.9兆円</li>
                  <li>その他: 21.8兆円</li>
                </ul>
              </div>
            </div>
            
            {/* 矢印 */}
            <div className="w-0 h-10 border-l-2 border-gray-400 mb-2"></div>
            
            {/* 主な使途 */}
            <div className="bg-white p-4 rounded-md shadow max-w-lg text-center mb-8">
              <h3 className="text-lg font-medium mb-2">主な使途</h3>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="font-medium">国費</p>
                  <ul className="list-disc pl-6">
                    <li>社会保障: 38.9兆円</li>
                    <li>国債費: 25.5兆円</li>
                    <li>地方交付税: 17.1兆円</li>
                    <li>公共事業: 7.3兆円</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">地方費</p>
                  <ul className="list-disc pl-6">
                    <li>教育費</li>
                    <li>民生費</li>
                    <li>土木費</li>
                    <li>衛生費</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 矢印 */}
            <div className="w-0 h-10 border-l-2 border-gray-400 mb-2"></div>
            
            {/* 国民への還元 */}
            <div className="bg-white p-4 rounded-md shadow max-w-sm text-center">
              <h3 className="text-lg font-medium mb-2">国民生活に還元</h3>
              <p>年金、医療、教育、インフラ整備、防衛など</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-md mb-8">
        <h2 className="mb-4">解説: 税金の仕組み</h2>
        
        <h3 className="text-lg mb-2">国税と地方税</h3>
        <p className="mb-4">
          日本の税金は国税と地方税に分けられます。国税には所得税、法人税、消費税などがあり、
          地方税には住民税、固定資産税、自動車税などがあります。国税は国の財源となり、
          地方税は都道府県や市区町村の財源となります。
        </p>
        
        <h3 className="text-lg mb-2">地方交付税</h3>
        <p className="mb-4">
          地方自治体の財政力格差を調整するため、国税の一部を財源として地方に配分する制度です。
          地方交付税交付金は地方の固有財源とされており、使途は地方の裁量に委ねられています。
        </p>
        
        <h3 className="text-lg mb-2">特別会計と一般会計</h3>
        <p className="mb-4">
          国の予算は一般会計と特別会計に分かれています。一般会計は国の基本的な経費をまとめた会計で、
          特別会計は特定の事業や特定の資金運用のために設けられた会計です。年金や道路整備などの
          特定目的の資金は特別会計で管理されます。
        </p>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Link href="/tax-usage" className="text-blue-600 hover:underline">
          ← 税金の使い道に戻る
        </Link>
        <Link href="/" className="text-blue-600 hover:underline">
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
