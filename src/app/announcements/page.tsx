import Image from 'next/image';
import { announcements } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageShell } from "@/components/page-shell";

const categories = ['All', 'General', 'Maintenance', 'Social', 'Emergency'];

export default function AnnouncementsPage() {
  return (
    <PageShell
      title="Announcements"
      description="Stay updated with the latest news and notices from the community."
    >
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {announcements
                .filter(a => category === 'All' || a.category === category)
                .map(announcement => (
                  <Card key={announcement.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <Image
                          src={announcement.image}
                          alt={announcement.title}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover"
                          data-ai-hint="community notice"
                        />
                        <Badge
                          className="absolute top-3 right-3"
                          variant={announcement.category === 'Emergency' ? 'destructive' : 'secondary'}
                        >
                          {announcement.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow">
                      <CardTitle className="font-headline mb-2 text-xl">{announcement.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-4">
                        Posted on {new Date(announcement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p className="text-sm text-foreground/80 line-clamp-3">{announcement.content}</p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button className="w-full">Read More</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
            {announcements.filter(a => category === 'All' || a.category === category).length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <p>No announcements in this category.</p>
                </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </PageShell>
  );
}
