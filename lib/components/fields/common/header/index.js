var _jsxFileName = "src/components/fields/common/header/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import shallow from "shallow-equals";
import Label from "../../../ui/label";
import classNames from "classnames";
import * as styles from "./styles";

/**
 * A common header component for every field. Renders the label and an optional
 * hint.
 */

var FieldHeader = function (_React$Component) {
  _inherits(FieldHeader, _React$Component);

  function FieldHeader() {
    _classCallCheck(this, FieldHeader);

    return _possibleConstructorReturn(this, (FieldHeader.__proto__ || Object.getPrototypeOf(FieldHeader)).apply(this, arguments));
  }

  _createClass(FieldHeader, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !shallow(this.props, nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          id = _props.id,
          label = _props.label,
          hint = _props.hint;

      if (!label && !hint) {
        return null;
      }
      var labelClassNames = classNames(styles.base, styles.label, _defineProperty({}, "" + styles.error, this.props.error));
      var hintClassNames = classNames(styles.base, styles.hint, _defineProperty({}, "" + styles.error, this.props.error));
      return React.createElement(
        "div",
        { className: styles.base, "data-field-header": true, __source: {
            fileName: _jsxFileName,
            lineNumber: 36
          },
          __self: this
        },
        label ? React.createElement(
          Label,
          { htmlFor: id, className: labelClassNames, __source: {
              fileName: _jsxFileName,
              lineNumber: 38
            },
            __self: this
          },
          label
        ) : null,
        hint ? React.createElement(
          "span",
          { className: hintClassNames, __source: {
              fileName: _jsxFileName,
              lineNumber: 42
            },
            __self: this
          },
          hint
        ) : null
      );
    }
  }]);

  return FieldHeader;
}(React.Component);

FieldHeader.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  error: PropTypes.bool
};


export default FieldHeader;