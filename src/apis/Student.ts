import PocketBase, { RecordModel } from "pocketbase";
import { StudentInput } from "../schemas/student.schemas";
import { ClassExpanded } from "./Class";
import { ApiErrors, wrapCatch } from "./error";

export type Student = RecordModel & {
  id: string;
  nama: string;
  nisn: string;
  alamat: string;
  nomorWhatsapp: string;
  class: string;
};
export type StudentExpanded = Student & {
  expand: {
    kelas: ClassExpanded;
  };
};

export function addStudent(
  pb: PocketBase,
  input: StudentInput,
  cb: (studentOrError: Student | ApiErrors) => void
) {
  pb.collection<Student>("students")
    .create(input)
    .then(cb)
    .catch(wrapCatch(cb));
}

export function updateStudent(
  pb: PocketBase,
  id: string,
  input: StudentInput,
  cb: (studentOrError: Student | ApiErrors) => void
) {
  pb.collection<Student>("students")
    .update(id, input)
    .then(cb)
    .catch(wrapCatch(cb));
}
