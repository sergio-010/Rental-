'use client'

import ModalAddReservation from "@/components/shared/ModalAddReservation/ModalAddReservation"
import { useLovedCars } from "@/hooks/use-loved-cars"
import { Fuel, Gauge, Gem, Heart, Users, Wrench } from "lucide-react"
import Image from "next/image"

export default function ListLovedCars() {
    const { LovedItems, addLovedCar, removeLovedCar } = useLovedCars()
    return (
        <>
            {LovedItems.length === 0 ? (
                <h2>No cars in the list</h2>
            ) : (<div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                {LovedItems.map((car) => {
                    const { id,
                        name,
                        photo,
                        priceDay,
                        transmission,
                        people,
                        type,
                        cv,
                        engine } = car

                    return (
                        <div className="p-1 rounded-lg shadow-md hover:shadow-lg" key={id}>
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
                                    <p className="text-lg font-bold min-h-16 lg:min-h-fit">{name}</p>
                                    <p>{priceDay}$/day</p>
                                    <div className="grid md:grid-cols-2 gap-x-4">
                                        <p className="flex items-center " ><Gem className="w-4 h-4 mr-2" />{type}</p>
                                        <p className="flex items-center " ><Wrench className="w-4 h-4 mr-2" />{transmission}</p>
                                        <p className="flex items-center " ><Users className="w-4 h-4 mr-2" />{people}</p>
                                        <p className="flex items-center " ><Fuel className="w-4 h-4 mr-2" />{engine}</p>
                                        <p className="flex items-center " ><Gauge className="w-4 h-4 mr-2" />{cv}</p>
                                    </div>
                                    <div className="flex justify-center items-center gap-x-2">
                                        <ModalAddReservation car={car} />
                                        <Heart
                                            className={`h-6 w-6 mt-2 cursor-pointer ${LovedItems.some((item) => item.id === car.id) ? "fill-red-500" : "fill-black"}`}
                                            onClick={
                                                LovedItems.some((item) => item.id === car.id)
                                                    ? () => { removeLovedCar(car.id) }
                                                    : () => { addLovedCar(car) }
                                            }
                                        />
                                    </div>




                                </div>
                            </div>


                        </div>
                    )
                })}
            </div>
            )}
        </>
    )
}
