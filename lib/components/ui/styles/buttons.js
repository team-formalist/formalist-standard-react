import { css } from "emotion";
import * as colours from "./colours";
import * as typography from "./typography";

export var button = /*#__PURE__*/css(typography.sans, ";appearance:none;cursor:pointer;");

export var buttonSecondary = /*#__PURE__*/css(button, ";", colours.highlightLightBackground, ";", colours.highlightColor, ";&:hover{background-color:", colours.error, ";color:", colours.white, ";}");

export var buttonHighlight = /*#__PURE__*/css(button, ";", colours.whiteColor, ";", colours.highlightBackground, ";&:hover{background-color:", colours.error, ";}");

export var xsmall = /*#__PURE__*/css(typography.xsmall, ";border-radius:0.2rem;padding:0.2em 0.4em 0.3em;");

export var small = /*#__PURE__*/css(typography.small, ";border-radius:0.3rem;padding:0.4em 0.6em 0.5em;");

export var normal = /*#__PURE__*/css(typography.normal, ";border-radius:0.3rem;padding:0.4em 0.8em 0.7em;");

export var large = /*#__PURE__*/css("border-radius:0.4rem;padding:0.8em 1em;");

export var xlarge = /*#__PURE__*/css("border-radius:0.5rem;padding:1em 1.2em;");