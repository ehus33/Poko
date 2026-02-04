import type { Settings } from "../shared/types";
import { defaultSettings, getSettings } from "./storageRepo";

export const loadRules = async (): Promise<Settings> => {
  const settings = await getSettings();
  return settings ?? defaultSettings;
};
