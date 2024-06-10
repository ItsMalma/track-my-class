import PocketBase, { RecordModel } from "pocketbase";
import { TeacherInput } from "../schemas/teacher.schemas";
import { User, addUser, updateUser } from "./User";
import { ApiErrors, isApiErrors, wrapCatch } from "./error";

export type Teacher = RecordModel & {
  id: string;
  nama: string;
  nip: string;
  alamat: string;
  nomorWhatsapp: string;
  user: string;
};
export type TeacherExpanded = Teacher & {
  expand: {
    user: User;
  };
};

export function addTeacher(
  pb: PocketBase,
  input: TeacherInput,
  cb: (teacherOrError: Teacher | ApiErrors) => void
) {
  addUser(
    pb,
    {
      nama: input.pengguna.nama,
      email: input.pengguna.email,
      kataSandi: input.pengguna.kataSandi,
    },
    false,
    (userOrError) => {
      if (isApiErrors(userOrError)) return cb(userOrError);

      pb.collection<Teacher>("teachers")
        .create({
          user: userOrError.id,
          nama: input.nama,
          nip: input.nip,
          alamat: input.alamat,
          nomorWhatsapp: input.nomorWhatsapp,
        })
        .then(cb)
        .catch(wrapCatch(cb));
    }
  );
}

export function updateTeacher(
  pb: PocketBase,
  id: string,
  input: TeacherInput,
  cb: (teacherOrError: Teacher | ApiErrors) => void
) {
  pb.collection<Teacher>("teachers")
    .update(id, {
      nama: input.nama,
      nip: input.nip,
      alamat: input.alamat,
      nomorWhatsapp: input.nomorWhatsapp,
    })
    .then((teacher) => {
      updateUser(
        pb,
        teacher.user,
        {
          nama: input.pengguna.nama,
          email: input.pengguna.email,
          kataSandi: input.pengguna.kataSandi,
        },
        (userOrError) => {
          if (isApiErrors(userOrError)) return cb(userOrError);
          cb(teacher);
        }
      );
    })
    .catch(wrapCatch(cb));
}
