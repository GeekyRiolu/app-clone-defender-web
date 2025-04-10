
import React, { useState } from 'react';
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
  Image, 
  Loader2, 
  RotateCw, 
  Search, 
  Shield, 
  Upload
} from 'lucide-react';
import { scanStatus } from '@/data/mockData';

const Scanner = () => {
  const [searching, setSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanTab, setScanTab] = useState('package');

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

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">App Scanner</h1>
          <p className="text-muted-foreground">Scan app stores for potential clones</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Clone Detection Scanner</CardTitle>
              <CardDescription>
                Search app stores for potential clones of your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="package" onValueChange={setScanTab}>
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
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 mb-4">
                    <div className="mb-4">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Upload APK File</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Drag and drop your APK file or click to browse
                    </p>
                    <Button disabled={searching}>
                      <FileSearch className="h-4 w-4 mr-2" />
                      Select APK File
                    </Button>
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
                            High Similarity Only ({">"} 75%)
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
              </Tabs>
            </CardContent>
          </Card>
        </div>

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
      </div>
    </MainLayout>
  );
};

export default Scanner;
