import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addStudent } from "../../../apis/Student";
import { isApiErrors } from "../../../apis/error";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import {
  StudentInput,
  defaultStudentInput,
  studentSchema,
} from "../../../schemas/student.schemas";
import AdminFormStudentPage from "./AdminFormStudentPage";

export default function AdminAddStudentPage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Tambah Murid");
    selectSidebarItem("students");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<StudentInput>({
    initialValues: defaultStudentInput,
    validate: valibotResolver(studentSchema),
  });

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: StudentInput) => {
      const notificationId = notifications.show({
        loading: true,
        message: "Menambahkan murid...",
        color: "teal.9",
      });

      addStudent(pbClient, input, (studentOrError) => {
        if (isApiErrors(studentOrError)) {
          console.error(studentOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal menambahkan murid",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil menambahkan murid",
          loading: false,
        });
        navigate("/admin/students");
      });
    },
    [navigate, pbClient]
  );

  return <AdminFormStudentPage form={form} handleSubmit={handleSubmit} />;
}
