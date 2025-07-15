"use client"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Car } from "@prisma/client"
import { Input } from "@/components/ui/input"
import { formSchema } from './FormEditCar.form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadButton } from "@/utils/uploadthing"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"


interface FormEditCarProps {
    carData: Car
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}
export function FormEditCar({ carData, setOpenDialog }: FormEditCarProps) {
    const [photoUploaded, setphotoUploaded] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: carData.name,
            cv: carData.cv,
            transmission: carData.transmission,
            people: carData.people,
            photo: carData.photo,
            engine: carData.engine,
            type: carData.type,
            priceDay: carData.priceDay,
            isPublish: carData.isPublish || false,
        },
        mode: "onChange",
    })
    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log("Submitting form update with values:", values);
            
            // Verify required fields before submission
            if (!values.name || !values.cv || !values.photo) {
                console.error("Missing required fields:", {
                    name: !values.name,
                    cv: !values.cv,
                    photo: !values.photo
                });
                
                toast({
                    title: "Error",
                    description: "Por favor completa todos los campos requeridos",
                    variant: "destructive",
                });
                return;
            }
            
            // Make sure all fields are properly formatted
            const formattedValues = {
                ...values,
                cv: String(values.cv),
                priceDay: String(values.priceDay),
                isPublish: values.isPublish || false
            };
            
            console.log("Formatted values for update:", formattedValues);
            const response = await axios.patch(`/api/car/${carData.id}/form`, formattedValues);
            console.log("Server response:", response.data);
            
            toast({
                title: "Éxito",
                description: "Vehículo actualizado correctamente",
            });

            setOpenDialog(false);
            router.refresh();
        } catch (error: any) {
            console.error("Error updating car:", error);
            console.error("Response data:", error?.response?.data);
            console.error("Status code:", error?.response?.status);
            
            toast({
                title: "Error",
                description: error?.response?.data?.error || "Algo salió mal, intenta de nuevo",
                variant: "destructive",
            });
        }
    }
    
    // Monitoreo del estado del formulario para debugging
    console.log("Edit form state:", {
        isDirty: form.formState.isDirty,
        isValid: form.formState.isValid,
        errors: form.formState.errors
    });


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Car name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Camaro RS" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cv"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CV</FormLabel>
                                <FormControl>
                                    <Input placeholder="150cv" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="transmission"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Transmission</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the type of transmission" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="manual">Manual</SelectItem>
                                        <SelectItem value="automatic">Automatic</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="people"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>People</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the quantity of people" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="7">7</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="engine"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Engine</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the engine " />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="gasoil">Gasolina</SelectItem>
                                        <SelectItem value="diesel">Diesel</SelectItem>
                                        <SelectItem value="electric">Electrico</SelectItem>
                                        <SelectItem value="hybrid">Híbrido</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the type of car " />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="sedan">Sedan</SelectItem>
                                        <SelectItem value="suv">SUV</SelectItem>
                                        <SelectItem value="coupe">Coupe</SelectItem>
                                        <SelectItem value="familiar">Familiar</SelectItem>
                                        <SelectItem value="luxe">De Luxe</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Car Image</FormLabel>
                                <FormControl>
                                    {photoUploaded ? <p>Image uploaded</p>
                                        : (<UploadButton
                                            className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-2 outline-offset-2 outline-slate-600"
                                            {...field}
                                            endpoint="photo"
                                            onClientUploadComplete={(res) => {
                                                form.setValue("photo", res?.[0].url)
                                                setphotoUploaded(true)
                                            }}
                                            onUploadError={(error: Error) => {
                                                console.log(error)
                                            }}
                                        />)
                                    }

                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priceDay"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Price per day</FormLabel>
                                <FormControl>
                                    <Input placeholder="100$" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="col-span-2">
                        <Button 
                            type="submit" 
                            className="w-full mt-5" 
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? "Actualizando..." : "Actualizar vehículo"}
                        </Button>
                        {Object.keys(form.formState.errors).length > 0 && (
                            <p className="text-sm text-red-500 mt-2">
                                Por favor completa todos los campos requeridos
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </Form>


    )
}
