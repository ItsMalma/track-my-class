import PocketBase, { RecordModel } from "pocketbase";
import { AddUserInput } from "../schemas/user.schema";
import { ApiErrors, wrapCatch } from "./error";

export type User = RecordModel & {
  id: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  isAdmin: boolean;
};

export function addUser(
  pb: PocketBase,
  input: AddUserInput,
  isAdmin: boolean,
  cb: (userOrError: User | ApiErrors) => void
) {
  pb.collection<User>("users")
    .create({
      username: input.nama,
      email: input.email,
      emailVisibility: false,
      password: input.kataSandi,
      passwordConfirm: input.kataSandi,
      verified: true,
      isAdmin,
    })
    .then(cb)
    .catch(wrapCatch(cb));
}

export function updateUser(
  pb: PocketBase,
  id: string,
  input: AddUserInput,
  cb: (userOrError: User | ApiErrors) => void
) {
  pb.collection<User>("users")
    .update(id, {
      username: input.nama,
      email: input.email,
      password: input.kataSandi,
      passwordConfirm: input.kataSandi,
    })
    .then(cb)
    .catch(wrapCatch(cb));
}
