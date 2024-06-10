import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import PocketBase from "pocketbase";
import { Link } from "react-router-dom";
import { deleteCollectionItem } from "../apis/common";
import { isApiErrors } from "../apis/error";

export type TableActionProps = {
  editLink: string;

  object: string;
  objectId: string;

  pbClient: PocketBase;
  collection: string;
};

export default function TableAction(props: TableActionProps) {
  return (
    <Button.Group>
      <Button
        component={Link}
        to={props.editLink}
        color="teal.9"
        leftSection={<IconEdit />}
      >
        Edit
      </Button>
      <Button
        color="red.9"
        rightSection={<IconTrash />}
        onClick={() => {
          modals.openConfirmModal({
            title: "Konfirmasi penghapusan",
            children: (
              <Text>Apakah kamu yakin ingin menghapus data tersebut?</Text>
            ),
            onConfirm: () => {
              const notificationId = notifications.show({
                loading: true,
                message: `Menghapus ${props.object}...`,
                color: "teal.9",
              });

              deleteCollectionItem(
                props.pbClient,
                props.collection,
                props.objectId,
                (error) => {
                  if (isApiErrors(error)) {
                    console.error(error);
                    return notifications.update({
                      id: notificationId,
                      message: `Gagal menghapus ${props.object}`,
                      color: "red",
                      loading: false,
                    });
                  }
                  notifications.update({
                    id: notificationId,
                    message: `Berhasil menghapus ${props.object}`,
                    loading: false,
                  });
                }
              );
            },
            labels: {
              confirm: "Ya, hapus",
              cancel: "Tidak jadi",
            },
          });
        }}
      >
        Hapus
      </Button>
    </Button.Group>
  );
}
