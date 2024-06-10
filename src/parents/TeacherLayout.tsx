import { Center, Loader } from "@mantine/core";
import { IconChecklist, IconHistory } from "@tabler/icons-react";
import { useEffect, useMemo } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { TeacherExpanded } from "../apis/Teacher";
import { useListCollection } from "../apis/common";
import { SidebarItemProps } from "../components/SidebarItem";
import { AppLayoutContext } from "./AppLayout";

const navItems: Omit<SidebarItemProps, "selected">[] = [
  {
    key: "absen",
    icon: IconChecklist,
    text: "Absen",
    url: "/teacher/absen",
  },
  {
    key: "rekap",
    icon: IconHistory,
    text: "Rekap",
    url: "/teacher/rekap",
  },
];

export type TeacherLayoutContext = Omit<AppLayoutContext, "setSidebarItems"> & {
  guru: TeacherExpanded;
};

export default function TeacherLayout() {
  const ctx = useOutletContext<AppLayoutContext>();
  useEffect(() => {
    ctx.setSidebarItems(navItems);
  }, [ctx, ctx.setSidebarItems]);

  const teachers = useListCollection<TeacherExpanded>(
    ctx.pbClient,
    "teachers",
    {
      filter: `user = "${ctx.user.id}"`,
    }
  );
  const teacher = useMemo(() => {
    if (teachers.length > 0) {
      return teachers[0];
    }
    return false;
  }, [teachers]);

  return ctx.user.isAdmin || teacher === null ? (
    <Navigate to="/login" />
  ) : teacher === false ? (
    <Center flex={1}>
      <Loader />
    </Center>
  ) : (
    <Outlet
      context={{ ...ctx, guru: teacher } satisfies TeacherLayoutContext}
    />
  );
}
