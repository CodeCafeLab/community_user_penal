"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationCenter } from "@/components/notification-center";
import { UserNav } from "@/components/user-nav";
import { Icons } from "@/components/icons";
import { navLinks } from "@/lib/data";
import { GlobalSearch } from "@/components/global-search";

export function MobileHeader() {
  const pathname = usePathname();
  const current = navLinks.find((l) => l.href === pathname);

  return (
    <header className="sticky top-0 z-50 md:hidden border-b bg-background">
      <div className="h-14 px-3 flex items-center gap-2">
        <SidebarTrigger className="h-9 w-9 rounded-full" />

        <Link href="/" className="flex items-center gap-2 min-w-0">
          <Icons.logo className="h-5 w-5 text-primary shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-none truncate">Resident Hub</p>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1 truncate">
              <LayoutGrid className="h-3 w-3" />
              {current?.label ?? "Community"}
            </p>
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <GlobalSearch variant="icon" />
          <NotificationCenter />
          <UserNav />
        </div>
      </div>
    </header>
  );
}

