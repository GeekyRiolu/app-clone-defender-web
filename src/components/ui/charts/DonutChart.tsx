
import React from 'react';
import { cn } from '@/lib/utils';

interface DonutChartProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  value,
  size = 100,
  strokeWidth = 10,
  color = 'text-primary',
  className,
}) => {
  // Ensure value is between 0 and 100
  const safeValue = Math.min(Math.max(value, 0), 100);
  
  // Calculate the circle's properties
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safeValue / 100) * circumference;
  
  return (
    <div className={cn('relative inline-flex', className)} style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        className="absolute inset-0"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          className="text-gray-100 dark:text-gray-800"
        />
      </svg>
      
      {/* Foreground circle (progress) */}
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        className="absolute inset-0 -rotate-90 transform"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          className={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
    </div>
  );
};
