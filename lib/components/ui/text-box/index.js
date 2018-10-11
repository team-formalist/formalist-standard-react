var _jsxFileName = "src/components/ui/text-box/index.js";

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

// Components
import Textarea from "react-textarea-autosize";

/**
 * Return a set of rows as per http://andreypopp.github.io/react-textarea-autosize/
 * based on the boxSize
 * @param  {String} size
 * @return {Object} An object describing the various row properties per-size.
 */
function boxSize(size) {
  var rows = {
    single: {
      rows: 1,
      maxRows: 1
    },
    small: {
      minRows: 3,
      maxRows: 6
    },
    normal: {
      minRows: 5,
      maxRows: 10
    },
    large: {
      minRows: 8,
      maxRows: 16
    },
    xlarge: {
      minRows: 12
    }
  };
  return size ? rows[size] : rows["normal"];
}

/**
 * TextBox
 */

var TextBox = function (_React$Component) {
  _inherits(TextBox, _React$Component);

  function TextBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextBox.__proto__ || Object.getPrototypeOf(TextBox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextBox, [{
    key: "render",
    value: function render() {
      var _classNames;

      var textBoxClassNames = classNames(this.props.className, styles.textBox, (_classNames = {}, _defineProperty(_classNames, "" + styles.error, this.props.error), _defineProperty(_classNames, "" + styles.focus, this.state.focus), _classNames), "" + styles[this.props.textSize]);

      var propsToPass = withoutKeys(this.props, ["error", "textSize", "boxSize", "className", "onBlur", "onFocus", "value"]);

      var value = this.props.value || "";

      return React.createElement(Textarea, Object.assign({}, propsToPass, boxSize(this.props.boxSize), {
        className: textBoxClassNames,
        value: value,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }));
    }
  }]);

  return TextBox;
}(React.Component);

TextBox.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  textSize: PropTypes.oneOf(["xsmall", "small", "normal", "large", "xlarge"]),
  boxSize: PropTypes.oneOf(["single", "small", "normal", "large", "xlarge"])
};
TextBox.defaultProps = {
  error: false,
  textSize: "normal",
  boxSize: "normal"
};


export default TextBox;