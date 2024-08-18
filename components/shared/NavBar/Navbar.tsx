'use client'
import { useAuth, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import LovedCars from '../../../app/(routes)/(dashboard)/loved-cars/page';
import { useLovedCars } from "@/hooks/use-loved-cars";

export default function Navbar() {
    const { userId } = useAuth()
    const { LovedItems, addLovedCar, removeLovedCar } = useLovedCars()
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
                            <Link href="/loved-cars">
                                <Heart
                                    className={`cursor-pointer ${LovedItems.length > 0 ? "fill-red-500" : ""}`} />
                            </Link>
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
