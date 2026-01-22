import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { payments } from "@/lib/data";
import { Download, CreditCard } from "lucide-react";

export default function PaymentsPage() {
    const outstandingDues = 150.00;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Financials</h1>
                <p className="text-muted-foreground">Manage your dues and view payment history.</p>
            </div>

            <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline">Outstanding Dues</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-primary">${outstandingDues.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">For June 2024 Maintenance</p>
                </CardContent>
                <CardFooter>
                    <Button>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay Now
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Payment History</CardTitle>
                    <CardDescription>A record of your past transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-medium">{payment.id}</TableCell>
                                        <TableCell>{payment.date}</TableCell>
                                        <TableCell>{payment.description}</TableCell>
                                        <TableCell>
                                            <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'} className={payment.status === 'Paid' ? 'bg-green-500/80 hover:bg-green-500' : ''}>
                                                {payment.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
