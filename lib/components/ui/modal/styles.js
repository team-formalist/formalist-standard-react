import { css } from "emotion";
import { colours, typography } from "../styles";

export var container = /*#__PURE__*/css("bottom:0;left:0;overflow-scroll:touch;overflow-y:scroll;position:fixed;right:0;top:0;z-index:10000;");

export var close = /*#__PURE__*/css("background-color:transparent;border:none;cursor:pointer;position:fixed;right:0;top:0;z-index:3;");

export var closeText = /*#__PURE__*/css("display:none;");
export var closeX = /*#__PURE__*/css(typography.fallback, ";", typography.large, ";", colours.primaryColor, ";cursor:pointer;padding:1rem;&:hover{color:error;}");

export var overlay = /*#__PURE__*/css(colours.lightBlendBackground, ";border:none;bottom:0;height:100%;left:0;position:fixed;right:0;top:0;width:100%;z-index:1;");

export var content = /*#__PURE__*/css("position:relative;z-index:2;max-width:300px;margin:0 auto;");