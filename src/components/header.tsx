'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { Icons } from './icons';
import { NotificationCenter } from '@/components/notification-center';

export function Header() {
  return (
    <header className="sticky top-0 z-10 hidden md:flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Icons.logo className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold font-headline">Resident Hub</h1>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search residents, services, listings..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <NotificationCenter />
        <UserNav />
      </div>
    </header>
  );
}
