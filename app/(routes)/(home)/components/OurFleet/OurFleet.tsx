import { cn } from "@/lib/utils";
import { OurFleetData, OurFleetData2, OurFleetData3 } from "./OurFleetData";
import { Divide, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function OurFleet() {
    return (
        <div className="max-w-6xl mx-auto text-center py-12 lg:py-40 p-6">
            <h3 className="text-2xl font-bold lg:text-6xl">Our Vehicle Fleet</h3>
            <p className="mt-2 lg:mt-5 text-lg lg:text-xl w-full text-center mx-auto max-w-2xl mb-5 lg:mb-10">We offer a wide range of car rental services.</p>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 items-center justify-center mb-5 max-w-2xl mx-auto">
                {OurFleetData.map(({ name, active }) => (
                    <div key={name} className={cn("rounded-xl py-2 px-3 ", active ? "bg-black text-white" : "bg-slate-100 text-black")}>
                        {name}
                    </div>

                ))}
            </div>
            <div className="mb-10">
                <div className="grid grid-cols-3  gap-x-6 mb-6">
                    {OurFleetData2.map(({ url }) => (
                        <div key={url}  >
                            <Image
                                src={`/${url}`}
                                alt="car"
                                width={400}
                                height={300}
                                className="rounded-xl"
                            />
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-4  gap-x-6 mb-6 max-w-5xl mx-auto">
                    {OurFleetData3.map(({ url }) => (
                        <div key={url}  >
                            <Image
                                src={`/${url}`}
                                alt="car"
                                width={400}
                                height={200}
                                className="rounded-xl aspect-[3/2]"
                            />
                        </div>

                    ))}
                </div>
            </div>
            <Link href="/cars" className="text-black font-bold">
                <Button className="rounded-xl p-6 mt-5 text-lg" variant={"outline"}>View All Vehicles
                    <MoveRight className="ml-2" />
                </Button>
            </Link>
        </div >
    )
}
