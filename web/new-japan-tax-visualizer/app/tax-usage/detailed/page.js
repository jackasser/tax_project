'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PieChart from '../../../components/charts/PieChart';
import StackedBarChart from '../../../components/charts/StackedBarChart';
import { 
  getCategoryDetailedData,
  getSocialSecurityYearlyData,
  formatCurrency
} from '../../../utils/dataUtils';

export default function DetailedExpenditurePage() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);
  
  useEffect(() => {
    // URLからカテゴリ名を取得
    const categoryName = searchParams.get('category') || '社会保障';
    setCategory(categoryName);
    
    // カテゴリのデータを取得
    const data = getCategoryDetailedData(categoryName);
    setCategoryData(data);
    
    // 社会保障カテゴリの場合は経年データも取得
    if (categoryName === '社会保障') {
      const socialData = getSocialSecurityYearlyData();
      setYearlyData(socialData);
    }
  }, [searchParams]);

  if (!categoryData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // カテゴリごとの色を設定
  const categoryColors = {
    '社会保障': 'bg-blue-600',
    '公共事業': 'bg-green-600',
    '文教及び科学振興': 'bg-purple-600',
    '防衛': 'bg-red-600',
    '経済協力': 'bg-yellow-600',
    '中小企業対策': 'bg-pink-600',
    'エネルギー対策': 'bg-teal-600',
    '農林水産業': 'bg-amber-600'
  };
  
  const categoryColor = categoryColors[category] || 'bg-blue-600';
  const totalBudget = 1125999; // 予算総額（億円）

  return (
    <div className="fade-in">
      <div className="mb-6">
        <Link href="/tax-usage" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          税金の使い道に戻る
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <span className={`inline-block w-6 h-6 rounded-full ${categoryColor} mr-3`}></span>
        {category}費の詳細
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-1">予算総額</p>
          <p className="text-3xl font-bold text-blue-700">{formatCurrency(categoryData.total, '億円')}</p>
          <p className="text-sm text-gray-600">令和6年度</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-1">予算全体に占める割合</p>
          <p className="text-3xl font-bold text-green-600">{((categoryData.total / totalBudget) * 100).toFixed(1)}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className={`${categoryColor} h-2.5 rounded-full`} 
              style={{ width: `${((categoryData.total / totalBudget) * 100).toFixed(1)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-1">1人あたりの負担額（概算）</p>
          <p className="text-3xl font-bold text-amber-600">{formatCurrency(Math.round(categoryData.total / 1.25), '円')}</p>
          <p className="text-sm text-gray-600">総人口1.25億人で計算</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">予算内訳</h2>
        <PieChart data={categoryData.details} title={`${category}予算の内訳`} unit="億円" />
      </div>
      
      {yearlyData && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">経年変化</h2>
          <StackedBarChart 
            data={yearlyData} 
            xAxisLabel="年度"
            yAxisLabel="予算額（億円）"
            title={`${category}費の推移（2019-2023年度）`}
            unit="億円"
          />
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-3">ポイント</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>年金と医療費が社会保障費の大部分を占めています（約6割）</li>
              <li>少子高齢化の影響で、特に年金と医療費が毎年増加傾向にあります</li>
              <li>子育て支援費も近年増加傾向にあり、少子化対策の強化が見られます</li>
            </ul>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b">解説</h2>
        
        {category === '社会保障' && (
          <>
            <p className="mb-4 leading-relaxed">
              社会保障費は国家予算最大の支出項目で、年金、医療、介護、子育て支援など国民生活の基盤を支える
              様々な制度に使われています。高齢化社会の進展とともに、社会保障費は年々増加の一途をたどっています。
            </p>
            <p className="leading-relaxed">
              特に年金と医療費が全体の約6割を占め、今後も増加が予想されることから、制度の持続可能性が大きな課題となっています。
              また近年は少子化対策として子育て支援にも予算が増加しています。
            </p>
          </>
        )}
        
        {category === '公共事業' && (
          <>
            <p className="mb-4 leading-relaxed">
              公共事業費は道路、河川、港湾などのインフラ整備や災害対策に使われる予算です。国土強靭化や経済対策の
              観点からも重要な位置づけとなっています。
            </p>
            <p className="leading-relaxed">
              近年は特に防災・減災対策や老朽化したインフラの更新に重点が置かれています。また、災害復旧費も
              気候変動の影響もあり、一定の予算が確保されています。
            </p>
          </>
        )}
        
        {category === '文教及び科学振興' && (
          <>
            <p className="mb-4 leading-relaxed">
              文教及び科学振興費は、義務教育や高等教育の充実、科学技術研究の促進、文化振興などに使われる予算です。
              国の将来を担う人材育成と科学技術立国としての基盤を支える重要な分野です。
            </p>
            <p className="leading-relaxed">
              義務教育と高等教育が予算の大部分を占めていますが、科学技術研究への投資も重視されています。
              国際競争力強化の観点から、研究開発予算の戦略的な配分が課題となっています。
            </p>
          </>
        )}
        
        {category === '防衛' && (
          <>
            <p className="mb-4 leading-relaxed">
              防衛費は自衛隊の人件費、装備品の調達・維持、基地対策、研究開発などに使われる予算です。
              近年の安全保障環境の変化を受けて、予算は増加傾向にあります。
            </p>
            <p className="leading-relaxed">
              人件費と装備品購入費が予算の大部分を占めています。新たな領域（宇宙・サイバー・電磁波）への対応や
              研究開発費も増加しており、防衛力の質的向上が図られています。
            </p>
          </>
        )}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8">
        <h3 className="text-lg font-medium mb-2">データの出典</h3>
        <p className="text-sm text-gray-600">
          本データは令和6年度予算に基づいています。詳細な内訳や経年変化については、財務省発表の資料を基に作成しています。
          一部、表示の都合上、カテゴリの統合や簡略化を行っている場合があります。
        </p>
      </div>
      
      <div className="mt-12 flex flex-wrap gap-4 justify-between">
        <Link 
          href="/tax-usage" 
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          税金の使い道に戻る
        </Link>
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
