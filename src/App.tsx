import { InputLabel, MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { CookiesProvider } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import { PocketBaseProvider } from "./libs/pocketbase";
import { router } from "./libs/router";

const theme = createTheme({
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  components: {
    InputLabel: InputLabel.extend({
      defaultProps: {
        mb: "xs",
      },
    }),
  },
});

export default function App() {
  return (
    <CookiesProvider>
      <PocketBaseProvider>
        <MantineProvider theme={theme}>
          <Notifications />
          <ModalsProvider>
            <RouterProvider router={router} />
          </ModalsProvider>
        </MantineProvider>
      </PocketBaseProvider>
    </CookiesProvider>
  );
}
