import { statCards } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

export function StatCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {statCards.map((card) => (
                <Card key={card.title} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium font-headline">{card.title}</CardTitle>
                        <card.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                        {card.change && (
                            <p className="text-xs text-muted-foreground flex items-center">
                                {card.changeType === 'increase' ? (
                                    <ArrowUp className="h-4 w-4 text-red-500 mr-1" />
                                ) : (
                                    <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
                                )}
                                {card.change} from last month
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
