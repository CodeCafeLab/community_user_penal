import { residents, communityGroups } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, Search, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DirectoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Community Directory</h1>
        <p className="text-muted-foreground">Connect with your neighbors and join interest groups.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search residents or groups..." className="pl-8 w-full md:w-1/3" />
      </div>

      <Tabs defaultValue="residents" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="residents">Residents</TabsTrigger>
          <TabsTrigger value="groups">Community Groups</TabsTrigger>
        </TabsList>
        <TabsContent value="residents">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {residents.map(resident => (
              <Card key={resident.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={resident.avatar} alt={resident.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{resident.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold font-headline text-lg">{resident.name}</p>
                  <p className="text-muted-foreground text-sm">Flat {resident.flat}</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="groups">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {communityGroups.map(group => (
                  <Card key={group.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <group.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="font-headline text-xl">{group.name}</CardTitle>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                    <Users className="h-4 w-4 mr-1.5" />
                                    {group.members} members
                                </div>
                            </div>
                          </div>
                      </CardHeader>
                      <CardContent>
                          <p className="text-sm text-foreground/80">{group.description}</p>
                      </CardContent>
                      <CardContent>
                        <Button className="w-full">Join Group</Button>
                      </CardContent>
                  </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
