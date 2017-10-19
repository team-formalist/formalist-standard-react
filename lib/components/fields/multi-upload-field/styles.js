import { css } from "emotion";
import * as fields from "../field-styles";
import { colours, typography } from "../../ui/styles";

export var base = /*#__PURE__*/css(fields.base, ";");

export var baseInline = /*#__PURE__*/css(fields.baseInline, ";");

export var header = /*#__PURE__*/css(fields.header, ";");

export var parent = /*#__PURE__*/css("position:relative;");

export var listItem = /*#__PURE__*/css(colours.greyLightColor, ";", typography.small, ";", typography.sans, ";box-sizing:border-box;position:relative;width:100%;");

export var previewItem = /*#__PURE__*/css(listItem, ";background:greyTint;border-radius:0.25em;overflow:hidden;height:40px;");

export var previewItem__details = /*#__PURE__*/css("padding-left:5px;");

export var listItem__img = /*#__PURE__*/css("img{background-color:#fff;box-shadow:0 2px 2px 0px rgba(0,0,0,0.08);box-sizing:border-box;display:inline-block;height:40px;margin-right:20px;padding:2px;width:auto;position:relative;z-index:2;}.", previewItem, " &{img{height:30px;}}");

export var listItem__title = /*#__PURE__*/css(typography.lineHeightNormal, ";overflow:hidden;white-space:nowrap;line-height:40px;a{color:", colours.values.highlight, ";}");

export var progress__title = /*#__PURE__*/css(listItem__title, ";color:", colours.values.white, ";");

export var progress__bar = /*#__PURE__*/css("compose ", colours.highlightBackground, "\n  bottom:0;left:0;box-sizing:border-box;position:absolute;top:0;transition:width 0.5s ease-in-out;width:0;z-index:1;overflow:hidden;");

export var validationMessage = /*#__PURE__*/css(typography.sans, ";", typography.normal, ";", colours.errorColor, ";", colours.errorLightBackground, ";margin-bottom:5px;padding:8px 50px 8px 8px;position:relative;z-index:1;");

export var remove = /*#__PURE__*/css(colours.primaryColor, ";appearance:none;background-color:transparent;border:none;cursor:pointer;padding:1rem;position:absolute;right:10px;top:50%;transform:translateY(-50%);transition-duration:100ms;transition-property:color;z-index:2;&:focus,&:hover{color:", colours.values.error, ";}");

export var removeText = /*#__PURE__*/css("display:none;");

export var removeX = /*#__PURE__*/css(typography.fallback, ";", typography.large, ";&:hover{color:", colours.values.error, ";}");

export var align_middle = /*#__PURE__*/css("display:table;");

export var align_middle__content = /*#__PURE__*/css("display:table-cell;vertical-align:middle;margin-top:-2px;");