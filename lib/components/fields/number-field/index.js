'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isNumber = require('is-number');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _input = require('../../ui/input');

var _input2 = _interopRequireDefault(_input);

var _numberField = require('./number-field.mcss');

var _numberField2 = _interopRequireDefault(_numberField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Import components


// Import styles


/**
 * Number field
 */
var NumberField = _react2.default.createClass({
  displayName: 'NumberField',


  propTypes: {
    actions: _react2.default.PropTypes.object,
    attributes: _react2.default.PropTypes.shape({
      label: _react2.default.PropTypes.string,
      hint: _react2.default.PropTypes.string,
      placeholder: _react2.default.PropTypes.string,
      inline: _react2.default.PropTypes.bool,
      step: _react2.default.PropTypes.number,
      min: _react2.default.PropTypes.number,
      max: _react2.default.PropTypes.number
    }),
    name: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.object,
    value: _react2.default.PropTypes.number,
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    errors: _reactImmutableProptypes2.default.list
  },

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange: function onChange(e) {
    var value = e.target.value;
    if ((0, _isNumber2.default)(value)) {
      value = parseFloat(value);
    } else {
      value = null;
    }
    this.props.actions.edit(function (val) {
      return value;
    });
  },
  render: function render() {
    var _props = this.props;
    var attributes = _props.attributes;
    var errors = _props.errors;
    var hint = _props.hint;
    var label = _props.label;
    var name = _props.name;
    var value = _props.value;

    var hasErrors = errors.count() > 0;

    // Set up field classes
    var fieldClassNames = (0, _classnames2.default)(_numberField2.default.base, _defineProperty({}, '' + _numberField2.default.baseInline, attributes.inline));

    // Set up input classes
    var inputClassNames = (0, _classnames2.default)(_defineProperty({}, '' + _numberField2.default.code, attributes.code));

    // Configure specific number attributes from the attributes
    var numberProps = {};
    var numberConfig = ['step', 'min', 'max'];
    numberConfig.forEach(function (option) {
      var value = attributes[option];
      if (value && (0, _isNumber2.default)(value)) {
        numberProps[option] = value;
      }
    });

    return _react2.default.createElement(
      'div',
      { className: fieldClassNames },
      _react2.default.createElement(
        'div',
        { className: _numberField2.default.header },
        _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
      ),
      _react2.default.createElement(
        'div',
        { className: _numberField2.default.display },
        _react2.default.createElement(_input2.default, _extends({
          type: 'number',
          id: name,
          error: hasErrors,
          className: inputClassNames,
          placeholder: attributes.placeholder,
          defaultValue: value,
          onChange: this.onChange
        }, numberProps)),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      )
    );
  }
});

exports.default = NumberField;