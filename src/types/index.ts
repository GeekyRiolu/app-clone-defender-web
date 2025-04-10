
export type AppMonitoringStatus = 'active' | 'paused' | 'error';

export type CloneRiskLevel = 'critical' | 'high' | 'medium' | 'low';

export type CloneAppStatus = 'active' | 'takedown_pending' | 'removed';

export interface MonitoredApp {
  id: string;
  name: string;
  packageName: string;
  iconUrl: string;
  description: string;
  status: AppMonitoringStatus;
  lastScanned: string;
  cloneCount: number;
}

export interface ClonedApp {
  id: string;
  originalAppId: string;
  name: string;
  packageName: string;
  store: string;
  iconUrl: string;
  similarityScore: number;
  riskLevel: CloneRiskLevel;
  detectedDate: string;
  status: CloneAppStatus;
}

export interface Alert {
  id: string;
  type: 'clone_detected' | 'risk_increased' | 'takedown_status';
  title: string;
  message: string;
  timestamp: string;
  clonedAppId?: string;
  originalAppId?: string;
  riskLevel?: CloneRiskLevel;
  read: boolean;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  status?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}
