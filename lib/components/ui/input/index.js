var _jsxFileName = "src/components/ui/input/index.js";

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
 * Input
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

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
    }, _this.getInput = function () {
      return _this._input;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Public
   */


  _createClass(Input, [{
    key: "render",
    value: function render() {
      var _classNames,
          _this2 = this;

      var inputClassNames = classNames(this.props.className, styles.input, (_classNames = {}, _defineProperty(_classNames, "" + styles.error, this.props.error), _defineProperty(_classNames, "" + styles.focus, this.state.focus), _classNames), "" + styles[this.props.size]);

      var propsToPass = withoutKeys(this.props, ["error", "size", "className", "onBlur", "onChange", "onFocus"]);

      return React.createElement("input", Object.assign({
        ref: function ref(r) {
          _this2._input = r;
        }
      }, propsToPass, {
        onChange: this.onChange,
        className: inputClassNames,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      }));
    }
  }]);

  return Input;
}(React.Component);

Input.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  size: PropTypes.oneOf(["xsmall", "small", "normal", "large", "xlarge"])
};
Input.defaultProps = {
  error: false,
  size: "normal",
  type: "text"
};


export default Input;