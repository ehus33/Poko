import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { Entitlement, PressureEvent, Settings } from "../shared/types";

export const Popup = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [entitlement, setEntitlement] = useState<Entitlement | null>(null);
  const [events, setEvents] = useState<PressureEvent[]>([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "get-settings" }, (response: Settings) => {
      setSettings(response);
    });
    chrome.runtime.sendMessage({ type: "get-entitlement" }, (response: Entitlement) => {
      setEntitlement(response);
    });
    chrome.runtime.sendMessage({ type: "get-events" }, (response: PressureEvent[]) => {
      setEvents(response ?? []);
    });
  }, []);

  const toggleEnabled = () => {
    if (!settings) {
      return;
    }
    const next = { ...settings, enabled: !settings.enabled };
    chrome.runtime.sendMessage({ type: "save-settings", payload: next }, () => {
      setSettings(next);
    });
  };

  if (!settings) {
    return <div style={{ padding: 16 }}>Loading…</div>;
  }

  const isPremium = entitlement?.valid ?? false;
  const last7Days = events.filter((event) => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return new Date(event.timestamp).getTime() >= cutoff;
  }).length;

  return (
    <div style={{ padding: 16, width: 280, fontFamily: "system-ui" }}>
      <h3 style={{ margin: "0 0 8px" }}>Poko</h3>
      <p style={{ margin: "0 0 12px" }}>
        {settings.enabled ? "Guarding checkout clicks." : "Guard is paused."}
      </p>
      <button onClick={toggleEnabled} type="button">
        {settings.enabled ? "Pause guard" : "Enable guard"}
      </button>
      <div style={{ marginTop: 12 }}>
        {isPremium ? (
          <p style={{ margin: 0 }}>
            {events.length} pauses · {last7Days} in last 7 days
          </p>
        ) : (
          <p style={{ margin: 0 }}>Premium unlocks summaries + Kakeibo.</p>
        )}
      </div>
      <div style={{ marginTop: 12 }}>
        <a href="options.html" target="_blank" rel="noreferrer">
          Open settings
        </a>
      </div>
      {isPremium && (
        <div style={{ marginTop: 8 }}>
          <a href="https://poko.app/kakeibo" target="_blank" rel="noreferrer">
            Open Kakeibo
          </a>
        </div>
      )}
      <div style={{ marginTop: 8 }}>
        <a href={settings.upgradeUrl} target="_blank" rel="noreferrer">
          Upgrade
        </a>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(<Popup />);
}
