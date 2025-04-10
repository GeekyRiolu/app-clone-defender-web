
import React from 'react';
import { cn } from '@/lib/utils';

interface ColoredProgressProps {
  value: number;
  className?: string;
  color?: string;
  bgColor?: string;
  showLabel?: boolean;
}

const ColoredProgress: React.FC<ColoredProgressProps> = ({
  value,
  className,
  color = '#22c55e',
  bgColor = 'bg-gray-100',
  showLabel = false
}) => {
  // Limit the value to between 0 and 100
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn('relative w-full overflow-hidden rounded-full', bgColor, className)}>
      <div 
        className="h-full transition-all rounded-full"
        style={{
          width: `${safeValue}%`,
          backgroundColor: color
        }}
      />
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white">
            {safeValue}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ColoredProgress;
