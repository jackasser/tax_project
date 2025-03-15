import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold mb-4 sm:mb-0">
            日本の税金可視化プロジェクト
          </Link>
          <nav>
            <ul className="flex flex-wrap gap-6">
              <li>
                <Link href="/" className="hover:underline">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/tax-revenue" className="hover:underline">
                  税収推移
                </Link>
              </li>
              <li>
                <Link href="/tax-usage" className="hover:underline">
                  税金の使い道
                </Link>
              </li>
              <li>
                <Link href="/tax-flow" className="hover:underline">
                  税金の流れ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
