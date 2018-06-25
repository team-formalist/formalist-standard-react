import { css } from "emotion";
import { colours, typography } from "../../../styles";

export var container = /*#__PURE__*/css(colours.greyLightBorder, ";border-style:solid;border-right-width:1px;margin-right:-1px;flex:1;");

export var list = /*#__PURE__*/css("padding-top:0.8em;padding-bottom:0.8em;");

export var button = /*#__PURE__*/css(colours.greyMidColor, ";display:block;padding:0.4em 0.8em;text-align:center;");

export var buttonActive = /*#__PURE__*/css(colours.primaryColor, ";", typography.sansBold, ";");

export var iconWrapper = /*#__PURE__*/css("display:flex;align-items:center;fill:", colours.values.greyMid, ";height:16px;width:16px;margin-left:auto;margin-right:auto;svg{margin-left:auto;margin-right:auto;}");
export var iconWrapperActive = /*#__PURE__*/css("fill:", colours.values.primary, ";");