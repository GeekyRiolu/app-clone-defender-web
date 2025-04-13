import { toast } from "@/hooks/use-toast";

export type ScanResult = {
  id?: string;
  fileName: string;
  fileSize: string;
  packageName: string; // Added packageName property
  scanDate: string;
  overallScore: number;
  results: {
    malwareDetection: {
      score: number;
      details: string[];
      color: string;
    };
    permissionAnalysis: {
      score: number;
      details: string[];
      color: string;
    };
    codeSignatureVerification: {
      score: number;
      details: string[];
      color: string;
    };
    packageNameSimilarity: {
      score: number;
      details: string[];
      color: string;
    };
  };
};

// This would connect to a real API in production
export const scanApkFile = async (file: File): Promise<ScanResult> => {
  // Show toast notification that scan has started
  toast({
    title: "Scan Started",
    description: `Analyzing ${file.name}...`,
  });
  
  // Mock API call with timeout to simulate real scanning process
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, generate a mock scan result
      const isSuspicious = Math.random() > 0.7;
      
      const result: ScanResult = {
        id: crypto.randomUUID(),
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        packageName: file.name,
        scanDate: new Date().toISOString(),
        overallScore: isSuspicious ? Math.floor(Math.random() * 40) + 30 : Math.floor(Math.random() * 30) + 70,
        results: {
          malwareDetection: {
            score: isSuspicious ? Math.floor(Math.random() * 50) + 30 : Math.floor(Math.random() * 20) + 80,
            details: isSuspicious 
              ? ["Suspicious code patterns detected", "Contains known malware signatures"] 
              : ["No malware detected", "Clean scan result"],
            color: isSuspicious ? "#f87171" : "#22c55e"
          },
          permissionAnalysis: {
            score: isSuspicious ? Math.floor(Math.random() * 60) + 20 : Math.floor(Math.random() * 30) + 70,
            details: isSuspicious 
              ? ["Excessive permission requests", "Unnecessary system access"] 
              : ["Standard permissions only", "No excessive privileges requested"],
            color: isSuspicious ? "#fb923c" : "#22c55e"
          },
          codeSignatureVerification: {
            score: isSuspicious ? Math.floor(Math.random() * 70) + 10 : Math.floor(Math.random() * 20) + 80,
            details: isSuspicious 
              ? ["Invalid signature detected", "Package signature mismatch"] 
              : ["Valid code signature", "Properly signed package"],
            color: isSuspicious ? "#f87171" : "#22c55e"
          },
          packageNameSimilarity: {
            score: isSuspicious ? Math.floor(Math.random() * 80) : Math.floor(Math.random() * 30) + 70,
            details: isSuspicious 
              ? ["Similar to legitimate package name", "Potential typosquatting"] 
              : ["Unique package name", "No similarity to known brands"],
            color: isSuspicious ? "#fb923c" : "#22c55e"
          }
        }
      };
      
      // Show toast notification that scan is complete
      toast({
        title: "Scan Complete",
        description: `Analysis of ${file.name} finished.`,
      });
      
      resolve(result);
    }, 3000); // 3 second delay to simulate scan process
  });
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
