import { db } from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import TableReserves from "./components/TableReserves"


export default async function PageReservesAdmin() {
    const { userId } = auth()
    const user = await currentUser()
    if (!userId || !user) {
        return redirect("/")
    }
    const orders = await db.order.findMany({
        orderBy: {
            createaT: "desc"
        }
    })
    console.log(orders)
    return (
        <div>
            <h1 className="text-2xl mb-4 font-bold">Reserves Admin</h1>
            <TableReserves orders={orders} />

        </div>
    )
}
