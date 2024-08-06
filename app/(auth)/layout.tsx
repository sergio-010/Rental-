import Image from 'next/image'

interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className='grid items-center justify-center h-full lg:grid-cols-2'>
            <div className='flex items-center justify-center'>{children}</div>
            <div className='items-center justify-center hidden h-full lg:flex lg:bg-slate-300 lg:flex-col'>
                <Image src="/logo.svg" alt="car" width={80} height={80} />
                <h1 className='text-3xl font-bold'>Cheo Cars</h1>
            </div>
        </div >
    )
}
