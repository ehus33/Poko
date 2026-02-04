type MutationHandler = () => void;

export class MutationWatcher {
  private observer: MutationObserver | null = null;
  private handler: MutationHandler;

  constructor(handler: MutationHandler) {
    this.handler = handler;
  }

  start() {
    if (this.observer) {
      return;
    }
    this.observer = new MutationObserver(() => {
      this.handler();
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  stop() {
    this.observer?.disconnect();
    this.observer = null;
  }
}
