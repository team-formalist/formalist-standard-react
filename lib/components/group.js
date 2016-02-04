'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _group = require('./group.mcss');

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Group = _react2.default.createClass({
  displayName: 'Group',
  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return this.props.hashCode !== nextProps.hashCode;
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: _group2.default.group },
      this.props.children.map(function (child, index) {
        return _react2.default.createElement(
          'div',
          { key: index, className: _group2.default.item },
          child
        );
      })
    );
  }
});

exports.default = Group;
var GroupFactory = exports.GroupFactory = _react2.default.createFactory(Group);