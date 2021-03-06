import uid from "uid";
import { css } from "emotion";
import * as fields from "../field-styles";
import { typography } from "../../ui/styles";

export var base = /*#__PURE__*/css(fields.base, ";");

export var baseInline = /*#__PURE__*/css(fields.baseInline, ";");

export var header = /*#__PURE__*/css(fields.header, ";");

export var display = uid(10); // Empty placeholder class

export var code = /*#__PURE__*/css(typography.mono, ";");