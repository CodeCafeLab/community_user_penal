import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplaintsTable } from "@/components/complaints/complaints-table";
import { ComplaintForm } from "@/components/complaints/complaint-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ComplaintsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Complaint Management</h1>
                <p className="text-muted-foreground">Report issues and track their resolution status.</p>
            </div>

            <Tabs defaultValue="my-complaints" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="my-complaints">My Complaints</TabsTrigger>
                    <TabsTrigger value="new-complaint">Raise New Complaint</TabsTrigger>
                </TabsList>
                <TabsContent value="my-complaints">
                    <Card>
                        <CardHeader>
                            <CardTitle>Complaint History</CardTitle>
                            <CardDescription>Here's a list of your submitted complaints and their status.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ComplaintsTable />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="new-complaint">
                     <Card>
                        <CardHeader>
                            <CardTitle>New Complaint Form</CardTitle>
                            <CardDescription>Please provide as much detail as possible about the issue.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ComplaintForm />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
