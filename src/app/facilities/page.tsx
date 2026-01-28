import Image from 'next/image';
import { facilities } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Wrench } from 'lucide-react';
import { PageShell } from "@/components/page-shell";

const statusMap = {
  Available: {
    label: "Available",
    color: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    icon: CheckCircle
  },
  Booked: {
    label: "Booked",
    color: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    icon: XCircle
  },
  Maintenance: {
    label: "Maintenance",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    icon: Wrench
  },
};

export default function FacilitiesPage() {
  return (
    <PageShell
      title="Facility Booking"
      description="Book community facilities for your personal events and activities."
    >

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {facilities.map(facility => {
          const status = statusMap[facility.availability];
          const StatusIcon = status.icon;
          return (
            <Card key={facility.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <Image
                  src={facility.image}
                  alt={facility.name}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover"
                  data-ai-hint="community facility"
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline mb-2 text-xl">{facility.name}</CardTitle>
                <p className="text-sm text-foreground/80">{facility.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 bg-muted/30">
                <div className="w-full flex justify-between items-center">
                    <Badge variant="outline" className={cn("border-0 text-sm py-1 px-3", status.color)}>
                        <StatusIcon className="h-4 w-4 mr-2" />
                        {status.label}
                    </Badge>
                  <Button disabled={facility.availability !== 'Available'}>Book Now</Button>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </PageShell>
  );
}
