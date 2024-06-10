import * as v from "valibot";
import { isMobilePhone, isNumeric } from "validator";

export const studentSchema = v.object({
  nama: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Wajib diisi"),
    v.maxLength(200, "Terlalu panjang")
  ),
  nisn: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Wajib diisi"),
    v.minLength(8, "Terlalu pendek"),
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
  kelas: v.pipe(v.string("Tidak valid"), v.minLength(1, "Wajib diisi")),
});
export type StudentInput = v.InferInput<typeof studentSchema>;
export const defaultStudentInput: StudentInput = {
  nama: "",
  nisn: "",
  alamat: "",
  nomorWhatsapp: "",
  kelas: "",
};
