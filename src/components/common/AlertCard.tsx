
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from '@/types';
import { AlertTriangle, Bell, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';

interface AlertCardProps {
  alert: Alert;
  onActionClick?: () => void;
}

const AlertCard = ({ alert, onActionClick }: AlertCardProps) => {
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'clone_detected':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'risk_increased':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'takedown_status':
        return <Bell className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActionButton = () => {
    switch (alert.type) {
      case 'clone_detected':
        return (
          <Button size="sm" onClick={onActionClick}>
            Initiate Takedown
          </Button>
        );
      case 'risk_increased':
        return (
          <Button size="sm" onClick={onActionClick}>
            View Details
          </Button>
        );
      case 'takedown_status':
        if (alert.message.includes('removed')) {
          return (
            <Button size="sm" variant="outline" className="border-green-500 text-green-500" onClick={onActionClick}>
              <Check className="h-4 w-4 mr-1" /> Acknowledge
            </Button>
          );
        }
        return (
          <Button size="sm" variant="outline" onClick={onActionClick}>
            Check Status
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="mt-1 mr-3">{getAlertIcon()}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold">{alert.title}</h3>
              {alert.riskLevel && (
                <StatusBadge type="risk" status={alert.riskLevel} />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
              </span>
              {getActionButton()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
