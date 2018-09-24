import { css } from "emotion";
import { colours, typography } from "../../styles";

export var base = /*#__PURE__*/css("display:flex;padding:0.7rem 1rem;");

export var left = /*#__PURE__*/css("margin-left:0;margin-right:auto;");

export var right = /*#__PURE__*/css("margin-left:auto;margin-right:0;");

export var prevButton = /*#__PURE__*/css("margin-right:1rem;&:hover{color:", colours.values.error, ";}");

export var nextButton = /*#__PURE__*/css("&:hover{color:", colours.values.error, ";}");

export var buttonText = /*#__PURE__*/css("text-decoration:underline;");

export var buttonArrow = /*#__PURE__*/css(typography.fallback, ";");