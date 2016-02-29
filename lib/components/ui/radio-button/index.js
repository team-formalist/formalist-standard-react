'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _radioButton = require('./radio-button.mcss');

var _radioButton2 = _interopRequireDefault(_radioButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * RadioButton
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
var RadioButton = _react2.default.createClass({
  displayName: 'RadioButton',

  propTypes: {
    id: _react2.default.PropTypes.string,
    className: _react2.default.PropTypes.string,
    defaultChecked: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool,
    error: _react2.default.PropTypes.bool,
    label: _react2.default.PropTypes.string.isRequired,
    name: _react2.default.PropTypes.string.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    size: _react2.default.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.number, _react2.default.PropTypes.string])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false,
      error: false,
      size: 'normal'
    };
  },
  getInitialState: function getInitialState() {
    return {
      id: (0, _uid2.default)(10),
      focus: false
    };
  },
  render: function render() {
    var _classNames,
        _this = this;

    var _props = this.props;
    var defaultChecked = _props.defaultChecked;
    var label = _props.label;
    var name = _props.name;
    var onChange = _props.onChange;
    var value = _props.value;

    var labelClassNames = (0, _classnames2.default)(_radioButton2.default.label, (_classNames = {}, _defineProperty(_classNames, '' + _radioButton2.default.error, this.props.error), _defineProperty(_classNames, '' + _radioButton2.default.focus, this.state.focus), _classNames));

    return _react2.default.createElement(
      'div',
      { className: _radioButton2.default.button },
      _react2.default.createElement('input', {
        className: _radioButton2.default.input,
        id: this.state.id,
        type: 'radio',
        name: name,
        value: value,
        defaultChecked: defaultChecked,
        onBlur: function onBlur() {
          return _this.setState({ focus: false });
        },
        onFocus: function onFocus() {
          return _this.setState({ focus: true });
        },
        onChange: onChange }),
      _react2.default.createElement(
        'label',
        {
          className: labelClassNames,
          htmlFor: this.state.id },
        label
      )
    );
  }
});

exports.default = RadioButton;