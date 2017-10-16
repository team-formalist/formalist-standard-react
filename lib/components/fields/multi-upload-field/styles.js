"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.align_middle__content = exports.align_middle = exports.removeX = exports.removeText = exports.remove = exports.validationMessage = exports.progress__bar = exports.progress__title = exports.listItem__title = exports.listItem__img = exports.previewItem__details = exports.previewItem = exports.listItem = exports.parent = exports.header = exports.baseInline = exports.base = undefined;

var _emotion = require("emotion");

var _fieldStyles = require("../field-styles");

var fields = _interopRequireWildcard(_fieldStyles);

var _styles = require("../../ui/styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var base = /*#__PURE__*/exports.base = (0, _emotion.css)("composes:", fields.base, ";");

var baseInline = /*#__PURE__*/exports.baseInline = (0, _emotion.css)("composes:", fields.baseInline, ";");

var header = /*#__PURE__*/exports.header = (0, _emotion.css)("composes:", fields.header, ";");

var parent = /*#__PURE__*/exports.parent = (0, _emotion.css)("position:relative;");

var listItem = /*#__PURE__*/exports.listItem = (0, _emotion.css)("composes:", _styles.colours.greyLightColor, " ", _styles.typography.small, " ", _styles.typography.sans, ";box-sizing:border-box;position:relative;width:100%;");

var previewItem = /*#__PURE__*/exports.previewItem = (0, _emotion.css)("composes:", listItem, ";background:greyTint;border-radius:0.25em;overflow:hidden;height:40px;");

var previewItem__details = /*#__PURE__*/exports.previewItem__details = (0, _emotion.css)("padding-left:5px;");

var listItem__img = /*#__PURE__*/exports.listItem__img = (0, _emotion.css)("img{background-color:#fff;box-shadow:0 2px 2px 0px rgba(0,0,0,0.08);box-sizing:border-box;display:inline-block;height:40px;margin-right:20px;padding:2px;width:auto;position:relative;z-index:2;}.", previewItem, " &{img{height:30px;}}");

var listItem__title = /*#__PURE__*/exports.listItem__title = (0, _emotion.css)("composes:", _styles.typography.lineHeightNormal, ";overflow:hidden;white-space:nowrap;line-height:40px;a{color:", _styles.colours.values.highlight, ";}");

var progress__title = /*#__PURE__*/exports.progress__title = (0, _emotion.css)("composes:", listItem__title, ";color:", _styles.colours.values.white, ";");

var progress__bar = /*#__PURE__*/exports.progress__bar = (0, _emotion.css)("compose ", _styles.colours.highlightBackground, "\n  bottom:0;left:0;box-sizing:border-box;position:absolute;top:0;transition:width 0.5s ease-in-out;width:0;z-index:1;overflow:hidden;");

var validationMessage = /*#__PURE__*/exports.validationMessage = (0, _emotion.css)("composes:", _styles.typography.sans, " ", _styles.typography.normal, " ", _styles.colours.errorColor, " ", _styles.colours.errorLightBackground, ";margin-bottom:5px;padding:8px 50px 8px 8px;position:relative;z-index:1;");

var remove = /*#__PURE__*/exports.remove = (0, _emotion.css)("composes:", _styles.colours.primaryColor, ";appearance:none;background-color:transparent;border:none;cursor:pointer;padding:1rem;position:absolute;right:10px;top:50%;transform:translateY(-50%);transition-duration:100ms;transition-property:color;z-index:2;&:focus,&:hover{color:", _styles.colours.values.error, ";}");

var removeText = /*#__PURE__*/exports.removeText = (0, _emotion.css)("display:none;");

var removeX = /*#__PURE__*/exports.removeX = (0, _emotion.css)("composes:", _styles.typography.fallback, " ", _styles.typography.large, ";&:hover{color:", _styles.colours.values.error, ";}");

var align_middle = /*#__PURE__*/exports.align_middle = (0, _emotion.css)("display:table;");

var align_middle__content = /*#__PURE__*/exports.align_middle__content = (0, _emotion.css)("display:table-cell;vertical-align:middle;margin-top:-2px;");