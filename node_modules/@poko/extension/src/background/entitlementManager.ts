import type { Entitlement } from "../shared/types";
import { getEntitlement, saveEntitlement } from "./storageRepo";
import { verifyLicense } from "./licenseValidator";

export const readEntitlement = async (): Promise<Entitlement> => {
  return getEntitlement();
};

export const updateLicense = async (licenseKey: string): Promise<Entitlement> => {
  const valid = await verifyLicense(licenseKey);
  const entitlement: Entitlement = {
    licenseKey,
    valid,
    checkedAt: new Date().toISOString()
  };
  await saveEntitlement(entitlement);
  return entitlement;
};
