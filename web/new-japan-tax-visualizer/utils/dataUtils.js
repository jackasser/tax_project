/**
 * データ関連のユーティリティ関数
 */

import allData from '../data/all_data.json';

/**
 * すべてのデータを取得
 */
export function getAllData() {
  return allData;
}

/**
 * 税収推移データを取得
 */
export function getTaxRevenueData() {
  return allData.tax_trend;
}

/**
 * 予算収入データを取得
 */
export function getBudgetRevenueData() {
  return allData.budget_revenue;
}

/**
 * 予算支出データを取得
 */
export function getBudgetExpenditureData() {
  return allData.budget_expenditure;
}

/**
 * 地方税データを取得
 */
export function getLocalTaxData() {
  return allData.local_tax;
}

/**
 * 目的別支出データを取得
 */
export function getExpenditureByPurposeData() {
  return allData.expenditure_by_purpose;
}

/**
 * 詳細支出データを取得
 */
export function getDetailedExpenditureData() {
  return allData.detailed_expenditure;
}

/**
 * 特定カテゴリの詳細支出データを取得
 */
export function getCategoryDetailedData(categoryName) {
  const detailedData = getDetailedExpenditureData();
  return detailedData.categories.find(category => category.name === categoryName);
}

/**
 * 社会保障費の経年変化データを取得
 */
export function getSocialSecurityYearlyData() {
  const detailedData = getDetailedExpenditureData();
  return detailedData.social_security_yearly;
}

/**
 * 金額を日本円表示用にフォーマット
 */
export function formatCurrency(amount, unit = "") {
  if (typeof amount !== 'number') return "N/A";
  
  // 3桁ごとにカンマを挿入
  const formattedNumber = amount.toLocaleString('ja-JP');
  
  if (unit) {
    return `${formattedNumber} ${unit}`;
  }
  return formattedNumber;
}

/**
 * 単位によって適切に金額を表示（億円、兆円など）
 */
export function formatAmountWithUnit(amount) {
  if (typeof amount !== 'number') return "N/A";
  
  if (amount >= 10000) {
    // 1兆円以上は兆円単位で表示
    return `${(amount / 10000).toFixed(2)} 兆円`;
  } else if (amount >= 1) {
    // 1億円以上は億円単位で表示
    return `${amount.toFixed(2)} 億円`;
  } else {
    // それ以下は百万円単位で表示
    return `${(amount * 100).toFixed(0)} 百万円`;
  }
}
