'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateFormats = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/en-au');

var _datePicker = require('../date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _timePicker = require('../time-picker');

var _timePicker2 = _interopRequireDefault(_timePicker);

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Components


// Styles


var dateFormats = exports.dateFormats = {
  utc: 'YYYY-MM-DDTHH:mm:ssZ',
  date: 'YYYY-MM-DD',
  time: 'HH:mm:ss'
};

var DateTimePicker = function (_React$Component) {
  _inherits(DateTimePicker, _React$Component);

  function DateTimePicker(props) {
    _classCallCheck(this, DateTimePicker);

    var _this = _possibleConstructorReturn(this, (DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).call(this, props));

    _this.onDateChange = function (date) {
      var parsedDate = (0, _moment2.default)(date, dateFormats.date);
      if (parsedDate.isValid()) {
        if (_this.dateTime) {
          _this.dateTime = _this.dateTime.set({
            year: parsedDate.year(),
            month: parsedDate.month(),
            date: parsedDate.date()
          });
        } else {
          _this.dateTime = parsedDate;
        }
      }
      _this.onChange();
    };

    _this.onTimeChange = function (time) {
      var parsedTime = (0, _moment2.default)(time, dateFormats.time);
      if (parsedTime.isValid()) {
        if (_this.dateTime) {
          _this.dateTime = _this.dateTime.set({
            hours: parsedTime.hours(),
            minutes: parsedTime.minutes(),
            seconds: parsedTime.seconds()
          });
        } else {
          _this.dateTime = parsedTime;
        }
      }
      _this.onChange();
    };

    _this.onChange = function () {
      _this.props.onChange(_this.dateTime.format(dateFormats.utc));
    };

    if (props.value) {
      var parsedDateTime = (0, _moment2.default)(props.value, dateFormats.utc);
      if (parsedDateTime.isValid()) {
        _this.dateTime = parsedDateTime;

        _this.state = {
          date: parsedDateTime.format(dateFormats.date),
          time: parsedDateTime.format(dateFormats.time)
        };

        return _possibleConstructorReturn(_this);
      }
    }

    _this.state = {
      date: null,
      time: null
    };
    return _this;
  }

  _createClass(DateTimePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
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
    }

    /**
     * Set the passed `time` into the date time
     * @param  {String} time Time to apply to the current date-time
     */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var error = _props.error;
      var id = _props.id;
      var placeholder = _props.placeholder;


      var dateValue = this.state.date;
      var timeValue = this.state.time;

      return _react2.default.createElement(
        'div',
        { className: styles.base },
        _react2.default.createElement(
          'div',
          { className: styles.datePicker },
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
          { className: styles.timePicker },
          _react2.default.createElement(_timePicker2.default, {
            error: error,
            value: timeValue,
            onChange: this.onTimeChange
          })
        )
      );
    }
  }]);

  return DateTimePicker;
}(_react2.default.Component);

DateTimePicker.propTypes = {
  value: _propTypes2.default.string,
  error: _propTypes2.default.bool,
  id: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string
};
exports.default = DateTimePicker;