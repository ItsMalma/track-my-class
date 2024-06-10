import { Button, Group, Paper, Stack, Table, TableData } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { TeacherExpanded } from "../../../apis/Teacher";
import { useListCollection } from "../../../apis/common";
import TableAction from "../../../components/TableAction";
import { AdminLayoutContext } from "../../../parents/AdminLayout";

export default function AdminTeachersPage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Data Guru");
    selectSidebarItem("teachers");
  }, [setTitle, selectSidebarItem]);

  const [tableData, setTableData] = useState<TableData>({
    head: ["Nama", "NIP", "Alamat", "Nomor WhatsApp", "Aksi"],
    body: [],
  });
  const teachers = useListCollection<TeacherExpanded>(pbClient, "teachers", {
    expand: "user",
  });
  useEffect(() => {
    setTableData((prev) => ({
      ...prev,
      body: [
        ...teachers.map((teacher) => [
          teacher.nama,
          teacher.nip,
          teacher.alamat,
          teacher.nomorWhatsapp,
          <TableAction
            editLink={`/admin/teachers/edit/${teacher.id}`}
            object="guru"
            objectId={teacher.expand.user.id}
            pbClient={pbClient}
            collection="users"
          />,
        ]),
      ],
    }));
  }, [pbClient, teachers]);

  return (
    <Paper m="lg" p="lg" radius="md">
      <Stack>
        <Group justify="space-between">
          <Button
            color="teal.9"
            leftSection={<IconPlus />}
            component={Link}
            to="/admin/teachers/add"
          >
            Tambah Guru
          </Button>
        </Group>
        <Table color="teal.9" striped highlightOnHover data={tableData} />
      </Stack>
    </Paper>
  );
}
