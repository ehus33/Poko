import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../website/src/App";

describe("Website routes", () => {
  it("renders pricing page", () => {
    render(
      <MemoryRouter initialEntries={["/pricing"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Pricing" })
    ).toBeDefined();
    expect(screen.getByText("Buy on Gumroad")).toBeDefined();
  });
});
