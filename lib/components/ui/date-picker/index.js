'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/en-au');

var _reactDayPicker = require('react-day-picker');

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

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

var daypickerOffset = {
  left: 10,
  top: 0
};

var DatePicker = _react2.default.createClass({
  displayName: 'DatePicker',
  getInitialState: function getInitialState() {
    return {
      value: this.props.value ? (0, _moment2.default)(this.props.value, 'YYYY-MM-DD').format('l') : '',
      month: this.props.month || new Date(),
      daypickerPosition: {
        left: 0,
        top: 0
      }
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      placeholder: 'Select a date'
    };
  },
  componentDidMount: function componentDidMount() {
    this.calculateDaypickerPosition();
  },
  componentWillMount: function componentWillMount() {
    window.addEventListener('resize', this.onResize);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  onInputChange: function onInputChange(e) {
    var inputValue = e.target.value;
    // Change the current month only if the value entered by the user is a valid
    // date, according to the `L` format
    if ((0, _moment2.default)(inputValue, 'l', true).isValid()) {
      this.setState({
        month: (0, _moment2.default)(inputValue, 'l').toDate(),
        value: inputValue
      }, this.showCurrentDate);
      // Pass the value back
      var storedValue = (0, _moment2.default)(inputValue, 'l').format('YYYY-MM-DD');
      this.props.onChange(storedValue);
    } else {
      this.setState({
        value: inputValue
      }, this.showCurrentDate);
    }
  },
  showCurrentDate: function showCurrentDate() {
    this.refs.daypicker.showMonth(this.state.month);
  },
  onInputFocus: function onInputFocus(e) {
    this.refs.daypickerPortal.openPortal();
    this.calculateDaypickerPosition();
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
  onResize: function onResize(e) {
    this.calculateDaypickerPosition();
  },
  calculateDaypickerPosition: function calculateDaypickerPosition() {
    // Only bother if its rendered
    var inputEl = _reactDom2.default.findDOMNode(this.refs.dateInput);
    var inputPosition = inputEl.getBoundingClientRect();
    this.setState({
      daypickerPosition: {
        left: inputPosition.left + daypickerOffset.left,
        top: inputPosition.top + inputPosition.height + daypickerOffset.top
      }
    });
  },
  render: function render() {
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
      _react2.default.createElement(_input2.default, {
        type: 'text',
        ref: 'dateInput',
        id: id,
        error: error,
        placeholder: placeholder,
        value: value,
        onChange: this.onInputChange,
        onFocus: this.onInputFocus }),
      _react2.default.createElement(
        _reactPortal2.default,
        { ref: 'daypickerPortal', closeOnEsc: true, closeOnOutsideClick: true },
        _react2.default.createElement(
          'div',
          { ref: 'daypickerContainer', className: _datePicker2.default.daypickerContainer, style: this.state.daypickerPosition },
          _react2.default.createElement(_reactDayPicker2.default, {
            ref: 'daypicker',
            locale: 'en-AU',
            localeUtils: localeUtils,
            initialMonth: this.state.month,
            modifiers: {
              selected: function selected(day) {
                return _reactDayPicker.DateUtils.isSameDay(selectedDay, day);
              }
            },
            onDayClick: this.onDayClick })
        )
      )
    );
  }
});

exports.default = DatePicker;