
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const ScanFeatures = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Scanning Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5">
              <Check className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Package Name Analysis</p>
              <p className="text-xs text-muted-foreground">
                Detect similar package names and variations
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="mt-0.5">
              <Check className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">UI/UX Comparison</p>
              <p className="text-xs text-muted-foreground">
                Compare visual elements and interface design
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="mt-0.5">
              <Check className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Icon & Asset Detection</p>
              <p className="text-xs text-muted-foreground">
                Identify copied or slightly modified art assets
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="mt-0.5">
              <Check className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">APK Signature Analysis</p>
              <p className="text-xs text-muted-foreground">
                Check for repackaged or tampered applications
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="mt-0.5">
              <Check className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Malware Risk Assessment</p>
              <p className="text-xs text-muted-foreground">
                Evaluate potential security threats in clones
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScanFeatures;
