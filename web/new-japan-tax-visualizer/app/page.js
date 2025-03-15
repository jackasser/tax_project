import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">日本の税金可視化プロジェクト</h1>
        <p className="text-xl max-w-3xl mx-auto">
          このウェブサイトでは、日本の税金の流れと使い道を視覚的に理解できるように
          データを可視化しています。国民の税金がどこからきて、どのように使われているのかを
          探索してください。
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/tax-revenue" className="block">
          <div className="card transition-transform hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-blue-500 relative">
            {/* アイコン: グラフ */}
            <div className="absolute top-4 right-4 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
                <line x1="3" y1="20" x2="21" y2="20"></line>
              </svg>
            </div>
            
            <h2 className="text-center text-primary-dark mb-3">税収推移</h2>
            <p className="mb-4">
              過去10年間の日本の税収推移を税目別に見ることができます。所得税、法人税、消費税などの
              推移から、日本の財政状況を理解しましょう。
            </p>
            <div className="text-center mt-auto">
              <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                詳細を見る →
              </span>
            </div>
          </div>
        </Link>

        <Link href="/tax-usage" className="block">
          <div className="card transition-transform hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-blue-500 relative">
            {/* アイコン: 円グラフ */}
            <div className="absolute top-4 right-4 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
              </svg>
            </div>
            
            <h2 className="text-center text-primary-dark mb-3">税金の使い道</h2>
            <p className="mb-4">
              国の予算はどのように使われているのでしょうか？社会保障、公共事業、教育など
              分野別の支出割合と詳細を確認できます。
            </p>
            <div className="text-center mt-auto">
              <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                詳細を見る →
              </span>
            </div>
          </div>
        </Link>

        <Link href="/tax-flow" className="block">
          <div className="card transition-transform hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-blue-500 relative">
            {/* アイコン: フロー */}
            <div className="absolute top-4 right-4 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3v12"></path>
                <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path d="M15 6a9 9 0 0 0-9 9"></path>
                <path d="M18 15h-6"></path>
                <path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
              </svg>
            </div>
            
            <h2 className="text-center text-primary-dark mb-3">税金の流れ</h2>
            <p className="mb-4">
              国税と地方税の割合、一般会計と特別会計の関係など、日本の税金システムの
              全体像を把握することができます。
            </p>
            <div className="text-center mt-auto">
              <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                詳細を見る →
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
