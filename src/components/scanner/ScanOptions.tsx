
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Search } from 'lucide-react';

interface ScanOptionsProps {
  searching: boolean;
  progress: number;
  onStartSearch: () => void;
  onCancelSearch: () => void;
}

const ScanOptions: React.FC<ScanOptionsProps> = ({ 
  searching, 
  progress, 
  onStartSearch, 
  onCancelSearch 
}) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-2">
        <Label>Scan Options</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-start space-x-2">
            <Checkbox id="officialStores" defaultChecked />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="officialStores" className="text-sm font-normal">
                Official App Stores
              </Label>
              <p className="text-xs text-muted-foreground">
                Google Play, Apple App Store
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="thirdPartyStores" defaultChecked />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="thirdPartyStores" className="text-sm font-normal">
                Third-Party App Stores
              </Label>
              <p className="text-xs text-muted-foreground">
                Alternative markets and stores
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="deepScan" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="deepScan" className="text-sm font-normal">
                Deep Code Analysis
              </Label>
              <p className="text-xs text-muted-foreground">
                Performs code similarity analysis
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="similarityThreshold" defaultChecked />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="similarityThreshold" className="text-sm font-normal">
                High Similarity Only ({">"}75%)
              </Label>
              <p className="text-xs text-muted-foreground">
                Filter results by similarity score
              </p>
            </div>
          </div>
        </div>
      </div>

      {searching ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Scanning Progress</Label>
            <span className="text-sm">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="pt-2 flex justify-center">
            <Button variant="outline" onClick={onCancelSearch}>
              Cancel Scan
            </Button>
          </div>
        </div>
      ) : (
        <Button className="w-full" onClick={onStartSearch}>
          <Search className="h-4 w-4 mr-2" />
          Start Scanning
        </Button>
      )}
    </div>
  );
};

export default ScanOptions;
