import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addClass } from "../../../apis/Class";
import { isApiErrors } from "../../../apis/error";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import {
  ClassInput,
  classSchema,
  defaultClassInput,
} from "../../../schemas/class.schemas";
import AdminFormClassPage from "./AdminFormClassPage";

export default function AdminAddClassPage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Tambah Kelas");
    selectSidebarItem("classes");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<ClassInput>({
    initialValues: defaultClassInput,
    validate: valibotResolver(classSchema),
  });

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: ClassInput) => {
      const notificationId = notifications.show({
        loading: true,
        message: "Menambahkan kelas...",
        color: "teal.9",
      });

      addClass(pbClient, input, (classOrError) => {
        if (isApiErrors(classOrError)) {
          console.error(classOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal menambahkan kelas",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil menambahkan kelas",
          loading: false,
        });
        navigate("/admin/classes");
      });
    },
    [navigate, pbClient]
  );

  return <AdminFormClassPage form={form} handleSubmit={handleSubmit} />;
}
