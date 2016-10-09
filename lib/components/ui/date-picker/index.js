'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/en-au');

var _reactDayPicker = require('react-day-picker');

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _popunder = require('../popunder');

var _popunder2 = _interopRequireDefault(_popunder);

var _datePicker = require('./date-picker.mcss');

var _datePicker2 = _interopRequireDefault(_datePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up simple localeUtils that always sets first day of week to Monday
// FIXME Doesn't seem to work even though it's correct AFAICT


// Components
var localeUtils = Object.assign({}, _reactDayPicker.LocaleUtils, { getFirstDayOfWeek: function getFirstDayOfWeek(locale) {
    return 1;
  } });

// Styles


var DatePicker = _react2.default.createClass({
  displayName: 'DatePicker',

  propTypes: {
    className: _react2.default.PropTypes.string,
    defaultValue: _react2.default.PropTypes.string,
    error: _react2.default.PropTypes.bool,
    id: _react2.default.PropTypes.string,
    month: _react2.default.PropTypes.number,
    onChange: _react2.default.PropTypes.func.isRequired,
    placeholder: _react2.default.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.defaultValue ? (0, _moment2.default)(this.props.defaultValue, 'YYYY-MM-DD').format('l') : '',
      month: this.props.month || new Date()
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      placeholder: 'Select a date'
    };
  },
  onInputChange: function onInputChange(e, value) {
    // Change the current month only if the value entered by the user is a valid
    // date, according to the `L` format
    if ((0, _moment2.default)(value, 'l', true).isValid()) {
      this.setState({
        month: (0, _moment2.default)(value, 'l').toDate(),
        value: value
      }, this.showCurrentDate);
      // Pass the value back
      var storedValue = (0, _moment2.default)(value, 'l').format('YYYY-MM-DD');
      this.props.onChange(storedValue);
    } else {
      this.setState({
        value: value
      }, this.showCurrentDate);
    }
  },
  showCurrentDate: function showCurrentDate() {
    this._daypicker.showMonth(this.state.month);
  },
  onInputFocus: function onInputFocus(e) {
    this._popunder.openPopunder();
  },
  onDayClick: function onDayClick(e, day) {
    var value = (0, _moment2.default)(day).format('l');
    this.setState({
      value: value,
      month: day
    });
    // Pass the value back
    var storedValue = (0, _moment2.default)(value, 'l').format('YYYY-MM-DD');
    this.props.onChange(storedValue);
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var id = _props.id;
    var className = _props.className;
    var error = _props.error;
    var placeholder = _props.placeholder;
    var value = this.state.value;

    var selectedDay = (0, _moment2.default)(this.state.value, 'l', true).toDate();

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        _popunder2.default,
        {
          ref: function ref(c) {
            _this._popunder = c;
          },
          closeOnEsc: true,
          closeOnOutsideClick: true
        },
        _react2.default.createElement(_input2.default, {
          id: id,
          error: error,
          placeholder: placeholder,
          value: value,
          onChange: this.onInputChange,
          onFocus: this.onInputFocus
        }),
        _react2.default.createElement(
          'div',
          { className: _datePicker2.default.daypickerContainer },
          _react2.default.createElement(_reactDayPicker2.default, {
            ref: function ref(c) {
              _this._daypicker = c;
            },
            locale: 'en-AU',
            localeUtils: localeUtils,
            initialMonth: this.state.month,
            modifiers: {
              selected: function selected(day) {
                return _reactDayPicker.DateUtils.isSameDay(selectedDay, day);
              }
            },
            onDayClick: this.onDayClick
          })
        )
      )
    );
  }
});

exports.default = DatePicker;