import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addSchedule } from "../../../apis/Schedule";
import { isApiErrors } from "../../../apis/error";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import {
  ScheduleInput,
  defaultScheduleInput,
  scheduleSchema,
} from "../../../schemas/schedule.schemas";
import AdminFormSchedulePage from "./AdminFormSchedulePage";

export default function AdminAddSchedulePage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Tambah Jadwal");
    selectSidebarItem("schedules");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<ScheduleInput>({
    initialValues: defaultScheduleInput,
    validate: valibotResolver(scheduleSchema),
  });

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: ScheduleInput) => {
      const notificationId = notifications.show({
        loading: true,
        message: "Menambahkan jadwal...",
        color: "teal.9",
      });

      addSchedule(pbClient, input, (scheduleOrError) => {
        if (isApiErrors(scheduleOrError)) {
          console.error(scheduleOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal menambahkan jadwal",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil menambahkan jadwal",
          loading: false,
        });
        navigate("/admin/schedules");
      });
    },
    [navigate, pbClient]
  );

  return <AdminFormSchedulePage form={form} handleSubmit={handleSubmit} />;
}
