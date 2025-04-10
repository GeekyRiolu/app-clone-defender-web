
import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { FileScan, Loader2, Search, Upload, X, FileSearch } from 'lucide-react';

interface ApkUploaderProps {
  file: File | null;
  isScanning: boolean;
  setFile: (file: File | null) => void;
  onScan: () => void;
}

const ApkUploader: React.FC<ApkUploaderProps> = ({ file, isScanning, setFile, onScan }) => {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is an APK
      if (!selectedFile.name.endsWith('.apk')) {
        toast({
          title: "Invalid File Format",
          description: "Please select an APK file.",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
      toast({
        title: "File Selected",
        description: `${selectedFile.name} ready for scanning.`,
      });
    }
  }, [setFile]);

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Check if file is an APK
      if (!droppedFile.name.endsWith('.apk')) {
        toast({
          title: "Invalid File Format",
          description: "Please select an APK file.",
          variant: "destructive",
        });
        return;
      }
      
      setFile(droppedFile);
      toast({
        title: "File Selected",
        description: `${droppedFile.name} ready for scanning.`,
      });
    }
  }, [setFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <div 
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 mb-4 ${
          file ? 'border-primary bg-primary/5' : ''
        }`}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <div className="text-center">
            <div className="mb-4">
              <FileScan className="h-10 w-10 text-primary mx-auto" />
            </div>
            <h3 className="text-lg font-medium mb-1">{file.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <div className="flex space-x-2 justify-center">
              <Button 
                onClick={onScan} 
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Start Scan
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setFile(null)}
                disabled={isScanning}
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <Upload className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">Upload APK File</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Drag and drop your APK file or click to browse
            </p>
            <input
              type="file"
              id="apkFile"
              className="hidden"
              onChange={handleFileChange}
              accept=".apk"
            />
            <label htmlFor="apkFile">
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                <FileSearch className="h-4 w-4 mr-2" />
                Select APK File
              </div>
            </label>
          </>
        )}
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        <p className="mb-1">Supported file types: .apk</p>
        <p>Maximum file size: 100MB</p>
      </div>
    </>
  );
};

export default ApkUploader;
