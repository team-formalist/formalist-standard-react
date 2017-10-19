import { css } from "emotion";
import { breakpoints } from "../styles";

export var base = /*#__PURE__*/css("display:flex;@media (", breakpoints.small, "){display:block;}");

export var datePicker = /*#__PURE__*/css("flex:1;margin-right:1rem;@media (", breakpoints.small, "){margin-left:0;margin-right:0;margin-bottom:1rem;}");

export var timePicker = /*#__PURE__*/css("flex:1;margin-left:1rem;@media (", breakpoints.small, "){margin-left:0;margin-right:0;}");