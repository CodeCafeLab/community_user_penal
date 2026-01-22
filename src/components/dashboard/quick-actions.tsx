import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { quickActions } from "@/lib/data";
import { cn } from "@/lib/utils";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link href={action.href} key={action.title} className="group">
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg h-32 hover:bg-accent/50 hover:shadow-sm transition-all text-center">
                <div className={cn("flex items-center justify-center w-12 h-12 rounded-full bg-accent/80 group-hover:bg-accent mb-2", action.color)}>
                    <action.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-sm font-semibold">{action.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
