import {
  IconBook,
  IconCalendar,
  IconDashboard,
  IconSchool,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { SidebarItemProps } from "../components/SidebarItem";
import { AppLayoutContext } from "./AppLayout";

const navItems: Omit<SidebarItemProps, "selected">[] = [
  {
    key: "dashboard",
    icon: IconDashboard,
    text: "Dashboard",
    url: "/admin/dashboard",
  },
  {
    key: "teachers",
    icon: IconUser,
    text: "Data Guru",
    url: "/admin/teachers",
  },
  {
    key: "majors",
    icon: IconSchool,
    text: "Data Jurusan",
    url: "/admin/majors",
  },
  {
    key: "classes",
    icon: IconUsers,
    text: "Data Kelas",
    url: "/admin/classes",
  },
  {
    key: "students",
    icon: IconUser,
    text: "Data Murid",
    url: "/admin/students",
  },
  {
    key: "subjects",
    icon: IconBook,
    text: "Data Mata Pelajaran",
    url: "/admin/subjects",
  },
  {
    key: "schedules",
    icon: IconCalendar,
    text: "Data Jadwal",
    url: "/admin/schedules",
  },
];

export type AdminLayoutContext = Omit<AppLayoutContext, "setSidebarItems">;

export default function AdminLayout() {
  const ctx = useOutletContext<AppLayoutContext>();
  useEffect(() => {
    ctx.setSidebarItems(navItems);
  }, [ctx, ctx.setSidebarItems]);

  return !ctx.user.isAdmin ? (
    <Navigate to="/login" />
  ) : (
    <Outlet context={ctx satisfies AdminLayoutContext} />
  );
}
