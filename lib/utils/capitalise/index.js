"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalise;
/**
 * Capitalise a string
 */

function capitalise(str, lowercaseRest) {
  var remainingChars = !lowercaseRest ? str.slice(1) : str.slice(1).toLowerCase();
  return str.charAt(0).toUpperCase() + remainingChars;
}