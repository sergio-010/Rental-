import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { toast } from '../components/ui/use-toast'
import { Car } from '@prisma/client'
import LovedCars from '@/app/(routes)/(dashboard)/loved-cars/page'

interface LovedCar {
    LovedItems: Car[]
    addLovedCar: (data: Car) => void
    removeLovedCar: (id: string) => void
}
export const useLovedCars = create(
    persist<LovedCar>(
        (set, get) => ({
            LovedItems: [],
            // Agrega un carro a la lista de favoritos
            addLovedCar: (data: Car) => {
                const currentLovedItems = get().LovedItems;
                const existingItem = currentLovedItems.find((item) => item.id === data.id);
                if (existingItem) {
                    return toast({ title: "Car already in the list" });
                }
                set({
                    LovedItems: [...get().LovedItems, data],
                });

                toast({ title: "Car added to the list" });
            },

            removeLovedCar: (id: string) => {
                set({
                    LovedItems: [...get().LovedItems.filter((item) => item.id !== id)],
                });
                toast({ title: "Car removed from the list" });
            },
        }),
        {
            name: 'loved-cars',
            storage: createJSONStorage(() => localStorage),
        }
    )
);