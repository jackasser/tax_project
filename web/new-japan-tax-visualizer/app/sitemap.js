/**
 * 日本の税金可視化プロジェクト用サイトマップ
 * Next.js App Routerの機能を使用して動的にサイトマップを生成
 */

// サイトのベースURLを設定（デプロイ後の実際のURLに変更してください）
const BASE_URL = 'https://japan-tax-visualizer.vercel.app'; // 実際のVercelデプロイURLに変更してください

export default async function sitemap() {
  // 現在の日付を取得して最終更新日として使用
  const currentDate = new Date().toISOString();
  
  // サイト内の全ページを定義
  // 注: 新しいページを追加する場合はここに追加してください
  const routes = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tax-revenue`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tax-usage`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tax-flow`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  return routes;
}
