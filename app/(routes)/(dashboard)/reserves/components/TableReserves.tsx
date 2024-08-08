import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatPrice } from "@/lib/formatPrice"
import { Order } from "@prisma/client"

interface TableReservesProps {
    orders: Order[]
}
export default function TableReserves({ orders }: TableReservesProps) {
    const totalAmount = orders.reduce((acc, booking) => {
        return acc + parseFloat(booking.totalAmount)
    }, 0)


    return (
        <Table>
            <TableCaption>A list of your recent orders</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead >Car</TableHead>
                    <TableHead>Date Start</TableHead>
                    <TableHead>Date End</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.carName}</TableCell>
                        <TableCell>{(order.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell>{(order.orderEndDate).toLocaleDateString()}</TableCell>
                        <TableCell><div className="p-2 text-white bg-green-500 rounded-lg w-fit">{order.status}</div></TableCell>
                        <TableCell className="text-right" >
                            {formatPrice(Number(order.totalAmount))}
                        </TableCell>
                    </TableRow>

                ))}
                <TableRow>
                    <TableCell colSpan={4}>   Total</TableCell>

                    <TableCell className="text-right" >
                        {formatPrice(totalAmount)}
                    </TableCell>
                </TableRow>

            </TableBody>
        </Table>

    )
}
