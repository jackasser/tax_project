// JSON-LD スキーマを生成する関数
// 検索エンジンがコンテンツを理解するのを助ける構造化データを提供します

/**
 * ウェブサイト全体のスキーマを生成
 */
export function generateWebsiteSchema(url = 'https://japan-tax-visualizer.vercel.app') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '日本の税金可視化プロジェクト',
    url: url,
    description: '日本の税金の流れと使い道を可視化するウェブアプリケーション。税収推移、予算配分、税金の流れをグラフとデータで分かりやすく解説します。',
    inLanguage: 'ja-JP',
  };
}

/**
 * 各ページのスキーマを生成
 */
export function generateWebPageSchema(title, description, url, lastUpdated = new Date().toISOString()) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    dateModified: lastUpdated,
    isPartOf: {
      '@type': 'WebSite',
      name: '日本の税金可視化プロジェクト',
      url: 'https://japan-tax-visualizer.vercel.app',
    },
  };
}

/**
 * データセットのスキーマを生成（税金データの可視化に使用）
 */
export function generateDatasetSchema(name, description, url, keywords) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: name,
    description: description,
    url: url,
    keywords: keywords,
    creator: {
      '@type': 'Organization',
      name: '日本の税金可視化プロジェクト',
      url: 'https://japan-tax-visualizer.vercel.app',
    },
    dateModified: new Date().toISOString(),
    license: 'https://creativecommons.org/licenses/by/4.0/',
  };
}

/**
 * 財務データ可視化のスキーマを生成
 */
export function generateFinancialProductSchema(name, description, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: name,
    description: description, 
    url: url,
    provider: {
      '@type': 'Organization',
      name: '日本の税金可視化プロジェクト',
      url: 'https://japan-tax-visualizer.vercel.app',
    },
  };
}
