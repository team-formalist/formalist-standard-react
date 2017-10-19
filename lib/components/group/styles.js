import { css } from "emotion";
import { breakpoints, typography } from "../ui/styles";

export var group = /*#__PURE__*/css();

export var label = /*#__PURE__*/css(typography.headerSmallCaps, ";margin-bottom:1.8rem;");

export var groupItems = /*#__PURE__*/css("display:flex;@media (", breakpoints.small, "){display:block;}");

export var item = /*#__PURE__*/css("flex:1;margin-left:1rem;margin-right:1rem;&:first-child{margin-left:0;}&:last-child{margin-right:0;}@media (", breakpoints.small, "){margin-left:0;margin-right:0;}");