import {
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Link } from "react-router-dom";
import FormDivider from "../../../components/FormDivider";
import { MajorInput } from "../../../schemas/major.schemas";

type AdminFormMajorPageProps = {
  form: UseFormReturnType<MajorInput>;
  handleSubmit: (input: MajorInput) => void;
};

export default function AdminFormMajorPage(props: AdminFormMajorPageProps) {
  return (
    <Paper m="lg" p="lg" radius="md">
      <form onSubmit={props.form.onSubmit(props.handleSubmit)}>
        <Stack>
          <FormDivider text="Informasi Jurusan" />
          <SimpleGrid cols={2}>
            <TextInput label="Kode" {...props.form.getInputProps("kode")} />
            <TextInput label="Nama" {...props.form.getInputProps("nama")} />
          </SimpleGrid>
          <Group>
            <Button color="teal.9" type="submit">
              Submit
            </Button>
            <Button color="red.9" component={Link} to="/admin/majors">
              Batal
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
