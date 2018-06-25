import { css } from "emotion";
import { colours, typography } from "../../../../styles";

export var wrapper = /*#__PURE__*/css("position:relative;");

export var caret = /*#__PURE__*/css("position:absolute;overflow:hidden;width:0;");

export var container = /*#__PURE__*/css(colours.whiteBackground, ";margin-bottom:1.5rem;outline:3px transparent solid;transition-property:outline;transition-duration:100ms;");

export var containerSelected = /*#__PURE__*/css("outline:3px ", colours.values.highlight, " solid;");

export var header = /*#__PURE__*/css(colours.greyTintBorder, ";border-bottom-width:1px;border-bottom-style:solid;align-items:center;display:flex;padding:0.5rem 1.5rem;");
export var label = /*#__PURE__*/css(typography.small, ";", colours.greyMidColor, ";margin-left:0;margin-right:auto;");

export var toolbar = /*#__PURE__*/css("margin-right:0;margin-left:auto;");

export var remove = /*#__PURE__*/css(colours.primaryColor, ";appearance:none;background-color:transparent;border:none;cursor:pointer;transition-property:color;transition-duration:100ms;&:focus,&:hover{color:", colours.values.error, ";}");

export var removeText = /*#__PURE__*/css("display:none;");

export var removeX = /*#__PURE__*/css(typography.fallback, ";", typography.large, ";&:hover{color:", colours.values.error, ";}");

export var content = /*#__PURE__*/css("padding:1rem 1.5rem 0.1rem;");