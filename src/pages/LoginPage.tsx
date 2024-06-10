import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as v from "valibot";
import usePocketBase from "../hooks/usePocketBase";

const schema = v.object({
  email: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Tidak boleh kosong"),
    v.email("Format email salah")
  ),
  kataSandi: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Tidak boleh kosong")
  ),
});
type Input = v.InferInput<typeof schema>;

export default function LoginPage() {
  const form = useForm<Input>({
    initialValues: {
      email: "",
      kataSandi: "",
    },
    validate: valibotResolver(schema),
  });

  const navigate = useNavigate();
  const pb = usePocketBase();

  const handleSubmit = useCallback(
    (input: Input) => {
      if (!pb) return;

      pb.login(input.email, input.kataSandi, (user) => {
        if (user) {
          if (user.isAdmin) navigate("/admin/dashboard");
          else navigate("/teacher/absen");
        } else {
          notifications.show({
            title: "Email atau kata sandi salah",
            color: "red",
            message: "",
          });
        }
      });
    },
    [navigate, pb]
  );

  return (
    <Center bg="gray.2" mih="100vh" mah="100vh">
      <Paper
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}
        p="xl"
        w="24rem"
        radius="lg"
        shadow="xl"
      >
        <Stack>
          <Title>Login</Title>
          <TextInput label="Email" {...form.getInputProps("email")} />
          <PasswordInput
            label="Kata Sandi"
            {...form.getInputProps("kataSandi")}
          />
          <Button type="submit">Login</Button>
        </Stack>
      </Paper>
    </Center>
  );
}
