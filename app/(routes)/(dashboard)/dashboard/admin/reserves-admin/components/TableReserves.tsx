import { Order } from "@prisma/client"
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
interface TableReservesProps {
    orders: Order[]
}
export default function TableReserves({ orders }: TableReservesProps) {
    const totalAmount = orders.reduce((acc, booking) => {
        return acc + parseFloat(booking.totalAmount)
    }, 0)
    return (
        <Table>
            <TableCaption>A list of your recent orders.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead >Order Date</TableHead>
                    <TableHead>Customer Id</TableHead>
                    <TableHead>Car</TableHead>
                    <TableHead>Date Start</TableHead>
                    <TableHead>Date End</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell className="font-medium">{(order.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell>{order.userId}</TableCell>
                        <TableCell>{order.carName}</TableCell>
                        <TableCell>{(order.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell>{(order.orderEndDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right" >
                            {formatPrice(Number(order.totalAmount))}
                        </TableCell>
                    </TableRow>
                ))}

                <TableRow>
                    <TableCell colSpan={5}>   Total</TableCell>
                    <TableCell className="text-right" >
                        {formatPrice(totalAmount)}
                    </TableCell>
                </TableRow>

            </TableBody>
        </Table >

    )
}
