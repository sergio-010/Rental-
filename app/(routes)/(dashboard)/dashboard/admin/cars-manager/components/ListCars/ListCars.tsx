import { Car } from "@prisma/client"
import { CardCar } from "./CardCard"

interface ListCarsProps {
    cars: Car[]
}

export default function ListCars({ cars }: ListCarsProps) {
    return (
        <div className="grid grid-cols-2 gap-6 my-4 lg:grid-cols-4 ">
            {
                cars.map((car) => (
                    <CardCar key={car.id} car={car} />

                ))}

        </div>
    )
}
