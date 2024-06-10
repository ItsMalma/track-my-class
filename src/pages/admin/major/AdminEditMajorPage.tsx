import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Major, updateMajor } from "../../../apis/Major";
import { isApiErrors } from "../../../apis/error";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import {
  MajorInput,
  defaultMajorInput,
  majorSchema,
} from "../../../schemas/major.schemas";
import AdminFormMajorPage from "./AdminFormMajorPage";

export default function AdminEditMajorPage() {
  const params = useParams<{
    id: string;
  }>();

  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Edit Jurusan");
    selectSidebarItem("majors");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<MajorInput>({
    initialValues: defaultMajorInput,
    validate: valibotResolver(majorSchema),
  });
  const { setValues } = form;

  useEffect(() => {
    if (params.id) {
      pbClient
        .collection<Major>("majors")
        .getOne(params.id)
        .then((major) => {
          setValues({
            kode: major.kode,
            nama: major.nama,
          });
        });
    }
  }, [setValues, params.id, pbClient]);

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: MajorInput) => {
      if (!params.id) return;

      const notificationId = notifications.show({
        loading: true,
        message: "Mengedit jurusan...",
        color: "teal.9",
      });

      updateMajor(pbClient, params.id, input, (majorOrError) => {
        if (isApiErrors(majorOrError)) {
          console.error(majorOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal mengedit jurusan",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil mengedit jurusan",
          loading: false,
        });
        navigate("/admin/majors");
      });
    },
    [navigate, params.id, pbClient]
  );

  return <AdminFormMajorPage form={form} handleSubmit={handleSubmit} />;
}
