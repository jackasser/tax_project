import Link from 'next/link';
import Script from 'next/script';
import { generateWebPageSchema, generateDatasetSchema } from './jsonld';

// ページ固有のメタデータ
export const metadata = {
  title: '日本の税金可視化プロジェクト - 税金の流れを分かりやすく',
  description: '日本の税金の流れと使い道を可視化するウェブサイト。税収推移、予算配分、税金の流れをグラフとデータで分かりやすく解説します。',
  keywords: '税金, 可視化, 予算, 財政, 日本, 税収, 使い道, 納税, 政府, データ分析, グラフ, 消費税, 所得税',
};

export default function Home() {
  return (
    <div className="fade-in">
      {/* 構造化データの追加 */}
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(
              '日本の税金可視化プロジェクト',
              '日本の税金の流れと使い道を可視化するウェブサイト',
              'https://japan-tax-visualizer.vercel.app/'
            )
          )
        }}
      />
      <Script
        id="dataset-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateDatasetSchema(
              '日本の税金データセット',
              '日本の税収、予算配分、税金フローに関するデータセット',
              'https://japan-tax-visualizer.vercel.app/',
              '税収, 予算, 日本, 財政, 政府支出'
            )
          )
        }}
      />
      
      <section className="text-center mb-16 relative">
        {/* 背景の装飾要素 */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-100 rounded-full opacity-20 transform -translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-100 rounded-full opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-8">日本の税金可視化プロジェクト</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 bg-white bg-opacity-70 p-4 md:p-6 rounded-lg shadow-sm">
            このウェブサイトでは、日本の税金の流れと使い道を視覚的に理解できるように
            データを可視化しています。国民の税金がどこからきて、どのように使われているのかを
            探索してください。
          </p>
        </div>
        
        {/* 統計ハイライト */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 md:mt-12 max-w-4xl mx-auto">
          <div className="stat-card">
            <p className="text-sm text-gray-500 mb-1">令和6年度 国の予算総額</p>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">112.6兆円</p>
          </div>
          <div className="stat-card border-green-500">
            <p className="text-sm text-gray-500 mb-1">年間税収</p>
            <p className="text-2xl md:text-3xl font-bold text-green-600">69.4兆円</p>
          </div>
          <div className="stat-card border-amber-500">
            <p className="text-sm text-gray-500 mb-1">社会保障費</p>
            <p className="text-2xl md:text-3xl font-bold text-amber-600">38.9兆円</p>
          </div>
        </div>
      </section>
      
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 md:mb-8 relative">
        データで見る日本の税金
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mt-2 rounded-full"></div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
        <Link href="/tax-revenue" className="block group">
          <div className="card transition-all duration-300 hover:shadow-xl border border-gray-100 group-hover:border-blue-100 h-full flex flex-col">
            {/* アイコン: グラフ */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                  <line x1="3" y1="20" x2="21" y2="20"></line>
                </svg>
              </div>
            </div>
            
            <h2 className="text-center text-blue-700 text-xl md:text-2xl mb-3 md:mb-4">税収推移</h2>
            <p className="mb-6 px-3 text-gray-600 flex-grow text-sm md:text-base">
              過去10年間の日本の税収推移を税目別に見ることができます。所得税、法人税、消費税などの
              推移から、日本の財政状況を理解しましょう。
            </p>
            <div className="text-center mt-auto">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md group-hover:shadow-lg text-sm md:text-base">
                詳細を見る →
              </span>
            </div>
          </div>
        </Link>

        <Link href="/tax-usage" className="block group">
          <div className="card transition-all duration-300 hover:shadow-xl border border-gray-100 group-hover:border-green-100 h-full flex flex-col">
            {/* アイコン: 円グラフ */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                </svg>
              </div>
            </div>
            
            <h2 className="text-center text-green-700 text-xl md:text-2xl mb-3 md:mb-4">税金の使い道</h2>
            <p className="mb-6 px-3 text-gray-600 flex-grow text-sm md:text-base">
              国の予算はどのように使われているのでしょうか？社会保障、公共事業、教育など
              分野別の支出割合と詳細を確認できます。
            </p>
            <div className="text-center mt-auto">
              <span className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md group-hover:shadow-lg text-sm md:text-base">
                詳細を見る →
              </span>
            </div>
          </div>
        </Link>

        <Link href="/tax-flow" className="block group">
          <div className="card transition-all duration-300 hover:shadow-xl border border-gray-100 group-hover:border-amber-100 h-full flex flex-col">
            {/* アイコン: フロー */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 group-hover:bg-amber-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3v12"></path>
                  <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                  <path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                  <path d="M15 6a9 9 0 0 0-9 9"></path>
                  <path d="M18 15h-6"></path>
                  <path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                </svg>
              </div>
            </div>
            
            <h2 className="text-center text-amber-700 text-xl md:text-2xl mb-3 md:mb-4">税金の流れ</h2>
            <p className="mb-6 px-3 text-gray-600 flex-grow text-sm md:text-base">
              国税と地方税の割合、一般会計と特別会計の関係など、日本の税金システムの
              全体像を把握することができます。
            </p>
            <div className="text-center mt-auto">
              <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-md group-hover:shadow-lg text-sm md:text-base">
                詳細を見る →
              </span>
            </div>
          </div>
        </Link>
      </div>
      
      <div className="highlight mx-auto max-w-4xl p-4 md:p-6 mb-12 md:mb-16">
        <h3 className="font-bold text-lg md:text-xl mb-3 text-gray-800">なぜ税金を理解することが大切なのか</h3>
        <p className="text-gray-700 text-sm md:text-base">
          私たちの生活を支える社会インフラやサービスは、税金によって賄われています。税金の仕組みや使い道を理解することで、
          社会の一員として、より良い政策決定や議論に参加することができます。このプロジェクトは、難解になりがちな税金の情報を
          視覚的に分かりやすく提供し、誰もが税金について考えるきっかけを作ることを目指しています。
        </p>
      </div>
    </div>
  );
}
