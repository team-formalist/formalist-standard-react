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
    className: _react2.default.PropTypes.string,
    error: _react2.default.PropTypes.bool,
    size: _react2.default.PropTypes.oneOf(['mini', 'small', 'normal', 'large', 'huge'])
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

    var _props = this.props;
    var defaultChecked = _props.defaultChecked;
    var label = _props.label;
    var name = _props.name;
    var onChange = _props.onChange;
    var value = _props.value;

    var labelClassNames = (0, _classnames2.default)(_radioButton2.default.label, (_classNames = {}, _defineProperty(_classNames, '' + _radioButton2.default.error, this.props.error), _defineProperty(_classNames, '' + _radioButton2.default.focus, this.state.focus), _classNames));

    var id = (0, _uid2.default)(10);

    return _react2.default.createElement(
      'div',
      { className: _radioButton2.default.button },
      _react2.default.createElement('input', {
        className: _radioButton2.default.input,
        id: id,
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
          htmlFor: id },
        label
      )
    );
  }
});

exports.default = RadioButton;