"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withoutKeys;
/**
 * Return copy of `obj` without matching `keys`
 */

function withoutKeys(obj) {
  var without = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var output = {};
  var objKeys = Object.keys(obj);
  objKeys.forEach(function (key) {
    var allowed = without.indexOf(key) === -1;
    if (allowed) {
      output[key] = obj[key];
    }
  });
  return output;
}