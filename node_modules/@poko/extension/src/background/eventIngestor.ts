import type { PressureEvent } from "../shared/types";
import { addEvent } from "./storageRepo";

export const ingestEvent = async (event: PressureEvent) => {
  await addEvent(event);
};
