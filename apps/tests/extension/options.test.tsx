import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Options } from "../../extension/src/options/main";

describe("Options", () => {
  it("renders and saves selectors", async () => {
    const sendMessage = chrome.runtime.sendMessage as jest.Mock;
    sendMessage.mockImplementation((message, callback) => {
      if (message.type === "get-settings") {
        callback({
          enabled: true,
          checkoutSelectors: ["button.checkout"],
          upgradeUrl: "https://poko.app/pricing"
        });
      }
      if (message.type === "get-entitlement") {
        callback({ licenseKey: "poko_123", valid: true, checkedAt: null });
      }
      if (message.type === "save-settings") {
        callback({ ok: true });
      }
    });

    render(<Options />);
    const [selectorsBox] = await screen.findAllByRole("textbox");
    fireEvent.change(selectorsBox, { target: { value: "button.pay" } });
    fireEvent.click(screen.getByRole("button", { name: "Save settings" }));

    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: "save-settings" }),
      expect.any(Function)
    );
  });
});
