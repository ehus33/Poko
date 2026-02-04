import type { Entitlement, PressureEvent, Settings } from "../shared/types";

const SETTINGS_KEY = "settings";
const EVENTS_KEY = "events";
const ENTITLEMENT_KEY = "entitlement";

export const defaultSettings: Settings = {
  enabled: true,
  checkoutSelectors: [
    "button[type='submit']",
    "button[name*='checkout']",
    "button[id*='checkout']",
    "button[class*='checkout']",
    "a[href*='checkout']",
    "[data-checkout]"
  ],
  pressureSelectors: [
    ".countdown",
    ".limited",
    ".timer",
    ".scarcity",
    ".low-stock",
    "[class*='countdown']",
    "[class*='timer']",
    "[class*='scarcity']",
    "[class*='stock']",
    "[id*='countdown']",
    "[id*='timer']",
    "[id*='scarcity']",
    "[id*='stock']",
    "[data-countdown]",
    "[data-pressure]",
    "[data-scarcity]",
    "[data-urgency]"
  ],
  minPauseSeconds: 0,
  enabledHosts: [],
  disabledHosts: [],
  upgradeUrl: "https://poko.app/pricing"
};

export const getSettings = (): Promise<Settings> =>
  new Promise((resolve) => {
    chrome.storage.sync.get({ [SETTINGS_KEY]: defaultSettings }, (result) => {
      const stored = result[SETTINGS_KEY] as Partial<Settings>;
      resolve({ ...defaultSettings, ...stored });
    });
  });

export const saveSettings = (settings: Settings): Promise<void> =>
  new Promise((resolve) => {
    chrome.storage.sync.set({ [SETTINGS_KEY]: settings }, () => resolve());
  });

export const getEvents = (): Promise<PressureEvent[]> =>
  new Promise((resolve) => {
    chrome.storage.local.get({ [EVENTS_KEY]: [] }, (result) => {
      resolve(result[EVENTS_KEY] as PressureEvent[]);
    });
  });

export const addEvent = async (event: PressureEvent): Promise<void> => {
  const events = await getEvents();
  events.push(event);
  return new Promise((resolve) => {
    chrome.storage.local.set({ [EVENTS_KEY]: events }, () => resolve());
  });
};

export const getEntitlement = (): Promise<Entitlement> =>
  new Promise((resolve) => {
    chrome.storage.sync.get(
      { [ENTITLEMENT_KEY]: { licenseKey: null, valid: false, checkedAt: null } },
      (result) => resolve(result[ENTITLEMENT_KEY] as Entitlement)
    );
  });

export const saveEntitlement = (entitlement: Entitlement): Promise<void> =>
  new Promise((resolve) => {
    chrome.storage.sync.set({ [ENTITLEMENT_KEY]: entitlement }, () => resolve());
  });
