import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PageHeader({
  title,
  description,
  right,
  className,
}: {
  title: string;
  description?: string;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2 md:flex-row md:items-end md:justify-between", className)}>
      <div className="min-w-0">
        <h1 className="text-3xl font-bold tracking-tight font-headline">{title}</h1>
        {description ? <p className="text-muted-foreground mt-1">{description}</p> : null}
      </div>
      {right ? <div className="flex items-center gap-2 md:justify-end">{right}</div> : null}
    </div>
  );
}

export function PageShell({
  title,
  description,
  right,
  children,
  className,
}: {
  title: string;
  description?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-8", className)}>
      <PageHeader title={title} description={description} right={right} />
      {children}
    </div>
  );
}

export function ComingSoonCard({
  title = "Coming soon",
  description = "This section is part of the premium build.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/50 bg-card p-6 shadow-sm flex items-center justify-between gap-4",
        className
      )}
    >
      <div className="min-w-0">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button variant="secondary" className="rounded-full whitespace-nowrap">
        Learn more
      </Button>
    </div>
  );
}

