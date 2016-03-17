"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractComponent;
/**
 * Iterate over an array of objects with the form:
 *
 *   {name: 'foo', component: ReactComponent}
 *
 * And return the `.component` that matches `name`
 *
 * @param  {Array} components Array of component names/definitions
 * @param  {String} name Component name to match against
 * @return {ReactComponent/Boolean} Matching React component (or false)
 */
function extractComponent(components, name) {
  var component = false;
  components.forEach(function (c) {
    if (c.name === name) {
      component = c.component;
    }
  });
  return component;
}