'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    var _this = this;

    var textBoxClassNames = (0, _classnames2.default)(this.props.className, 'ui-input', {
      'ui-input--disabled': this.props.disabled,
      'ui-input--error': this.props.error,
      'ui-input--focus': this.state.focus,
      'ui-input--reversed': this.props.reversed
    }, 'ui-input--size-' + this.props.size);
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