import { Group, Paper, Skeleton, Stack, Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Student } from "../../apis/Student";
import { Teacher } from "../../apis/Teacher";
import { AdminLayoutContext } from "../../parents/AdminLayout";

export default function AdminDashboardPage() {
  const { pbClient, setTitle, selectSidebarItem } =
    useOutletContext<AdminLayoutContext>();
  useEffect(() => {
    setTitle("Dashboard");
    selectSidebarItem("dashboard");
  }, [setTitle, selectSidebarItem]);

  const [teacherTotal, setTeacherTotal] = useState<number | null>(null);
  const [studentTotal, setStudentTotal] = useState<number | null>(null);
  useEffect(() => {
    pbClient
      .collection<Teacher>("teachers")
      .getFullList()
      .then((teachers) => {
        setTeacherTotal(teachers.length);
      });

    pbClient
      .collection<Student>("students")
      .getFullList()
      .then((students) => {
        setStudentTotal(students.length);
      });
  }, [pbClient]);

  return (
    <Group p="lg" gap="lg">
      <Paper bg="teal.9" c="white" p="lg" radius="lg">
        <Group align="center">
          <IconUser width={64} height={64} />
          <Stack gap="xs">
            <Text fz="xl" fw="bold">
              Data Guru
            </Text>
            {teacherTotal != null ? (
              <Text fz="h2" fw="bold">
                {teacherTotal}
              </Text>
            ) : (
              <Skeleton w="30%" h={24} />
            )}
          </Stack>
        </Group>
      </Paper>
      <Paper bg="teal.9" c="white" p="lg" radius="lg">
        <Group align="center">
          <IconUser width={64} height={64} />
          <Stack gap="xs">
            <Text fz="xl" fw="bold">
              Data Murid
            </Text>
            {studentTotal != null ? (
              <Text fz="h2" fw="bold">
                {studentTotal}
              </Text>
            ) : (
              <Skeleton w="30%" h={24} />
            )}
          </Stack>
        </Group>
      </Paper>
    </Group>
  );
}
