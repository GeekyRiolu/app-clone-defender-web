
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  Check, 
  Clock, 
  Search, 
  ArrowRightCircle,
  BarChart3,
  Smartphone,
  ArrowRight,
  FileText
} from 'lucide-react';
import MetricCard from '@/components/common/MetricCard';
import { 
  dashboardMetrics, 
  monitoredApps, 
  clonedApps, 
  recentAlerts,
  riskDistribution
} from '@/data/mockData';
import { Alert, ClonedApp, MonitoredApp } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/common/StatusBadge';
import AlertCard from '@/components/common/AlertCard';
import { BarChart } from '@/components/ui/charts';
import AppCloneCard from '@/components/common/AppCloneCard';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const getOriginalApp = (clonedApp: ClonedApp): MonitoredApp => {
    return monitoredApps.find(app => app.id === clonedApp.originalAppId) || monitoredApps[0];
  };

  const handleTakedownClick = (alertId?: string) => {
    console.log('Initiating takedown', alertId);
    toast({
      title: "Takedown Initiated",
      description: `Takedown request has been submitted`,
      variant: "default",
    });
  };

  const handleDetailsClick = (alertId?: string) => {
    console.log('Viewing details', alertId);
    // Navigate to alerts details page or show a dialog
    if (alertId) {
      // In a real app, we would navigate to a specific alert detail page
      // For now, we'll just navigate to the alerts page
      navigate('/alerts');
    }
  };
  
  const handleViewAllAlerts = () => {
    console.log('Viewing all alerts');
    navigate('/alerts');
  };

  const handleViewAllMonitoredApps = () => {
    console.log('Viewing all monitored apps');
    navigate('/monitoring');
  };

  const handleViewAllClones = () => {
    console.log('Viewing all clones');
    navigate('/monitoring');
  };

  const handleScanNow = () => {
    console.log('Scanning now');
    navigate('/scanner');
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage app clone threats</p>
        </div>
        <Button onClick={handleScanNow}>
          <Search className="h-4 w-4 mr-2" />
          Scan Now
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard
          title="Total Monitored Apps"
          value={monitoredApps.length}
          icon={<Smartphone />}
        />
        <MetricCard
          title="Active Clones"
          value={clonedApps.filter(app => app.status === 'active').length}
          change={40}
          status="negative"
          icon={<AlertTriangle />}
        />
        <MetricCard
          title="Takedown Success Rate"
          value="78%"
          change={3}
          status="positive"
          icon={<Check />}
        />
        <MetricCard
          title="Average Detection Time"
          value="4.2 hrs"
          change={-15}
          status="positive"
          icon={<Clock />}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-6">
        {/* Risk Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Risk Distribution</CardTitle>
            <CardDescription>Distribution of clone risk levels</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Critical</span>
                  </div>
                  <span className="text-sm font-medium">{riskDistribution.critical}</span>
                </div>
                <Progress value={(riskDistribution.critical / 5) * 100} className="h-2 bg-gray-100" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                    <span className="text-sm">High</span>
                  </div>
                  <span className="text-sm font-medium">{riskDistribution.high}</span>
                </div>
                <Progress value={(riskDistribution.high / 5) * 100} className="h-2 bg-gray-100" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm">Medium</span>
                  </div>
                  <span className="text-sm font-medium">{riskDistribution.medium}</span>
                </div>
                <Progress value={(riskDistribution.medium / 5) * 100} className="h-2 bg-gray-100" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Low</span>
                  </div>
                  <span className="text-sm font-medium">{riskDistribution.low}</span>
                </div>
                <Progress value={(riskDistribution.low / 5) * 100} className="h-2 bg-gray-100" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Recent Alerts</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={handleViewAllAlerts}>
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <CardDescription>
              Recent notifications and clone activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 overflow-auto max-h-[350px]">
            {recentAlerts.slice(0, 3).map((alert) => (
              <AlertCard 
                key={alert.id} 
                alert={alert} 
                onActionClick={() => {
                  if (alert.type === 'clone_detected' || alert.type === 'risk_increased') {
                    handleTakedownClick(alert.id);
                  } else if (alert.type === 'takedown_status') {
                    handleDetailsClick(alert.id);
                  }
                }}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* High Risk Clones */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">High Risk Clones</h2>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleViewAllClones}>
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {clonedApps
            .filter(app => app.riskLevel === 'critical' || app.riskLevel === 'high')
            .slice(0, 3)
            .map((clonedApp) => (
              <AppCloneCard 
                key={clonedApp.id}
                clonedApp={clonedApp}
                originalApp={getOriginalApp(clonedApp)}
                onTakedownClick={() => handleTakedownClick(clonedApp.id)}
                onDetailsClick={() => handleDetailsClick(clonedApp.id)}
              />
            ))}
        </div>
      </div>

      {/* Monitored Apps Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Monitored Apps</h2>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleViewAllMonitoredApps}>
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {monitoredApps.slice(0, 4).map((app) => (
            <Card key={app.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-12 w-12 rounded bg-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img src={app.iconUrl} alt={app.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium line-clamp-1">{app.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{app.packageName}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <StatusBadge type="monitoring" status={app.status} />
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {app.cloneCount} {app.cloneCount === 1 ? 'clone' : 'clones'}
                    </span>
                  </div>
                </div>
                <div className="border-t p-2 bg-gray-50 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs px-2 h-7"
                    onClick={() => handleDetailsClick(app.id)}
                  >
                    Details <ArrowRightCircle className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
