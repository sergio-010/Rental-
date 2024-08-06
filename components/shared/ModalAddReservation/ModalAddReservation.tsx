
import { Car } from "@prisma/client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { useState } from 'react';
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import CalendarDate from "./CalendarDate";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";


interface ModalAddReservationProps {
    car: Car
}
export default function ModalAddReservation({ car }: ModalAddReservationProps) {
    const [dateCalendar, setDateCalendar] = useState<{ from: Date | undefined, to: Date | undefined }>({
        from: new Date(),
        to: addDays(new Date(), 5)
    })
    const onReserveCar = async (car: Car, dateSelected: DateRange) => {
        const res = await axios.post("/api/checkout", {
            carId: car.id,
            priceDay: car.priceDay,
            startDate: dateSelected.from,
            endDate: dateSelected.to,
            carName: car.name,
        });

        window.location = res.data.url;
        toast({
            title: "Car reserved ✌🏽",
        });
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"outline"} className=" mt-3">
                    Reservar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle >Selecciona las fechas</AlertDialogTitle>
                    <AlertDialogDescription>
                        <CalendarDate setDateSelected={setDateCalendar} carPriceDay={car.priceDay} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onReserveCar(car, dateCalendar)}>Reservar Vehiculo</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}
