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
import { SubjectInput } from "../../../schemas/subject.schemas";

type AdminFormSubjectPageProps = {
  form: UseFormReturnType<SubjectInput>;
  handleSubmit: (input: SubjectInput) => void;
};

export default function AdminFormSubjectPage(props: AdminFormSubjectPageProps) {
  return (
    <Paper m="lg" p="lg" radius="md">
      <form onSubmit={props.form.onSubmit(props.handleSubmit)}>
        <Stack>
          <FormDivider text="Informasi Mata Pelajaran" />
          <SimpleGrid cols={2}>
            <TextInput label="Kode" {...props.form.getInputProps("kode")} />
            <TextInput label="Nama" {...props.form.getInputProps("nama")} />
          </SimpleGrid>
          <Group>
            <Button color="teal.9" type="submit">
              Submit
            </Button>
            <Button color="red.9" component={Link} to="/admin/subjects">
              Batal
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
