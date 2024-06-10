import * as v from "valibot";

export const addUserSchema = v.object({
  nama: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Wajib diisi"),
    v.regex(
      /^[a-z0-9_]+$/,
      "Hanya boleh berisi huruf kecil, angka dan underscore"
    )
  ),
  email: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Wajib diisi"),
    v.email("Format salah")
  ),
  kataSandi: v.pipe(
    v.string("Tidak valid"),
    v.minLength(1, "Wajib diisi"),
    v.minLength(8, "Minimal 8 karakter")
  ),
});

export type AddUserInput = v.InferInput<typeof addUserSchema>;
