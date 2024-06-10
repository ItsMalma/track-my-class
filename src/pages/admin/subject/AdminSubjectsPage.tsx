import { Button, Group, Paper, Stack, Table, TableData } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Subject } from "../../../apis/Subject";
import { useListCollection } from "../../../apis/common";
import TableAction from "../../../components/TableAction";
import { AdminLayoutContext } from "../../../parents/AdminLayout";

export default function AdminSubjectsPage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Data Mata Pelajaran");
    selectSidebarItem("subjects");
  }, [setTitle, selectSidebarItem]);

  const [tableData, setTableData] = useState<TableData>({
    head: ["Kode", "Nama", "Aksi"],
    body: [],
  });
  const subjects = useListCollection<Subject>(pbClient, "subjects");
  useEffect(() => {
    setTableData((prev) => ({
      ...prev,
      body: [
        ...subjects.map((subject) => [
          subject.kode,
          subject.nama,
          <TableAction
            editLink={`/admin/subjects/edit/${subject.id}`}
            object="mata pelajaran"
            objectId={subject.id}
            pbClient={pbClient}
            collection="subjects"
          />,
        ]),
      ],
    }));
  }, [pbClient, subjects]);

  return (
    <Paper m="lg" p="lg" radius="md">
      <Stack>
        <Group justify="space-between">
          <Button
            color="teal.9"
            leftSection={<IconPlus />}
            component={Link}
            to="/admin/subjects/add"
          >
            Tambah Mata Pelajaran
          </Button>
        </Group>
        <Table color="teal.9" striped highlightOnHover data={tableData} />
      </Stack>
    </Paper>
  );
}
