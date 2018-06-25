var _jsxFileName = "src/components/ui/rich-text-editor/block-toolbar-plugin/blocks/horizontal-rule.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

var HorizontalRule = function (_React$Component) {
  _inherits(HorizontalRule, _React$Component);

  function HorizontalRule() {
    _classCallCheck(this, HorizontalRule);

    return _possibleConstructorReturn(this, (HorizontalRule.__proto__ || Object.getPrototypeOf(HorizontalRule)).apply(this, arguments));
  }

  _createClass(HorizontalRule, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "rte-block__hr", __source: {
            fileName: _jsxFileName,
            lineNumber: 6
          },
          __self: this
        },
        React.createElement("hr", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 7
          },
          __self: this
        })
      );
    }
  }]);

  return HorizontalRule;
}(React.Component);

export default HorizontalRule;