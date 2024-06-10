import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Class, tingkatToRoman, updateClass } from "../../../apis/Class";
import { isApiErrors } from "../../../apis/error";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import {
  ClassInput,
  classSchema,
  defaultClassInput,
} from "../../../schemas/class.schemas";
import AdminFormClassPage from "./AdminFormClassPage";

export default function AdminEditClassPage() {
  const params = useParams<{
    id: string;
  }>();

  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Edit Kelas");
    selectSidebarItem("classes");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<ClassInput>({
    initialValues: defaultClassInput,
    validate: valibotResolver(classSchema),
  });
  const { setValues } = form;

  useEffect(() => {
    if (params.id) {
      pbClient
        .collection<Class>("classes")
        .getOne(params.id)
        .then((class_) => {
          setValues({
            tingkat: tingkatToRoman(class_.tingkat),
            jurusan: class_.jurusan,
            sub: class_.sub,
          });
        });
    }
  }, [setValues, params.id, pbClient]);

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: ClassInput) => {
      if (!params.id) return;

      const notificationId = notifications.show({
        loading: true,
        message: "Mengedit kelas...",
        color: "teal.9",
      });

      updateClass(pbClient, params.id, input, (classOrError) => {
        if (isApiErrors(classOrError)) {
          console.error(classOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal mengedit kelas",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil mengedit kelas",
          loading: false,
        });
        navigate("/admin/classes");
      });
    },
    [navigate, params.id, pbClient]
  );

  return <AdminFormClassPage form={form} handleSubmit={handleSubmit} />;
}
