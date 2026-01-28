"use client";

import { usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Header } from '@/components/header';
import { MobileNav } from '@/components/mobile-nav';
import { DevSuppressExtensionErrors } from "@/components/dev-suppress-extension-errors";
import { ThemeProvider, useThemePrefs } from "@/components/theme-provider";
import { MobileHeader } from "@/components/mobile-header";
import { useEffect } from 'react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppLayoutContent pathname={pathname}>
          {children}
        </AppLayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
}

function AppLayoutContent({ children, pathname }: { children: React.ReactNode, pathname: string }) {
  const { isMobile, setOpenMobile } = useSidebar();
  const { backgroundEffects } = useThemePrefs();

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <>
      <DevSuppressExtensionErrors />
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <Header />
          <MobileHeader />
          <main className="flex-1 p-4 pb-24 md:pb-8 md:p-6 lg:p-8 bg-background relative overflow-hidden">
            {backgroundEffects && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "radial-gradient(closest-side at 20% 10%, rgba(250, 204, 21, 0.25), transparent 60%), radial-gradient(closest-side at 90% 30%, rgba(59, 130, 246, 0.18), transparent 55%), radial-gradient(closest-side at 70% 95%, rgba(16, 185, 129, 0.16), transparent 55%)",
                }}
              />
            )}
            <div className="relative">{children}</div>
          </main>
          {isMobile && <MobileNav />}
        </div>
      </SidebarInset>
    </>
  );
}
