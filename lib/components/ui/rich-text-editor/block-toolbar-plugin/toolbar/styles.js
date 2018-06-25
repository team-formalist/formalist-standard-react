import { css } from "emotion";
import { colours } from "../../../styles";

export var positioner = /*#__PURE__*/css("left:50%;position:absolute;transform:translate(-50%,0);top:1.1rem;transition-property:top;transition-duration:50ms;width:0;");

export var iconWrapper = /*#__PURE__*/css("align-items:center;display:flex;fill:", colours.values.greyMid, ";height:16px;width:16px;margin-left:auto;margin-right:auto;svg{margin-left:auto;margin-right:auto;}");

export var toggle = /*#__PURE__*/css(colours.greyMidColor, ";padding:1rem 1.4rem 1rem 0.9rem;position:relative;transform:translate(-50%,0);&:hover,&:hover:after{color:", colours.values.highlight, ";border-top-color:", colours.values.highlight, ";}&:after{top:50%;right:0.3rem;border:solid transparent;content:\" \";height:0;width:0;position:absolute;pointer-events:none;border-color:transparent;border-top-color:", colours.values.greyLight, ";border-width:0.3em;margin-left:-0.3em;margin-top:-0.1em;}");

export var toggleText = /*#__PURE__*/css("display:none;");

export var buttonsWrapper = /*#__PURE__*/css("display:flex;");