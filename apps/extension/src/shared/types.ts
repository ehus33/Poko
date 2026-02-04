export type Settings = {
  enabled: boolean;
  checkoutSelectors: string[];
  pressureSelectors: string[];
  minPauseSeconds: number;
  enabledHosts: string[];
  disabledHosts: string[];
  upgradeUrl: string;
};

export type Entitlement = {
  licenseKey: string | null;
  valid: boolean;
  checkedAt: string | null;
};

export type PressureEvent = {
  id: string;
  url: string;
  timestamp: string;
  price: string | null;
};
