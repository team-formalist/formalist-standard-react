'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _section = require('./section.css');

var _section2 = _interopRequireDefault(_section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Section = function Section(_ref) {
  var name = _ref.name;
  var children = _ref.children;

  return _react2.default.createElement(
    'section',
    { className: _section2.default.base },
    _react2.default.createElement(
      'h2',
      { className: _section2.default.name },
      name.replace(/_/, ' ')
    ),
    _react2.default.createElement(
      'div',
      { className: _section2.default.children },
      children
    )
  );
};

exports.default = Section;
var SectionFactory = exports.SectionFactory = _react2.default.createFactory(Section);