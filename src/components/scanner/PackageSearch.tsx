
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PackageSearchProps {
  searching: boolean;
}

const PackageSearch: React.FC<PackageSearchProps> = ({ searching }) => {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="packageName">Package Name</Label>
        <Input
          id="packageName"
          placeholder="e.g., com.example.myapp"
          disabled={searching}
        />
        <p className="text-xs text-muted-foreground">
          Enter the exact package name of your application
        </p>
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="appName">App Name (Optional)</Label>
        <Input
          id="appName"
          placeholder="e.g., My Awesome App"
          disabled={searching}
        />
      </div>
    </div>
  );
};

export default PackageSearch;
