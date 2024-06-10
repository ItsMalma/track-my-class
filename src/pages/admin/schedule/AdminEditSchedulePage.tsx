import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Schedule, updateSchedule } from "../../../apis/Schedule";
import { isApiErrors } from "../../../apis/error";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import {
  ScheduleInput,
  defaultScheduleInput,
  scheduleSchema,
} from "../../../schemas/schedule.schemas";
import AdminFormSchedulePage from "./AdminFormSchedulePage";

export default function AdminEditSchedulePage() {
  const params = useParams<{
    id: string;
  }>();

  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Edit Jadwal");
    selectSidebarItem("schedules");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<ScheduleInput>({
    initialValues: defaultScheduleInput,
    validate: valibotResolver(scheduleSchema),
  });
  const { setValues } = form;

  useEffect(() => {
    if (params.id) {
      pbClient
        .collection<Schedule>("schedules")
        .getOne(params.id)
        .then((schedule) => {
          setValues(schedule);
        });
    }
  }, [setValues, params.id, pbClient]);

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: ScheduleInput) => {
      if (!params.id) return;

      const notificationId = notifications.show({
        loading: true,
        message: "Mengedit jadwal...",
        color: "teal.9",
      });

      updateSchedule(pbClient, params.id, input, (scheduleOrError) => {
        if (isApiErrors(scheduleOrError)) {
          console.error(scheduleOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal mengedit jadwal",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil mengedit jadwal",
          loading: false,
        });
        navigate("/admin/schedules");
      });
    },
    [navigate, params.id, pbClient]
  );

  return <AdminFormSchedulePage form={form} handleSubmit={handleSubmit} />;
}
