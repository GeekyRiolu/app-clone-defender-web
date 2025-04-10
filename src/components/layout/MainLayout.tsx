
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from './AppSidebar';
import Navbar from './Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto bg-background px-4 py-4 md:px-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
