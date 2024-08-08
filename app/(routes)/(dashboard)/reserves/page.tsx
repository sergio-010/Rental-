/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

import Link from "next/link"
import { redirect } from "next/navigation"
import TableReserves from "./components/TableReserves"


export default async function Reserves() {
    const { userId } = auth()
    if (!userId) {
        return redirect("/")
    }
    const orders = await db.order.findMany({
        where: {
            userId: userId
        },
    })
    console.log(orders)

    return (
        <div>
            <h1 className='mb-4 text-3xl '>Reserves</h1>
            {orders.length === 0 ? (
                <div className='flex flex-col justify-center gap-4  '>
                    <h2 className='text-xl'>You don't have any reserve</h2>
                    <Link href='/cars'><Button>List Cars</Button></Link>
                </div>
            ) : (
                <TableReserves orders={orders} />

            )
            }
        </div>
    )
}
