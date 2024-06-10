import {
  Button,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Table,
  TableData,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ScheduleExpanded } from "../../../apis/Schedule";
import { useListCollection } from "../../../apis/common";
import TableAction from "../../../components/TableAction";
import { AdminLayoutContext } from "../../../parents/AdminLayout";

export default function AdminSchedulesPage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Data Jadwal");
    selectSidebarItem("schedules");
  }, [setTitle, selectSidebarItem]);

  const [tableData, setTableData] = useState<TableData>({
    head: [
      "Guru",
      "Kelas",
      "Mata Pelajaran",
      "Hari",
      "Mulai",
      "Durasi",
      "Aksi",
    ],
    body: [],
  });
  const schedules = useListCollection<ScheduleExpanded>(pbClient, "schedules", {
    expand: "guru,guru.user,kelas,kelas.jurusan,mataPelajaran",
  });
  useEffect(() => {
    setTableData((prev) => ({
      ...prev,
      body: [
        ...schedules.map((schedule) => [
          `${schedule.expand.guru.nama} (${schedule.expand.guru.nip})`,
          `${schedule.expand.kelas.tingkat} ${schedule.expand.kelas.expand.jurusan.nama} ${schedule.expand.kelas.sub}`,
          schedule.expand.mataPelajaran.nama,
          schedule.hari,
          `Jam pelajaran ke-${schedule.mulai}`,
          `${schedule.durasi} jam pelajaran`,
          <TableAction
            editLink={`/admin/schedules/edit/${schedule.id}`}
            object="jadwal"
            objectId={schedule.id}
            pbClient={pbClient}
            collection="schedules"
          />,
        ]),
      ],
    }));
  }, [pbClient, schedules]);

  const { ref: tableRef, width: tableWidth } = useElementSize();
  console.log(tableWidth);

  return (
    <Paper m="lg" p="lg" radius="md">
      <Stack>
        <Group justify="space-between">
          <Button
            color="teal.9"
            leftSection={<IconPlus />}
            component={Link}
            to="/admin/schedules/add"
          >
            Tambah Jadwal
          </Button>
        </Group>
        <ScrollArea mah={tableWidth} maw="fit">
          <Table
            ref={tableRef}
            color="teal.9"
            striped
            highlightOnHover
            data={tableData}
          />
        </ScrollArea>
      </Stack>
    </Paper>
  );
}
