import {
  Avatar,
  Center,
  Flex,
  Group,
  Loader,
  Menu,
  ScrollArea,
  Skeleton,
  Stack,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import PocketBase from "pocketbase";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../apis/User";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import usePocketBase, { UsePocketBaseReturn } from "../hooks/usePocketBase";

export type AppLayoutContext = {
  pbClient: PocketBase;
  user: User;

  setSidebarItems: (items: SidebarItem[]) => void;
  setTitle: (title: string) => void;
  selectSidebarItem: (key: string) => void;
};

export default function AppLayout() {
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const [title, setTitle] = useState<string>("");
  const [selectedSidebarItem, selectSidebarItem] = useState<string>("");

  const pb: UsePocketBaseReturn = usePocketBase();
  if (pb && !pb.user) {
    return <Navigate to="/login" />;
  }

  console.log("REFRESH");

  return (
    <Flex w="100vw" h="100vh" maw="100vw" mah="100vh" bg="gray.2">
      <Sidebar items={sidebarItems} selected={selectedSidebarItem} />
      <Flex flex={1} direction="column" bg="gray.2" c="teal.9">
        <Flex p="md" align="center" justify="space-between" bg="white">
          <Title order={2}>{title}</Title>
          {!pb ? (
            <Group gap="xs">
              <Skeleton width={36} height={36} circle />
              <Stack gap="xs">
                <Skeleton width={160} height={8} />
                <Skeleton width={100} height={8} />
              </Stack>
            </Group>
          ) : (
            <Menu>
              <Menu.Target>
                <UnstyledButton>
                  <Avatar />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout />}
                  onClick={pb.logout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Flex>
        {!pb ? (
          <Center flex={1}>
            <Loader />
          </Center>
        ) : (
          <ScrollArea flex={1}>
            <Outlet
              context={
                {
                  pbClient: pb.client,
                  user: pb.user!,
                  setSidebarItems,
                  setTitle,
                  selectSidebarItem,
                } satisfies AppLayoutContext
              }
            />
          </ScrollArea>
        )}
      </Flex>
    </Flex>
  );
}
