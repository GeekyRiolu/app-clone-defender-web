
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  height?: string;
  valueFormatter?: (value: number) => string;
  yAxisWidth?: number;
  showLegend?: boolean;
  showAnimation?: boolean;
}

export function BarChart({
  data,
  index,
  categories,
  colors = ['#3b82f6', '#10b981', '#6366f1', '#f59e0b'],
  height = 'h-80',
  valueFormatter = (value) => value.toString(),
  yAxisWidth = 50,
  showLegend = true,
  showAnimation = false
}: BarChartProps) {
  return (
    <div className={cn("w-full", height)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey={index}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            width={yAxisWidth} 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={valueFormatter}
          />
          <Tooltip 
            formatter={(value: number) => [valueFormatter(value), '']}
          />
          {showLegend && <Legend />}
          
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
              isAnimationActive={showAnimation}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
