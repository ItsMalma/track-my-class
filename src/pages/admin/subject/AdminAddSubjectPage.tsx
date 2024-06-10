import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addSubject } from "../../../apis/Subject";
import { isApiErrors } from "../../../apis/error";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import {
  SubjectInput,
  defaultSubjectInput,
  subjectSchema,
} from "../../../schemas/subject.schemas";
import AdminFormSubjectPage from "./AdminFormSubjectPage";

export default function AdminAddSubjectPage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Tambah Mata Pelajaran");
    selectSidebarItem("subjects");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<SubjectInput>({
    initialValues: defaultSubjectInput,
    validate: valibotResolver(subjectSchema),
  });

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: SubjectInput) => {
      const notificationId = notifications.show({
        loading: true,
        message: "Menambahkan mata pelajaran...",
        color: "teal.9",
      });

      addSubject(pbClient, input, (subjectOrError) => {
        if (isApiErrors(subjectOrError)) {
          console.error(subjectOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal menambahkan mata pelajaran",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil menambahkan mata pelajaran",
          loading: false,
        });
        navigate("/admin/subjects");
      });
    },
    [navigate, pbClient]
  );

  return <AdminFormSubjectPage form={form} handleSubmit={handleSubmit} />;
}
