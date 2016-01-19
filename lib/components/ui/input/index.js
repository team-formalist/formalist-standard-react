'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _input = require('./input.css');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Input
 *
 * States:
 * - reversed
 * - focus
 * - disabled
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
    disabled: _react2.default.PropTypes.bool,
    error: _react2.default.PropTypes.bool,
    reversed: _react2.default.PropTypes.bool,
    size: _react2.default.PropTypes.oneOf(['small', 'normal', 'large'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false,
      error: false,
      reversed: false,
      size: 'normal',
      type: 'text'
    };
  },
  getInitialState: function getInitialState() {
    return {
      focus: false
    };
  },
  render: function render() {
    var _classNames,
        _this = this;

    var textBoxClassNames = (0, _classnames2.default)(this.props.className, _input2.default.input, (_classNames = {
      'ui-input--disabled': this.props.disabled,
      'ui-input--error': this.props.error
    }, _defineProperty(_classNames, '' + _input2.default.focus, this.state.focus), _defineProperty(_classNames, 'ui-input--reversed', this.props.reversed), _classNames), 'ui-input--size-' + this.props.size);
    return _react2.default.createElement('input', _extends({}, this.props, {
      className: textBoxClassNames,
      onBlur: function onBlur() {
        return _this.setState({ focus: false });
      },
      onFocus: function onFocus() {
        return _this.setState({ focus: true });
      } }));
  }
});

exports.default = Input;