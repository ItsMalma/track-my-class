import PocketBase, { RecordModel } from "pocketbase";
import { AbsentInput } from "../schemas/absent.schemas";
import { ScheduleExpanded } from "./Schedule";
import { StudentExpanded } from "./Student";
import { ApiErrors, wrapCatch } from "./error";

export type Keterangan = "Hadir" | "Sakit" | "Izin" | "Alpa" | "Telat";

export type Absent = RecordModel & {
  id: string;
  bulan: number;
  minggu: number;
  jadwal: string;
  murid: string;
  keterangan: Keterangan;
};
export type AbsentExpanded = Absent & {
  expand: {
    jadwal: ScheduleExpanded;
    murid: StudentExpanded;
  };
};

export function bulanToNumber(
  bulan:
    | "Juli"
    | "Agustus"
    | "September"
    | "Oktober"
    | "November"
    | "Desember"
    | "Januari"
    | "Februari"
    | "Maret"
    | "April"
    | "Mei"
    | "Juni"
): number {
  switch (bulan) {
    case "Juli":
      return 1;
    case "Agustus":
      return 2;
    case "September":
      return 3;
    case "Oktober":
      return 4;
    case "November":
      return 5;
    case "Desember":
      return 6;
    case "Januari":
      return 7;
    case "Februari":
      return 8;
    case "Maret":
      return 9;
    case "April":
      return 10;
    case "Mei":
      return 11;
    case "Juni":
      return 12;
    default:
      throw new Error("Invalid bulan");
  }
}

export function bulanFromNumber(
  bulan: number
):
  | "Juli"
  | "Agustus"
  | "September"
  | "Oktober"
  | "November"
  | "Desember"
  | "Januari"
  | "Februari"
  | "Maret"
  | "April"
  | "Mei"
  | "Juni" {
  switch (bulan) {
    case 1:
      return "Juli";
    case 2:
      return "Agustus";
    case 3:
      return "September";
    case 4:
      return "Oktober";
    case 5:
      return "November";
    case 6:
      return "Desember";
    case 7:
      return "Januari";
    case 8:
      return "Februari";
    case 9:
      return "Maret";
    case 10:
      return "April";
    case 11:
      return "Mei";
    case 12:
      return "Juni";
    default:
      throw new Error("Invalid bulan");
  }
}

export function mingguToNumber(
  minggu:
    | "Minggu ke-1"
    | "Minggu ke-2"
    | "Minggu ke-3"
    | "Minggu ke-4"
    | "Minggu ke-5"
): number {
  switch (minggu) {
    case "Minggu ke-1":
      return 1;
    case "Minggu ke-2":
      return 2;
    case "Minggu ke-3":
      return 3;
    case "Minggu ke-4":
      return 4;
    case "Minggu ke-5":
      return 5;
    default:
      throw new Error("Invalid minggu");
  }
}

export function mingguFromNumber(
  minggu: number
):
  | "Minggu ke-1"
  | "Minggu ke-2"
  | "Minggu ke-3"
  | "Minggu ke-4"
  | "Minggu ke-5" {
  switch (minggu) {
    case 1:
      return "Minggu ke-1";
    case 2:
      return "Minggu ke-2";
    case 3:
      return "Minggu ke-3";
    case 4:
      return "Minggu ke-4";
    case 5:
      return "Minggu ke-5";
    default:
      throw new Error("Invalid minggu");
  }
}

export function absent(
  pb: PocketBase,
  input: AbsentInput,
  cb: (scheduleOrError: Absent | ApiErrors) => void
) {
  const absent = {
    bulan: bulanToNumber(input.bulan),
    minggu: mingguToNumber(input.minggu),
    jadwal: input.jadwal,
  };

  Object.keys(input.murid).forEach((murid) => {
    const keterangan = input.murid[murid];

    pb.collection<Absent>("absents")
      .getFullList({
        filter: `jadwal = "${absent.jadwal}" && murid = "${murid}" && bulan = ${absent.bulan} && minggu = ${absent.minggu}`,
      })
      .then((absents) => {
        if (absents.length > 0) {
          pb.collection<Absent>("absents")
            .update(absents[0].id, {
              ...absents[0],
              keterangan,
            })
            .then(cb)
            .catch(wrapCatch(cb));
          return;
        }

        pb.collection<Absent>("absents")
          .create({
            ...absent,
            murid,
            keterangan,
          })
          .then(cb)
          .catch(wrapCatch(cb));
      })
      .catch(wrapCatch(cb));
  });
}
