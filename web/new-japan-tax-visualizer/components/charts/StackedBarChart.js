'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

/**
 * 積み上げ棒グラフコンポーネント
 * @param {Object} props
 * @param {Object} props.data - 棒グラフデータ
 * @param {string} props.xAxisLabel - X軸のラベル
 * @param {string} props.yAxisLabel - Y軸のラベル
 * @param {string} props.unit - 表示単位（億円、兆円など）
 * @param {string} props.title - グラフタイトル
 */
export default function StackedBarChart({ data, xAxisLabel, yAxisLabel, unit = "兆円", title }) {
  // データフォーマットの変換
  const chartData = data.years.map((year, index) => {
    const yearData = { year: year.toString() };
    
    // 各カテゴリのデータを追加
    data.series.forEach(series => {
      yearData[series.name] = series.data[index];
    });
    
    return yearData;
  });

  // 棒グラフのキーとカラーの取得
  const barKeys = data.series.map(series => series.name);
  const colorMap = {};
  
  data.series.forEach(series => {
    colorMap[series.name] = series.color;
  });

  return (
    <div className="w-full">
      {title && <h3 className="text-center mb-4">{title}</h3>}
      
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ 
                value: xAxisLabel, 
                position: 'insideBottomRight', 
                offset: -10 
              }} 
            />
            <YAxis 
              label={{ 
                value: yAxisLabel, 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }} 
            />
            <Tooltip 
              formatter={(value) => [`${value} ${unit}`, null]}
              labelFormatter={(label) => `${label}年度`}
            />
            <Legend />
            
            {/* 各カテゴリの棒グラフ */}
            {barKeys.map(key => (
              <Bar 
                key={key}
                dataKey={key} 
                stackId="a" 
                fill={colorMap[key]} 
                name={key}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
