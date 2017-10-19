var _jsxFileName = "src/components/ui/date-time-picker/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/en-au";

// Components
import DatePicker from "../date-picker";
import TimePicker from "../time-picker";

// Styles
import * as styles from "./styles";

export var dateFormats = {
  utc: "YYYY-MM-DDTHH:mm:ssZ",
  date: "YYYY-MM-DD",
  time: "HH:mm:ss"
};

var DateTimePicker = function (_React$Component) {
  _inherits(DateTimePicker, _React$Component);

  function DateTimePicker(props) {
    _classCallCheck(this, DateTimePicker);

    var _this = _possibleConstructorReturn(this, (DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).call(this, props));

    _this.onDateChange = function (date) {
      var parsedDate = moment(date, dateFormats.date);
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
      var parsedTime = moment(time, dateFormats.time);
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
      var parsedDateTime = moment(props.value, dateFormats.utc);
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
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value && nextProps.value !== this.props.value) {
        var parsedDateTime = moment(nextProps.value, dateFormats.utc);
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
    key: "render",
    value: function render() {
      var _props = this.props,
          error = _props.error,
          id = _props.id,
          placeholder = _props.placeholder;


      var dateValue = this.state.date;
      var timeValue = this.state.time;

      return React.createElement(
        "div",
        { className: styles.base, __source: {
            fileName: _jsxFileName,
            lineNumber: 110
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.datePicker, __source: {
              fileName: _jsxFileName,
              lineNumber: 111
            },
            __self: this
          },
          React.createElement(DatePicker, {
            id: id,
            error: error,
            placeholder: placeholder,
            value: dateValue,
            onChange: this.onDateChange,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 112
            },
            __self: this
          })
        ),
        React.createElement(
          "div",
          { className: styles.timePicker, __source: {
              fileName: _jsxFileName,
              lineNumber: 120
            },
            __self: this
          },
          React.createElement(TimePicker, {
            error: error,
            value: timeValue,
            onChange: this.onTimeChange,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 121
            },
            __self: this
          })
        )
      );
    }
  }]);

  return DateTimePicker;
}(React.Component);

DateTimePicker.propTypes = {
  value: PropTypes.string,
  error: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};


export default DateTimePicker;