var _jsxFileName = "src/components/ui/radio-button/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import uid from "uid";
import classNames from "classnames";
import * as styles from "./styles";

/**
 * RadioButton
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

var RadioButton = function (_React$Component) {
  _inherits(RadioButton, _React$Component);

  function RadioButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RadioButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      id: uid(10),
      focus: false
    }, _this.onBlur = function (e) {
      _this.setState({ focus: false });
    }, _this.onFocus = function (e) {
      _this.setState({ focus: true });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RadioButton, [{
    key: "render",
    value: function render() {
      var _classNames,
          _this2 = this;

      var _props = this.props,
          defaultChecked = _props.defaultChecked,
          label = _props.label,
          name = _props.name,
          onChange = _props.onChange,
          value = _props.value;

      var labelClassNames = classNames(styles.label, (_classNames = {}, _defineProperty(_classNames, "" + styles.error, this.props.error), _defineProperty(_classNames, "" + styles.focus, this.state.focus), _classNames));

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return React.createElement(
        "div",
        { className: styles.button, __source: {
            fileName: _jsxFileName,
            lineNumber: 67
          },
          __self: this
        },
        React.createElement(
          "button",
          {
            onClick: function onClick(e) {
              e.preventDefault();
              if (_this2._input) {
                e.stopPropagation();
                onChange({ target: { value: _this2.props.value } });
              }
            },
            onBlur: this.onBlur,
            onFocus: this.onFocus,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 68
            },
            __self: this
          },
          React.createElement("input", {
            ref: function ref(c) {
              _this2._input = c;
            },
            className: styles.input,
            id: this.state.id,
            type: "radio",
            name: name,
            value: value,
            checked: defaultChecked,
            tabIndex: -1,
            onChange: function onChange(e) {},
            __source: {
              fileName: _jsxFileName,
              lineNumber: 79
            },
            __self: this
          }),
          React.createElement(
            "label",
            {
              className: labelClassNames,
              htmlFor: this.state.id,
              tabIndex: -1,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 92
              },
              __self: this
            },
            label
          )
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return RadioButton;
}(React.Component);

RadioButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["xsmall", "small", "normal", "large", "xlarge"]),
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string])
};
RadioButton.defaultProps = {
  disabled: false,
  error: false,
  size: "normal"
};


export default RadioButton;