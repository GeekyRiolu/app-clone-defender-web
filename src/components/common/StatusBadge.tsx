
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CloneRiskLevel, AppMonitoringStatus, CloneAppStatus } from '@/types';

interface StatusBadgeProps {
  type: 'risk' | 'monitoring' | 'clone';
  status: CloneRiskLevel | AppMonitoringStatus | CloneAppStatus;
  className?: string;
}

const StatusBadge = ({ type, status, className }: StatusBadgeProps) => {
  const getVariantAndText = () => {
    if (type === 'risk') {
      const riskStatus = status as CloneRiskLevel;
      switch (riskStatus) {
        case 'critical':
          return { variant: 'destructive', text: 'Critical' };
        case 'high':
          return { variant: 'destructive', text: 'High' };
        case 'medium':
          return { variant: 'outline', text: 'Medium', className: 'border-amber-500 text-amber-500' };
        case 'low':
          return { variant: 'outline', text: 'Low', className: 'border-green-500 text-green-500' };
      }
    }
    
    if (type === 'monitoring') {
      const monitorStatus = status as AppMonitoringStatus;
      switch (monitorStatus) {
        case 'active':
          return { variant: 'outline', text: 'Active', className: 'border-green-500 text-green-500' };
        case 'paused':
          return { variant: 'outline', text: 'Paused', className: 'border-amber-500 text-amber-500' };
        case 'error':
          return { variant: 'destructive', text: 'Error' };
      }
    }
    
    if (type === 'clone') {
      const cloneStatus = status as CloneAppStatus;
      switch (cloneStatus) {
        case 'active':
          return { variant: 'destructive', text: 'Active' };
        case 'takedown_pending':
          return { variant: 'outline', text: 'Takedown Pending', className: 'border-amber-500 text-amber-500' };
        case 'removed':
          return { variant: 'outline', text: 'Removed', className: 'border-green-500 text-green-500' };
      }
    }
    
    return { variant: 'default', text: String(status) };
  };
  
  const { variant, text, className: badgeClassName } = getVariantAndText();
  
  return (
    <Badge 
      variant={variant as any} 
      className={cn(badgeClassName, className)}
    >
      {text}
    </Badge>
  );
};

export default StatusBadge;
