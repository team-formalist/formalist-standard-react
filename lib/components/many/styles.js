import { css } from "emotion";
import { buttons, colours, inputBoxes, typography } from "../ui/styles";

export var base = /*#__PURE__*/css("margin-bottom:5rem;");

export var header = /*#__PURE__*/css("display:flex;align-items:center;padding-bottom:1.5rem;");

export var label = /*#__PURE__*/css(typography.headerSmallCaps, ";margin-right:auto;");
export var labelErrors = /*#__PURE__*/css(colours.errorColor, ";");

export var placeholder = /*#__PURE__*/css(inputBoxes.inputBox, ";");

export var placeholderText = /*#__PURE__*/css(colours.greyMidColor, ";display:inline-block;padding-top:0.3rem;padding-bottom:0.4rem;margin-right:0.5rem;");
export var placeholderButton = /*#__PURE__*/css(colours.highlightDarkColor, ";text-decoration:underline;");

export var controls = /*#__PURE__*/css("margin-left:auto;");

export var addButton = /*#__PURE__*/css(buttons.small, ";", buttons.buttonHighlight, ";");

export var set = /*#__PURE__*/css("padding-left:0.6rem;padding-top:1rem;width:100%;");