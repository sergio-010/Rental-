import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import ListCarsDashboard from "./components/ListCarsDashboard/ListCarsDashboard"
import { getAllCars } from "@/actions"

export default async function DashboardPage() {
    const { userId } = auth()

    if (!userId) {
        return redirect("/")
    }

    const { data, error } = await getAllCars({ isPublish: true })

    if (data === null || error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">List of cars</h2>
            </div>
            <ListCarsDashboard cars={data} />

        </div>
    )
}

