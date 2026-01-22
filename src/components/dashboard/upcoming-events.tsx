import { events } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Upcoming Events</CardTitle>
        <CardDescription>Don't miss out on what's next!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-md p-2 w-16 h-16">
                <span className="text-xs font-semibold uppercase">{format(event.date, 'MMM')}</span>
                <span className="text-2xl font-bold">{format(event.date, 'dd')}</span>
              </div>
              <div>
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.time} @ {event.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
