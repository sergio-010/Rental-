'use client'
import Reveal from "@/components/shared/Reveal/Reveal"
import AutoPlay from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { SliderData } from "./SliderData";
import Image from "next/image";



export default function SliderBrands() {
    return (
        <Reveal position="bottom" className="flex gap-x-20 justify-center lg:pb mt-5 mb-10">
            <Carousel className="w-full max-w-6xl mx-auto"
                plugins={[
                    AutoPlay({
                        delay: 4500,
                    }),
                ]}>
                <CarouselContent >
                    {SliderData.map(({ url }) => (
                        <CarouselItem key={url}
                            className="basis-4/4 md:basis-2/4  lg:basis-1/6">
                            <Image src={`/${url}`} alt="car" width={90} height={90}
                                className="object-contain aspect-[3/2]" />

                        </CarouselItem >
                    ))}
                </CarouselContent >
            </Carousel>
        </Reveal >
    )
}
