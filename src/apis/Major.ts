import PocketBase, { RecordModel } from "pocketbase";
import { MajorInput } from "../schemas/major.schemas";
import { ApiErrors, wrapCatch } from "./error";

export type Major = RecordModel & {
  id: string;
  kode: string;
  nama: string;
};

export function addMajor(
  pb: PocketBase,
  input: MajorInput,
  cb: (majorOrError: Major | ApiErrors) => void
) {
  pb.collection<Major>("majors").create(input).then(cb).catch(wrapCatch(cb));
}

export function updateMajor(
  pb: PocketBase,
  id: string,
  input: MajorInput,
  cb: (majorOrError: Major | ApiErrors) => void
) {
  pb.collection<Major>("majors")
    .update(id, input)
    .then(cb)
    .catch(wrapCatch(cb));
}
