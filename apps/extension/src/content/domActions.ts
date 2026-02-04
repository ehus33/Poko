const OVERLAY_ID = "poko-overlay";

export const ensureOverlayStyles = () => {
  if (document.getElementById("poko-overlay-style")) {
    return;
  }
  const style = document.createElement("style");
  style.id = "poko-overlay-style";
  style.textContent = `
    #${OVERLAY_ID} {
      position: fixed;
      inset: 0;
      background: rgba(12, 14, 20, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2147483647;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
    }
    #${OVERLAY_ID} .poko-card {
      background: #fff;
      color: #12131a;
      border-radius: 16px;
      padding: 24px 28px;
      width: min(420px, 92vw);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
      text-align: center;
    }
    #${OVERLAY_ID} .poko-actions {
      margin-top: 16px;
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    #${OVERLAY_ID} button {
      border: none;
      border-radius: 999px;
      padding: 10px 18px;
      cursor: pointer;
      font-weight: 600;
    }
    #${OVERLAY_ID} .poko-continue {
      background: #1f5cff;
      color: #fff;
    }
    #${OVERLAY_ID} .poko-cancel {
      background: #eceef3;
      color: #1a1c26;
    }
  `;
  document.head.appendChild(style);
};

type OverlayOptions = {
  disableForSeconds?: number;
};

export const createOverlay = (
  message: string,
  onContinue: () => void,
  onCancel: () => void,
  options: OverlayOptions = {}
) => {
  removeOverlay();
  ensureOverlayStyles();
  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  const countdown = options.disableForSeconds ?? 0;
  overlay.innerHTML = `
    <div class="poko-card">
      <h2>Pause for a second</h2>
      <p>${message}</p>
      ${countdown > 0 ? `<p class="poko-countdown">Wait ${countdown}s</p>` : ""}
      <div class="poko-actions">
        <button class="poko-cancel" type="button">Not yet</button>
        <button class="poko-continue" type="button">Continue</button>
      </div>
    </div>
  `;
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      onCancel();
    }
  });
  const cancel = overlay.querySelector(".poko-cancel") as HTMLButtonElement | null;
  const cont = overlay.querySelector(".poko-continue") as HTMLButtonElement | null;
  const countdownEl = overlay.querySelector(".poko-countdown") as HTMLParagraphElement | null;
  if (cont && countdown > 0) {
    cont.disabled = true;
    let remaining = countdown;
    const tick = () => {
      remaining -= 1;
      if (countdownEl) {
        countdownEl.textContent = `Wait ${Math.max(remaining, 0)}s`;
      }
      if (remaining <= 0 && cont) {
        cont.disabled = false;
        if (countdownEl) {
          countdownEl.textContent = "You can continue now.";
        }
        return;
      }
      window.setTimeout(tick, 1000);
    };
    window.setTimeout(tick, 1000);
  }
  cancel?.addEventListener("click", onCancel);
  cont?.addEventListener("click", onContinue);
  document.body.appendChild(overlay);
};

export const removeOverlay = () => {
  const existing = document.getElementById(OVERLAY_ID);
  existing?.remove();
};
