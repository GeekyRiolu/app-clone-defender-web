
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  status?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  className?: string;
}

const MetricCard = ({ title, value, change, status, icon, className }: MetricCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-5 w-5 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className="flex items-center text-xs text-muted-foreground mt-1">
            {status === 'positive' ? (
              <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
            ) : status === 'negative' ? (
              <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
            ) : null}
            <span 
              className={cn(
                status === 'positive' ? 'text-green-500' : 
                status === 'negative' ? 'text-red-500' : 
                'text-muted-foreground'
              )}
            >
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="ml-1">from last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
