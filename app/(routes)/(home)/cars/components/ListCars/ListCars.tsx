import { useAuth } from "@clerk/nextjs";
import { useLovedCars } from "../../../../../../hooks/use-loved-cars";
import Image from "next/image";
import { Fuel, Gauge, Gem, Heart, Users, Wrench } from "lucide-react";
import ModalAddReservation from "@/components/shared/ModalAddReservation/ModalAddReservation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Car } from "@prisma/client";
import { cn } from "@/lib/utils";


interface Props {
    cars: Car[];
}

export default function ListCars({ cars }: Props) {
    const { userId } = useAuth();
    const { addLovedCar, removeLovedCar, LovedItems } = useLovedCars();
    return (
        <>
            {cars.length === 0 && <p>No cars in the list</p>}
            <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-4">
                {cars.map((car: Car) => {
                    const { id, name, photo, priceDay, transmission, people, type, cv, engine } = car;
                    const isLoved = LovedItems.some((item) => item.id === id);
                    return (
                        <div key={id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
                            <Image
                                src={photo}
                                alt="car"
                                width={400}
                                height={600}
                                className="rounded-lg"
                                priority
                            />
                            <div className="p-3">
                                <div className="flex flex-col mb-3 gap-x-4">
                                    <p className="text-xl min-h-[64px] lg:min-h-fit">{name}</p>
                                    <p className="text-lg">{priceDay}$/day</p>
                                </div>
                                <p className="flex items-center">
                                    <Gem className="h-4 w-4 mr-2" /> {type}
                                </p>
                                <p className="flex items-center">
                                    <Wrench className="h-4 w-4 mr-2" /> {transmission}
                                </p>
                                <p className="flex items-center">
                                    <Users className="h-4 w-4 mr-2" /> {people}
                                </p>
                                <p className="flex items-center">
                                    <Gauge className="h-4 w-4 mr-2" /> {cv} CV
                                </p>
                                <p className="flex items-center">
                                    <Fuel className="h-4 w-4 mr-2" /> {engine}
                                </p>
                                {userId ? (
                                    <div className="flex items-center justify-center gap-x-3">
                                        <ModalAddReservation car={car} />
                                        <Heart
                                            className={cn("mt-2 h-6 w-6 cursor-pointer", {
                                                "fill-red-500": isLoved,
                                                "fill-gray-500": !isLoved,
                                            })}
                                            onClick={isLoved ? () => removeLovedCar(car.id) : () => addLovedCar(car)}
                                        />
                                    </div>
                                ) : (
                                    <div className="mt-2 text-center w-full">
                                        <Link href={`/sign-in`}>
                                            <Button variant="outline" className="w-full">Sign in to reserve</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
