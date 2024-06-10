import { Group, Paper, Text, UnstyledButton } from "@mantine/core";
import { Icon } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export type SidebarItemProps = {
  key: string;
  icon: Icon;
  text: string;
  url: string;
  selected: boolean;
};

export default function SidebarItem(props: SidebarItemProps) {
  return (
    <Paper
      bg={props.selected ? "white" : "inherit"}
      c={props.selected ? "teal.9" : "white"}
      p="sm"
      radius="md"
    >
      <UnstyledButton component={Link} to={props.url}>
        <Group align="center">
          <props.icon />
          <Text fw="500">{props.text}</Text>
        </Group>
      </UnstyledButton>
    </Paper>
  );
}
