var _jsxFileName = "src/components/compound-field.js",
    _this = this;

import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { css } from "emotion";

var styles = {
  base: /*#__PURE__*/css()
};

var CompoundField = function CompoundField(_ref) {
  var children = _ref.children;

  return React.createElement(
    "div",
    { className: styles.base, __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      },
      __self: _this
    },
    children
  );
};

CompoundField.propTypes = {
  children: ImmutablePropTypes.list
};

export default CompoundField;
export var CompoundFieldFactory = React.createFactory(CompoundField);