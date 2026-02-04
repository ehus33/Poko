const currencyRegex = /([$€£]\s?\d+(?:[.,]\d{2})?)/;

export const extractPrice = (): string | null => {
  const text = document.body?.innerText ?? "";
  const match = text.match(currencyRegex);
  return match ? match[1] : null;
};
