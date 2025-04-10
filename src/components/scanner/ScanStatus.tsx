
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader2, RotateCw } from 'lucide-react';

interface ScanStatusProps {
  scanStatus: {
    totalScans: number;
    completedScans: number;
    inProgressScans: number;
    failedScans: number;
  };
}

const ScanStatus: React.FC<ScanStatusProps> = ({ scanStatus }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-sm">Scan Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Scans</span>
            <span className="font-medium">{scanStatus.totalScans}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Completed</span>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
              <span className="font-medium">{scanStatus.completedScans}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">In Progress</span>
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 text-blue-500 mr-1.5 animate-spin" />
              <span className="font-medium">{scanStatus.inProgressScans}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Failed</span>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-500 mr-1.5" />
              <span className="font-medium">{scanStatus.failedScans}</span>
            </div>
          </div>
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full">
              <RotateCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScanStatus;
