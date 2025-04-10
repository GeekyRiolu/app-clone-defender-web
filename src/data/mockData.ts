
import { MonitoredApp, ClonedApp, Alert } from '@/types';

export const monitoredApps: MonitoredApp[] = [
  {
    id: '1',
    name: 'Secure Messaging Pro',
    packageName: 'com.company.securemsg',
    iconUrl: '/placeholder.svg',
    description: 'End-to-end encrypted messaging application',
    status: 'active',
    lastScanned: '2025-04-09T15:30:00Z',
    cloneCount: 3
  },
  {
    id: '2',
    name: 'Cloud Bank',
    packageName: 'com.cloudbank.mobile',
    iconUrl: '/placeholder.svg',
    description: 'Mobile banking application',
    status: 'active',
    lastScanned: '2025-04-10T10:15:00Z',
    cloneCount: 5
  },
  {
    id: '3',
    name: 'Super VPN',
    packageName: 'com.supervpn.client',
    iconUrl: '/placeholder.svg',
    description: 'Virtual private network service',
    status: 'active',
    lastScanned: '2025-04-10T08:45:00Z',
    cloneCount: 12
  },
  {
    id: '4',
    name: 'Photo Editor Pro',
    packageName: 'com.photoeditor.pro',
    iconUrl: '/placeholder.svg',
    description: 'Advanced photo editing tools',
    status: 'paused',
    lastScanned: '2025-04-08T14:20:00Z',
    cloneCount: 1
  },
  {
    id: '5',
    name: 'Fitness Tracker',
    packageName: 'com.fitnesstracker.app',
    iconUrl: '/placeholder.svg',
    description: 'Health and fitness tracking application',
    status: 'error',
    lastScanned: '2025-04-09T09:10:00Z',
    cloneCount: 0
  }
];

export const clonedApps: ClonedApp[] = [
  {
    id: 'c1',
    originalAppId: '3',
    name: 'Super VPN Pro',
    packageName: 'com.supervpn.free',
    store: 'Third-Party Store A',
    iconUrl: '/placeholder.svg',
    similarityScore: 92,
    riskLevel: 'critical',
    detectedDate: '2025-04-10T07:30:00Z',
    status: 'active'
  },
  {
    id: 'c2',
    originalAppId: '3',
    name: 'SuperFast VPN',
    packageName: 'net.fastsuper.vpn',
    store: 'Alternative App Store',
    iconUrl: '/placeholder.svg',
    similarityScore: 87,
    riskLevel: 'high',
    detectedDate: '2025-04-09T15:45:00Z',
    status: 'takedown_pending'
  },
  {
    id: 'c3',
    originalAppId: '2',
    name: 'Cloud Banking',
    packageName: 'org.cloudbanking.app',
    store: 'Third-Party Store B',
    iconUrl: '/placeholder.svg',
    similarityScore: 95,
    riskLevel: 'critical',
    detectedDate: '2025-04-09T09:20:00Z',
    status: 'active'
  },
  {
    id: 'c4',
    originalAppId: '1',
    name: 'Secure Message',
    packageName: 'com.secure.messenger',
    store: 'Alternative App Store',
    iconUrl: '/placeholder.svg',
    similarityScore: 78,
    riskLevel: 'medium',
    detectedDate: '2025-04-08T13:10:00Z',
    status: 'takedown_pending'
  },
  {
    id: 'c5',
    originalAppId: '2',
    name: 'Cloud Bank Mobile',
    packageName: 'com.cloud.banking',
    store: 'Third-Party Store C',
    iconUrl: '/placeholder.svg',
    similarityScore: 89,
    riskLevel: 'high',
    detectedDate: '2025-04-07T17:30:00Z',
    status: 'removed'
  }
];

export const recentAlerts: Alert[] = [
  {
    id: 'a1',
    type: 'clone_detected',
    title: 'Critical Clone Detected',
    message: '"Super VPN Pro" clone of "Super VPN" detected with 92% similarity',
    timestamp: '2025-04-10T07:30:00Z',
    clonedAppId: 'c1',
    originalAppId: '3',
    riskLevel: 'critical',
    read: false
  },
  {
    id: 'a2',
    type: 'clone_detected',
    title: 'High Risk Clone Detected',
    message: '"SuperFast VPN" clone of "Super VPN" detected with 87% similarity',
    timestamp: '2025-04-09T15:45:00Z',
    clonedAppId: 'c2',
    originalAppId: '3',
    riskLevel: 'high',
    read: false
  },
  {
    id: 'a3',
    type: 'risk_increased',
    title: 'Risk Level Increased',
    message: 'Risk level for "Cloud Banking" clone increased to CRITICAL',
    timestamp: '2025-04-09T12:15:00Z',
    clonedAppId: 'c3',
    riskLevel: 'critical',
    read: true
  },
  {
    id: 'a4',
    type: 'takedown_status',
    title: 'Takedown In Progress',
    message: 'Takedown request for "Cloud Bank Mobile" has been acknowledged',
    timestamp: '2025-04-08T09:30:00Z',
    clonedAppId: 'c5',
    read: true
  },
  {
    id: 'a5',
    type: 'takedown_status',
    title: 'Clone Removed',
    message: '"Cloud Bank Mobile" clone has been successfully removed',
    timestamp: '2025-04-07T18:45:00Z',
    clonedAppId: 'c5',
    read: true
  }
];

export const dashboardMetrics = [
  {
    title: 'Total Monitored Apps',
    value: 5,
    change: 1,
    status: 'positive' as const
  },
  {
    title: 'Active Clones',
    value: 3,
    change: 2,
    status: 'negative' as const
  },
  {
    title: 'Takedown Success Rate',
    value: '78%',
    change: 3,
    status: 'positive' as const
  },
  {
    title: 'Average Detection Time',
    value: '4.2 hrs',
    change: -0.8,
    status: 'positive' as const
  }
];

export const riskDistribution = {
  critical: 2,
  high: 2,
  medium: 1,
  low: 0
};

export const cloneDetectionTrend = [
  { date: '2025-03-10', count: 2 },
  { date: '2025-03-17', count: 3 },
  { date: '2025-03-24', count: 1 },
  { date: '2025-03-31', count: 4 },
  { date: '2025-04-07', count: 5 },
];

export const scanStatus = {
  totalScans: 124,
  completedScans: 122,
  inProgressScans: 2,
  failedScans: 0
};
