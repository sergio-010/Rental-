'use client'
import { useAuth, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import ListCars from '../../../app/(routes)/(dashboard)/dashboard/admin/cars-manager/components/ListCars/ListCars';
import { Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const { userId } = useAuth()
    return (
        <div className="max-w-5xl py-5 mx-auto">
            <div className="justify-between lg:flex ">
                <Link href="/" className="flex items-center justify-center gap-x-2">
                    <Image src="/logo.svg" alt="car" width={50} height={50} />
                    <span className="text-xl font-bold">CHEO CARS</span>
                </Link>
                <div className="flex items-center justify-center gap-x-7">
                    <Link href="/cars">List Cars</Link>
                    <Link href="/dashboard">Dashboard</Link>
                    {userId ? (
                        <>
                            <Link href="/loved-cars"><Heart className="h-6 w-6 cursor-pointer" /></Link>
                            <UserButton />
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in" className="cursor-pointer flex gap-x-3">
                                <Button >
                                    Inicia sesión
                                    <User className="h-4 w-4" />
                                </Button>

                            </Link>
                        </>
                    )}

                </div>
            </div>
        </div >
    )
}
