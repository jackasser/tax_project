'use client';

import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

/**
 * 税収推移チャートコンポーネント
 * @param {Object} props 
 * @param {Object} props.data - 税収推移データ
 */
export default function TaxRevenueChart({ data }) {
  // データを適切なフォーマットに変換
  const chartData = data.years.map((year, index) => {
    // 各年度のデータを作成
    const yearData = { year: year.toString() };

    // 各税目のデータを追加（折れ線グラフ用の合計を除く）
    data.series.forEach(series => {
      if (series.name !== '合計') {
        yearData[series.name] = series.data[index];
      } else {
        yearData.total = series.data[index];
      }
    });

    return yearData;
  });

  // 棒グラフ用の税目（合計を除く）を取得
  const barKeys = data.series
    .filter(series => series.name !== '合計')
    .map(series => series.name);

  // 税目ごとの色を取得
  const colorMap = {};
  data.series.forEach(series => {
    colorMap[series.name] = series.color;
  });

  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={{ value: '年度', position: 'insideBottomRight', offset: -10 }} />
          <YAxis 
            label={{ 
              value: '税収額（兆円）', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }} 
          />
          <Tooltip 
            formatter={(value) => [`${value} 兆円`, null]}
            labelFormatter={(label) => `${label}年度`}
          />
          <Legend verticalAlign="top" />

          {/* 各税目の棒グラフ */}
          {barKeys.map((key, index) => (
            <Bar 
              key={key}
              dataKey={key} 
              stackId="a" 
              fill={colorMap[key]} 
              name={key}
            />
          ))}

          {/* 合計の折れ線グラフ */}
          <Line
            type="monotone"
            dataKey="total"
            stroke={colorMap['合計'] || 'red'}
            strokeWidth={2}
            name="合計"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
