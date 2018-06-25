import { css } from "emotion";
import { colours, typography } from "../../../styles";

export var list = /*#__PURE__*/css("display:flex;padding-left:0.4em;padding-right:0.4em;");

export var button = /*#__PURE__*/css(colours.greyMidColor, ";display:block;padding:0.8em 0.4em;");

export var buttonActive = /*#__PURE__*/css(colours.primaryColor, ";", typography.sansBold, ";");

export var iconWrapper = /*#__PURE__*/css("display:flex;align-items:center;fill:", colours.values.greyMid, ";height:16px;width:16px;margin-left:auto;margin-right:auto;svg{margin-left:auto;margin-right:auto;}");
export var iconWrapperActive = /*#__PURE__*/css("fill:", colours.values.primary, ";font-weight:normal;");