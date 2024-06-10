import {
  Button,
  Grid,
  Group,
  Paper,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {
  AbsentExpanded,
  absent,
  bulanToNumber,
  mingguToNumber,
} from "../../apis/Absent";
import { ScheduleExpanded } from "../../apis/Schedule";
import { StudentExpanded } from "../../apis/Student";
import { getListCollection, useListCollection } from "../../apis/common";
import { isApiErrors } from "../../apis/error";
import FormDivider from "../../components/FormDivider";
import { TeacherLayoutContext } from "../../parents/TeacherLayout";
import {
  AbsentInput,
  absentSchema,
  defaultAbsentInput,
} from "../../schemas/absent.schemas";

export default function TeacherAbsenPage() {
  const { pbClient, setTitle, selectSidebarItem, guru } =
    useOutletContext<TeacherLayoutContext>();
  useEffect(() => {
    setTitle("Absen");
    selectSidebarItem("absen");
  }, [setTitle, selectSidebarItem]);

  const form = useForm<AbsentInput>({
    initialValues: defaultAbsentInput,
    validate: valibotResolver(absentSchema),
  });

  const schedules = useListCollection<ScheduleExpanded>(pbClient, "schedules", {
    expand: "guru,kelas,kelas.jurusan,mataPelajaran",
    filter: `guru = "${guru.id}"`,
  });

  const { setFieldValue } = form;
  const setKeteranganByOldValues = useCallback(
    (
      jadwal: string,
      bulan: AbsentInput["bulan"],
      minggu: AbsentInput["minggu"]
    ) => {
      setFieldValue("murid", {});

      getListCollection<AbsentExpanded>(
        pbClient,
        "absents",
        (res) => {
          if (isApiErrors(res)) {
            console.error(res);
            return;
          }
          for (const absent of res) {
            setFieldValue(`murid.${absent.expand.murid.id}`, absent.keterangan);
          }
        },
        {
          filter: `jadwal = "${jadwal}" && bulan = ${bulanToNumber(
            bulan
          )} && minggu = "${mingguToNumber(minggu)}"`,
          expand: "jadwal,murid",
        }
      );
    },
    [pbClient, setFieldValue]
  );

  const [students, setStudents] = useState<StudentExpanded[]>([]);
  form.watch("jadwal", ({ value }) => {
    const values = form.getValues();
    setKeteranganByOldValues(value, values.bulan, values.minggu);

    const kelas = schedules.find((schedule) => schedule.id === value)?.kelas;
    if (!kelas) return;

    getListCollection<StudentExpanded>(
      pbClient,
      "students",
      (res) => {
        if (isApiErrors(res)) {
          console.error(res);
          return;
        }
        setStudents(res);
      },
      {
        expand: "kelas,kelas.jurusan",
        filter: `kelas = "${kelas}"`,
      }
    );
  });
  form.watch("bulan", ({ value }) => {
    const values = form.getValues();
    setKeteranganByOldValues(values.jadwal, value, values.minggu);
  });
  form.watch("minggu", ({ value }) => {
    const values = form.getValues();
    setKeteranganByOldValues(values.jadwal, values.bulan, value);
  });

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (input: AbsentInput) => {
      const notificationId = notifications.show({
        loading: true,
        message: "Menambahkan absen...",
        color: "teal.9",
      });

      absent(pbClient, input, (absentOrError) => {
        if (isApiErrors(absentOrError)) {
          console.error(absentOrError);
          return notifications.update({
            id: notificationId,
            message: "Gagal menambahkan absen",
            color: "red",
            loading: false,
          });
        }
        notifications.update({
          id: notificationId,
          message: "Berhasil menambahkan absen",
          loading: false,
        });
        navigate("/teacher/absen");
      });
    },
    [navigate, pbClient]
  );

  return (
    <Paper m="lg" p="lg" radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <FormDivider text="Informasi Absen" />
          <SimpleGrid cols={2}>
            <Select
              label="Jadwal"
              data={schedules.map((schedule) => ({
                label: `${schedule.expand.kelas.tingkat} ${schedule.expand.kelas.expand.jurusan.kode} ${schedule.expand.kelas.sub} - ${schedule.expand.mataPelajaran.nama}`,
                value: schedule.id,
              }))}
              {...form.getInputProps("jadwal")}
            />
            <Select
              label="Bulan"
              data={[
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
              ]}
              {...form.getInputProps("bulan")}
            />
            <Select
              label="Minggu"
              data={[
                "Minggu ke-1",
                "Minggu ke-2",
                "Minggu ke-3",
                "Minggu ke-4",
                "Minggu ke-5",
              ]}
              {...form.getInputProps("minggu")}
            />
          </SimpleGrid>
          <FormDivider text="Keterangan Murid" />
          <Grid my="xs">
            {students.map((student, index) => (
              <Fragment key={student.id}>
                <Grid.Col span={6}>
                  <Text fw={500}>
                    {index + 1}. {student.nama}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Radio.Group
                    defaultValue="Hadir"
                    {...form.getInputProps(`murid.${student.id}`)}
                  >
                    <Group gap="xl">
                      <Radio value="Hadir" label="Hadir" />
                      <Radio value="Izin" label="Izin" />
                      <Radio value="Sakit" label="Sakit" />
                      <Radio value="Alpa" label="Alpa" />
                      <Radio value="Telat" label="Telat" />
                    </Group>
                  </Radio.Group>
                </Grid.Col>
              </Fragment>
            ))}
          </Grid>
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
