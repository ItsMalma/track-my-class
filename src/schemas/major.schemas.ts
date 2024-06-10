import * as v from "valibot";

export const majorSchema = v.object({
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
export type MajorInput = v.InferInput<typeof majorSchema>;
export const defaultMajorInput: MajorInput = {
  kode: "",
  nama: "",
};
