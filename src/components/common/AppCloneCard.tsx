
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ClonedApp, MonitoredApp } from '@/types';
import StatusBadge from './StatusBadge';
import { Progress } from '@/components/ui/progress';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { AlertTriangle, FileText, Store, XCircle, Eye, ShieldAlert } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { ScanResult } from '@/services/scanService';

interface AppCloneCardProps {
  clonedApp: ClonedApp;
  originalApp: MonitoredApp;
  onTakedownClick?: () => void;
  onDetailsClick?: () => void;
}

const AppCloneCard = ({ clonedApp, originalApp, onTakedownClick, onDetailsClick }: AppCloneCardProps) => {
  const [showTakedownDialog, setShowTakedownDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
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

  const handleInitiateTakedown = () => {
    console.log('Initiating takedown for', clonedApp.id);
    
    // Call the parent handler if provided
    if (onTakedownClick) {
      onTakedownClick();
    }
    
    toast({
      title: "Takedown Initiated",
      description: `Takedown request submitted for ${clonedApp.name}`,
      variant: "default",
    });
    
    setShowTakedownDialog(false);
  };

  const handleViewDetails = () => {
    console.log('Viewing details for', clonedApp.id);
    
    // Call the parent handler if provided
    if (onDetailsClick) {
      onDetailsClick();
    }
    
    setShowDetailsDialog(true);
  };

  // Mock scan result data for the details dialog
  const mockScanResult: ScanResult = {
    fileName: clonedApp.name,
    fileSize: "24.3 MB",
    packageName: clonedApp.packageName,
    scanDate: clonedApp.detectedDate,
    overallScore: clonedApp.similarityScore,
    results: {
      malwareDetection: {
        score: clonedApp.riskLevel === 'critical' ? 30 : clonedApp.riskLevel === 'high' ? 55 : 75,
        details: [
          "Signature analysis complete",
          clonedApp.riskLevel === 'critical' ? "Malicious code patterns detected" : "No known malware signatures found",
          "Runtime behavior analyzed"
        ],
        color: clonedApp.riskLevel === 'critical' ? "bg-red-500" : clonedApp.riskLevel === 'high' ? "bg-orange-500" : "bg-green-500"
      },
      permissionAnalysis: {
        score: clonedApp.riskLevel === 'critical' ? 35 : clonedApp.riskLevel === 'high' ? 60 : 80,
        details: [
          "Dangerous permissions requested: " + (clonedApp.riskLevel === 'critical' ? "7" : clonedApp.riskLevel === 'high' ? "5" : "2"),
          "Sensitive data access: " + (clonedApp.riskLevel === 'critical' ? "High" : clonedApp.riskLevel === 'high' ? "Medium" : "Low"),
          "Permission pattern matches legitimate app: " + (clonedApp.riskLevel === 'critical' ? "Partially" : "Yes")
        ],
        color: clonedApp.riskLevel === 'critical' ? "bg-red-500" : clonedApp.riskLevel === 'high' ? "bg-orange-500" : "bg-green-500"
      },
      codeSignatureVerification: {
        score: clonedApp.riskLevel === 'critical' ? 20 : clonedApp.riskLevel === 'high' ? 40 : 90,
        details: [
          "Certificate validation: " + (clonedApp.riskLevel === 'critical' ? "Failed" : clonedApp.riskLevel === 'high' ? "Suspicious" : "Passed"),
          "Signature integrity: " + (clonedApp.riskLevel === 'critical' ? "Compromised" : clonedApp.riskLevel === 'high' ? "Questionable" : "Valid"),
          "Publisher verification: " + (clonedApp.riskLevel === 'critical' ? "Unknown publisher" : clonedApp.riskLevel === 'high' ? "Unverified publisher" : "Verified publisher")
        ],
        color: clonedApp.riskLevel === 'critical' ? "bg-red-500" : clonedApp.riskLevel === 'high' ? "bg-orange-500" : "bg-green-500"
      },
      packageNameSimilarity: {
        score: clonedApp.similarityScore,
        details: [
          `Similar to ${originalApp.name}`,
          `Package name similarity: ${clonedApp.similarityScore}%`,
          `Visual elements similarity: ${Math.min(95, clonedApp.similarityScore + 10)}%`
        ],
        color: clonedApp.similarityScore > 80 ? "bg-red-500" : clonedApp.similarityScore > 60 ? "bg-orange-500" : "bg-amber-500"
      }
    }
  };

  return (
    <>
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
                  <AlertDialog open={showTakedownDialog} onOpenChange={setShowTakedownDialog}>
                    <AlertDialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant={clonedApp.status === 'takedown_pending' ? 'outline' : 'default'} 
                        disabled={clonedApp.status === 'takedown_pending'}
                      >
                        {clonedApp.status === 'takedown_pending' ? 'Takedown Pending' : 'Initiate Takedown'}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Takedown Request</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to initiate a takedown request for {clonedApp.name}? 
                          This will start the process of removing the app from {clonedApp.store}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleInitiateTakedown} className="bg-red-600 hover:bg-red-700">
                          <ShieldAlert className="h-4 w-4 mr-2" />
                          Confirm Takedown
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <AlertDialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={handleViewDetails}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <AlertDialogHeader>
                      <AlertDialogTitle>App Clone Details</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="py-4">
                      {/* Import and use the ScanResult component for consistent display */}
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Clone Analysis: {clonedApp.name}</h3>
                        <div className="flex items-center gap-2">
                          <StatusBadge type="clone" status={clonedApp.status} />
                          <StatusBadge type="risk" status={clonedApp.riskLevel} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="space-y-2 mb-4">
                            <h4 className="font-medium">Clone Information</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Package Name:</span>
                                <span>{clonedApp.packageName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Store:</span>
                                <span>{clonedApp.store}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Detection Date:</span>
                                <span>{new Date(clonedApp.detectedDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Similarity Score:</span>
                                <span>{clonedApp.similarityScore}%</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Original App</h4>
                            <div className="rounded border p-3 flex items-center space-x-3">
                              <div className="h-10 w-10 rounded bg-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                <img src={originalApp.iconUrl} alt={originalApp.name} className="h-full w-full object-cover" />
                              </div>
                              <div>
                                <h5 className="font-medium">{originalApp.name}</h5>
                                <p className="text-xs text-muted-foreground">{originalApp.packageName}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">Risk Analysis</h4>
                          {Object.entries(mockScanResult.results).map(([key, result]) => (
                            <div key={key} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                <span className="text-sm font-medium">{result.score}%</span>
                              </div>
                              <Progress value={result.score} className="h-2.5" />
                              <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                                {result.details.map((detail, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="mr-1">•</span> {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                      {clonedApp.status !== 'removed' && clonedApp.status !== 'takedown_pending' && (
                        <AlertDialogAction onClick={handleInitiateTakedown} className="bg-red-600 hover:bg-red-700">
                          <ShieldAlert className="h-4 w-4 mr-2" />
                          Initiate Takedown
                        </AlertDialogAction>
                      )}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AppCloneCard;
