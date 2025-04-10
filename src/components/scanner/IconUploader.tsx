
import React from 'react';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';

interface IconUploaderProps {
  searching: boolean;
}

const IconUploader: React.FC<IconUploaderProps> = ({ searching }) => {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 mb-4">
      <div className="mb-4">
        <Image className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-1">Upload App Icon</h3>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Drag and drop your app icon or click to browse
      </p>
      <Button disabled={searching}>
        <Image className="h-4 w-4 mr-2" />
        Select Image
      </Button>
    </div>
  );
};

export default IconUploader;
