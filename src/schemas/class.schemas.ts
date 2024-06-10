import * as v from "valibot";

export const classSchema = v.object({
  tingkat: v.picklist(["X", "XI", "XII", "XIII"], "Pilihan tidak ada"),
  jurusan: v.pipe(v.string("Tidak valid"), v.minLength(1, "Wajib diisi")),
  sub: v.pipe(v.number("Tidak valid"), v.minValue(1, "Tidak valid")),
});
export type ClassInput = v.InferInput<typeof classSchema>;
export const defaultClassInput: ClassInput = {
  tingkat: "X",
  jurusan: "",
  sub: 1,
};
