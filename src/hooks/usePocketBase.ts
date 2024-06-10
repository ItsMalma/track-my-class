import { ContextType, useContext } from "react";
import { PocketBaseContext } from "../libs/pocketbase";

export type UsePocketBaseReturn = ContextType<typeof PocketBaseContext>;

export default function usePocketBase(): UsePocketBaseReturn {
  return useContext(PocketBaseContext);
}
