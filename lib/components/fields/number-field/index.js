var _jsxFileName = "src/components/fields/number-field/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import isNumber from "is-number";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import Input from "../../ui/input";

// Import styles
import * as styles from "./styles";

/**
 * Number field
 */

var NumberField = function (_React$Component) {
  _inherits(NumberField, _React$Component);

  function NumberField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NumberField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NumberField.__proto__ || Object.getPrototypeOf(NumberField)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (e, value) {
      if (isNumber(value)) {
        value = parseFloat(value);
      } else {
        value = null;
      }
      _this.props.actions.edit(function (val) {
        return value;
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Enable parent to pass context
   */

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */


  _createClass(NumberField, [{
    key: "render",
    value: function render() {
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

      // Set up input classes
      var inputClassNames = classNames(_defineProperty({}, "" + styles.code, attributes.code));

      // Configure specific number attributes from the attributes
      var numberProps = {};
      var numberConfig = ["step", "min", "max"];
      numberConfig.forEach(function (option) {
        var value = attributes[option];
        if (value && isNumber(value)) {
          numberProps[option] = value;
        }
      });

      return React.createElement(
        "div",
        { className: fieldClassNames, __source: {
            fileName: _jsxFileName,
            lineNumber: 87
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.header, __source: {
              fileName: _jsxFileName,
              lineNumber: 88
            },
            __self: this
          },
          React.createElement(FieldHeader, { id: name, label: label, hint: hint, error: hasErrors, __source: {
              fileName: _jsxFileName,
              lineNumber: 89
            },
            __self: this
          })
        ),
        React.createElement(
          "div",
          { className: styles.display, __source: {
              fileName: _jsxFileName,
              lineNumber: 91
            },
            __self: this
          },
          React.createElement(Input, Object.assign({
            type: "number",
            id: name,
            error: hasErrors,
            className: inputClassNames,
            placeholder: attributes.placeholder,
            defaultValue: value,
            onChange: this.onChange
          }, numberProps, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 92
            },
            __self: this
          })),
          hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
              fileName: _jsxFileName,
              lineNumber: 102
            },
            __self: this
          }) : null
        )
      );
    }
  }]);

  return NumberField;
}(React.Component);

NumberField.propTypes = {
  actions: PropTypes.object,
  attributes: PropTypes.shape({
    label: PropTypes.string,
    hint: PropTypes.string,
    placeholder: PropTypes.string,
    inline: PropTypes.bool,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
  }),
  name: PropTypes.string,
  config: PropTypes.object,
  value: PropTypes.number,
  hint: PropTypes.string,
  label: PropTypes.string,
  errors: ImmutablePropTypes.list
};
NumberField.contextTypes = {
  globalConfig: PropTypes.object
};


export default NumberField;