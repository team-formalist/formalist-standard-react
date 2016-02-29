'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _textBox = require('./text-box.mcss');

var _textBox2 = _interopRequireDefault(_textBox);

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Components


/**
 * Return a set of rows as per http://andreypopp.github.io/react-textarea-autosize/
 * based on the boxSize
 * @param  {String} size
 * @return {Object} An object describing the various row properties per-size.
 */
function boxSize(size) {
  var rows = {
    single: {
      rows: 1,
      maxRows: 1
    },
    small: {
      minRows: 3,
      maxRows: 6
    },
    normal: {
      minRows: 5,
      maxRows: 10
    },
    large: {
      minRows: 8,
      maxRows: 16
    },
    xlarge: {
      minRows: 12
    }
  };
  return size ? rows[size] : rows['normal'];
}

/**
 * TextBox
 */
var TextBox = _react2.default.createClass({
  displayName: 'TextBox',

  propTypes: {
    className: _react2.default.PropTypes.string,
    error: _react2.default.PropTypes.bool,
    onFocus: _react2.default.PropTypes.func,
    onBlur: _react2.default.PropTypes.func,
    size: _react2.default.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
    boxSize: _react2.default.PropTypes.oneOf(['single', 'small', 'normal', 'large', 'xlarge'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      error: false,
      size: 'normal',
      boxSize: 'normal'
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

    var textBoxClassNames = (0, _classnames2.default)(this.props.className, _textBox2.default.textBox, (_classNames = {}, _defineProperty(_classNames, '' + _textBox2.default.error, this.props.error), _defineProperty(_classNames, '' + _textBox2.default.focus, this.state.focus), _classNames), '' + _textBox2.default[this.props.size]);
    return _react2.default.createElement(_reactTextareaAutosize2.default, _extends({}, this.props, boxSize(this.props.boxSize), {
      className: textBoxClassNames,
      onBlur: this.onBlur,
      onFocus: this.onFocus }));
  }
});

exports.default = TextBox;