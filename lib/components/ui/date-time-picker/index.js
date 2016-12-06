'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateFormats = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/en-au');

var _datePicker = require('../date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _timePicker = require('../time-picker');

var _timePicker2 = _interopRequireDefault(_timePicker);

var _dateTimePicker = require('./date-time-picker.mcss');

var _dateTimePicker2 = _interopRequireDefault(_dateTimePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateFormats = exports.dateFormats = {
  utc: 'YYYY-MM-DDTHH:mm:ssZ',
  date: 'YYYY-MM-DD',
  time: 'HH:mm:ss'
};

// Styles


// Components


var DateTimePicker = _react2.default.createClass({
  displayName: 'DateTimePicker',

  propTypes: {
    value: _react2.default.PropTypes.string,
    error: _react2.default.PropTypes.bool,
    id: _react2.default.PropTypes.string,
    onChange: _react2.default.PropTypes.func.isRequired,
    placeholder: _react2.default.PropTypes.string
  },

  getInitialState: function getInitialState() {
    if (this.props.value) {
      var parsedDateTime = (0, _moment2.default)(this.props.value, dateFormats.utc);
      if (parsedDateTime.isValid()) {
        this.dateTime = parsedDateTime;
        return {
          date: parsedDateTime.format(dateFormats.date),
          time: parsedDateTime.format(dateFormats.time)
        };
      }
    }
    return {
      date: null,
      time: null
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      var parsedDateTime = (0, _moment2.default)(nextProps.value, dateFormats.utc);
      if (parsedDateTime.isValid()) {
        this.dateTime = parsedDateTime;
        this.setState({
          date: parsedDateTime.format(dateFormats.date),
          time: parsedDateTime.format(dateFormats.time)
        });
      }
    }
  },
  onDateChange: function onDateChange(date) {
    var parsedDate = (0, _moment2.default)(date, dateFormats.date);
    if (parsedDate.isValid()) {
      if (this.dateTime) {
        this.dateTime = this.dateTime.set({
          year: parsedDate.year(),
          month: parsedDate.month(),
          date: parsedDate.date()
        });
      } else {
        this.dateTime = parsedDate;
      }
    }
    this.onChange();
  },


  /**
   * Set the passed `time` into the date time
   * @param  {String} time Time to apply to the current date-time
   */
  onTimeChange: function onTimeChange(time) {
    var parsedTime = (0, _moment2.default)(time, dateFormats.time);
    if (parsedTime.isValid()) {
      if (this.dateTime) {
        this.dateTime = this.dateTime.set({
          hours: parsedTime.hours(),
          minutes: parsedTime.minutes(),
          seconds: parsedTime.seconds()
        });
      } else {
        this.dateTime = parsedTime;
      }
    }
    this.onChange();
  },
  onChange: function onChange() {
    this.props.onChange(this.dateTime.format(dateFormats.utc));
  },
  render: function render() {
    var _props = this.props;
    var error = _props.error;
    var id = _props.id;
    var placeholder = _props.placeholder;


    var dateValue = this.state.date;
    var timeValue = this.state.time;

    return _react2.default.createElement(
      'div',
      { className: _dateTimePicker2.default.base },
      _react2.default.createElement(
        'div',
        { className: _dateTimePicker2.default.datePicker },
        _react2.default.createElement(_datePicker2.default, {
          id: id,
          error: error,
          placeholder: placeholder,
          value: dateValue,
          onChange: this.onDateChange
        })
      ),
      _react2.default.createElement(
        'div',
        { className: _dateTimePicker2.default.timePicker },
        _react2.default.createElement(_timePicker2.default, {
          error: error,
          value: timeValue,
          onChange: this.onTimeChange
        })
      )
    );
  }
});

exports.default = DateTimePicker;