"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = optionClassNames;
function optionClassNames(styles, options) {
  if (!styles || !options) {
    return false;
  }
  return options.toArray().map(function (option) {
    return ["" + styles[option]];
  });
}