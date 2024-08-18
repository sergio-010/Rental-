import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";

interface Props {
    setFilters: (filterName: string, filterValue: string) => void;
    clearFilters: () => void;
    filters: {
        type: string;
        transmission: string;
        engine: string;
        people: string;
    };
}

export default function FilterCars({ setFilters, clearFilters, filters }: Props) {
    const handleFilter = (filterName: string, value: string) => {
        setFilters(filterName, value);
    };

    return (
        <div className="mt-5 mb-8 flex flex-col space-y-2 md:flex-row md:space-y-0 md:gap-5">
            <Select
                onValueChange={(value) => handleFilter("type", value)}
                value={filters.type}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Type of car</SelectLabel>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="familiar">Familiar</SelectItem>
                        <SelectItem value="coupe">Coupe</SelectItem>
                        <SelectItem value="luxe">De luxe</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select
                onValueChange={(value) => handleFilter("transmission", value)}
                value={filters.transmission}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Type of Transmission</SelectLabel>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select
                onValueChange={(value) => handleFilter("engine", value)}
                value={filters.engine}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Engine" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Type of Engine</SelectLabel>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="gasoline">Gasoline</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select
                onValueChange={(value) => handleFilter("people", value)}
                value={filters.people}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="People" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Number of People</SelectLabel>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button onClick={clearFilters}>
                Clear Filters
                <Trash className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}
