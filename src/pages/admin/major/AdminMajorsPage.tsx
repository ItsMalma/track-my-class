import { Button, Group, Paper, Stack, Table, TableData } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Major } from "../../../apis/Major";
import { useListCollection } from "../../../apis/common";
import TableAction from "../../../components/TableAction";
import { AdminLayoutContext } from "../../../parents/AdminLayout";

export default function AdminMajorsPage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Data Jurusan");
    selectSidebarItem("majors");
  }, [setTitle, selectSidebarItem]);

  const [tableData, setTableData] = useState<TableData>({
    head: ["Kode", "Nama", "Aksi"],
    body: [],
  });
  const majors = useListCollection<Major>(pbClient, "majors");
  useEffect(() => {
    setTableData((prev) => ({
      ...prev,
      body: [
        ...majors.map((major) => [
          major.kode,
          major.nama,
          <TableAction
            editLink={`/admin/majors/edit/${major.id}`}
            object="jurusan"
            objectId={major.id}
            pbClient={pbClient}
            collection="majors"
          />,
        ]),
      ],
    }));
  }, [pbClient, majors]);

  return (
    <Paper m="lg" p="lg" radius="md">
      <Stack>
        <Group justify="space-between">
          <Button
            color="teal.9"
            leftSection={<IconPlus />}
            component={Link}
            to="/admin/majors/add"
          >
            Tambah Jurusan
          </Button>
        </Group>
        <Table color="teal.9" striped highlightOnHover data={tableData} />
      </Stack>
    </Paper>
  );
}
