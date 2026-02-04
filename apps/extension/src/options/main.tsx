import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { Entitlement, PressureEvent, Settings } from "../shared/types";

export const Options = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [selectors, setSelectors] = useState("");
  const [minPauseSeconds, setMinPauseSeconds] = useState(0);
  const [enabledHosts, setEnabledHosts] = useState("");
  const [disabledHosts, setDisabledHosts] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [entitlement, setEntitlement] = useState<Entitlement | null>(null);
  const [events, setEvents] = useState<PressureEvent[]>([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "get-settings" }, (response: Settings) => {
      setSettings(response);
      setSelectors(response.checkoutSelectors.join("\n"));
      setMinPauseSeconds(response.minPauseSeconds ?? 0);
      setEnabledHosts((response.enabledHosts ?? []).join("\n"));
      setDisabledHosts((response.disabledHosts ?? []).join("\n"));
    });
    chrome.runtime.sendMessage({ type: "get-entitlement" }, (response: Entitlement) => {
      setEntitlement(response);
      setLicenseKey(response.licenseKey ?? "");
    });
    chrome.runtime.sendMessage({ type: "get-events" }, (response: PressureEvent[]) => {
      setEvents(response ?? []);
    });
  }, []);

  const saveSettings = () => {
    if (!settings) {
      return;
    }
    const isPremium = entitlement?.valid ?? false;
    const next: Settings = {
      ...settings,
      checkoutSelectors: selectors
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      minPauseSeconds: isPremium ? Math.max(0, minPauseSeconds) : 0,
      enabledHosts: isPremium
        ? enabledHosts
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
        : [],
      disabledHosts: isPremium
        ? disabledHosts
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
        : []
    };
    chrome.runtime.sendMessage({ type: "save-settings", payload: next }, () => {
      setSettings(next);
    });
  };

  const saveLicense = () => {
    chrome.runtime.sendMessage({ type: "set-license", payload: licenseKey }, (response: Entitlement) => {
      setEntitlement(response);
    });
  };

  const isPremium = entitlement?.valid ?? false;
  const totalEvents = events.length;
  const last7Days = events.filter((event) => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return new Date(event.timestamp).getTime() >= cutoff;
  }).length;

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Poko Settings</h2>
      <section style={{ marginBottom: 24 }}>
        <h3>Premium summary</h3>
        {isPremium ? (
          <p>
            {totalEvents} checkout pauses recorded · {last7Days} in the last 7 days.
          </p>
        ) : (
          <p>Unlock spending summaries with Premium.</p>
        )}
      </section>
      <section style={{ marginBottom: 24 }}>
        <h3>Checkout selectors</h3>
        <p>One selector per line for elements that trigger checkout.</p>
        <textarea
          style={{ width: "100%", minHeight: 160 }}
          value={selectors}
          onChange={(event) => setSelectors(event.target.value)}
        />
        <div style={{ marginTop: 12 }}>
          <button onClick={saveSettings} type="button">
            Save settings
          </button>
        </div>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h3>Pausing rules (Premium)</h3>
        <p>Require a minimum pause before allowing checkout.</p>
        <input
          type="number"
          min={0}
          disabled={!isPremium}
          style={{ width: "100%", marginBottom: 8 }}
          value={minPauseSeconds}
          onChange={(event) => setMinPauseSeconds(Number(event.target.value))}
        />
        {!isPremium && <p>Upgrade to adjust pause timing.</p>}
      </section>
      <section style={{ marginBottom: 24 }}>
        <h3>Site controls (Premium)</h3>
        <p>Optional allowlist or blocklist by hostname.</p>
        <label>
          Enabled hosts (one per line)
          <textarea
            disabled={!isPremium}
            style={{ width: "100%", minHeight: 100 }}
            value={enabledHosts}
            onChange={(event) => setEnabledHosts(event.target.value)}
          />
        </label>
        <label>
          Disabled hosts (one per line)
          <textarea
            disabled={!isPremium}
            style={{ width: "100%", minHeight: 100 }}
            value={disabledHosts}
            onChange={(event) => setDisabledHosts(event.target.value)}
          />
        </label>
        {!isPremium && <p>Upgrade to control sites.</p>}
      </section>
      <section>
        <h3>License</h3>
        <p>Paste your license key to unlock premium features.</p>
        <input
          type="text"
          style={{ width: "100%", marginBottom: 8 }}
          value={licenseKey}
          onChange={(event) => setLicenseKey(event.target.value)}
        />
        <div>
          <button onClick={saveLicense} type="button">
            Validate license
          </button>
        </div>
        {entitlement && (
          <p style={{ marginTop: 8 }}>
            Status: {entitlement.valid ? "Active" : "Inactive"}
          </p>
        )}
      </section>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(<Options />);
}
