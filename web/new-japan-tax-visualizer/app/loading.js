// loading.js
// Next.jsのストリーミングとサスペンスの機能を活用したローディング表示
// ページ移動時のユーザーエクスペリエンス向上のために実装

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-blue-700">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium">データを読み込み中...</p>
    </div>
  );
}
