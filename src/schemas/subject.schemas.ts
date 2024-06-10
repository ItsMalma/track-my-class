import * as v from "valibot";

export const subjectSchema = v.object({
  kode: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Wajib diisi"),
    v.minLength(2, "Terlalu pendek"),
    v.maxLength(10, "Terlalu panjang")
  ),
  nama: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Wajib diisi"),
    v.maxLength(200, "Terlalu panjang")
  ),
});
export type SubjectInput = v.InferInput<typeof subjectSchema>;
export const defaultSubjectInput: SubjectInput = {
  kode: "",
  nama: "",
};
