
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { recentAlerts, clonedApps, monitoredApps } from '@/data/mockData';
import { Alert, CloneRiskLevel } from '@/types';
import { AlertTriangle, Bell, Filter, MoreHorizontal, Search, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import AlertCard from '@/components/common/AlertCard';
import StatusBadge from '@/components/common/StatusBadge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const Alerts = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [alerts, setAlerts] = useState<Alert[]>(recentAlerts);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [riskFilter, setRiskFilter] = useState<CloneRiskLevel | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  
  // Filter alerts based on tab, search term and other filters
  const filterAlerts = () => {
    let filtered = [...recentAlerts];
    
    // Filter by tab
    if (activeTab !== 'all') {
      if (activeTab === 'unread') {
        filtered = filtered.filter(alert => !alert.read);
      } else {
        filtered = filtered.filter(alert => alert.type === activeTab);
      }
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(alert => 
        alert.title.toLowerCase().includes(term) || 
        alert.message.toLowerCase().includes(term)
      );
    }
    
    // Apply risk level filter
    if (riskFilter !== 'all') {
      filtered = filtered.filter(alert => alert.riskLevel === riskFilter);
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      filtered = filtered.filter(alert => {
        const alertDate = new Date(alert.timestamp);
        if (dateFilter === 'today') {
          return alertDate >= oneDayAgo;
        } else if (dateFilter === 'week') {
          return alertDate >= oneWeekAgo;
        }
        return true;
      });
    }
    
    return filtered;
  };
  
  const filteredAlerts = filterAlerts();
  
  const handleActionClick = () => {
    console.log('Action clicked');
  };
  
  const handleMarkAllRead = () => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => ({
        ...alert,
        read: true
      }))
    );
    
    // Update the recentAlerts data (simulating a backend update)
    for (let i = 0; i < recentAlerts.length; i++) {
      recentAlerts[i].read = true;
    }
    
    toast({
      title: "All alerts marked as read",
      description: `${recentAlerts.length} alerts have been marked as read`,
      variant: "default",
    });
  };
  
  const resetFilters = () => {
    setRiskFilter('all');
    setDateFilter('all');
    setFilterOpen(false);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Alerts</h1>
          <p className="text-muted-foreground">Manage notifications and threat alerts</p>
        </div>
        <div className="flex space-x-2">
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filter Alerts</h4>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Risk Level</label>
                  <Select 
                    defaultValue={riskFilter} 
                    onValueChange={(value) => setRiskFilter(value as CloneRiskLevel | 'all')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Period</label>
                  <Select 
                    defaultValue={dateFilter} 
                    onValueChange={setDateFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Last 24 Hours</SelectItem>
                      <SelectItem value="week">Last Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                  <Button size="sm" onClick={() => setFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button onClick={handleMarkAllRead}>
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
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <button 
                  className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
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
