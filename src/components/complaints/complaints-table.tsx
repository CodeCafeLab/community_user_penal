import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { complaints } from "@/lib/data";
import { cn } from "@/lib/utils";

const statusColors = {
  Submitted: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  Acknowledged: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  "In Progress": "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  Resolved: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
};


export function ComplaintsTable() {
  return (
    <div className="border rounded-md">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Ticket ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {complaints.map((complaint) => (
            <TableRow key={complaint.id}>
                <TableCell className="font-medium">{complaint.id}</TableCell>
                <TableCell>{complaint.title}</TableCell>
                <TableCell>{complaint.category}</TableCell>
                <TableCell>
                <Badge variant="outline" className={cn("border-0", statusColors[complaint.status])}>
                    {complaint.status}
                </Badge>
                </TableCell>
                <TableCell>{complaint.date}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  );
}
