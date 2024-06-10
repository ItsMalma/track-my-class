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
import { ClassExpanded } from "../../../apis/Class";
import { Subject } from "../../../apis/Subject";
import { TeacherExpanded } from "../../../apis/Teacher";
import { useListCollection } from "../../../apis/common";
import FormDivider from "../../../components/FormDivider";
import { AdminLayoutContext } from "../../../parents/AdminLayout";
import { ScheduleInput } from "../../../schemas/schedule.schemas";

type AdminFormSchedulePageProps = {
  form: UseFormReturnType<ScheduleInput>;
  handleSubmit: (input: ScheduleInput) => void;
};

export default function AdminFormSchedulePage(
  props: AdminFormSchedulePageProps
) {
  const { pbClient } = useOutletContext<AdminLayoutContext>();

  const teachers = useListCollection<TeacherExpanded>(pbClient, "teachers", {
    expand: "user",
  });
  const classes = useListCollection<ClassExpanded>(pbClient, "classes", {
    expand: "jurusan",
  });
  const subjects = useListCollection<Subject>(pbClient, "subjects");

  return (
    <Paper m="lg" p="lg" radius="md">
      <form onSubmit={props.form.onSubmit(props.handleSubmit)}>
        <Stack>
          <FormDivider text="Informasi Jadwal" />
          <SimpleGrid cols={2}>
            <Select
              label="Guru"
              data={teachers.map((teacher) => ({
                label: `${teacher.nama} (${teacher.nip})`,
                value: teacher.id,
              }))}
              {...props.form.getInputProps("guru")}
            />
            <Select
              label="Kelas"
              data={classes.map((class_) => ({
                label: `${class_.tingkat} ${class_.expand.jurusan.nama} ${class_.sub}`,
                value: class_.id,
              }))}
              {...props.form.getInputProps("kelas")}
            />
            <Select
              label="Mata Pelajaran"
              data={subjects.map((subject) => ({
                label: subject.nama,
                value: subject.id,
              }))}
              {...props.form.getInputProps("mataPelajaran")}
            />
            <Select
              label="Hari"
              data={["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map(
                (hari) => ({
                  label: hari,
                  value: hari,
                })
              )}
              {...props.form.getInputProps("hari")}
            />
            <NumberInput label="Mulai" {...props.form.getInputProps("mulai")} />
            <NumberInput
              label="Durasi"
              {...props.form.getInputProps("durasi")}
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
