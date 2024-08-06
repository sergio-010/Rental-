import Link from "next/link"
import { SidebarItemProps } from "./interface"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"


export default function SidebarItem(props: SidebarItemProps) {
    const { item } = props
    const { label, icon: Icon, href } = item
    const pathname = usePathname()
    const activePath = pathname === href
    return (
        <Link
            href={href}
            className={cn(`flex gap-x-2 mt-2 text-slate-700 text-sm p-2 items-center hover:bg-slate-300/20 rounded-lg cursor-pointer`, { 'bg-slate-400/20': activePath })}
        >
            <Icon className="w-5 h-5" />

            <span>{label}</span>
        </Link >
    )
}
