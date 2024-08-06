'use client'
import { Button } from "@/components/ui/button"
import { Car } from "@prisma/client"
import { Fuel, Gauge, Gem, Trash, Upload, Users, Wrench } from "lucide-react"
import Image from "next/image"
import { ButtonEditCar } from "./ButtonEditCar"
import axios from "axios"

import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface CardCarProps {
    car: Car
}
export function CardCar({ car }: CardCarProps) {
    const router = useRouter()
    const deleteCar = async () => {
        try {
            await axios.delete(`/api/car/${car.id}`)
            toast({
                title: "Success",
                description: "Car deleted successfully",
            })
        } catch (error) {
            console.log(error)
        }
    }
    const publishCar = async (publish: boolean) => {
        try {
            await axios.patch(`/api/car/${car.id}`, { isPublish: publish })
            if (publish) {
                toast({
                    title: "Success",
                    description: "Car published successfully",
                })
            } else {
                toast({
                    title: "Success",
                    description: "Car unpublished successfully",
                })
            }

            router.refresh()

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="relative p-1 bg-white rounded-lg shadow-md hover:shadow-lg ">
            <Image
                src={car.photo}
                alt={car.name}
                width={400}
                height={600}
                priority
                className="rounded-lg"
            />
            {car.isPublish ?
                <p className="absolute top-0 right-0 w-full p-1 text-center  rounded-t-lg text-white bg-emerald-500">Published</p>
                : <p className="absolute top-0 right-0 w-full p-1 text-center rounded-t-lg text-white bg-red-500">Unpublished</p>}

            <div className="p-3">
                <div className="flex flex-col mb-3 gap-x-4">
                    <p className="text-lg min-h-16 lg:min-h-fit">{car.name}</p>
                    <p >{car.priceDay}$/day</p>
                </div>
                <div className="grid md:grid-cols-2 gap-x-4">
                    <p className="flex items-center " ><Gem className="w-4 h-4 mr-2" />{car.type}</p>
                    <p className="flex items-center " ><Wrench className="w-4 h-4 mr-2" />{car.transmission}</p>
                    <p className="flex items-center " ><Users className="w-4 h-4 mr-2" />{car.people}</p>
                    <p className="flex items-center " ><Fuel className="w-4 h-4 mr-2" />{car.engine}</p>
                    <p className="flex items-center " ><Gauge className="w-4 h-4 mr-2" />{car.cv}</p>
                </div>
                <div className="flex justify-between mt-3 gap-x-4">
                    <Button variant="outline" onClick={() => deleteCar()}>
                        Delete <Trash className="w-4 h-4 " />
                    </Button>
                    <ButtonEditCar carData={car} />
                </div>
                {car.isPublish ?
                    <Button
                        className="w-full mt-3"
                        onClick={() => publishCar(false)}>
                        Unpublish
                        <Upload className="w-4 h-4 ml-2 " />
                    </Button>
                    : <Button
                        className="w-full mt-3"
                        onClick={() => publishCar(true)}>
                        Publish
                        <Upload className="w-4 h-4 ml-2" />
                    </Button>}
            </div>


        </div>

    )
}
