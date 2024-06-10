import {
  Button,
  Group,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Link, useOutletContext } from "react-router-dom";
import { Major } from "../../../apis/Major";
import { useListCollection } from "../../../apis/common";
import FormDivider from "../../../components/FormDivider";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import { ClassInput } from "../../../schemas/class.schemas";

type AdminFormClassPageProps = {
  form: UseFormReturnType<ClassInput>;
  handleSubmit: (input: ClassInput) => void;
};

export default function AdminFormClassPage(props: AdminFormClassPageProps) {
  const { pbClient } = useOutletContext<AdminLayoutContext>();

  const majors = useListCollection<Major>(pbClient, "majors");

  return (
    <Paper m="lg" p="lg" radius="md">
      <form onSubmit={props.form.onSubmit(props.handleSubmit)}>
        <Stack>
          <FormDivider text="Informasi Kelas" />
          <SimpleGrid cols={2}>
            <Select
              label="Tingkat"
              data={["X", "XI", "XII", "XIII"]}
              {...props.form.getInputProps("tingkat")}
            />
            <Select
              label="Jurusan"
              data={majors.map((major) => ({
                label: major.nama,
                value: major.id,
              }))}
              {...props.form.getInputProps("jurusan")}
            />
            <NumberInput label="Sub" {...props.form.getInputProps("sub")} />
          </SimpleGrid>
          <Group>
            <Button color="teal.9" type="submit">
              Submit
            </Button>
            <Button color="red.9" component={Link} to="/admin/classes">
              Batal
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
