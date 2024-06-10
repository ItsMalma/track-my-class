import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Subject, updateSubject } from "../../../apis/Subject";
import { isApiErrors } from "../../../apis/error";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import {
  SubjectInput,
  defaultSubjectInput,
  subjectSchema,
} from "../../../schemas/subject.schemas";
import AdminFormSubjectPage from "./AdminFormSubjectPage";

export default function AdminEditSubjectPage() {
  const params = useParams<{
    id: string;
  }>();

  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Edit Mata Pelajaran");
    selectSidebarItem("subjects");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<SubjectInput>({
    initialValues: defaultSubjectInput,
    validate: valibotResolver(subjectSchema),
  });
  const { setValues } = form;

  useEffect(() => {
    if (params.id) {
      pbClient
        .collection<Subject>("subjects")
        .getOne(params.id)
        .then((subject) => {
          setValues({
            kode: subject.kode,
            nama: subject.nama,
          });
        });
    }
  }, [setValues, params.id, pbClient]);

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: SubjectInput) => {
      if (!params.id) return;

      const notificationId = notifications.show({
        loading: true,
        message: "Mengedit mata pelajaran...",
        color: "teal.9",
      });

      updateSubject(pbClient, params.id, input, (subjectOrError) => {
        if (isApiErrors(subjectOrError)) {
          console.error(subjectOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal mengedit mata pelajaran",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil mengedit mata pelajaran",
          loading: false,
        });
        navigate("/admin/subjects");
      });
    },
    [navigate, params.id, pbClient]
  );

  return <AdminFormSubjectPage form={form} handleSubmit={handleSubmit} />;
}
