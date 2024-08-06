import { Calendar, Car, Database, Heart } from "lucide-react";

export const dataGeneralSidebar = [
  {
    label: "Car",
    icon: Car,
    href: "/dashboard",
  },
  {
    label: "Car Reserves",
    icon: Calendar,
    href: "/reserves",
  },
  {
    label: "Car",
    icon: Heart,
    href: "/loved-cars",
  },
];

export const dataAdminSidebar = [
  {
    label: "Manage Cars",
    icon: Database,
    href: "/dashboard/admin/cars-manager",
  },
  {
    label: "All Reserves",
    icon: Calendar,
    href: "/reserves",
  },
];
