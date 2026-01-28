import Image from 'next/image';
import { events } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { VolunteerRecommender } from '@/components/events/volunteer-recommender';
import { PageShell } from "@/components/page-shell";

export default function EventsPage() {
  return (
    <PageShell
      title="Community Events"
      description="Get involved! See what's happening in your community."
    >

      <VolunteerRecommender />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <Card key={event.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint="community event"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <Badge variant="secondary" className="mb-2">{event.category}</Badge>
              <CardTitle className="font-headline mb-2 text-xl">{event.title}</CardTitle>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(event.date, 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                 <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.venue}</span>
                </div>
              </div>
              <p className="text-sm text-foreground/80 line-clamp-3 mt-4">{event.description}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0 bg-muted/30">
              <div className="w-full flex justify-between items-center">
                <p className="text-sm font-medium">Interested?</p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">Maybe</Button>
                    <Button size="sm">RSVP Yes</Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
