import {
  Button,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Link, useOutletContext } from "react-router-dom";
import { ClassExpanded } from "../../../apis/Class";
import { useListCollection } from "../../../apis/common";
import FormDivider from "../../../components/FormDivider";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import { StudentInput } from "../../../schemas/student.schemas";

type AdminFormStudentPageProps = {
  form: UseFormReturnType<StudentInput>;
  handleSubmit: (input: StudentInput) => void;
};

export default function AdminFormStudentPage(props: AdminFormStudentPageProps) {
  const { pbClient } = useOutletContext<AdminLayoutContext>();

  const classes = useListCollection<ClassExpanded>(pbClient, "classes", {
    expand: "jurusan",
  });

  return (
    <Paper m="lg" p="lg" radius="md">
      <form onSubmit={props.form.onSubmit(props.handleSubmit)}>
        <Stack>
          <FormDivider text="Informasi Murid" />
          <SimpleGrid cols={2}>
            <TextInput label="Nama" {...props.form.getInputProps("nama")} />
            <TextInput label="NISN" {...props.form.getInputProps("nisn")} />
            <TextInput label="Alamat" {...props.form.getInputProps("alamat")} />
            <TextInput
              label="Nomor WhatsApp"
              {...props.form.getInputProps("nomorWhatsapp")}
            />
            <Select
              label="Kelas"
              data={classes.map((class_) => ({
                label: `${class_.tingkat} ${class_.expand.jurusan.nama} ${class_.sub}`,
                value: class_.id,
              }))}
              {...props.form.getInputProps("kelas")}
            />
          </SimpleGrid>
          <Group>
            <Button color="teal.9" type="submit">
              Submit
            </Button>
            <Button color="red.9" component={Link} to="/admin/studentes">
              Batal
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
