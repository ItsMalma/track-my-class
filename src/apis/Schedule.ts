import PocketBase, { RecordModel } from "pocketbase";
import { ScheduleInput } from "../schemas/schedule.schemas";
import { ClassExpanded } from "./Class";
import { Subject } from "./Subject";
import { TeacherExpanded } from "./Teacher";
import { ApiErrors, wrapCatch } from "./error";

export type Hari = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat";

export type Schedule = RecordModel & {
  id: string;
  guru: string;
  kelas: string;
  mataPelajaran: string;
  hari: Hari;
  mulai: number;
  durasi: number;
};
export type ScheduleExpanded = Schedule & {
  expand: {
    guru: TeacherExpanded;
    kelas: ClassExpanded;
    mataPelajaran: Subject;
  };
};

export function addSchedule(
  pb: PocketBase,
  input: ScheduleInput,
  cb: (scheduleOrError: Schedule | ApiErrors) => void
) {
  pb.collection<Schedule>("schedules")
    .create(input)
    .then(cb)
    .catch(wrapCatch(cb));
}

export function updateSchedule(
  pb: PocketBase,
  id: string,
  input: ScheduleInput,
  cb: (scheduleOrError: Schedule | ApiErrors) => void
) {
  pb.collection<Schedule>("schedules")
    .update(id, input)
    .then(cb)
    .catch(wrapCatch(cb));
}
