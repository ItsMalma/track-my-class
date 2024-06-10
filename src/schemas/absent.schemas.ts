import * as v from "valibot";

export const absentSchema = v.object({
  jadwal: v.pipe(v.string("Tidak valid"), v.minLength(1, "Wajib diisi")),
  bulan: v.picklist(
    [
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
    ],
    "Pilihan tidak valid"
  ),
  minggu: v.picklist(
    ["Minggu ke-1", "Minggu ke-2", "Minggu ke-3", "Minggu ke-4", "Minggu ke-5"],
    "Pilihan tidak valid"
  ),
  murid: v.record(
    v.pipe(v.string("Tidak valid"), v.minLength(1, "Wajib diisi")),
    v.picklist(
      ["Hadir", "Sakit", "Izin", "Alpa", "Telat"],
      "Pilihan tidak valid"
    )
  ),
});
export type AbsentInput = v.InferInput<typeof absentSchema>;
export const defaultAbsentInput: AbsentInput = {
  bulan: "Juli",
  minggu: "Minggu ke-1",
  jadwal: "",
  murid: {},
};
