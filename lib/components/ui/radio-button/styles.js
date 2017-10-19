import { css } from "emotion";
import { colours, inputBoxes, typography } from "../styles";

export var button = /*#__PURE__*/css(typography.lineHeightNormal, ";margin-bottom:0.2em;");

export var label = /*#__PURE__*/css(typography.sans, ";", typography.normal, ";cursor:pointer;margin-left:0.5em;padding-bottom:0.2em;");

export var input = /*#__PURE__*/css("cursor:pointer;position:relative;top:-0.1em;");

/* States */

export var error = /*#__PURE__*/css(colours.errorColor, ";");

export var focus = /*#__PURE__*/css("border-bottom:1px solid ", colours.values.highlight, ";");

/* Sizes */

export var xsmall = /*#__PURE__*/css(inputBoxes.xsmall, ";");

export var small = /*#__PURE__*/css(inputBoxes.small, ";");

export var normal = /*#__PURE__*/css(inputBoxes.normal, ";");

export var large = /*#__PURE__*/css(inputBoxes.large, ";");

export var xlarge = /*#__PURE__*/css(inputBoxes.xlarge, ";");