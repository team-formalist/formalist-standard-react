'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = components;

var _fields = require('./fields');

var _fields2 = _interopRequireDefault(_fields);

var _attr = require('./attr');

var _compoundField = require('./compound-field');

var _group = require('./group');

var _many = require('./many');

var _section = require('./section');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function components() {
  var customComponents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var base = {
    fields: (0, _fields2.default)(config.fields, config.global),
    attr: _attr.AttrFactory,
    compoundField: _compoundField.CompoundFieldFactory,
    group: _group.GroupFactory,
    many: _many.ManyFactory,
    section: _section.SectionFactory
  };
  return Object.assign(base, customComponents);
}