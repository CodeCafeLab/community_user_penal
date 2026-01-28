"use client";

import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { user } from "@/lib/data";

export default function ProfilePage() {
  const { toast } = useToast();

  return (
    <PageShell
      title="Profile"
      description="View and update your account details."
      right={
        <Button
          className="rounded-full"
          onClick={() => toast({ title: "Saved (demo)", description: "Profile changes would be saved." })}
        >
          Save changes
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Your account</CardTitle>
            <CardDescription>Basic info used across the app.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border border-border">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-semibold truncate">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resident</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Flat</span>
                <Badge className="bg-primary/10 text-primary border-0">{user.flat}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 rounded-2xl border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Edit details</CardTitle>
            <CardDescription>These fields are a demo (no backend connected).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Full name</p>
                <Input defaultValue={user.name} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Email</p>
                <Input defaultValue={user.email} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Flat / Unit</p>
                <Input defaultValue={user.flat} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Phone</p>
                <Input placeholder="e.g., +91 98XXXXXXXX" className="rounded-xl" />
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-sm">Security</p>
                <p className="text-xs text-muted-foreground">Enable 2FA and recovery options (demo).</p>
              </div>
              <Button
                variant="secondary"
                className="rounded-full"
                onClick={() => toast({ title: "Coming soon", description: "2FA settings will appear here." })}
              >
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

