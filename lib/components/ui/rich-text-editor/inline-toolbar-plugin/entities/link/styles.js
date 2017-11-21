import uid from "uid";
import { css } from "emotion";
import { buttons, colours, typography } from "../../../../styles";

export var displayWrapper = /*#__PURE__*/css("display:flex;");

export var handlerUrl = /*#__PURE__*/css(typography.mono, ";", colours.primaryColor, ";max-width:25rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;&:hover{color:", colours.values.error, ";text-decoration:underline;}");

export var field = /*#__PURE__*/css("display:flex;align-items:center;min-width:35rem;margin-bottom:0.5rem;");

export var fieldCheckbox = /*#__PURE__*/css("margin-left:4rem;margin-top:0.5rem;margin-bottom:0.5rem;");

export var label = /*#__PURE__*/css(typography.small, ";text-align:right;padding-right:1rem;width:4rem;");

export var actions = /*#__PURE__*/css("margin-top:0.8rem;margin-bottom:0.5rem;margin-left:4rem;");

export var saveButton = /*#__PURE__*/css(buttons.small, ";", buttons.buttonHighlight, ";");

export var editButton = /*#__PURE__*/css(colours.highlightColor, ";margin-left:1.2rem;margin-right:0.8rem;text-decoration:underline;&:hover,&:focus{color:", colours.values.error, ";}");

export var removeButton = uid(10); // Empty placeholder class

export var removeText = /*#__PURE__*/css("display:none;");

export var removeX = /*#__PURE__*/css(colours.errorColor, ";", typography.fallback, ";", typography.large, ";display:inline-block;line-height:1rem;&:hover{color:", colours.values.primary, ";}");