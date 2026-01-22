"use client";

import { usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Header } from '@/components/header';
import { MobileNav } from '@/components/mobile-nav';
import { useEffect } from 'react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <SidebarProvider>
      <AppLayoutContent pathname={pathname}>
        {children}
      </AppLayoutContent>
    </SidebarProvider>
  );
}

function AppLayoutContent({ children, pathname }: { children: React.ReactNode, pathname: string }) {
  const { isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <>
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background/80">
            {children}
          </main>
          {isMobile && <MobileNav />}
        </div>
      </SidebarInset>
    </>
  );
}
