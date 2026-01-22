'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Megaphone, PlusCircle, User, ShieldAlert, LayoutGrid, ShoppingBag, Users, Wrench, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const mobileNavLinks = [
  { href: '/social', label: 'Social', icon: LayoutGrid },
  { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
  { href: '/', label: 'Community', icon: Users },
  { href: '/services', label: 'Services', icon: Wrench },
  { href: '/devices', label: 'Devices', icon: Lock },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden animate-in slide-in-from-bottom duration-300">
      <div className="grid h-full grid-cols-5 mx-auto">
        {mobileNavLinks.map((link) => {
          const isActive = (pathname === '/' && link.href === '/') || (pathname.startsWith(link.href) && link.href !== '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "inline-flex flex-col items-center justify-center px-1 hover:bg-muted/50 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn("p-1 rounded-full transition-all", isActive && "bg-primary/10")}>
                <link.icon className={cn("w-6 h-6", isActive && "fill-primary text-primary")} />
              </div>
              <span className="text-[10px] font-medium mt-1">{link.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
