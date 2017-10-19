import { css } from "emotion";
import * as fields from "../field-styles";
import { buttons, colours, typography, inputBoxes } from "../../ui/styles";

export var base = /*#__PURE__*/css(fields.base, ";");

export var baseInline = /*#__PURE__*/css(fields.baseInline, ";");

export var header = /*#__PURE__*/css(fields.header, ";");

export var display = /*#__PURE__*/css(inputBoxes.inputBox, ";padding-bottom:0.3em;");

export var displayFocus = /*#__PURE__*/css(inputBoxes.focus, ";");

export var tagList = /*#__PURE__*/css("display:flex;flex-wrap:wrap;");

export var tag = /*#__PURE__*/css(buttons.button, ";", buttons.normal, ";", colours.greyMidBorder, ";", colours.primaryColor, ";", colours.whiteBackground, ";margin-right:0.5em;margin-bottom:0.5em;");

export var popunderWrapper = /*#__PURE__*/css("flex:1;min-width:200px;");

export var popunderContainer = /*#__PURE__*/css();

export var popunderContainerHidden = /*#__PURE__*/css("display:none;");
export var tagInputWrapper = /*#__PURE__*/css("position:relative;");
export var tagInputWrapperNoSearch = /*#__PURE__*/css("flex:1;position:relative;min-width:200px;");

export var tagInput = /*#__PURE__*/css(typography.normal, ";border:none;background:transparent;padding:0.4em 0;margin-left:0.5em;margin-bottom:0.5em;margin-right:0.5em;width:100%;&:focus{outline:none;}");

export var spinner = /*#__PURE__*/css("position:absolute;right:1rem;top:0.9rem;z-index:2;");

export var removeButton = /*#__PURE__*/css("display:inline-block;margin-left:0.4em;&:focus,&:hover{color:", colours.values.error, ";}");