import Navbar from '@/components/shared/NavBar/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function OrderConfirmation() {
    return (
        <div>
            <Navbar />
            <div className='p-6 mx-auto max-w-7xl'>
                <div className='flex flex-col items-center justify-center gap-4 text-center'>
                    <h1 className='text-2xl font-bold'>Thank you for your order</h1>
                    <p>We will ship your goods as soon as possible</p>
                    <p>Thank you</p>
                    <Link href='/' ><Button>Back to Home</Button></Link>
                </div>

            </div>
        </div>
    )
}
