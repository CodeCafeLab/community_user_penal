import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplaintsTable } from "@/components/complaints/complaints-table";
import { ComplaintForm } from "@/components/complaints/complaint-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";

export default function ComplaintsPage() {
    return (
        <PageShell
            title="Complaint Management"
            description="Report issues and track their resolution status."
        >

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
        </PageShell>
    );
}
