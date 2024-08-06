import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes"
import { UserButton } from "@clerk/nextjs"

export default function NavbarDashboard() {
    return (
        <nav className="flex items-center justify-between w-full h-20 px-2 border-b bg-background gap-x-4 md:px-6">
            <div className="block xl:hidden ">
                <Sheet>
                    <SheetTrigger className="flex items-center">
                        <Menu />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SidebarRoutes />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="flex items-center justify-end w-full gap-x-2">
                <UserButton />

            </div>

        </nav>
    )
}
