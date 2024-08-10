import { Icon } from "lucide-react";
import { FeaturesData } from "./FeaturesData";
import Reveal from "@/components/shared/Reveal/Reveal";

export default function Feature() {
    return (
        <div className="max-w-6xl mx-auto p-6 lg:py-40">
            <h3 className="text-2xl font-bold lg:text-6xl">Key Features</h3>
            <p className="mt-5 max-w-lg lg:mt-10 lg:mb-16 text-xl">We offer a wide range of car rental services.</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5">
                {FeaturesData.map(({ icon: Icon, text, bg, delay }) => (
                    <Reveal key={text} className=" p-6 rounded-xl hover:shadow-md flex flex-col items-center "
                        position="rigth"
                        delay={delay}>
                        <div className={`rounded-full ${bg} w-fit p-4 flex justify-center`}>
                            <Icon className="w-8 h-8" />
                        </div>
                        <p className="font-bold text-center text-lg">{text}</p>
                    </Reveal>
                )
                )
                }

            </div>
        </div >
    )
}
