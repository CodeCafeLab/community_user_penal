"use client";

import * as React from "react";
import { Bell, CheckCircle2, Info, AlertTriangle, CheckCheck, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { initialNotifications, type AppNotification } from "@/lib/notifications";
import { useToast } from "@/hooks/use-toast";

function TypeIcon({ type }: { type: AppNotification["type"] }) {
  if (type === "success") return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
  if (type === "warning") return <AlertTriangle className="h-4 w-4 text-amber-600" />;
  return <Info className="h-4 w-4 text-sky-600" />;
}

function TypeBadge({ type }: { type: AppNotification["type"] }) {
  const cls =
    type === "success"
      ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15"
      : type === "warning"
        ? "bg-amber-500/10 text-amber-700 hover:bg-amber-500/15"
        : "bg-sky-500/10 text-sky-700 hover:bg-sky-500/15";
  const label = type === "success" ? "Success" : type === "warning" ? "Important" : "Update";
  return (
    <Badge variant="secondary" className={cn("border-0 text-[10px] h-5", cls)}>
      {label}
    </Badge>
  );
}

export function NotificationCenter() {
  const { toast } = useToast();
  const [items, setItems] = React.useState<AppNotification[]>(initialNotifications);
  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({ title: "All caught up", description: "Notifications marked as read." });
  };

  const markRead = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <>
              <span className="sr-only">{unreadCount} unread notifications</span>
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background" />
            </>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[92vw] sm:max-w-md p-0">
        <div className="p-6 pb-4">
          <SheetHeader className="space-y-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <SheetTitle className="font-headline">Notifications</SheetTitle>
                <SheetDescription>Updates that keep residents informed and in control.</SheetDescription>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground border-0 h-6 px-2">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
            </div>
          </SheetHeader>
          <div className="mt-4 flex items-center gap-2">
            <Button size="sm" className="rounded-full px-4" onClick={markAllRead} disabled={unreadCount === 0}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full px-4"
              onClick={() => toast({ title: "Coming soon", description: "Notification preferences will be available here." })}
            >
              Preferences
            </Button>
          </div>
        </div>

        <Separator />

        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="p-2">
            {items.map((n) => (
              <button
                key={n.id}
                className={cn(
                  "w-full text-left rounded-2xl p-4 transition-colors border border-transparent hover:border-border/60 hover:bg-muted/30",
                  !n.read && "bg-primary/5"
                )}
                onClick={() => {
                  markRead(n.id);
                  toast({ title: n.title, description: n.description });
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{n.read ? <TypeIcon type={n.type} /> : <Dot className="h-5 w-5 text-primary" />}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm truncate">{n.title}</p>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.description}</p>
                    <div className="mt-2">
                      <TypeBadge type={n.type} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-background">
          <Button
            variant="secondary"
            className="w-full rounded-xl"
            onClick={() => toast({ title: "Coming soon", description: "A full notification history view will appear here." })}
          >
            View notification history
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}


