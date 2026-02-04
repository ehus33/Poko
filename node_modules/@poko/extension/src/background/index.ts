import { ingestEvent } from "./eventIngestor";
import { readEntitlement, updateLicense } from "./entitlementManager";
import { getEvents, getSettings, saveSettings } from "./storageRepo";
import type { PressureEvent, Settings } from "../shared/types";

chrome.runtime.onInstalled.addListener(() => {
  void getSettings();
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const { type, payload } = message ?? {};
  if (type === "get-settings") {
    getSettings().then((settings) => sendResponse(settings));
    return true;
  }
  if (type === "save-settings") {
    saveSettings(payload as Settings).then(() => sendResponse({ ok: true }));
    return true;
  }
  if (type === "record-event") {
    ingestEvent(payload as PressureEvent).then(() => sendResponse({ ok: true }));
    return true;
  }
  if (type === "get-entitlement") {
    readEntitlement().then((entitlement) => sendResponse(entitlement));
    return true;
  }
  if (type === "get-events") {
    getEvents().then((events) => sendResponse(events));
    return true;
  }
  if (type === "set-license") {
    updateLicense(payload as string).then((entitlement) =>
      sendResponse(entitlement)
    );
    return true;
  }
  return false;
});
