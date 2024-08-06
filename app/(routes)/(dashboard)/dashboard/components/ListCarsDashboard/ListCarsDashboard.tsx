'use client'
import ModalAddReservation from "@/components/shared/ModalAddReservation/ModalAddReservation"
import { Car } from "@prisma/client"
import { Fuel, Gem, Heart, Users, Wrench } from "lucide-react"
import Image from "next/image"

export interface ListCarsPropsDasboard {
    cars: Car[]
}
export default function ListCarsDashboard({ cars }: ListCarsPropsDasboard) {

    return (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 ">
            {
                cars.map((car) => {
                    return (
                        <div key={car.id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
                            <Image
                                src={car.photo}
                                alt="car"
                                width={400}
                                height={600}
                                className="rounded-lg"
                                priority
                            />
                            <div className="p-3">
                                <div className="flex flex-col mb-3 gap-x-4">
                                    <p className="text-lg font-bold min-h-16 lg:min-h-fit">{car.name}</p>
                                    <p>{car.priceDay}$/day</p>
                                </div>
                                <p className="flex items-center">
                                    <Gem className="h-4 w-4 mr-2" /> {car.type}
                                </p>
                                <p className="flex items-center">
                                    <Wrench className="h-4 w-4 mr-2" /> {car.transmission}
                                </p>
                                <p className="flex items-center">
                                    <Users className="h-4 w-4 mr-2" /> {car.people}
                                </p>
                                <p className="flex items-center">
                                    <Fuel className="h-4 w-4 mr-2" /> {car.engine}
                                </p>
                                <div className="flex items-center justify-center gap-x-3">
                                    <ModalAddReservation car={car} />
                                    <Heart className={`mt-2 cursor-pointer `} onClick={() => { }} />

                                </div>



                            </div>

                        </div>
                    )

                })}

        </div>
    )
}
