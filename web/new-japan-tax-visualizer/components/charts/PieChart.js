'use client';

import { useState } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/dataUtils';

/**
 * 円グラフコンポーネント
 * @param {Object} props 
 * @param {Object} props.data - 円グラフ用データ
 * @param {string} props.title - グラフタイトル
 * @param {string} props.unit - 表示単位（億円、兆円など）
 */
export default function PieChart({ data, title, unit = "億円" }) {
  // データフォーマットの変換
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.data[index],
    color: data.colors[index]
  }));

  // 合計を計算
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // ソート（金額の大きい順）
  const sortedData = [...chartData].sort((a, b) => b.value - a.value);

  return (
    <div className="w-full">
      {title && <h3 className="text-center mb-4">{title}</h3>}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* グラフ（PCの場合のみ表示） */}
        <div className="hidden md:block h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name.length > 6 ? name.substring(0, 6) + '...' : name}: ${(percent * 100).toFixed(1)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [formatCurrency(value, unit), null]}
              />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        
        {/* 数値データテーブル（常に表示） */}
        <div className="overflow-auto">
          <div className="text-center mb-4 font-bold bg-gray-100 p-2 rounded-lg">
            合計: {formatCurrency(total, unit)}
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">項目</th>
                <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">金額</th>
                <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">割合</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-700">
                    {formatCurrency(item.value, unit)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-700">
                    {((item.value / total) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
