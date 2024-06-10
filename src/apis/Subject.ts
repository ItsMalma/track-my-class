import PocketBase, { RecordModel } from "pocketbase";
import { SubjectInput } from "../schemas/subject.schemas";
import { ApiErrors, wrapCatch } from "./error";

export type Subject = RecordModel & {
  id: string;
  kode: string;
  nama: string;
};

export function addSubject(
  pb: PocketBase,
  input: SubjectInput,
  cb: (subjectOrError: Subject | ApiErrors) => void
) {
  pb.collection<Subject>("subjects")
    .create(input)
    .then(cb)
    .catch(wrapCatch(cb));
}

export function updateSubject(
  pb: PocketBase,
  id: string,
  input: SubjectInput,
  cb: (subjectOrError: Subject | ApiErrors) => void
) {
  pb.collection<Subject>("subjects")
    .update(id, input)
    .then(cb)
    .catch(wrapCatch(cb));
}
