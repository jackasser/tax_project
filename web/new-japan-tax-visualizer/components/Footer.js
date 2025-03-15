export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} 日本の税金可視化プロジェクト. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-sm hover:underline">
              お問い合わせ
            </a>
            <a href="#" className="text-sm hover:underline">
              プライバシーポリシー
            </a>
            <a href="#" className="text-sm hover:underline">
              利用規約
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
