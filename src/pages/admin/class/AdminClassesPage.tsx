import { Button, Group, Paper, Stack, Table, TableData } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ClassExpanded } from "../../../apis/Class";
import { useListCollection } from "../../../apis/common";
import TableAction from "../../../components/TableAction";
import { AdminLayoutContext } from "../../../parents/AdminLayout";

export default function AdminClassesPage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Data Kelas");
    selectSidebarItem("classes");
  }, [setTitle, selectSidebarItem]);

  const [tableData, setTableData] = useState<TableData>({
    head: ["Tingkat", "Jurusan", "Sub", "Aksi"],
    body: [],
  });
  const classes = useListCollection<ClassExpanded>(pbClient, "classes", {
    expand: "jurusan",
  });
  useEffect(() => {
    setTableData((prev) => ({
      ...prev,
      body: [
        ...classes.map((class_) => [
          class_.tingkat,
          class_.expand.jurusan.nama,
          class_.sub,
          <TableAction
            editLink={`/admin/classes/edit/${class_.id}`}
            object="kelas"
            objectId={class_.id}
            pbClient={pbClient}
            collection="classes"
          />,
        ]),
      ],
    }));
  }, [pbClient, classes]);

  return (
    <Paper m="lg" p="lg" radius="md">
      <Stack>
        <Group justify="space-between">
          <Button
            color="teal.9"
            leftSection={<IconPlus />}
            component={Link}
            to="/admin/classes/add"
          >
            Tambah Kelas
          </Button>
        </Group>
        <Table color="teal.9" striped highlightOnHover data={tableData} />
      </Stack>
    </Paper>
  );
}
