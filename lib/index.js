'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldDisplayVariants = exports.components = undefined;
exports.default = template;

var _formalistCompose = require('formalist-compose');

var _formalistCompose2 = _interopRequireDefault(_formalistCompose);

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _fields = require('./components/fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = exports.components = _components2.default;
var fieldDisplayVariants = exports.fieldDisplayVariants = _fields.displayVariants;

/**
 * Template
 * @param  {Object} options Configuration options
 * @return {Function} A form compose with a set of standard React component
 * (potentially augmented by the `options`)
 */
function template() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return (0, _formalistCompose2.default)((0, _components2.default)(options));
}