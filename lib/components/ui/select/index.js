var _jsxFileName = "src/components/ui/select/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withoutKeys from "../../../utils/without-keys";
import * as styles from "./styles";

/**
 * Select
 *
 * States:
 * - focus
 * - error
 *
 * Sizes:
 * - small
 * - normal*
 * - large
 *
 */

var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Select);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focus: false
    }, _this.onFocus = function (e) {
      _this.setState({ focus: true });
      if (_this.props.onFocus) {
        _this.props.onFocus(e);
      }
    }, _this.onBlur = function (e) {
      _this.setState({ focus: false });
      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }
    }, _this.onChange = function (e) {
      _this.props.onChange(e, e.target.value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Select, [{
    key: "render",
    value: function render() {
      var _classNames, _classNames2;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          clearable = _props.clearable,
          defaultValue = _props.defaultValue,
          error = _props.error,
          placeholder = _props.placeholder,
          size = _props.size;
      var focus = this.state.focus;


      var labelClassNames = classNames(styles.label, (_classNames = {}, _defineProperty(_classNames, "" + styles.labelError, error), _defineProperty(_classNames, "" + styles.labelFocus, focus), _classNames));
      var inputClassNames = classNames(className, styles.select, (_classNames2 = {}, _defineProperty(_classNames2, "" + styles.error, error), _defineProperty(_classNames2, "" + styles.focus, focus), _classNames2), "" + styles[size]);

      // Generate a placeholder with a fake value seed to trick our <select>
      // into appearing to show it correctly
      var placeholderOption = React.createElement(
        "option",
        { value: "", hidden: !clearable, disabled: !clearable, __source: {
            fileName: _jsxFileName,
            lineNumber: 93
          },
          __self: this
        },
        placeholder
      );

      // Extract any other props
      var id = this.props.id;

      var propsToPass = withoutKeys(this.props, ["children", "className", "error", "clearable", "onFocus", "onBlur", "onChange", "placeholder", "size"]);

      return React.createElement(
        "label",
        { className: labelClassNames, __source: {
            fileName: _jsxFileName,
            lineNumber: 113
          },
          __self: this
        },
        React.createElement(
          "select",
          Object.assign({}, propsToPass, {
            defaultValue: defaultValue || "",
            className: inputClassNames,
            onBlur: this.onBlur,
            onFocus: this.onFocus,
            onChange: this.onChange,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 114
            },
            __self: this
          }),
          placeholderOption,
          children
        )
      );
    }
  }]);

  return Select;
}(React.Component);

Select.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  error: PropTypes.bool,
  defaultValue: PropTypes.string,
  id: PropTypes.string,
  clearable: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["xsmall", "small", "normal", "large", "xlarge"])
};
Select.defaultProps = {
  clearable: true,
  error: false,
  placeholder: "Select an option",
  size: "normal"
};


export default Select;