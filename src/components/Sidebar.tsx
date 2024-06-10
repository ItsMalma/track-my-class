import { Stack, Title } from "@mantine/core";
import SidebarItem, { SidebarItemProps } from "./SidebarItem";

export type SidebarItem = Omit<SidebarItemProps, "selected">;

export type SidebarProps = {
  items: SidebarItem[];
  selected: string;
};

export default function Sidebar({ items, selected }: SidebarProps) {
  return (
    <Stack gap="xl" bg="teal.9" c="white" p="lg" w="280">
      <Title order={2} ta="center">
        TMC
      </Title>
      <Stack gap="xs">
        {items.map((item) => (
          <SidebarItem
            {...item}
            key={item.key}
            selected={item.key === selected}
          />
        ))}
      </Stack>
    </Stack>
  );
}
