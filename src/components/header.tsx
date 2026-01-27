'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LayoutGrid } from "lucide-react";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { Icons } from './icons';
import { NotificationCenter } from '@/components/notification-center';
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { GlobalSearch } from "@/components/global-search";

export function Header() {
  const pathname = usePathname();
  const current = navLinks.find((l) => l.href === pathname) ?? navLinks[0];

  return (
    <header className="sticky top-0 z-50 hidden md:flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-3 min-w-0">
        <SidebarTrigger className="md:hidden" />
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Icons.logo className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold font-headline tracking-tight">Resident Hub</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground min-w-0">
          <ChevronRight className="h-4 w-4" />
          <span className="inline-flex items-center gap-2 min-w-0">
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            <span className={cn("truncate", current?.label && "text-foreground font-semibold")}>
              {current?.label ?? "Community"}
            </span>
          </span>
        </nav>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <GlobalSearch variant="input" />
        </div>
        <NotificationCenter />
        <UserNav />
      </div>
    </header>
  );
}
