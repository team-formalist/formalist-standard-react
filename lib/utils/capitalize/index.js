"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalize;
/**
 * Capitalize a string
 */

function capitalize(str, lowercaseRest) {
  if (!str) return;
  var remainingChars = !lowercaseRest ? str.slice(1) : str.slice(1).toLowerCase();
  return str.charAt(0).toUpperCase() + remainingChars;
}