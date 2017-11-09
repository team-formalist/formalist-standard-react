var _jsxFileName = "src/components/ui/date-picker/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/en-au";

// Components
import DayPicker, { DateUtils, LocaleUtils } from "react-day-picker";
import Input from "../input";
import Popunder from "../popunder";

// Styles
import * as styles from "./styles";

// Set up simple localeUtils that always sets first day of week to Monday
var localeUtils = Object.assign({}, LocaleUtils, {
  getFirstDayOfWeek: function getFirstDayOfWeek(locale) {
    return 1;
  }
});

/**
 * Expand date from YYYY-MM-DD to l
 */
function expandDate(dateString) {
  return moment(dateString, "YYYY-MM-DD").format("l");
}

/**
 * Compress date from l to YYYY-MM-DD
 */
function compressDate(dateString) {
  return moment(dateString, "l").format("YYYY-MM-DD");
}

var DatePicker = function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: _this.props.value ? expandDate(_this.props.value) : "",
      month: _this.props.month || new Date()
    }, _this.onInputChange = function (e, value) {
      // Change the current month only if the value entered by the user is a valid
      // date, according to the `L` format
      if (moment(value, "l", true).isValid()) {
        _this.setState({
          month: moment(value, "l").toDate(),
          value: value
        }, _this.showCurrentDate);
        // Pass the value back
        var storedValue = compressDate(value);
        _this.props.onChange(storedValue);
      } else {
        _this.setState({
          value: value
        }, _this.showCurrentDate);
      }
    }, _this.showCurrentDate = function () {
      _this._daypicker.showMonth(_this.state.month);
    }, _this.onInputFocus = function (e) {
      _this._popunder.openPopunder();
    }, _this.onDayClick = function (day) {
      var value = moment(day).format("l");
      _this.setState({
        value: value,
        month: day
      });
      // Pass the value back
      var storedValue = compressDate(value);
      _this.props.onChange(storedValue);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatePicker, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value && nextProps.value !== this.props.value) {
        this.setState({
          value: expandDate(nextProps.value)
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          id = _props.id,
          className = _props.className,
          error = _props.error,
          placeholder = _props.placeholder,
          showFieldDataAttributes = _props.showFieldDataAttributes;
      var _state = this.state,
          month = _state.month,
          value = _state.value;

      var selectedDay = moment(this.state.value, "l", true).toDate();

      return React.createElement(
        "div",
        { className: className, __source: {
            fileName: _jsxFileName,
            lineNumber: 118
          },
          __self: this
        },
        React.createElement(
          Popunder,
          {
            ref: function ref(c) {
              _this2._popunder = c;
            },
            closeOnEsc: true,
            closeOnOutsideClick: true,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 119
            },
            __self: this
          },
          React.createElement(Input, {
            id: id,
            error: error,
            placeholder: placeholder,
            value: value,
            onChange: this.onInputChange,
            onFocus: this.onInputFocus,
            "data-field-input": "date",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 126
            },
            __self: this
          }),
          React.createElement(
            "div",
            { className: styles.daypickerContainer, __source: {
                fileName: _jsxFileName,
                lineNumber: 135
              },
              __self: this
            },
            React.createElement(DayPicker, {
              ref: function ref(c) {
                _this2._daypicker = c;
              },
              locale: "en-AU",
              localeUtils: localeUtils,
              initialMonth: month,
              modifiers: {
                selected: function selected(day) {
                  return DateUtils.isSameDay(selectedDay, day);
                }
              },
              onDayClick: this.onDayClick,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 136
              },
              __self: this
            })
          )
        )
      );
    }
  }]);

  return DatePicker;
}(React.Component);

DatePicker.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  id: PropTypes.string,
  month: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showFieldDataAttributes: PropTypes.bool
};
DatePicker.defaultProps = {
  placeholder: "Select a date",
  showFieldDataAttributes: false
};


export default DatePicker;