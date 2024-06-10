import { Divider, Text } from "@mantine/core";

export type FormDividerProps = {
  text: string;
};

export default function FormDivider({ text }: FormDividerProps) {
  return (
    <Divider
      color="teal.9"
      label={
        <Text fz="lg" fw="bold" c="teal.9">
          {text}
        </Text>
      }
      labelPosition="left"
    />
  );
}
