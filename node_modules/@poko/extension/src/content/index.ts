import { ClickGuard } from "./clickGuard";
import {
  defaultCheckoutSelectors,
  defaultPressureSelectors,
  findPressureElements
} from "./domScanner";
import { MutationWatcher } from "./mutationWatcher";
import { extractPrice } from "./priceExtractor";
import type { Settings } from "../shared/types";

const DEFAULT_SETTINGS: Settings = {
  enabled: true,
  checkoutSelectors: defaultCheckoutSelectors,
  pressureSelectors: defaultPressureSelectors,
  minPauseSeconds: 0,
  enabledHosts: [],
  disabledHosts: [],
  upgradeUrl: "https://poko.app/pricing"
};
const SETTINGS_KEY = "settings";

let activePressureSelectors = DEFAULT_SETTINGS.pressureSelectors;
let activeEnabled = true;

const shouldRunOnHost = (settings: Settings) => {
  const host = window.location.hostname;
  if (settings.disabledHosts.includes(host)) {
    return false;
  }
  if (settings.enabledHosts.length > 0) {
    return settings.enabledHosts.includes(host);
  }
  return true;
};

const markPressureElements = () => {
  if (!activeEnabled) {
    return;
  }
  const elements = findPressureElements(activePressureSelectors);
  elements.forEach((element) => {
    element.setAttribute("data-poko-pressure", "true");
    const htmlElement = element as HTMLElement;
    htmlElement.style.setProperty("display", "none", "important");
  });
};

const guard = new ClickGuard({
  selectors: DEFAULT_SETTINGS.checkoutSelectors,
  minPauseSeconds: DEFAULT_SETTINGS.minPauseSeconds,
  onContinue: () => {
    chrome.runtime.sendMessage({
      type: "record-event",
      payload: {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        price: extractPrice()
      }
    });
  }
});

const watcher = new MutationWatcher(() => {
  markPressureElements();
});

const applySettings = (settings: Settings) => {
  const safeSettings: Settings = {
    ...DEFAULT_SETTINGS,
    ...settings,
    checkoutSelectors: settings.checkoutSelectors?.length
      ? settings.checkoutSelectors
      : DEFAULT_SETTINGS.checkoutSelectors,
    pressureSelectors: settings.pressureSelectors?.length
      ? settings.pressureSelectors
      : DEFAULT_SETTINGS.pressureSelectors,
    enabledHosts: settings.enabledHosts ?? [],
    disabledHosts: settings.disabledHosts ?? []
  };
  guard.updateSelectors(safeSettings.checkoutSelectors);
  guard.updateMinPauseSeconds(safeSettings.minPauseSeconds);
  activePressureSelectors = safeSettings.pressureSelectors;
  const shouldRun = safeSettings.enabled && shouldRunOnHost(safeSettings);
  activeEnabled = shouldRun;
  guard.setEnabled(shouldRun);
  markPressureElements();
};

chrome.storage.sync.get({ [SETTINGS_KEY]: DEFAULT_SETTINGS }, (result) => {
  applySettings(result[SETTINGS_KEY] as Settings);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "sync") {
    return;
  }
  if (changes[SETTINGS_KEY]) {
    chrome.storage.sync.get({ [SETTINGS_KEY]: DEFAULT_SETTINGS }, (result) => {
      applySettings(result[SETTINGS_KEY] as Settings);
    });
  }
});

guard.attach();
watcher.start();
