import { css } from "emotion";
import { colours, typography } from "../../ui/styles";

export var optionButton = /*#__PURE__*/css(typography.small, ";", typography.sans, ";", colours.greyTintBorder, ";", colours.whiteBackground, ";border-width:0;border-bottom-width:1px;border-style:solid;cursor:pointer;display:block;padding:0.7rem 1rem;text-align:left;width:100%;&:focus{outline:none;}");
export var optionButtonFocus = /*#__PURE__*/css("text-decoration:underline;");