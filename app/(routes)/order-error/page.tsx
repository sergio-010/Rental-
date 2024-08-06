import Navbar from '@/components/shared/NavBar/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function OrderError() {
    return (
        <div>
            <Navbar />
            <div className='p-6 mx-auto max-w-7xl'>
                <div className='flex-col flex items-center justify-center gap-4 text-center'>
                    <h1 className='text-2xl '>Order Error</h1>
                    <Link href='/'><Button>Back to Home</Button></Link>
                </div>
            </div>

        </div>
    )
}
