
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from '@/components/ui/table';
import { Plus, Search, SlidersHorizontal, Smartphone } from 'lucide-react';
import StatusBadge from '@/components/common/StatusBadge';
import { monitoredApps } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';

const Monitoring = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">App Monitoring</h1>
          <p className="text-muted-foreground">Manage your monitored applications</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New App
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Monitoring Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border rounded-lg p-4 flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Apps</p>
                <p className="text-2xl font-bold">{monitoredApps.length}</p>
              </div>
            </div>
            <div className="border rounded-lg p-4 flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <StatusBadge type="monitoring" status="active" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">
                  {monitoredApps.filter(app => app.status === 'active').length}
                </p>
              </div>
            </div>
            <div className="border rounded-lg p-4 flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <StatusBadge type="monitoring" status="paused" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Paused</p>
                <p className="text-2xl font-bold">
                  {monitoredApps.filter(app => app.status === 'paused').length}
                </p>
              </div>
            </div>
            <div className="border rounded-lg p-4 flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <StatusBadge type="monitoring" status="error" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Error</p>
                <p className="text-2xl font-bold">
                  {monitoredApps.filter(app => app.status === 'error').length}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle>Monitored Apps</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search apps..."
                  className="pl-8 w-full sm:w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App</TableHead>
                  <TableHead>Package Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Scanned</TableHead>
                  <TableHead>Clone Count</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monitoredApps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded bg-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                          <img src={app.iconUrl} alt={app.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium">{app.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{app.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{app.packageName}</TableCell>
                    <TableCell>
                      <StatusBadge type="monitoring" status={app.status} />
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDistanceToNow(new Date(app.lastScanned), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${app.cloneCount > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {app.cloneCount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button size="sm">
                          Scan Now
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Monitoring;
