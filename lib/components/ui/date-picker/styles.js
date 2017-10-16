"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.daypickerContainer = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* Day picker */

var daypickerContainer = /*#__PURE__*/exports.daypickerContainer = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{}];
});

/**
 * Base on the template from https://github.com/gpbl/react-day-picker/blob/master/src/style.css
 */

(0, _emotion.injectGlobal)([], [daypickerContainer, _styles.typography.fonts.weights.sansBold, _styles.colours.values.greyLight, _styles.colours.values.highlight, _styles.colours.values.greyLight, _styles.colours.values.white, _styles.colours.values.highlight], function createEmotionStyledRules(x0, x1, x2, x3, x4, x5, x6) {
  return [_defineProperty({}, "." + x0 + " &", {
    ".DayPicker": {
      "display": "-webkit-box; display: -ms-flexbox; display: flex",
      "msFlexWrap": "wrap",
      "flexWrap": "wrap",
      "WebkitBoxPack": "center",
      "msFlexPack": "center",
      "justifyContent": "center",
      "padding": "1rem",
      "position": "relative",
      "WebkitUserSelect": "none",
      "MozUserSelect": "none",
      "msUserSelect": "none",
      "userSelect": "none"
    },
    ".DayPicker:focus": {
      "outline": "none"
    },
    ".DayPicker-Month": {
      "display": "table",
      "borderCollapse": "collapse",
      "borderSpacing": "0",
      "WebkitUserSelect": "none",
      "MozUserSelect": "none",
      "msUserSelect": "none",
      "userSelect": "none"
    },
    ".DayPicker-NavBar": {
      "position": "absolute",
      "left": "0",
      "right": "0"
    },
    ".DayPicker-NavButton": {
      "position": "absolute",
      "width": "1.5rem",
      "height": "1.5rem",
      "backgroundRepeat": "no-repeat",
      "backgroundPosition": "center",
      "backgroundSize": "contain",
      "cursor": "pointer"
    },
    ".DayPicker-NavButton--prev": {
      "left": "1rem",
      "backgroundImage": "url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2cHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI2IDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjIgKDEyMDQzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5wcmV2PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9InByZXYiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzLjM5MzE5MywgMjUuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xMy4zOTMxOTMsIC0yNS4wMDAwMDApIHRyYW5zbGF0ZSgwLjg5MzE5MywgMC4wMDAwMDApIiBmaWxsPSIjNTY1QTVDIj4KICAgICAgICAgICAgPHBhdGggZD0iTTAsNDkuMTIzNzMzMSBMMCw0NS4zNjc0MzQ1IEwyMC4xMzE4NDU5LDI0LjcyMzA2MTIgTDAsNC4yMzEzODMxNCBMMCwwLjQ3NTA4NDQ1OSBMMjUsMjQuNzIzMDYxMiBMMCw0OS4xMjM3MzMxIEwwLDQ5LjEyMzczMzEgWiIgaWQ9InJpZ2h0IiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K\")"
    },
    ".DayPicker-NavButton--next": {
      "right": "1rem",
      "backgroundImage": "url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2cHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI2IDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjIgKDEyMDQzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5uZXh0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Im5leHQiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuOTUxNDUxLCAwLjAwMDAwMCkiIGZpbGw9IiM1NjVBNUMiPgogICAgICAgICAgICA8cGF0aCBkPSJNMCw0OS4xMjM3MzMxIEwwLDQ1LjM2NzQzNDUgTDIwLjEzMTg0NTksMjQuNzIzMDYxMiBMMCw0LjIzMTM4MzE0IEwwLDAuNDc1MDg0NDU5IEwyNSwyNC43MjMwNjEyIEwwLDQ5LjEyMzczMzEgTDAsNDkuMTIzNzMzMSBaIiBpZD0icmlnaHQiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=\")"
    },
    ".DayPicker-Caption": {
      "display": "table-caption",
      "fontWeight": x1,
      "marginBottom": "0.8rem",
      "textAlign": "center"
    },
    ".DayPicker-Weekdays": {
      "display": "table-header-group",
      "marginBottom": "0.8rem"
    },
    ".DayPicker-WeekdaysRow": {
      "display": "table-row",
      "fontSize": "0.85em"
    },
    ".DayPicker-Weekday": {
      "color": x2,
      "display": "table-cell",
      "padding": ".5rem",
      "textAlign": "center"
    },
    ".DayPicker-Body": {
      "display": "table-row-group"
    },
    ".DayPicker-Week": {
      "display": "table-row"
    },
    ".DayPicker-Day": {
      "cursor": "pointer",
      "display": "table-cell",
      "fontSize": "0.85em",
      "padding": ".5rem",
      "textAlign": "center",
      "verticalAlign": "middle"
    },
    ".DayPicker-Day:hover": {
      "textDecoration": "underline"
    },
    ".DayPicker--interactionDisabled,\n    .DayPicker-Day": {
      "cursor": "default"
    },
    ".DayPicker-Day--today": {
      "color": x3,
      "fontWeight": "500"
    },
    ".DayPicker-Day--disabled": {
      "cursor": "default",
      "color": x4
    },
    ".DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)": {
      "color": x5,
      "backgroundColor": x6,
      "borderRadius": "2px"
    }
  })];
});