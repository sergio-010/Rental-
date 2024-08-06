import Image from "next/image";
import Link from "next/link";

export default function LogoDashboard() {
    return (
        <Link href='/' className="flex items-center h-20 gap-2 px-6 border-b cursor-pointer min-h-20">
            <Image
                src="/logo.svg"
                alt="car"
                width={30}
                height={30}
                priority
            />
            <h1 className='text-xl font-bold'>CHEO CARS</h1>
        </Link>
    )
}
