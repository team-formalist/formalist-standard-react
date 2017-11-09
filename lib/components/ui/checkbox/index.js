var _jsxFileName = "src/components/ui/checkbox/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import uid from "uid";
import classNames from "classnames";
import withoutKeys from "../../../utils/without-keys";
import * as styles from "./styles";

/**
 * Checkbox
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

var Checkbox = function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      id: uid(10),
      focus: false
    }, _this.onBlur = function (e) {
      _this.setState({ focus: false });
    }, _this.onFocus = function (e) {
      _this.setState({ focus: true });
    }, _this.onChange = function (e) {
      _this.props.onChange(e, e.target.checked);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Checkbox, [{
    key: "render",
    value: function render() {
      var _classNames;

      var _props = this.props,
          defaultChecked = _props.defaultChecked,
          label = _props.label,
          value = _props.value;

      var labelClassNames = classNames(styles.label, (_classNames = {}, _defineProperty(_classNames, "" + styles.error, this.props.error), _defineProperty(_classNames, "" + styles.focus, this.state.focus), _classNames));

      var propsToPass = withoutKeys(this.props, ["id", "disabled", "error", "name", "onChange", "size", "value"]);

      return React.createElement(
        "div",
        { className: styles.button, __source: {
            fileName: _jsxFileName,
            lineNumber: 75
          },
          __self: this
        },
        React.createElement("input", Object.assign({}, propsToPass, {
          className: styles.input,
          id: this.state.id,
          type: "checkbox",
          value: value,
          defaultChecked: defaultChecked,
          onBlur: this.onBlur,
          onFocus: this.onFocus,
          onChange: this.onChange,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 76
          },
          __self: this
        })),
        React.createElement(
          "label",
          { className: labelClassNames, htmlFor: this.state.id, __source: {
              fileName: _jsxFileName,
              lineNumber: 87
            },
            __self: this
          },
          label
        )
      );
    }
  }]);

  return Checkbox;
}(React.Component);

Checkbox.propTypes = {
  id: PropTypes.string,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["xsmall", "small", "normal", "large", "xlarge"]),
  value: PropTypes.bool
};
Checkbox.defaultProps = {
  disabled: false,
  error: false,
  size: "normal"
};


export default Checkbox;