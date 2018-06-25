import { css } from "emotion";
import { colours, typography } from "../../../ui/styles";

export var base = /*#__PURE__*/css("margin-bottom:1rem;");

export var label = /*#__PURE__*/css("cursor:pointer;margin-right:1rem;");

export var hint = /*#__PURE__*/css(colours.greyLightColor, ";", typography.small, ";", typography.sans, ";");

export var error = /*#__PURE__*/css(colours.errorColor, ";");