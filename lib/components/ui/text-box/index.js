'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TextBox
 */
var TextBox = _react2.default.createClass({
  displayName: 'TextBox',

  propTypes: {
    className: _react2.default.PropTypes.string
  },
  render: function render() {
    var textBoxClassNames = (0, _classnames2.default)(this.props.className, 'ui-textbox');
    return _react2.default.createElement('textarea', _extends({}, this.props, { className: textBoxClassNames }));
  }
});

exports.default = TextBox;