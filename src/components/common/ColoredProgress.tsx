
import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface ColoredProgressProps {
  value: number;
  className?: string;
  color?: string;
  bgColor?: string;
}

const ColoredProgress: React.FC<ColoredProgressProps> = ({
  value,
  className,
  color,
  bgColor = 'bg-gray-100'
}) => {
  return (
    <div className={cn('relative w-full overflow-hidden rounded-full', bgColor, className)}>
      <div 
        className="h-full transition-all rounded-full"
        style={{
          width: `${value}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
};

export default ColoredProgress;
