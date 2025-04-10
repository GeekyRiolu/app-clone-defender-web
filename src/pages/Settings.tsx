
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings</p>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="scanning">Scanning</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" placeholder="john.doe@example.com" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Acme Inc." defaultValue="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Security Analyst" defaultValue="Security Analyst" />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-base font-medium mb-3">Theme & Appearance</h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark theme
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (GMT)</SelectItem>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Clone Detected</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive email when a new clone is detected
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">High Risk Alerts</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive email for high and critical risk clones
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Takedown Status Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive email when takedown status changes
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Weekly Report</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive weekly summary report
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-medium">Web Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Enable browser push notifications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Real-time Alerts</Label>
                        <p className="text-xs text-muted-foreground">
                          Show real-time alerts in the dashboard
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-medium">Notification Frequency</h3>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Email Digest Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time (immediate)</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Digest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scanning">
          <Card>
            <CardHeader>
              <CardTitle>Scanning Configuration</CardTitle>
              <CardDescription>
                Configure app scanning and detection settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-medium">Scan Frequency</h3>
                  <div className="space-y-2">
                    <Label htmlFor="scanFrequency">Default Scan Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="scanFrequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Every hour</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      This setting applies to all monitored applications by default
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-medium">Detection Thresholds</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="similarityThreshold">Similarity Threshold</Label>
                      <div className="flex space-x-2">
                        <Input id="similarityThreshold" type="number" defaultValue="75" min="0" max="100" className="w-20" />
                        <span className="flex items-center">%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Minimum similarity score to consider an app as potential clone
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="riskThreshold">Risk Scoring Threshold</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="riskThreshold">
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (Alert on all clones)</SelectItem>
                          <SelectItem value="medium">Medium (Default)</SelectItem>
                          <SelectItem value="high">High (Critical issues only)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-medium">Scan Targets</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Google Play Store</Label>
                        <p className="text-xs text-muted-foreground">
                          Scan official Android app store
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Apple App Store</Label>
                        <p className="text-xs text-muted-foreground">
                          Scan official iOS app store
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Third-Party App Stores</Label>
                        <p className="text-xs text-muted-foreground">
                          Scan alternative app stores and markets
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Direct Download Sites</Label>
                        <p className="text-xs text-muted-foreground">
                          Scan APK download websites
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API & Integrations</CardTitle>
              <CardDescription>
                Manage API keys and third-party integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-medium">API Access</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key</Label>
                      <div className="flex space-x-2">
                        <Input 
                          id="apiKey" 
                          defaultValue="sk_live_51Iq2TkJFn8aJ7tYzQW5L8VKMh9M2L"
                          type="password"
                          className="font-mono"
                        />
                        <Button variant="outline">Regenerate</Button>
                        <Button variant="outline">Copy</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Use this key to access the AppClone Buster API
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-medium">Integrations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Slack Integration</Label>
                        <p className="text-xs text-muted-foreground">
                          Send alerts to Slack channels
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
                      <Input 
                        id="slackWebhook" 
                        placeholder="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
                        defaultValue="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
                        type="password"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-3">
                      <div className="space-y-0.5">
                        <Label className="text-sm">JIRA Integration</Label>
                        <p className="text-xs text-muted-foreground">
                          Create JIRA tickets for detected clones
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between pt-3">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Microsoft Teams Integration</Label>
                        <p className="text-xs text-muted-foreground">
                          Send alerts to Microsoft Teams channels
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-medium">Webhook Settings</h3>
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Custom Webhook URL</Label>
                    <Input 
                      id="webhookUrl" 
                      placeholder="https://example.com/webhook"
                    />
                    <p className="text-xs text-muted-foreground">
                      Receive real-time updates via webhook
                    </p>
                  </div>
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="webhookEvents">Webhook Events</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="webhookEvents">
                        <SelectValue placeholder="Select events" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="clone_detected">Clone Detection Only</SelectItem>
                        <SelectItem value="critical">Critical Alerts Only</SelectItem>
                        <SelectItem value="takedowns">Takedown Status Updates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
