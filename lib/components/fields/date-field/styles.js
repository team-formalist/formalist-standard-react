import { css } from "emotion";
import * as fields from "../field-styles";
import { buttons } from "../../ui/styles";

export var base = /*#__PURE__*/css(fields.base, ";");

export var baseInline = /*#__PURE__*/css(fields.baseInline, ";");

export var header = /*#__PURE__*/css(fields.header, ";");

export var nowButton = /*#__PURE__*/css(buttons.small, ";", buttons.buttonHighlight, ";float:right;margin-top:-0.3rem;");

export var display = /*#__PURE__*/css("visibility:inherit;");