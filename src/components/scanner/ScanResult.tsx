import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { ScanResult as ScanResultType } from '@/services/scanService';
import { DonutChart } from '@/components/ui/charts';
import ColoredProgress from '@/components/common/ColoredProgress';

interface ScanResultProps {
  scanResult: ScanResultType;
  onResetScan: () => void;
}

const ScanResult: React.FC<ScanResultProps> = ({ scanResult, onResetScan }) => {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Scan Results: {scanResult.fileName}</h3>
        <Button variant="outline" size="sm" onClick={onResetScan}>
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
            <ScanResultCategory 
              title="Malware Detection"
              score={scanResult.results.malwareDetection.score}
              details={scanResult.results.malwareDetection.details}
              color={scanResult.results.malwareDetection.color}
            />
            
            <ScanResultCategory 
              title="Permission Analysis"
              score={scanResult.results.permissionAnalysis.score}
              details={scanResult.results.permissionAnalysis.details}
              color={scanResult.results.permissionAnalysis.color}
            />
            
            <ScanResultCategory 
              title="Code Signature"
              score={scanResult.results.codeSignatureVerification.score}
              details={scanResult.results.codeSignatureVerification.details}
              color={scanResult.results.codeSignatureVerification.color}
            />
            
            <ScanResultCategory 
              title="Package Name Similarity"
              score={scanResult.results.packageNameSimilarity.score}
              details={scanResult.results.packageNameSimilarity.details}
              color={scanResult.results.packageNameSimilarity.color}
            />
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
  );
};

interface ScanResultCategoryProps {
  title: string;
  score: number;
  details: string[];
  color: string;
}

const ScanResultCategory: React.FC<ScanResultCategoryProps> = ({ 
  title, 
  score, 
  details, 
  color 
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm">{title}</span>
        <span className="text-sm font-medium">{score}%</span>
      </div>
      <ColoredProgress 
        value={score} 
        className="h-2.5" 
        color={color}
      />
      <ul className="text-xs text-muted-foreground space-y-1 mt-1">
        {details.map((detail, i) => (
          <li key={i} className="flex items-start">
            <span className="mr-1">•</span> {detail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScanResult;
