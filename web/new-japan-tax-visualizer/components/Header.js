import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function Header() {
  const pathname = usePathname();
  
  const isActive = (path) => {
    return pathname === path;
  };
  
  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-1PTHWR9QEB"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1PTHWR9QEB');
        `}
      </Script>
      
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold mb-6 sm:mb-0 flex items-center transition-transform hover:scale-105">
            <div className="mr-3 bg-white text-blue-700 w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-shadow">日本の税金可視化プロジェクト</span>
          </Link>
          <nav className="w-full sm:w-auto">
            <ul className="flex flex-wrap justify-center gap-2 md:gap-4">
              <li>
                <Link 
                  href="/" 
                  className={`px-4 py-2 rounded-lg transition-all ${isActive('/') 
                    ? 'bg-white text-blue-700 font-medium shadow-md' 
                    : 'hover:bg-blue-600 hover:text-white'}`}
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link 
                  href="/tax-revenue" 
                  className={`px-4 py-2 rounded-lg transition-all ${isActive('/tax-revenue') 
                    ? 'bg-white text-blue-700 font-medium shadow-md' 
                    : 'hover:bg-blue-600 hover:text-white'}`}
                >
                  税収推移
                </Link>
              </li>
              <li>
                <Link 
                  href="/tax-usage" 
                  className={`px-4 py-2 rounded-lg transition-all ${isActive('/tax-usage') 
                    ? 'bg-white text-blue-700 font-medium shadow-md' 
                    : 'hover:bg-blue-600 hover:text-white'}`}
                >
                  税金の使い道
                </Link>
              </li>
              <li>
                <Link 
                  href="/tax-flow" 
                  className={`px-4 py-2 rounded-lg transition-all ${isActive('/tax-flow') 
                    ? 'bg-white text-blue-700 font-medium shadow-md' 
                    : 'hover:bg-blue-600 hover:text-white'}`}
                >
                  税金の流れ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    </>
  );
}
