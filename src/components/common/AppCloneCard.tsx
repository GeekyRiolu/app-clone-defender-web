
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ClonedApp, MonitoredApp } from '@/types';
import StatusBadge from './StatusBadge';
import { Progress } from '@/components/ui/progress';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { AlertTriangle, FileText, Store, XCircle } from 'lucide-react';

interface AppCloneCardProps {
  clonedApp: ClonedApp;
  originalApp: MonitoredApp;
  onTakedownClick?: () => void;
  onDetailsClick?: () => void;
}

const AppCloneCard = ({ clonedApp, originalApp, onTakedownClick, onDetailsClick }: AppCloneCardProps) => {
  const getRiskColor = () => {
    switch (clonedApp.riskLevel) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="h-12 w-12 rounded bg-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img src={clonedApp.iconUrl} alt={clonedApp.name} className="h-full w-full object-cover" />
          </div>
          
          <div className="ml-4 flex-1">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="font-semibold">{clonedApp.name}</h3>
                <p className="text-xs text-muted-foreground">
                  Clone of <span className="font-medium">{originalApp.name}</span>
                </p>
              </div>
              <StatusBadge type="clone" status={clonedApp.status} />
            </div>
            
            <div className="flex items-center space-x-4 mt-2 mb-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs">Similarity</span>
                  <span className="text-xs font-medium">{clonedApp.similarityScore}%</span>
                </div>
                <Progress value={clonedApp.similarityScore} className="h-2" />
              </div>
              
              <div className="flex items-center space-x-1">
                <AlertTriangle className={`h-4 w-4 ${
                  clonedApp.riskLevel === 'critical' || clonedApp.riskLevel === 'high' 
                    ? 'text-red-500' 
                    : 'text-amber-500'
                }`} />
                <StatusBadge type="risk" status={clonedApp.riskLevel} />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
              <div className="flex items-center">
                <Store className="h-3 w-3 mr-1" />
                <span>{clonedApp.store}</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-3 w-3 mr-1" />
                <span>{clonedApp.packageName}</span>
              </div>
              <div>
                Detected {formatDistanceToNow(new Date(clonedApp.detectedDate), { addSuffix: true })}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {clonedApp.status !== 'removed' && (
                <Button 
                  size="sm" 
                  variant={clonedApp.status === 'takedown_pending' ? 'outline' : 'default'} 
                  onClick={onTakedownClick}
                  disabled={clonedApp.status === 'takedown_pending'}
                >
                  {clonedApp.status === 'takedown_pending' ? 'Takedown Pending' : 'Initiate Takedown'}
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={onDetailsClick}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppCloneCard;
