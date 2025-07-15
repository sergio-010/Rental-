import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Car } from "@prisma/client"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { FormEditCar } from "../FormEditCar"

interface ButtonEditCarProps {
    carData: Car
}
export function ButtonEditCar({ carData }: ButtonEditCarProps) {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setOpen(true)}>
                        Edit
                        <Pencil className="w-4 h-4 ml-2" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Editar vehículo</DialogTitle>
                        <DialogDescription className="pt-3">
                            Modifica la información del vehículo
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <FormEditCar carData={carData} setOpenDialog={setOpen} />
                    </div>
                </DialogContent>

            </Dialog>
        </div>
    )
}
