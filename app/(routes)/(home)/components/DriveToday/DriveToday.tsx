import Reveal from "@/components/shared/Reveal/Reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function DriveToday() {
    return (
        <div className="max-w-7xl mx-auto p-6 lg:my-32">
            <div className="bg-[url('/background-2.jpg')] bg-cover bg-center bg-no-repeat rounded-xl p-6 lg:p-32 relative">
                <div className="lg:flex gap-x-6">
                    <div>
                        <h3 className="text-4xl text-white">Drive Your Dream car Today</h3>
                        <p className="text-white my-5 text-xl ">Book your car today and get it delivered to your door</p>
                        <Link href="/sign-in" >
                            <Button variant="outline" size={"lg"}>
                                Register Now
                            </Button>

                        </Link>
                    </div>
                    <Reveal className="lg:absolute lg:-right-32 top-5" position="bottom" >
                        <Image
                            src="/carrito.png"
                            alt="car"
                            width={550}
                            height={250}
                        />
                    </Reveal>

                </div>
            </div>
        </div>
    )
}
