import PocketBase, { RecordModel } from "pocketbase";
import { ClassInput } from "../schemas/class.schemas";
import { Major } from "./Major";
import { ApiErrors, wrapCatch } from "./error";

export type Tingkat = 10 | 11 | 12 | 13;

export type Class = RecordModel & {
  id: string;
  tingkat: Tingkat;
  jurusan: string;
  sub: number;
};

export type ClassExpanded = Class & {
  expand: {
    jurusan: Major;
  };
};

export function tingkatToRoman(tingkat: Tingkat): "X" | "XI" | "XII" | "XIII" {
  switch (tingkat) {
    case 10:
      return "X";
    case 11:
      return "XI";
    case 12:
      return "XII";
    case 13:
      return "XIII";
  }
}

export function tingkatFromRoman(roman: "X" | "XI" | "XII" | "XIII"): Tingkat {
  switch (roman) {
    case "X":
      return 10;
    case "XI":
      return 11;
    case "XII":
      return 12;
    case "XIII":
      return 13;
  }
}

export function addClass(
  pb: PocketBase,
  input: ClassInput,
  cb: (classOrError: Class | ApiErrors) => void
) {
  pb.collection<Class>("classes")
    .create({
      tingkat: tingkatFromRoman(input.tingkat),
      jurusan: input.jurusan,
      sub: input.sub,
    })
    .then(cb)
    .catch(wrapCatch(cb));
}

export function updateClass(
  pb: PocketBase,
  id: string,
  input: ClassInput,
  cb: (classOrError: Class | ApiErrors) => void
) {
  pb.collection<Class>("classes")
    .update(id, {
      tingkat: tingkatFromRoman(input.tingkat),
      jurusan: input.jurusan,
      sub: input.sub,
    })
    .then(cb)
    .catch(wrapCatch(cb));
}
