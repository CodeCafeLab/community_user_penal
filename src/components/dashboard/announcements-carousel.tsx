import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { announcements } from "@/lib/data";
import { Button } from "../ui/button";

export function AnnouncementsCarousel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            {announcements.map((announcement) => (
              <CarouselItem key={announcement.id}>
                <div className="p-1">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={announcement.image}
                      alt={announcement.title}
                      width={800}
                      height={400}
                      className="w-full h-auto aspect-[2/1] object-cover"
                      data-ai-hint="community notice"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                       <Badge 
                        variant={announcement.category === 'Emergency' ? 'destructive' : 'secondary'} 
                        className="mb-2"
                      >
                        {announcement.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-white font-headline">{announcement.title}</h3>
                      <p className="text-sm text-white/90 mt-1 truncate">{announcement.content}</p>
                       <Button size="sm" className="mt-4">Read More</Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
