var _jsxFileName = "src/components/attr.js",
    _this = this;

import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { css } from "emotion";

var styles = {
  base: /*#__PURE__*/css("visibility:inherit;")
};

var Attr = function Attr(_ref) {
  var children = _ref.children;

  return React.createElement(
    "div",
    { className: styles.base, "data-attr": true, __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: _this
    },
    children
  );
};

Attr.propTypes = {
  children: ImmutablePropTypes.list
};

export default Attr;
export var AttrFactory = React.createFactory(Attr);