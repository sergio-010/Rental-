'use client'
import { Car } from "@prisma/client"
import ListCars from "../ListCars/ListCars"
import { useEffect, useState } from "react"
import FilterCars from "../FilterCars/FilterCars"

interface Props {
    cars: Car[]
}

export default function FiltersAndListCars({ cars }: Props) {
    const [filteredCars, setfilteredCars] = useState<Car[]>(cars);
    const [filters, setFilters] = useState({
        type: "",
        transmission: "",
        engine: "",
        people: "",
    });

    useEffect(() => {
        let filtered = cars;

        if (filters.type) {
            filtered = filtered.filter((car) => car.type.toLowerCase().includes(filters.type.toLocaleLowerCase()));
        }
        if (filters.transmission) {
            filtered = filtered.filter((car) => car.transmission.toLowerCase().includes(filters.transmission.toLocaleLowerCase()));
        }
        if (filters.engine) {
            filtered = filtered.filter((car) => car.engine.toLowerCase().includes(filters.engine.toLocaleLowerCase()));
        }
        if (filters.people) {
            filtered = filtered.filter((car) => car.people.toLowerCase().includes(filters.people.toLocaleLowerCase()));
        }
        setfilteredCars(filtered);
    }, [filters, cars]);

    const handleFilterChange = (filterName: string, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    const clearFilters = () => {
        setFilters({
            type: "",
            transmission: "",
            engine: "",
            people: "",
        });
    };

    return (
        <div>
            <FilterCars
                setFilters={handleFilterChange}
                clearFilters={clearFilters}
                filters={filters}
            />
            <ListCars cars={filteredCars} />
        </div>
    );
}
