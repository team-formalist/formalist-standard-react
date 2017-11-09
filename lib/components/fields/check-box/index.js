var _jsxFileName = "src/components/fields/check-box/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import Checkbox from "../../ui/checkbox";

// Import styles
import * as styles from "./styles";

/**
 * Base class for the `check_box`
 *
 */

var CheckBox = function (_React$Component) {
  _inherits(CheckBox, _React$Component);

  function CheckBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CheckBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (e, value) {
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


  _createClass(CheckBox, [{
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

      // Set up the label
      var checkboxLabel = attributes.question_text || label;

      return React.createElement(
        "div",
        {
          className: fieldClassNames,
          "data-field-name": name,
          "data-field-type": "check-box",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 67
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.header, __source: {
              fileName: _jsxFileName,
              lineNumber: 72
            },
            __self: this
          },
          React.createElement(FieldHeader, { id: name, label: label, hint: hint, error: hasErrors, __source: {
              fileName: _jsxFileName,
              lineNumber: 73
            },
            __self: this
          })
        ),
        React.createElement(
          "div",
          { className: styles.display, __source: {
              fileName: _jsxFileName,
              lineNumber: 75
            },
            __self: this
          },
          React.createElement(Checkbox, {
            "data-field-input": true,
            name: name,
            label: checkboxLabel,
            error: hasErrors,
            value: value,
            defaultChecked: value,
            onChange: this.onChange,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 76
            },
            __self: this
          }),
          hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
              fileName: _jsxFileName,
              lineNumber: 85
            },
            __self: this
          }) : null
        )
      );
    }
  }]);

  return CheckBox;
}(React.Component);

CheckBox.propTypes = {
  actions: PropTypes.object,
  name: PropTypes.string,
  config: PropTypes.object,
  attributes: PropTypes.shape({
    label: PropTypes.string,
    hint: PropTypes.string,
    placeholder: PropTypes.string,
    inline: PropTypes.bool
  }),
  hint: PropTypes.string,
  label: PropTypes.string,
  errors: ImmutablePropTypes.list,
  value: PropTypes.bool
};
CheckBox.contextTypes = {
  globalConfig: PropTypes.object
};


export default CheckBox;