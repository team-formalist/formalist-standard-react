var _jsxFileName = "src/components/fields/common/errors/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import Immutable from "immutable";
import ImmutablePropTypes from "react-immutable-proptypes";
import * as styles from "./styles";

/**
 * A common component for rendering errors for a field.
 */

var FieldErrors = function (_React$Component) {
  _inherits(FieldErrors, _React$Component);

  function FieldErrors() {
    _classCallCheck(this, FieldErrors);

    return _possibleConstructorReturn(this, (FieldErrors.__proto__ || Object.getPrototypeOf(FieldErrors)).apply(this, arguments));
  }

  _createClass(FieldErrors, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !Immutable.is(this.props.errors, nextProps.errors);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var errors = this.props.errors;

      if (errors.count() === 0) {
        return null;
      }
      return React.createElement(
        "div",
        { className: styles.base, __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          },
          __self: this
        },
        React.createElement(
          "ul",
          { className: styles.list, __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            },
            __self: this
          },
          errors.map(function (error, i) {
            return React.createElement(
              "li",
              { className: styles.item, key: i, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 28
                },
                __self: _this2
              },
              error
            );
          })
        )
      );
    }
  }]);

  return FieldErrors;
}(React.Component);

FieldErrors.propTypes = {
  errors: ImmutablePropTypes.list.isRequired
};


export default FieldErrors;