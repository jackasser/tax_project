/**
 * 日本の税金可視化プロジェクト用robots.txt
 * Next.js App Routerの機能を使用して動的にrobots.txtを生成
 */

// サイトのベースURLを設定（デプロイ後の実際のURLに変更してください）
const BASE_URL = 'https://japan-tax-visualizer.vercel.app'; // 実際のVercelデプロイURLに変更してください

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
