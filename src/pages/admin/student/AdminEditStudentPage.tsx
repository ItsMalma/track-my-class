import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Student, updateStudent } from "../../../apis/Student";
import { isApiErrors } from "../../../apis/error";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import {
  StudentInput,
  defaultStudentInput,
  studentSchema,
} from "../../../schemas/student.schemas";
import AdminFormStudentPage from "./AdminFormStudentPage";

export default function AdminEditStudentPage() {
  const params = useParams<{
    id: string;
  }>();

  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Edit Murid");
    selectSidebarItem("students");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<StudentInput>({
    initialValues: defaultStudentInput,
    validate: valibotResolver(studentSchema),
  });
  const { setValues } = form;

  useEffect(() => {
    if (params.id) {
      pbClient
        .collection<Student>("students")
        .getOne(params.id)
        .then((student) => {
          setValues(student);
        });
    }
  }, [setValues, params.id, pbClient]);

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: StudentInput) => {
      if (!params.id) return;

      const notificationId = notifications.show({
        loading: true,
        message: "Mengedit murid...",
        color: "teal.9",
      });

      updateStudent(pbClient, params.id, input, (studentOrError) => {
        if (isApiErrors(studentOrError)) {
          console.error(studentOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal mengedit murid",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil mengedit murid",
          loading: false,
        });
        navigate("/admin/students");
      });
    },
    [navigate, params.id, pbClient]
  );

  return <AdminFormStudentPage form={form} handleSubmit={handleSubmit} />;
}
