'use client'

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export function MiniCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="flex justify-center">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                classNames={{
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                }}
            />
        </div>
    );
}
