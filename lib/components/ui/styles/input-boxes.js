import { css } from "emotion";
import * as colours from "./colours";
import * as typography from "./typography";

export var inputBox = /*#__PURE__*/css(typography.sans, ";", typography.normal, ";", colours.primaryColor, ";", colours.greyLightBorder, ";", colours.greyTintBackground, ";box-shadow:inset 0px 2px 0px 0px rgba(20,15,10,0.03);border-width:0;border-top-width:1px;border-top-style:solid;border-radius:0;box-sizing:border-box;padding:0.6em 0.7em 0.8em;width:100%;transition-property:border-color,background-color;transition-duration:100ms;");

/* States */

export var error = /*#__PURE__*/css(colours.errorColor, ";", colours.errorBorder, ";", colours.errorLightBackground, ";&::placeholder{color:rgba(0,0,0,0.2);}");

export var focus = /*#__PURE__*/css(colours.darkBlendColor, ";", colours.highlightBorder, ";", colours.highlightLightBackground, ";outline:none;&::placeholder{color:", colours.values.lightBlend, ";}");

/* Sizes */

export var xsmall = /*#__PURE__*/css(typography.xsmall, ";");

export var small = /*#__PURE__*/css(typography.small, ";");

export var normal = /*#__PURE__*/css(typography.normal, ";");

export var large = /*#__PURE__*/css(typography.large, ";");

export var xlarge = /*#__PURE__*/css(typography.xlarge, ";");