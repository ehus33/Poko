import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Popup } from "../../extension/src/popup/main";

describe("Popup", () => {
  it("renders settings and toggles enabled state", async () => {
    const sendMessage = chrome.runtime.sendMessage as jest.Mock;
    sendMessage.mockImplementation((message, callback) => {
      if (message.type === "get-settings") {
        callback({
          enabled: true,
          checkoutSelectors: ["button"],
          upgradeUrl: "https://poko.app/pricing"
        });
      }
      if (message.type === "save-settings") {
        callback({ ok: true });
      }
    });

    render(<Popup />);
    expect(
      await screen.findByText("Guarding checkout clicks.")
    ).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Pause guard" });
    fireEvent.click(button);

    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: "save-settings" }),
      expect.any(Function)
    );
  });
});
