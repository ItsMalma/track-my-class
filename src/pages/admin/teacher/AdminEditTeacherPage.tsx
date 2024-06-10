import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Teacher, TeacherExpanded, updateTeacher } from "../../../apis/Teacher";
import { isApiErrors } from "../../../apis/error";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import {
  TeacherInput,
  defaultTeacherInput,
  teacherSchema,
} from "../../../schemas/teacher.schemas";
import AdminFormTeacherPage from "./AdminFormTeacherPage";

export default function AdminEditTeacherPage() {
  const params = useParams<{
    id: string;
  }>();

  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Edit Guru");
    selectSidebarItem("teachers");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<TeacherInput>({
    initialValues: defaultTeacherInput,
    validate: valibotResolver(teacherSchema),
  });
  const { setValues } = form;

  useEffect(() => {
    if (params.id) {
      pbClient
        .collection<Teacher>("teachers")
        .getOne<TeacherExpanded>(params.id, {
          expand: "user",
        })
        .then((teacher) => {
          setValues({
            nama: teacher.nama,
            nip: teacher.nip,
            alamat: teacher.alamat,
            nomorWhatsapp: teacher.nomorWhatsapp,
            pengguna: {
              nama: teacher.expand.user.username,
              email: teacher.expand.user.email,
              kataSandi: "",
            },
          });
        });
    }
  }, [setValues, params.id, pbClient]);

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: TeacherInput) => {
      if (!params.id) return;

      const notificationId = notifications.show({
        loading: true,
        message: "Mengedit guru...",
        color: "teal.9",
      });

      updateTeacher(pbClient, params.id, input, (teacherOrError) => {
        if (isApiErrors(teacherOrError)) {
          console.error(teacherOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal mengedit guru",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil mengedit guru",
          loading: false,
        });
        navigate("/admin/teachers");
      });
    },
    [navigate, params.id, pbClient]
  );

  return <AdminFormTeacherPage form={form} handleSubmit={handleSubmit} />;
}
