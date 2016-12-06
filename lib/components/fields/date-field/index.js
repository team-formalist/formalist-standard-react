'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _datePicker = require('../../ui/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _dateField = require('./date-field.mcss');

var _dateField2 = _interopRequireDefault(_dateField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Import the display types


// Import styles


/**
 * Date Field
 */
var DateField = _react2.default.createClass({
  displayName: 'DateField',


  propTypes: {
    actions: _react2.default.PropTypes.object,
    attributes: _react2.default.PropTypes.shape({
      label: _react2.default.PropTypes.string,
      hint: _react2.default.PropTypes.string,
      placeholder: _react2.default.PropTypes.string,
      inline: _react2.default.PropTypes.bool
    }),
    errors: _reactImmutableProptypes2.default.list,
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    name: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.object,
    value: _react2.default.PropTypes.string
  },

  /**
   * Enable parent to pass context
   */

  contextTypes: {
    globalConfig: _react2.default.PropTypes.object
  },

  /**
   * onChange handler
   *
   * @param  {String} date Date as a YYYY-MM-DD formatted string
   */
  onChange: function onChange(date) {
    this.props.actions.edit(function (val) {
      return date;
    });
  },


  /**
   * setDateToNow
   */
  setDateToNow: function setDateToNow() {
    this.onChange((0, _moment2.default)().format('YYYY-MM-DD'));
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var attributes = _props.attributes;
    var errors = _props.errors;
    var hint = _props.hint;
    var label = _props.label;
    var name = _props.name;
    var value = _props.value;

    var hasErrors = errors.count() > 0;

    // Set up field classes
    var fieldClassNames = (0, _classnames2.default)(_dateField2.default.base, _defineProperty({}, '' + _dateField2.default.baseInline, attributes.inline));
    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return _react2.default.createElement(
      'div',
      { className: fieldClassNames },
      _react2.default.createElement(
        'button',
        { className: _dateField2.default.nowButton, onClick: function onClick(e) {
            e.preventDefault();
            _this.setDateToNow();
          } },
        'Set date to now'
      ),
      _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors }),
      _react2.default.createElement(
        'div',
        { className: _dateField2.default.display },
        _react2.default.createElement(_datePicker2.default, {
          id: name,
          error: hasErrors,
          placeholder: attributes.placeholder,
          value: value,
          onChange: this.onChange })
      ),
      hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
    );
    /* eslint-enable react/jsx-no-bind */
  }
});

exports.default = DateField;