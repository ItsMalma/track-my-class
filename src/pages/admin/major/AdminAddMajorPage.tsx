import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addMajor } from "../../../apis/Major";
import { isApiErrors } from "../../../apis/error";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import {
  MajorInput,
  defaultMajorInput,
  majorSchema,
} from "../../../schemas/major.schemas";
import AdminFormMajorPage from "./AdminFormMajorPage";

export default function AdminAddMajorPage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Tambah Jurusan");
    selectSidebarItem("majors");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<MajorInput>({
    initialValues: defaultMajorInput,
    validate: valibotResolver(majorSchema),
  });

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: MajorInput) => {
      const notificationId = notifications.show({
        loading: true,
        message: "Menambahkan jurusan...",
        color: "teal.9",
      });

      addMajor(pbClient, input, (majorOrError) => {
        if (isApiErrors(majorOrError)) {
          console.error(majorOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal menambahkan jurusan",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil menambahkan jurusan",
          loading: false,
        });
        navigate("/admin/majors");
      });
    },
    [navigate, pbClient]
  );

  return <AdminFormMajorPage form={form} handleSubmit={handleSubmit} />;
}
