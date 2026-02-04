import { defaultPressureSelectors, findPressureElements } from "../../extension/src/content/domScanner";

describe("domScanner", () => {
  it("finds pressure elements using selectors", () => {
    document.body.innerHTML = `
      <div class="countdown"></div>
      <div data-pressure="true"></div>
    `;
    const elements = findPressureElements(defaultPressureSelectors);
    expect(elements.length).toBeGreaterThanOrEqual(2);
  });
});
