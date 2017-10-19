var _jsxFileName = "src/components/ui/rich-text-editor/block-toolbar-plugin/blocks/pull-quote.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import { EditorBlock } from "draft-js";

var PullquoteBlock = function (_React$Component) {
  _inherits(PullquoteBlock, _React$Component);

  function PullquoteBlock() {
    _classCallCheck(this, PullquoteBlock);

    return _possibleConstructorReturn(this, (PullquoteBlock.__proto__ || Object.getPrototypeOf(PullquoteBlock)).apply(this, arguments));
  }

  _createClass(PullquoteBlock, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "rte-block__pullquote", __source: {
            fileName: _jsxFileName,
            lineNumber: 7
          },
          __self: this
        },
        React.createElement(EditorBlock, Object.assign({}, this.props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 8
          },
          __self: this
        }))
      );
    }
  }]);

  return PullquoteBlock;
}(React.Component);

export default PullquoteBlock;