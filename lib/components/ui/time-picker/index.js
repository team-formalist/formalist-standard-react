var _jsxFileName = "src/components/ui/time-picker/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/en-au";

// Components
import Popunder from "../popunder";
import Input from "../input";

// Styles
import * as styles from "./styles";

var TimePicker = function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker(props) {
    var _this2 = this;

    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

    _this.onInputChange = function (e, value) {
      var time = moment(value, _this.props.humanTimeFormat, true);

      if (time.isValid()) {
        _this.time = time;
        _this.props.onChange(time.format(_this.props.timeFormat));
      }
    };

    _this.onInputFocus = function () {
      _this._popunder.openPopunder();
    };

    _this.onTimeClick = function (time, e) {
      e.preventDefault();
      _this.time = time;
      _this.setState({
        inputValue: time.format(_this.props.humanTimeFormat)
      });
      _this.props.onChange(time.format(_this.props.timeFormat));
    };

    _this.renderTimeList = function () {
      // Get midnight
      var date = moment().set({
        hours: 0,
        minutes: 0,
        seconds: 0
      });
      // Get the end of the day
      var end = moment().endOf("day");
      return React.createElement(
        "ul",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 92
          },
          __self: _this2
        },
        _this.renderTimeItem(date, [], end, _this.time)
      );
    };

    _this.renderTimeItem = function (date, items, end, active) {
      if (end.diff(date) > 0) {
        // Check if active. We only care about hours/minutes
        var isActive = active && active.hours() === date.hours() && active.minutes() === date.minutes();
        var buttonClassNames = classNames(styles.button, _defineProperty({}, "" + styles.buttonActive, isActive));

        var onClick = _this.onTimeClick.bind(_this, date.clone());
        var item = React.createElement(
          "li",
          { key: date.format(), className: styles.item, __source: {
              fileName: _jsxFileName,
              lineNumber: 116
            },
            __self: _this2
          },
          React.createElement(
            "button",
            {
              ref: function ref(r) {
                _this._buttonActive = isActive ? r : null;
              },
              className: buttonClassNames,
              onClick: onClick,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 117
              },
              __self: _this2
            },
            date.format(_this.props.humanTimeFormat)
          )
        );
        items.push(item);
        date = date.add(15, "minutes");
        return _this.renderTimeItem(date, items, end, active);
      } else {
        return items;
      }
    };

    _this.onPopunderOpen = function (e, domNode) {
      if (_this._buttonActive && _this._popunder.getContainer()) {
        var buttonEl = _this._buttonActive;
        var containerEl = _this._popunder.getContainer();
        containerEl.scrollTop = buttonEl.offsetTop;
      }
    };

    var inputValue = void 0;
    var parsedTime = moment(props.value, props.timeFormat);
    if (parsedTime.isValid()) {
      _this.time = parsedTime;
      inputValue = parsedTime.format(props.humanTimeFormat);
    }

    _this.state = {
      inputValue: inputValue
    };
    return _this;
  }

  _createClass(TimePicker, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value && nextProps.value !== this.props.value) {
        var parsedTime = moment(nextProps.value, this.props.timeFormat);
        if (parsedTime.isValid()) {
          this.time = parsedTime;
          this.setState({
            inputValue: parsedTime.format(this.props.humanTimeFormat)
          });
        }
      }
    }

    /**
     * Render a list of human formatted times between midnight and midnight
     * @return {ReactElement} React element containing the list
     */


    /**
     * Recursive function to render time items
     * @param  {Moment} date Context date object
     * @param  {Array} items Array of previous created elements
     * @param  {Moment} end A moment object representing the end of the day
     * @param  {Moment} active A moment object representing the currently selected time
     * @return {Array} Return the array of built up items (or recurse)
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          error = _props.error,
          placeholder = _props.placeholder;
      var inputValue = this.state.inputValue;


      return React.createElement(
        "div",
        { className: styles.base, __source: {
            fileName: _jsxFileName,
            lineNumber: 149
          },
          __self: this
        },
        React.createElement(
          Popunder,
          {
            ref: function ref(r) {
              _this3._popunder = r;
            },
            closeOnEsc: true,
            closeOnOutsideClick: true,
            onOpen: this.onPopunderOpen,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 150
            },
            __self: this
          },
          React.createElement(Input, {
            key: inputValue,
            defaultValue: inputValue,
            error: error,
            placeholder: placeholder,
            onFocus: this.onInputFocus,
            onChange: this.onInputChange,
            "data-field-input": "time",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 158
            },
            __self: this
          }),
          this.renderTimeList()
        )
      );
    }
  }]);

  return TimePicker;
}(React.Component);

TimePicker.propTypes = {
  value: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  timeFormat: PropTypes.string,
  humanTimeFormat: PropTypes.string
};
TimePicker.defaultProps = {
  placeholder: "Select or enter a time",
  timeFormat: "HH:mm:ss",
  humanTimeFormat: "hh:mma"
};


export default TimePicker;