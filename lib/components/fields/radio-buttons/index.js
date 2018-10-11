var _jsxFileName = "src/components/fields/radio-buttons/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import uid from "uid";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import RadioButton from "../../ui/radio-button";

// Import styles
import * as styles from "./styles";

/**
 * Radio Buttons field
 */

var RadioButtons = function (_React$Component) {
  _inherits(RadioButtons, _React$Component);

  function RadioButtons(props) {
    _classCallCheck(this, RadioButtons);

    var _this = _possibleConstructorReturn(this, (RadioButtons.__proto__ || Object.getPrototypeOf(RadioButtons)).call(this, props));

    _this.onChange = function (e) {
      var value = e.target.value;
      _this.props.actions.edit(function (val) {
        return value;
      });
    };

    var name = props.name;


    _this.state = {
      groupId: name + "__" + uid(10)
    };
    return _this;
  }

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */


  /**
   * Enable parent to pass context
   */

  _createClass(RadioButtons, [{
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

      // Extract options
      var options = attributes.options;
      // Return nothing if we have no values
      if (options && options.length === 0) {
        return false;
      }

      return React.createElement(
        "div",
        {
          className: fieldClassNames,
          "data-field-name": name,
          "data-field-type": "radio-buttons",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 83
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
          options.map(function (option, i) {
            var optionValue = void 0,
                optionLabel = void 0;
            if (Array.isArray(option)) {
              optionValue = option[0];
              optionLabel = option[1] || optionValue;
            } else {
              optionValue = option;
              optionLabel = option;
            }
            var checked = value != null && optionValue === value;
            return React.createElement(RadioButton, {
              key: i,
              name: _this2.state.groupId,
              label: optionLabel,
              error: hasErrors,
              value: optionValue,
              checked: checked,
              onChange: _this2.onChange,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 103
              },
              __self: _this2
            });
          }),
          hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
              fileName: _jsxFileName,
              lineNumber: 114
            },
            __self: this
          }) : null
        )
      );
    }
  }]);

  return RadioButtons;
}(React.Component);

RadioButtons.propTypes = {
  actions: PropTypes.object,
  name: PropTypes.string,
  namePath: PropTypes.string,
  config: PropTypes.object,
  attributes: PropTypes.shape({
    label: PropTypes.string,
    hint: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired,
    inline: PropTypes.bool
  }),
  hint: PropTypes.string,
  label: PropTypes.string,
  errors: ImmutablePropTypes.list,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
RadioButtons.contextTypes = {
  globalConfig: PropTypes.object
};


export default RadioButtons;