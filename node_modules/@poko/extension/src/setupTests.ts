import "@testing-library/jest-dom";

Object.defineProperty(globalThis, "chrome", {
  value: {
    runtime: {
      sendMessage: jest.fn(),
      onInstalled: { addListener: jest.fn() },
      onMessage: { addListener: jest.fn() }
    },
    storage: {
      sync: { get: jest.fn(), set: jest.fn() },
      local: { get: jest.fn(), set: jest.fn() },
      onChanged: { addListener: jest.fn() }
    }
  },
  writable: true
});
