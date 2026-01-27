"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Search, ArrowRight, Sparkles, LayoutGrid, Settings, User } from "lucide-react";

import { navLinks, quickActions } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type Result = {
  key: string;
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "Navigate" | "Quick actions";
};

function buildResults(): Result[] {
  const nav: Result[] = navLinks.map((l) => ({
    key: `nav:${l.href}`,
    href: l.href,
    label: l.label,
    // lucide icons accept className
    icon: l.icon as any,
    group: "Navigate" as const,
  }));

  const actions: Result[] = quickActions.map((a) => ({
    key: `action:${a.href}`,
    href: a.href,
    label: a.title,
    icon: a.icon as any,
    group: "Quick actions" as const,
  }));

  const hrefs = new Set<string>([...nav, ...actions].map((x) => x.href));
  const extras: Result[] = [
    {
      key: "extra:/profile",
      href: "/profile",
      label: "Profile",
      icon: User as any,
      group: "Quick actions" as const,
    },
    {
      key: "extra:/settings",
      href: "/settings",
      label: "Settings",
      icon: Settings as any,
      group: "Quick actions" as const,
    },
  ].filter((x) => !hrefs.has(x.href));

  return [...nav, ...actions, ...extras];
}

export function GlobalSearch({
  className,
  variant = "button",
}: {
  className?: string;
  variant?: "button" | "input" | "icon";
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const all = React.useMemo(() => buildResults(), []);
  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((r) => r.label.toLowerCase().includes(q));
  }, [all, query]);

  const currentHref = pathname || "/";

  React.useEffect(() => {
    if (!open) return;
    setQuery("");
  }, [open]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      if (!(e.ctrlKey || e.metaKey) || !isK) return;
      e.preventDefault();
      setOpen(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {variant === "icon" ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className={cn("rounded-full", className)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      ) : variant === "input" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "relative w-full max-w-[420px] text-left",
            className
          )}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              readOnly
              value=""
              placeholder="Search residents, services, listings..."
              className="pl-9 pr-16 bg-card/70 hover:bg-card transition-colors cursor-pointer"
            />
            <Badge className="absolute right-2 top-1/2 -translate-y-1/2 bg-muted/60 text-muted-foreground border-0 h-6 px-2 font-medium">
              Ctrl K
            </Badge>
          </div>
        </button>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen(true)}
          className={cn("gap-2 rounded-full", className)}
        >
          <Search className="h-4 w-4" />
          Search
          <Badge className="bg-muted/60 text-muted-foreground border-0 h-6 px-2 font-medium">
            Ctrl K
          </Badge>
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-3">
            <DialogTitle className="font-headline flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-primary" />
              Quick search
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search pages & quick actions…"
                className="pl-9 h-11 rounded-2xl"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Tip: Press <span className="font-medium text-foreground">Ctrl</span> +{" "}
              <span className="font-medium text-foreground">K</span> anytime.
            </p>
          </div>

          <Separator />

          <div className="max-h-[55vh] overflow-auto p-2">
            {results.length === 0 ? (
              <div className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <p className="mt-3 font-semibold">No results</p>
                <p className="text-sm text-muted-foreground">Try a different search term.</p>
              </div>
            ) : (
              (["Navigate", "Quick actions"] as const).map((group) => {
                const groupItems = results.filter((r) => r.group === group);
                if (groupItems.length === 0) return null;
                return (
                  <div key={group} className="p-2">
                    <p className="px-3 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {group}
                    </p>
                    <div className="grid gap-1">
                      {groupItems.map((r) => {
                        const active = r.href === currentHref;
                        const Icon = r.icon;
                        return (
                          <Link
                            key={r.key}
                            href={r.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "w-full rounded-2xl px-3 py-3 text-left flex items-center gap-3 border border-transparent hover:border-border/60 hover:bg-muted/30 transition-colors",
                              active && "bg-primary/5 border-border/40"
                            )}
                          >
                            <div className="h-10 w-10 rounded-2xl bg-muted/40 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-foreground/70" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold truncate">{r.label}</p>
                                {active && (
                                  <Badge className="bg-primary/10 text-primary border-0 h-5 px-2 text-[10px]">
                                    Current
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground truncate">{r.href}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-4 border-t bg-background">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Press Esc to close</span>
              <Link href="/"><span className="hover:underline">Go to dashboard</span></Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

