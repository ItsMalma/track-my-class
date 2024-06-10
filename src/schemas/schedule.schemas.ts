import * as v from "valibot";

export const scheduleSchema = v.object({
  guru: v.pipe(v.string("Tidak valid"), v.minLength(1, "Wajib diisi")),
  kelas: v.pipe(v.string("Tidak valid"), v.minLength(1, "Wajib diisi")),
  mataPelajaran: v.pipe(v.string("Tidak valid"), v.minLength(1, "Wajib diisi")),
  hari: v.picklist(
    ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
    "Pilihan tidak ada"
  ),
  mulai: v.pipe(v.number("Tidak valid"), v.minValue(1, "Tidak valid")),
  durasi: v.pipe(v.number("Tidak valid"), v.minValue(1, "Tidak valid")),
});
export type ScheduleInput = v.InferInput<typeof scheduleSchema>;
export const defaultScheduleInput: ScheduleInput = {
  guru: "",
  kelas: "",
  mataPelajaran: "",
  hari: "Senin",
  mulai: 1,
  durasi: 1,
};
