
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { scanStatus } from '@/data/mockData';
import { ScanResult, scanApkFile } from '@/services/scanService';
import { toast } from '@/hooks/use-toast';

// Import refactored components
import ScannerHeader from '@/components/scanner/ScannerHeader';
import ScanResult from '@/components/scanner/ScanResult';
import ApkUploader from '@/components/scanner/ApkUploader';
import IconUploader from '@/components/scanner/IconUploader';
import PackageSearch from '@/components/scanner/PackageSearch';
import ScanOptions from '@/components/scanner/ScanOptions';
import ScanStatus from '@/components/scanner/ScanStatus';
import ScanFeatures from '@/components/scanner/ScanFeatures';

const Scanner = () => {
  const [searching, setSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanTab, setScanTab] = useState('package');
  const [file, setFile] = useState<File | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleStartSearch = () => {
    setSearching(true);
    setProgress(0);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setSearching(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleScan = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select an APK file to scan.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsScanning(true);
      setScanResult(null);
      
      // Process scan
      const result = await scanApkFile(file);
      setScanResult(result);
      
      // Show toast based on scan score
      if (result.overallScore >= 70) {
        toast({
          title: "Scan Complete: Low Risk",
          description: "This APK appears to be legitimate.",
        });
      } else if (result.overallScore >= 50) {
        toast({
          title: "Scan Complete: Medium Risk",
          description: "This APK has some suspicious characteristics.",
        });
      } else {
        toast({
          title: "Scan Complete: High Risk",
          description: "This APK is likely a fake or malicious clone.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Scan Failed",
        description: "An error occurred during the scan.",
        variant: "destructive",
      });
      console.error("Scan error:", error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleResetScan = () => {
    setFile(null);
    setScanResult(null);
  };

  return (
    <MainLayout>
      <ScannerHeader />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className={scanResult ? "lg:col-span-3" : "lg:col-span-2"}>
          <Card>
            <CardHeader>
              <CardTitle>Clone Detection Scanner</CardTitle>
              <CardDescription>
                Search app stores for potential clones of your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scanResult ? (
                <ScanResult scanResult={scanResult} onResetScan={handleResetScan} />
              ) : (
                <Tabs defaultValue={scanTab} onValueChange={setScanTab}>
                  <TabsList className="mb-4 grid w-full grid-cols-3">
                    <TabsTrigger value="package">Package Name</TabsTrigger>
                    <TabsTrigger value="apk">APK Upload</TabsTrigger>
                    <TabsTrigger value="icon">App Icon</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="package">
                    <PackageSearch searching={searching} />
                  </TabsContent>
                  
                  <TabsContent value="apk">
                    <ApkUploader
                      file={file}
                      isScanning={isScanning}
                      setFile={setFile}
                      onScan={handleScan}
                    />
                  </TabsContent>
                  
                  <TabsContent value="icon">
                    <IconUploader searching={searching} />
                  </TabsContent>
                  
                  {scanTab !== 'apk' && (
                    <ScanOptions 
                      searching={searching}
                      progress={progress}
                      onStartSearch={handleStartSearch}
                      onCancelSearch={() => setSearching(false)}
                    />
                  )}
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>

        {!scanResult && (
          <div>
            <ScanStatus scanStatus={scanStatus} />
            <ScanFeatures />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Scanner;
