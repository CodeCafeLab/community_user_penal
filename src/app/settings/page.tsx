"use client";

import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useThemePrefs, type ThemeMode } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const {
    theme,
    setTheme,
    reducedMotion,
    setReducedMotion,
    backgroundEffects,
    setBackgroundEffects,
  } = useThemePrefs();

  return (
    <PageShell
      title="Settings"
      description="Personalize your ResidentHub experience."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 rounded-2xl border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Appearance</CardTitle>
            <CardDescription>Theme and motion preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold">Theme</p>
              <RadioGroup
                value={theme}
                onValueChange={(v) => setTheme(v as ThemeMode)}
                className="grid gap-3 sm:grid-cols-3"
              >
                {[
                  { value: "system", label: "System" },
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                ].map((opt) => (
                  <Label
                    key={opt.value}
                    className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-4 hover:bg-muted/30 cursor-pointer"
                  >
                    <RadioGroupItem value={opt.value} />
                    <span className="font-medium">{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold">Background effects</p>
                <p className="text-sm text-muted-foreground">
                  Subtle gradients behind the page content.
                </p>
              </div>
              <Switch checked={backgroundEffects} onCheckedChange={setBackgroundEffects} />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold">Reduce motion</p>
                <p className="text-sm text-muted-foreground">
                  Minimize animations and transitions.
                </p>
              </div>
              <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">About</CardTitle>
            <CardDescription>Build information and shortcuts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">App</span>
              <span className="font-medium">ResidentHub</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Search</span>
              <span className="font-medium">Ctrl + K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Theme</span>
              <span className="font-medium capitalize">{theme}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

