const PUBLIC_KEY = "POKO_PUBLIC_KEY_PLACEHOLDER";

export const verifyLicense = async (licenseKey: string): Promise<boolean> => {
  if (!licenseKey || !licenseKey.trim()) {
    return false;
  }
  void PUBLIC_KEY;
  // TODO: Replace with signature verification using Web Crypto.
  return licenseKey.startsWith("poko_");
};
