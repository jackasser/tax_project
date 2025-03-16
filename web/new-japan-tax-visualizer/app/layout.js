import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Inter } from 'next/font/google';

// フォントの設定
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: '日本の税金可視化プロジェクト',
  description: '日本の税金の流れと使い道を可視化するウェブアプリケーション',
  keywords: '税金, 可視化, 予算, 財政, 日本, データ分析, 消費税, 所得税',
  verification: {
    google: 'dISy2zJ81XUmkPDnYOgYw9RW-y-FVVXNUwNBE7SSP94', // 例: 'abcdefghijklmnopqrst'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={`${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50">
        {/* 背景の装飾 */}
        <div className="fixed inset-0 z-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-300 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-300 rounded-tr-full"></div>
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#4299e1" fillOpacity="0.2"></circle>
            </pattern>
            <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
