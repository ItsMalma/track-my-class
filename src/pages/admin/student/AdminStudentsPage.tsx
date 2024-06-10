import { Button, Group, Paper, Stack, Table, TableData } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { StudentExpanded } from "../../../apis/Student";
import { useListCollection } from "../../../apis/common";
import TableAction from "../../../components/TableAction";
import { AdminLayoutContext } from "../../../parents/AdminLayout";

export default function AdminStudentsPage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Data Murid");
    selectSidebarItem("students");
  }, [setTitle, selectSidebarItem]);

  const [tableData, setTableData] = useState<TableData>({
    head: ["NISN", "Nama", "Alamat", "Nomor WhatsApp", "Kelas", "Aksi"],
    body: [],
  });
  const students = useListCollection<StudentExpanded>(pbClient, "students", {
    expand: "kelas,kelas.jurusan",
  });
  useEffect(() => {
    setTableData((prev) => ({
      ...prev,
      body: [
        ...students.map((student) => {
          console.log(student);
          return [
            student.nisn,
            student.nama,
            student.alamat,
            student.nomorWhatsapp,
            `${student.expand.kelas.tingkat} ${student.expand.kelas.expand.jurusan.nama} ${student.expand.kelas.sub}`,
            <TableAction
              editLink={`/admin/students/edit/${student.id}`}
              object="murid"
              objectId={student.id}
              pbClient={pbClient}
              collection="students"
            />,
          ];
        }),
      ],
    }));
  }, [pbClient, students]);

  return (
    <Paper m="lg" p="lg" radius="md">
      <Stack>
        <Group justify="space-between">
          <Button
            color="teal.9"
            leftSection={<IconPlus />}
            component={Link}
            to="/admin/students/add"
          >
            Tambah Murid
          </Button>
        </Group>
        <Table color="teal.9" striped highlightOnHover data={tableData} />
      </Stack>
    </Paper>
  );
}
