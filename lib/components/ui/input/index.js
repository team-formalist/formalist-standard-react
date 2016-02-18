'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _input = require('./input.mcss');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Input
 *
 * States:
 * - focus
 * - error
 *
 * Sizes:
 * - small
 * - normal*
 * - large
 *
 */
var Input = _react2.default.createClass({
  displayName: 'Input',

  propTypes: {
    className: _react2.default.PropTypes.string,
    error: _react2.default.PropTypes.bool,
    size: _react2.default.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      error: false,
      size: 'normal',
      type: 'text'
    };
  },
  getInitialState: function getInitialState() {
    return {
      focus: false
    };
  },
  onFocus: function onFocus(e) {
    this.setState({ focus: true });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  },
  onBlur: function onBlur(e) {
    this.setState({ focus: false });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },
  render: function render() {
    var _classNames;

    var inputClassNames = (0, _classnames2.default)(this.props.className, _input2.default.input, (_classNames = {}, _defineProperty(_classNames, '' + _input2.default.error, this.props.error), _defineProperty(_classNames, '' + _input2.default.focus, this.state.focus), _classNames), '' + _input2.default[this.props.size]);
    return _react2.default.createElement('input', _extends({}, this.props, {
      className: inputClassNames,
      onBlur: this.onBlur,
      onFocus: this.onFocus }));
  }
});

exports.default = Input;