import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addTeacher } from "../../../apis/Teacher";
import { isApiErrors } from "../../../apis/error";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import {
  TeacherInput,
  defaultTeacherInput,
  teacherSchema,
} from "../../../schemas/teacher.schemas";
import AdminFormTeacherPage from "./AdminFormTeacherPage";

export default function AdminAddTeacherPage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Tambah Guru");
    selectSidebarItem("teachers");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<TeacherInput>({
    initialValues: defaultTeacherInput,
    validate: valibotResolver(teacherSchema),
  });

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: TeacherInput) => {
      const notificationId = notifications.show({
        loading: true,
        message: "Menambahkan guru...",
        color: "teal.9",
      });

      addTeacher(pbClient, input, (teacherOrError) => {
        if (isApiErrors(teacherOrError)) {
          console.error(teacherOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal menambahkan guru",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil menambahkan guru",
          loading: false,
        });
        navigate("/admin/teachers");
      });
    },
    [navigate, pbClient]
  );

  return <AdminFormTeacherPage form={form} handleSubmit={handleSubmit} />;
}
