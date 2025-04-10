
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { BarChart, LineChart } from '@/components/ui/charts';
import { Download, FileDown, FileSpreadsheet, Filter, FilePieChart, FileText } from 'lucide-react';
import { cloneDetectionTrend, clonedApps, monitoredApps } from '@/data/mockData';

const Reports = () => {
  // Mock chart data
  const chartData = [
    {
      name: "Mar 10",
      "Clone Count": 2,
    },
    {
      name: "Mar 17",
      "Clone Count": 3,
    },
    {
      name: "Mar 24",
      "Clone Count": 1,
    },
    {
      name: "Mar 31",
      "Clone Count": 4,
    },
    {
      name: "Apr 7",
      "Clone Count": 5,
    },
  ];

  const appDistribution = [
    {
      name: "Super VPN",
      value: 12,
    },
    {
      name: "Cloud Bank",
      value: 5,
    },
    {
      name: "Secure Messaging Pro",
      value: 3,
    },
    {
      name: "Photo Editor Pro",
      value: 1,
    },
    {
      name: "Fitness Tracker",
      value: 0,
    },
  ];

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Analyze app clone trends and generate reports</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="last30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last3months">Last 3 Months</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Clone Detection Trend</CardTitle>
            <CardDescription>Number of clones detected over time</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={chartData}
              index="name"
              categories={["Clone Count"]}
              colors={["blue"]}
              yAxisWidth={30}
              showAnimation={true}
              showLegend={false}
              height="h-64"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clone Distribution by App</CardTitle>
            <CardDescription>Distribution of detected clones across your apps</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={appDistribution}
              index="name"
              categories={["value"]}
              colors={["blue"]}
              valueFormatter={(number) => `${number} clones`}
              yAxisWidth={40}
              height="h-64"
              showLegend={false}
              showAnimation={true}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            Download pre-generated reports or create custom reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-medium">Monthly Summary</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Executive summary with key metrics and trends
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Last updated: April 1, 2025
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-medium">Clone Details</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete list of detected clones with details
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Last updated: April 10, 2025
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <FilePieChart className="h-5 w-5 text-purple-600" />
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-medium">Risk Analysis</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Detailed risk assessment and recommendations
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Last updated: April 5, 2025
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Takedown History</CardTitle>
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
          <CardDescription>
            History of takedown requests and their outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App Name</TableHead>
                  <TableHead>Clone Name</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Resolved Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Super VPN</TableCell>
                  <TableCell>SuperFast VPN</TableCell>
                  <TableCell>Alternative App Store</TableCell>
                  <TableCell>Apr 5, 2025</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      In Progress
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cloud Bank</TableCell>
                  <TableCell>Cloud Bank Mobile</TableCell>
                  <TableCell>Third-Party Store C</TableCell>
                  <TableCell>Apr 2, 2025</TableCell>
                  <TableCell>Apr 7, 2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Successful
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Secure Messaging Pro</TableCell>
                  <TableCell>Secure Message</TableCell>
                  <TableCell>Alternative App Store</TableCell>
                  <TableCell>Mar 30, 2025</TableCell>
                  <TableCell>Apr 8, 2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Successful
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Photo Editor Pro</TableCell>
                  <TableCell>Photo Editor Plus</TableCell>
                  <TableCell>Third-Party Store B</TableCell>
                  <TableCell>Mar 25, 2025</TableCell>
                  <TableCell>Mar 30, 2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Successful
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Reports;
