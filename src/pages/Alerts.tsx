
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { recentAlerts, clonedApps, monitoredApps } from '@/data/mockData';
import { Alert, CloneRiskLevel } from '@/types';
import { AlertTriangle, Bell, Filter, MoreHorizontal, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import AlertCard from '@/components/common/AlertCard';
import StatusBadge from '@/components/common/StatusBadge';

const Alerts = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const filterAlertsByType = (alerts: Alert[], tab: string) => {
    if (tab === 'all') return alerts;
    if (tab === 'unread') return alerts.filter(alert => !alert.read);
    return alerts.filter(alert => alert.type === tab);
  };
  
  const filteredAlerts = filterAlertsByType(recentAlerts, activeTab);
  
  const handleActionClick = () => {
    console.log('Action clicked');
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Alerts</h1>
          <p className="text-muted-foreground">Manage notifications and threat alerts</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            Mark All Read
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <CardTitle>Recent Alerts</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search alerts..."
                className="pl-8 w-full sm:w-[250px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="clone_detected">Clone Detected</TabsTrigger>
              <TabsTrigger value="risk_increased">Risk Alerts</TabsTrigger>
              <TabsTrigger value="takedown_status">Takedown Status</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {filteredAlerts.length > 0 ? (
                <div className="space-y-4">
                  {filteredAlerts.map(alert => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onActionClick={handleActionClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No alerts found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    There are no alerts matching your current filter.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Alerts;
