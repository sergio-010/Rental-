'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import FormAddCar from "../FormAddCar/FormAddCar"

export default function ButtonAddCar() {
    const [openDialog, setOpenDialog] = useState(false)

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Add new car
                    <PlusCircle className="ml-2 " />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Nuevo Vehículo</DialogTitle>
                    <DialogDescription className="pt-3">
                        Complete el formulario para agregar un nuevo vehículo al inventario
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <FormAddCar setOpenDialog={setOpenDialog} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
