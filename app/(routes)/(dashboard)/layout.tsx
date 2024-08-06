import NavbarDashboard from "./dashboard/components/NavbarDasboard/NavbarDashboard"
import Sidebar from "./dashboard/components/sidebar/Sidebar"


interface LayoutDashboardProps {
    children: React.ReactNode
}
export default function LayoutDashboard({ children }: LayoutDashboardProps) {
    return (
        <div className="flex w-full h-full">
            <div className="hidden h-full xl:block w-80 xl:fixed" ><Sidebar /></div>
            <div className="w-full h-full xl:ml-80"> <NavbarDashboard />
                <div className="p-6 h-max">{children}</div>
            </div>
        </div>
    )
}
