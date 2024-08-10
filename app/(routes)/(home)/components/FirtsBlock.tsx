import Reveal from "@/components/shared/Reveal/Reveal";
import Image from "next/image";

export default function FirtsBlock() {
    return (
        <div className="grid lg:grid-cols-2 lg:px-0 lg:py-24 items-center">
            <Reveal position="bottom" className="p-6 lg:pl-40">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold">Premiun
                    <span className="block">Rental Cars</span>
                    in Colombia
                </h1>
                <p className="text-lg mt-2 lg:mt-5 lg:text-xl max-w-sm">
                    Find your next car easily with our easy-to-use car rental
                </p>
            </Reveal>
            <Reveal position="rigth" className="flex justify-end">
                <Image src="/porsche-1.png" width={800} height={800} alt="car" priority />
            </Reveal>
        </div>
    )
}
