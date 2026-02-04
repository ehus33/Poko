import { createOverlay, removeOverlay } from "./domActions";

type GuardOptions = {
  selectors: string[];
  minPauseSeconds?: number;
  onContinue?: (target: Element) => void;
  onCancel?: () => void;
};

export class ClickGuard {
  private selectors: string[];
  private minPauseSeconds = 0;
  private enabled = true;
  private paused = false;
  private onContinue?: (target: Element) => void;
  private onCancel?: () => void;

  constructor(options: GuardOptions) {
    this.selectors = options.selectors;
    this.minPauseSeconds = options.minPauseSeconds ?? 0;
    this.onContinue = options.onContinue;
    this.onCancel = options.onCancel;
  }

  updateSelectors(selectors: string[]) {
    this.selectors = selectors;
  }

  updateMinPauseSeconds(seconds: number) {
    this.minPauseSeconds = seconds;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      removeOverlay();
    }
  }

  attach() {
    document.addEventListener("click", this.handleClick, true);
  }

  detach() {
    document.removeEventListener("click", this.handleClick, true);
  }

  private handleClick = (event: MouseEvent) => {
    if (!this.enabled || this.paused) {
      return;
    }
    const target = event.target as Element | null;
    if (!target) {
      return;
    }
    const match = this.selectors.find((selector) =>
      target.closest(selector)
    );
    if (!match) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const matchedTarget = target.closest(match) ?? target;
    this.paused = true;
    createOverlay(
      "This looks like checkout. Want to continue?",
      () => {
        removeOverlay();
        this.paused = false;
        this.onContinue?.(matchedTarget);
        (matchedTarget as HTMLElement).click();
      },
      () => {
        removeOverlay();
        this.paused = false;
        this.onCancel?.();
      },
      {
        disableForSeconds: this.minPauseSeconds
      }
    );
  };
}
