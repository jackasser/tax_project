'use client';

import { useState } from 'react';
import Link from 'next/link';
import PieChart from '../../components/charts/PieChart';
import StackedBarChart from '../../components/charts/StackedBarChart';
import { 
  getBudgetExpenditureData, 
  getExpenditureByPurposeData,
  getDetailedExpenditureData
} from '../../utils/dataUtils';

export default function TaxUsagePage() {
  const [activeTab, setActiveTab] = useState('current');
  
  // データの取得
  const budgetExpenditureData = getBudgetExpenditureData();
  const expenditureByPurposeData = getExpenditureByPurposeData();
  const detailedExpenditureData = getDetailedExpenditureData();

  return (
    <div>
      <h1>税金の使い道</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          日本の国家予算は、社会保障、公共事業、教育など様々な分野に配分されています。
          このページでは、令和6年度予算における歳出の内訳と、過去5年間の推移を確認できます。
        </p>
        <p>
          詳細な内訳を見るには、グラフの各項目をクリックするか、「詳細を見る」ボタンを押してください。
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${activeTab === 'current' ? 'bg-blue-100 border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            現在の予算内訳
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'trend' ? 'bg-blue-100 border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('trend')}
          >
            予算推移
          </button>
        </div>
        
        <div className="p-4 bg-white rounded-md shadow-sm">
          {activeTab === 'current' ? (
            <>
              <h2 className="mb-4">令和6年度一般会計予算 歳出の内訳</h2>
              <PieChart data={budgetExpenditureData} title="歳出予算の構成" unit="億円" />
              <div className="mt-6">
                <h3 className="text-xl mb-2">ポイント</h3>
                <ul className="list-disc pl-6">
                  <li>社会保障費が最大の支出項目で、予算全体の約35%を占めています</li>
                  <li>国債費（借金の返済と利子）は第2位の支出項目です</li>
                  <li>地方交付税交付金等は地方自治体への財政支援に使われています</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <h2 className="mb-4">歳出予算の推移（2019-2023年度）</h2>
              <StackedBarChart 
                data={expenditureByPurposeData} 
                xAxisLabel="年度"
                yAxisLabel="予算額（兆円）"
                title="目的別歳出予算の推移"
              />
              <div className="mt-6">
                <h3 className="text-xl mb-2">ポイント</h3>
                <ul className="list-disc pl-6">
                  <li>社会保障費は高齢化の影響で毎年増加傾向にあります</li>
                  <li>防衛費は特に近年増加傾向が見られます</li>
                  <li>国債費は金利の影響を受けやすい項目です</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {detailedExpenditureData.categories.slice(0, 4).map(category => (
          <div key={category.name} className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-medium mb-2">{category.name}</h3>
            <p className="text-xl font-bold">{(category.total / 10000).toFixed(2)} 兆円</p>
            <p className="text-sm mb-4">令和6年度予算</p>
            <Link 
              href={`/tax-usage/detailed?category=${encodeURIComponent(category.name)}`}
              className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              詳細を見る →
            </Link>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-lg font-medium mb-2">社会保障費の内訳を詳しく見る</h3>
        <p className="mb-4">
          予算最大の支出項目である社会保障費は、年金、医療、介護など様々な項目で構成されています。
          その詳細と経年変化を確認するには、下のリンクをクリックしてください。
        </p>
        <Link 
          href="/tax-usage/detailed?category=社会保障"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          社会保障費の詳細を見る
        </Link>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Link href="/tax-revenue" className="text-blue-600 hover:underline">
          ← 税収推移に戻る
        </Link>
        <Link href="/tax-flow" className="text-blue-600 hover:underline">
          税金の流れを見る →
        </Link>
      </div>
    </div>
  );
}
