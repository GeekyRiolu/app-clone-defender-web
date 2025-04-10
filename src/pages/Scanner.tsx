
import React, { useState, useCallback } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  AlertCircle,
  Check, 
  CheckCircle, 
  FileSearch, 
  FileScan,
  Image, 
  Loader2, 
  RotateCw, 
  Search, 
  Shield, 
  Upload,
  X
} from 'lucide-react';
import { scanStatus } from '@/data/mockData';
import { ScanResult, scanApkFile } from '@/services/scanService';
import { toast } from '@/hooks/use-toast';
import { useToast } from '@/hooks/use-toast';
import ColoredProgress from '@/components/common/ColoredProgress';
import { DonutChart } from '@/components/ui/charts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
  }, []);

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
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

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

  const getScanResultColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  const getScanResultLabel = (score: number) => {
    if (score >= 70) return "Low Risk";
    if (score >= 50) return "Medium Risk";
    return "High Risk";
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">App Scanner</h1>
          <p className="text-muted-foreground">Scan app stores for potential clones</p>
        </div>
      </div>

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
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Scan Results: {scanResult.fileName}</h3>
                    <Button variant="outline" size="sm" onClick={handleResetScan}>
                      <RotateCw className="h-4 w-4 mr-2" />
                      New Scan
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-48 h-48 relative mb-4">
                        <DonutChart 
                          value={scanResult.overallScore} 
                          size={192}
                          strokeWidth={16}
                          color={getScanResultColor(scanResult.overallScore).replace('bg-', 'text-')}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold">{scanResult.overallScore}%</span>
                          <span className="text-sm text-muted-foreground">{getScanResultLabel(scanResult.overallScore)}</span>
                        </div>
                      </div>
                      <h4 className="text-xl font-medium mb-2">Overall Safety Score</h4>
                      <p className="text-sm text-center text-muted-foreground">
                        Scan completed on {new Date(scanResult.scanDate).toLocaleString()}
                      </p>
                      <div className="mt-4 text-center">
                        <p className="text-sm mb-2">File Information:</p>
                        <p className="text-sm text-muted-foreground">Size: {scanResult.fileSize}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-3">Detailed Analysis</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Malware Detection</span>
                            <span className="text-sm font-medium">{scanResult.results.malwareDetection.score}%</span>
                          </div>
                          <ColoredProgress 
                            value={scanResult.results.malwareDetection.score} 
                            className="h-2.5" 
                            color={scanResult.results.malwareDetection.color}
                          />
                          <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                            {scanResult.results.malwareDetection.details.map((detail, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-1">•</span> {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Permission Analysis</span>
                            <span className="text-sm font-medium">{scanResult.results.permissionAnalysis.score}%</span>
                          </div>
                          <ColoredProgress 
                            value={scanResult.results.permissionAnalysis.score} 
                            className="h-2.5" 
                            color={scanResult.results.permissionAnalysis.color}
                          />
                          <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                            {scanResult.results.permissionAnalysis.details.map((detail, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-1">•</span> {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Code Signature</span>
                            <span className="text-sm font-medium">{scanResult.results.codeSignatureVerification.score}%</span>
                          </div>
                          <ColoredProgress 
                            value={scanResult.results.codeSignatureVerification.score} 
                            className="h-2.5" 
                            color={scanResult.results.codeSignatureVerification.color}
                          />
                          <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                            {scanResult.results.codeSignatureVerification.details.map((detail, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-1">•</span> {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Package Name Similarity</span>
                            <span className="text-sm font-medium">{scanResult.results.packageNameSimilarity.score}%</span>
                          </div>
                          <ColoredProgress 
                            value={scanResult.results.packageNameSimilarity.score} 
                            className="h-2.5" 
                            color={scanResult.results.packageNameSimilarity.color}
                          />
                          <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                            {scanResult.results.packageNameSimilarity.details.map((detail, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-1">•</span> {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-lg font-medium mb-3">Recommendation</h4>
                    <p className="text-sm">
                      {scanResult.overallScore >= 70 
                        ? "This application appears to be legitimate with no major security concerns detected."
                        : scanResult.overallScore >= 50
                        ? "This application has some suspicious characteristics. Review the detailed analysis before installation."
                        : "This application shows signs of being a potential clone or containing malicious code. Avoid installation."}
                    </p>
                  </div>
                </div>
              ) : (
                <Tabs defaultValue={scanTab} onValueChange={setScanTab}>
                  <TabsList className="mb-4 grid w-full grid-cols-3">
                    <TabsTrigger value="package">Package Name</TabsTrigger>
                    <TabsTrigger value="apk">APK Upload</TabsTrigger>
                    <TabsTrigger value="icon">App Icon</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="package">
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
                  </TabsContent>
                  
                  <TabsContent value="apk">
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
                              onClick={handleScan} 
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
                            <Button as="span" disabled={searching}>
                              <FileSearch className="h-4 w-4 mr-2" />
                              Select APK File
                            </Button>
                          </label>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      <p className="mb-1">Supported file types: .apk</p>
                      <p>Maximum file size: 100MB</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="icon">
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
                  </TabsContent>
                  
                  {scanTab !== 'apk' && (
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
                            <Button variant="outline" onClick={() => setSearching(false)}>
                              Cancel Scan
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button className="w-full" onClick={handleStartSearch}>
                          <Search className="h-4 w-4 mr-2" />
                          Start Scanning
                        </Button>
                      )}
                    </div>
                  )}
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>

        {!scanResult && (
          <div>
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
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Scanner;
