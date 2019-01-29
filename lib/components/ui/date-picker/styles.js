import uid from "uid";
import { css } from "emotion";
import { colours, typography } from "../styles";

/**
 * Based on the template from
 * https://github.com/gpbl/react-day-picker/blob/master/src/style.css
 */

// Empty placeholder class as emotion won't generate one if we have no styles
export var container = uid(10);

export var wrapper = /*#__PURE__*/css("display:flex;flex-wrap:wrap;justify-content:center;padding:1rem;position:relative;user-select:none;&:focus{outline:none;}");

export var interactionDisabled = /*#__PURE__*/css("cursor:default;");

export var navBar = /*#__PURE__*/css("position:absolute;left:0;right:0;");

var navButton = /*#__PURE__*/css("position:absolute;width:1.5rem;height:1.5rem;background-repeat:no-repeat;background-position:center;background-size:contain;cursor:pointer;");

export var navButtonPrev = /*#__PURE__*/css(navButton, ";left:1rem;background-image:url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2cHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI2IDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjIgKDEyMDQzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5wcmV2PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9InByZXYiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzLjM5MzE5MywgMjUuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xMy4zOTMxOTMsIC0yNS4wMDAwMDApIHRyYW5zbGF0ZSgwLjg5MzE5MywgMC4wMDAwMDApIiBmaWxsPSIjNTY1QTVDIj4KICAgICAgICAgICAgPHBhdGggZD0iTTAsNDkuMTIzNzMzMSBMMCw0NS4zNjc0MzQ1IEwyMC4xMzE4NDU5LDI0LjcyMzA2MTIgTDAsNC4yMzEzODMxNCBMMCwwLjQ3NTA4NDQ1OSBMMjUsMjQuNzIzMDYxMiBMMCw0OS4xMjM3MzMxIEwwLDQ5LjEyMzczMzEgWiIgaWQ9InJpZ2h0IiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K\");");

export var navButtonNext = /*#__PURE__*/css(navButton, ";right:1rem;background-image:url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2cHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI2IDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjIgKDEyMDQzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5uZXh0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Im5leHQiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuOTUxNDUxLCAwLjAwMDAwMCkiIGZpbGw9IiM1NjVBNUMiPgogICAgICAgICAgICA8cGF0aCBkPSJNMCw0OS4xMjM3MzMxIEwwLDQ1LjM2NzQzNDUgTDIwLjEzMTg0NTksMjQuNzIzMDYxMiBMMCw0LjIzMTM4MzE0IEwwLDAuNDc1MDg0NDU5IEwyNSwyNC43MjMwNjEyIEwwLDQ5LjEyMzczMzEgTDAsNDkuMTIzNzMzMSBaIiBpZD0icmlnaHQiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=\");");

export var navButtonInteractionDisabled = /*#__PURE__*/css();

export var months = /*#__PURE__*/css();

export var month = /*#__PURE__*/css("display:table;border-collapse:collapse;border-spacing:0;user-select:none;");

export var caption = /*#__PURE__*/css(typography.sansBold, ";display:table-caption;margin-bottom:0.8rem;text-align:center;");

export var weekdays = /*#__PURE__*/css("display:table-header-group;margin-bottom:0.8rem;");

export var weekdaysRow = /*#__PURE__*/css("display:table-row;font-size:0.85em;");

export var weekday = /*#__PURE__*/css(colours.greyLightColor, ";display:table-cell;padding:0.5rem;text-align:center;");

export var body = /*#__PURE__*/css("display:table-row-group;");

export var week = /*#__PURE__*/css("display:table-row;");

export var day = /*#__PURE__*/css("cursor:pointer;display:table-cell;font-size:0.85em;padding:0.5rem;text-align:center;vertical-align:middle;&:hover,&:focus{text-decoration:underline;}");

export var footer = uid(10);

export var todayButton = uid(10);

// Default modifiers
export var today = /*#__PURE__*/css(colours.highlightColor, ";font-weight:500;");

export var selected = /*#__PURE__*/css(colours.whiteColor, ";", colours.highlightBackground, ";border-radius:2px;");

export var disabled = /*#__PURE__*/css(colours.greyLightColor, ";background-color:transparent;cursor:default;");

export var outside = /*#__PURE__*/css(colours.primaryColor, ";background-color:transparent;");