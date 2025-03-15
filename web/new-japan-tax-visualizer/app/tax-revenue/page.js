'use client';

import { useState } from 'react';
import Link from 'next/link';
import TaxRevenueChart from '../../components/charts/TaxRevenueChart';
import PieChart from '../../components/charts/PieChart';
import { getTaxRevenueData, getLocalTaxData } from '../../utils/dataUtils';

export default function TaxRevenuePage() {
  const [activeTab, setActiveTab] = useState('national');
  
  // データの取得
  const taxRevenueData = getTaxRevenueData();
  const localTaxData = getLocalTaxData();

  // 税収合計の最新値を取得（2023年度のデータ）
  const latestYearIndex = taxRevenueData.years.length - 1;
  const latestTotal = taxRevenueData.series.find(s => s.name === '合計').data[latestYearIndex];
  
  return (
    <div>
      <h1>税収推移</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          日本の税収は、所得税、法人税、消費税などからなる「国税」と、住民税、固定資産税などの「地方税」に
          大きく分類されます。このページでは、過去10年間の税収推移と内訳を確認できます。
        </p>
        <p>
          {taxRevenueData.years[latestYearIndex]}年度の税収総額は約{latestTotal}兆円となっています。
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${activeTab === 'national' ? 'bg-blue-100 border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('national')}
          >
            国税の推移
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'local' ? 'bg-blue-100 border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('local')}
          >
            地方税の内訳
          </button>
        </div>
        
        <div className="p-4 bg-white rounded-md shadow-sm">
          {activeTab === 'national' ? (
            <>
              <h2 className="mb-4">国税の推移（2013-2023年度）</h2>
              <TaxRevenueChart data={taxRevenueData} />
              <div className="mt-6">
                <h3 className="text-xl mb-2">ポイント</h3>
                <ul className="list-disc pl-6">
                  <li>所得税と消費税が主要な税収源となっています</li>
                  <li>2014年と2019年の消費税率引き上げにより、消費税収入が増加しています</li>
                  <li>法人税収入は景気の影響を受けやすく、変動が見られます</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <h2 className="mb-4">地方税の内訳（2023年度）</h2>
              <PieChart data={localTaxData} title="地方税収の構成" unit="億円" />
              <div className="mt-6">
                <h3 className="text-xl mb-2">ポイント</h3>
                <ul className="list-disc pl-6">
                  <li>住民税と固定資産税が地方税収の中心を占めています</li>
                  <li>地方消費税は地方の重要な財源となっています</li>
                  <li>自動車関連税は道路整備などの財源に活用されています</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Link href="/" className="text-blue-600 hover:underline">
          ← ホームに戻る
        </Link>
        <Link href="/tax-usage" className="text-blue-600 hover:underline">
          税金の使い道を見る →
        </Link>
      </div>
    </div>
  );
}
