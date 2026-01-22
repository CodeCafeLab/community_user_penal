"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { navLinks } from '@/lib/data';
import { LogOut, Settings, User, Bell, ChevronsUpDown } from 'lucide-react';
import { Icons } from './icons';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4 pb-2">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Icons.logo className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-lg font-bold leading-tight tracking-tight">Resident<span className="text-primary">Hub</span></span>
            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Community</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 gap-4">
        <div className="px-2">
          <p className="text-xs font-semibold text-muted-foreground mb-3 px-2 uppercase tracking-wider">Menu</p>
          <SidebarMenu className="gap-1">
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === link.href}
                  tooltip={link.label}
                  className={`h-11 rounded-xl transition-all duration-200 ${pathname === link.href ? 'bg-primary text-primary-foreground shadow-md font-semibold' : 'hover:bg-muted text-foreground/70'}`}
                >
                  <Link href={link.href} className="flex gap-3">
                    <link.icon className={`h-5 w-5 ${pathname === link.href ? 'text-primary-foreground' : 'text-foreground/60'}`} />
                    <span>{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>

        <div className="px-2 mt-auto">
          <Card className="bg-gradient-to-br from-primary/10 to-transparent border-0 mb-4 p-4 rounded-2xl relative overflow-hidden hidden md:block group cursor-pointer hover:bg-primary/15 transition-colors">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <h4 className="font-bold text-sm mb-1">Premium Plan</h4>
            <p className="text-xs text-muted-foreground mb-3">Unlock all smart features</p>
            <Button size="sm" className="w-full rounded-lg text-xs font-semibold h-8 bg-primary">Upgrade</Button>
          </Card>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-2xl h-14"
                >
                  <div className="flex items-center gap-3 text-left w-full">
                    <div className="relative">
                      <Avatar className="h-10 w-10 rounded-xl border border-border">
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                      </Avatar>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full"></span>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">John Doe</span>
                      <span className="truncate text-xs text-muted-foreground">Admin • Block A</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <div className="p-2 border-b border-border/50 mb-1">
                  <p className="text-xs text-muted-foreground">Logged in as <span className="text-foreground font-medium">@johndoe</span></p>
                </div>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <Separator className="my-1" />
                <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
import { Card } from './ui/card';
import { Button } from './ui/button';
