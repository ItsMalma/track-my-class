import * as v from "valibot";
import { isMobilePhone, isNumeric } from "validator";
import { addUserSchema } from "./user.schema";

export const teacherSchema = v.object({
  nama: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Wajib diisi"),
    v.maxLength(200, "Terlalu panjang")
  ),
  nip: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Wajib diisi"),
    v.minLength(10, "Terlalu pendek"),
    v.check(isNumeric, "Format salah"),
    v.maxLength(20, "Terlalu panjang")
  ),
  alamat: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Wajib diisi"),
    v.maxLength(200, "Terlalu panjang")
  ),
  nomorWhatsapp: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Wajib diisi"),
    v.check(isMobilePhone, "Format salah"),
    v.maxLength(20, "Terlalu panjang")
  ),
  pengguna: addUserSchema,
});
export type TeacherInput = v.InferInput<typeof teacherSchema>;
export const defaultTeacherInput: TeacherInput = {
  nama: "",
  nip: "",
  alamat: "",
  nomorWhatsapp: "",
  pengguna: {
    nama: "",
    email: "",
    kataSandi: "",
  },
};
