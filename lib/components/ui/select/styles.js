import { css } from "emotion";
import { colours, inputBoxes } from "../styles";

export var label = /*#__PURE__*/css("position:relative;&:after{top:50%;right:1em;border:solid transparent;content:\" \";height:0;width:0;position:absolute;pointer-events:none;border-color:transparent;border-top-color:", colours.values.greyLight, ";border-width:0.3em;margin-left:-0.3em;margin-top:-0.1em;}");

export var labelError = /*#__PURE__*/css("&:after{border-top-color:", colours.values.error, ";}");

export var labelFocus = /*#__PURE__*/css("&:after{border-top-color:", colours.values.highlight, ";}");

export var select = /*#__PURE__*/css(inputBoxes.inputBox, ";appearance:none;");

/* States */

export var error = /*#__PURE__*/css(inputBoxes.error, ";");

export var focus = /*#__PURE__*/css(inputBoxes.focus, ";");

/* Sizes */

export var xsmall = /*#__PURE__*/css(inputBoxes.xsmall, ";");

export var small = /*#__PURE__*/css(inputBoxes.small, ";");

export var normal = /*#__PURE__*/css(inputBoxes.normal, ";");

export var large = /*#__PURE__*/css(inputBoxes.large, ";");

export var xlarge = /*#__PURE__*/css(inputBoxes.xlarge, ";");