import { JSDOM } from "jsdom";

// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access

export default function createDOM() {
  const { window } = new JSDOM("<!doctype html><html><body></body></html>");
  global.window = window;
  global.document = window.document;
  global.navigator = { userAgent: "node.js" };
  // Hack to register RAQ
  global.window.requestAnimationFrame = function(c) {
    c();
  };
}

createDOM();
