/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import * as React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";

type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
    setDateSelected: React.Dispatch<React.SetStateAction<{ from: Date | undefined, to: Date | undefined }>>;
    carPriceDay: string;
};

export default function CalendarDate({ setDateSelected, carPriceDay }: CalendarProps) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 5)
    });

    useEffect(() => {
        setDateSelected({
            from: date?.from,
            to: date?.to
        });
    }, [date]);

    const calculatedDaysBetween = (from: Date, to: Date): number => {
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = to.getTime() - from.getTime();
        return Math.round(diffInTime / oneDay);
    };

    const daysBetween = date?.from && date?.to ? calculatedDaysBetween(date.from, date.to) : 0;

    return (
        <div className="grid gap-2 ">
            {date?.from && date?.to && (
                <>
                    <p className="mt-4 text-lg text-black">Días alquilados: {daysBetween}</p>
                    <p className="mb-4 text-md">Total: ${daysBetween * Number(carPriceDay)}</p>
                </>
            )}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id='date'
                        variant="outline"
                        className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, yyyy")} - {format(date.to, "LLL dd, yyyy")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, yyyy")
                            )
                        ) : (
                            <span>Select date</span>
                        )}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0" align='start'>
                    <Calendar
                        initialFocus
                        mode='range'
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
