var _jsxFileName = "src/components/fields/select-box/index.js";

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
import Select from "../../ui/select";

// Import styles
import * as styles from "./styles";

/**
 * Select Box field
 */

var SelectBox = function (_React$Component) {
  _inherits(SelectBox, _React$Component);

  function SelectBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectBox.__proto__ || Object.getPrototypeOf(SelectBox)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (e, value) {
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


  _createClass(SelectBox, [{
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

      // Reach into the validation attributes to determine whether the select
      // should be clearable (i.e., it’s not required)
      var clearable = !(attributes.validation && attributes.validation.filled === true);

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
          "data-field-type": "select-box",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 77
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.header, __source: {
              fileName: _jsxFileName,
              lineNumber: 82
            },
            __self: this
          },
          React.createElement(FieldHeader, { id: name, label: label, hint: hint, error: hasErrors, __source: {
              fileName: _jsxFileName,
              lineNumber: 83
            },
            __self: this
          })
        ),
        React.createElement(
          "div",
          { className: styles.display, __source: {
              fileName: _jsxFileName,
              lineNumber: 85
            },
            __self: this
          },
          React.createElement(
            Select,
            {
              "data-field-input": true,
              defaultValue: value != null && value.toString ? value.toString() : value,
              placeholder: attributes.placeholder,
              error: hasErrors,
              onChange: this.onChange,
              clearable: clearable,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 86
              },
              __self: this
            },
            options.map(function (option, i) {
              var value = void 0,
                  label = void 0;
              if (Array.isArray(option)) {
                value = option[0];
                label = option[1] || value;
              } else {
                value = option;
                label = option;
              }
              return React.createElement(
                "option",
                { key: i, value: value, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 106
                  },
                  __self: _this2
                },
                label
              );
            })
          ),
          hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
              fileName: _jsxFileName,
              lineNumber: 112
            },
            __self: this
          }) : null
        )
      );
    }
  }]);

  return SelectBox;
}(React.Component);

SelectBox.propTypes = {
  actions: PropTypes.object,
  name: PropTypes.string,
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
SelectBox.contextTypes = {
  globalConfig: PropTypes.object
};


export default SelectBox;