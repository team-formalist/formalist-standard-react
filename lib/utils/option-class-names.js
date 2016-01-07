"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = optionClassNames;
function optionClassNames(prefix, options) {
  if (!options) {
    return false;
  }
  return options.toArray().map(function (option) {
    return [prefix + "--" + option];
  });
}