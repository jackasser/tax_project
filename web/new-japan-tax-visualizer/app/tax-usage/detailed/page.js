'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PieChart from '../../../components/charts/PieChart';
import StackedBarChart from '../../../components/charts/StackedBarChart';
import { 
  getCategoryDetailedData,
  getSocialSecurityYearlyData
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{category}費の詳細</h1>
      
      <div className="bg-blue-50 p-4 rounded-md mb-8">
        <p>
          <strong>{category}</strong>分野の予算総額は<strong>{(categoryData.total / 10000).toFixed(2)}兆円</strong>（令和6年度）で、
          これは国家予算全体の約{((categoryData.total / 1125999) * 100).toFixed(1)}%を占めています。
        </p>
      </div>
      
      <div className="mb-12">
        <h2 className="mb-6">予算内訳</h2>
        <div className="p-4 bg-white rounded-md shadow-sm">
          <PieChart data={categoryData.details} title={`${category}予算の内訳`} unit="億円" />
        </div>
      </div>
      
      {yearlyData && (
        <div className="mb-12">
          <h2 className="mb-6">経年変化</h2>
          <div className="p-4 bg-white rounded-md shadow-sm">
            <StackedBarChart 
              data={yearlyData} 
              xAxisLabel="年度"
              yAxisLabel="予算額（億円）"
              title={`${category}費の推移（2019-2023年度）`}
              unit="億円"
            />
            <div className="mt-6">
              <h3 className="text-xl mb-2">ポイント</h3>
              <ul className="list-disc pl-6">
                <li>年金と医療費が社会保障費の大部分を占めています</li>
                <li>少子高齢化の影響で、特に年金と医療費が毎年増加傾向にあります</li>
                <li>子育て支援費も近年増加傾向にあり、少子化対策の強化が見られます</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-gray-50 p-6 rounded-md mb-8">
        <h3 className="text-xl mb-4">解説</h3>
        
        {category === '社会保障' && (
          <>
            <p className="mb-3">
              社会保障費は国家予算最大の支出項目で、年金、医療、介護、子育て支援など国民生活の基盤を支える
              様々な制度に使われています。高齢化社会の進展とともに、社会保障費は年々増加の一途をたどっています。
            </p>
            <p>
              特に年金と医療費が全体の約6割を占め、今後も増加が予想されることから、制度の持続可能性が大きな課題となっています。
              また近年は少子化対策として子育て支援にも予算が増加しています。
            </p>
          </>
        )}
        
        {category === '公共事業' && (
          <>
            <p className="mb-3">
              公共事業費は道路、河川、港湾などのインフラ整備や災害対策に使われる予算です。国土強靭化や経済対策の
              観点からも重要な位置づけとなっています。
            </p>
            <p>
              近年は特に防災・減災対策や老朽化したインフラの更新に重点が置かれています。また、災害復旧費も
              気候変動の影響もあり、一定の予算が確保されています。
            </p>
          </>
        )}
        
        {category === '文教及び科学振興' && (
          <>
            <p className="mb-3">
              文教及び科学振興費は、義務教育や高等教育の充実、科学技術研究の促進、文化振興などに使われる予算です。
              国の将来を担う人材育成と科学技術立国としての基盤を支える重要な分野です。
            </p>
            <p>
              義務教育と高等教育が予算の大部分を占めていますが、科学技術研究への投資も重視されています。
              国際競争力強化の観点から、研究開発予算の戦略的な配分が課題となっています。
            </p>
          </>
        )}
        
        {category === '防衛' && (
          <>
            <p className="mb-3">
              防衛費は自衛隊の人件費、装備品の調達・維持、基地対策、研究開発などに使われる予算です。
              近年の安全保障環境の変化を受けて、予算は増加傾向にあります。
            </p>
            <p>
              人件費と装備品購入費が予算の大部分を占めています。新たな領域（宇宙・サイバー・電磁波）への対応や
              研究開発費も増加しており、防衛力の質的向上が図られています。
            </p>
          </>
        )}
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
