
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between h-16 px-4 lg:px-6">
      <div className="flex items-center">
        <SidebarTrigger />
        <h1 className="ml-4 text-xl font-semibold lg:hidden">AppClone Buster</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 bg-red-500 text-white">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">New App Clone Detected</span>
                    <Badge variant="destructive" className="ml-2">Critical</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    "Super VPN" app clone detected on third-party store with 92% similarity.
                  </p>
                  <span className="text-xs text-muted-foreground mt-2">10 minutes ago</span>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
