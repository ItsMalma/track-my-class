import {
  Button,
  Group,
  Paper,
  PasswordInput,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Link } from "react-router-dom";
import FormDivider from "../../../components/FormDivider";
import { TeacherInput } from "../../../schemas/teacher.schemas";

type AdminFormTeacherPageProps = {
  form: UseFormReturnType<TeacherInput>;
  handleSubmit: (input: TeacherInput) => void;
};

export default function AdminFormTeacherPage(props: AdminFormTeacherPageProps) {
  return (
    <Paper m="lg" p="lg" radius="md">
      <form onSubmit={props.form.onSubmit(props.handleSubmit)}>
        <Stack>
          <FormDivider text="Informasi Diri" />
          <SimpleGrid cols={2}>
            <TextInput label="Nama" {...props.form.getInputProps("nama")} />
            <TextInput label="NIP" {...props.form.getInputProps("nip")} />
            <TextInput label="Alamat" {...props.form.getInputProps("alamat")} />
            <TextInput
              label="Nomor WhatsApp"
              {...props.form.getInputProps("nomorWhatsapp")}
            />
          </SimpleGrid>
          <FormDivider text="Informasi Pengguna" />
          <SimpleGrid cols={2}>
            <TextInput
              label="Nama"
              {...props.form.getInputProps("pengguna.nama")}
            />
            <TextInput
              label="Email"
              {...props.form.getInputProps("pengguna.email")}
            />
            <PasswordInput
              label="Kata Sandi"
              {...props.form.getInputProps("pengguna.kataSandi")}
            />
          </SimpleGrid>
          <Group>
            <Button color="teal.9" type="submit">
              Submit
            </Button>
            <Button color="red.9" component={Link} to="/admin/teachers">
              Batal
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
