var _jsxFileName = "src/components/fields/date-time-field/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import moment from "moment";

// Import the display types
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import DateTimePicker, { dateFormats } from "../../ui/date-time-picker";

// Import styles
import * as styles from "./styles";

/**
 * Date Time field
 */

var DateTimeField = function (_React$Component) {
  _inherits(DateTimeField, _React$Component);

  function DateTimeField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateTimeField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateTimeField.__proto__ || Object.getPrototypeOf(DateTimeField)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (date) {
      _this.props.actions.edit(function (val) {
        return date;
      });
    }, _this.setToNow = function () {
      _this.onChange(moment().format(dateFormats.utc));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Enable parent to pass context
   */

  /**
   * onChange handler
   *
   * @param  {String} date Date as a dd/mm/yyyy formatted string
   */


  /**
   * setToNow
   */


  _createClass(DateTimeField, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          attributes = _props.attributes,
          errors = _props.errors,
          hint = _props.hint,
          label = _props.label,
          name = _props.name,
          value = _props.value;

      var hasErrors = errors.count() > 0;

      // Set up field classes
      var fieldClassNames = classNames(styles.base, _defineProperty({}, "" + styles.baseInline, attributes.inline));
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return React.createElement(
        "div",
        { className: fieldClassNames, __source: {
            fileName: _jsxFileName,
            lineNumber: 72
          },
          __self: this
        },
        React.createElement(
          "button",
          {
            className: styles.nowButton,
            onClick: function onClick(e) {
              e.preventDefault();
              _this2.setToNow();
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 73
            },
            __self: this
          },
          "Set to now"
        ),
        React.createElement(FieldHeader, { id: name, label: label, hint: hint, error: hasErrors, __source: {
            fileName: _jsxFileName,
            lineNumber: 82
          },
          __self: this
        }),
        React.createElement(
          "div",
          { className: styles.display, __source: {
              fileName: _jsxFileName,
              lineNumber: 83
            },
            __self: this
          },
          React.createElement(DateTimePicker, {
            id: name,
            error: hasErrors,
            placeholder: attributes.placeholder,
            value: value,
            onChange: this.onChange,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 84
            },
            __self: this
          })
        ),
        hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
            fileName: _jsxFileName,
            lineNumber: 92
          },
          __self: this
        }) : null
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return DateTimeField;
}(React.Component);

DateTimeField.propTypes = {
  actions: PropTypes.object,
  attributes: PropTypes.shape({
    label: PropTypes.string,
    hint: PropTypes.string,
    placeholder: PropTypes.string,
    inline: PropTypes.bool
  }),
  errors: ImmutablePropTypes.list,
  hint: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  config: PropTypes.object,
  value: PropTypes.string
};
DateTimeField.contextTypes = {
  globalConfig: PropTypes.object
};


export default DateTimeField;