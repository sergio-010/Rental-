
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
        try {
            if (!dateSelected.from || !dateSelected.to) {
                toast({
                    title: "Error",
                    description: "Por favor selecciona las fechas de inicio y fin",
                    variant: "destructive"
                });
                return;
            }

            console.log("Reservando carro:", {
                carId: car.id,
                priceDay: car.priceDay,
                startDate: dateSelected.from,
                endDate: dateSelected.to,
                carName: car.name
            });

            const res = await axios.post("/api/checkout", {
                carId: car.id,
                priceDay: car.priceDay,
                startDate: dateSelected.from,
                endDate: dateSelected.to,
                carName: car.name,
            });

            if (res.data.url) {
                window.location.href = res.data.url;
                toast({
                    title: "Redirigiendo al pago...",
                });
            }
        } catch (error: any) {
            console.error("Error al reservar:", error);
            toast({
                title: "Error",
                description: error?.response?.data?.error || "Hubo un problema al procesar tu reserva",
                variant: "destructive"
            });
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"outline"} className=" mt-3 w-full">
                    Reservar Vehiculo
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
