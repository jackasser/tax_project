'use client';

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

  return (
    <div className="w-full">
      {title && <h3 className="text-center mb-4">{title}</h3>}
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
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
      
      <div className="text-center mt-4">
        <p className="font-bold">合計: {formatCurrency(total, unit)}</p>
      </div>
    </div>
  );
}
