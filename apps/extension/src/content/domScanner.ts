export const defaultCheckoutSelectors = [
  "button[type='submit']",
  "button[name*='checkout']",
  "button[id*='checkout']",
  "button[class*='checkout']",
  "a[href*='checkout']",
  "[data-checkout]"
];

export const defaultPressureSelectors = [
  ".countdown",
  ".limited",
  ".timer",
  ".scarcity",
  ".low-stock",
  "[class*='countdown']",
  "[class*='timer']",
  "[class*='scarcity']",
  "[class*='stock']",
  "[id*='countdown']",
  "[id*='timer']",
  "[id*='scarcity']",
  "[id*='stock']",
  "[data-countdown]",
  "[data-pressure]",
  "[data-scarcity]",
  "[data-urgency]"
];

export const findPressureElements = (selectors: string[]): Element[] => {
  const elements: Element[] = [];
  selectors.forEach((selector) => {
    elements.push(...Array.from(document.querySelectorAll(selector)));
  });
  return elements;
};
