'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = components;

var _fields = require('./fields');

var _fields2 = _interopRequireDefault(_fields);

var _attr = require('./attr');

var _group = require('./group');

var _many = require('./many');

var _section = require('./section');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function components() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return {
    attr: _attr.AttrFactory,
    fields: (0, _fields2.default)(options.fields),
    group: _group.GroupFactory,
    many: _many.ManyFactory,
    section: _section.SectionFactory
  };
}