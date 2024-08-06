'use client'

import { Separator } from "@/components/ui/separator"
import { useAuth } from "@clerk/nextjs"
import { dataAdminSidebar, dataGeneralSidebar } from "./SidebarRoutes.data"
import SidebarItem from "../SidebarItem/SidebarItem"

export default function SidebarRoutes() {
    const { userId } = useAuth()

    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="p-2 md:p-6">
                    <p className="mb-2 text-slate-500">GENERAL</p>
                    {dataGeneralSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>
                <Separator />
                <div className="p-2 md:p-6">
                    <p className="mb-2 text-slate-500">ADMIN</p>
                    {dataAdminSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>
            </div>

            <footer className="p-2 md:p-6">
                <Separator />
                <p className="mt-4 text-slate-500 ">© 2023 Cheo Cars. All rights reserved.</p>
            </footer>

        </div>

    )
}
