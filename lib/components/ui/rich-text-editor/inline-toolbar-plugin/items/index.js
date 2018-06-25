var _jsxFileName = "src/components/ui/rich-text-editor/inline-toolbar-plugin/items/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { EditorState, Entity, RichUtils } from "draft-js";
import { getSelectedEntityTypes } from "../../utils";
import * as styles from "./styles";

var InlineToolbarItems = function (_Component) {
  _inherits(InlineToolbarItems, _Component);

  function InlineToolbarItems(props) {
    _classCallCheck(this, InlineToolbarItems);

    // Bindings
    var _this = _possibleConstructorReturn(this, (InlineToolbarItems.__proto__ || Object.getPrototypeOf(InlineToolbarItems)).call(this, props));

    _this.toggleFormat = _this.toggleFormat.bind(_this);
    _this.toggleEntity = _this.toggleEntity.bind(_this);
    _this.renderFormatters = _this.renderFormatters.bind(_this);
    _this.renderEntities = _this.renderEntities.bind(_this);
    return _this;
  }

  _createClass(InlineToolbarItems, [{
    key: "toggleFormat",
    value: function toggleFormat(style) {
      var _props = this.props,
          editorState = _props.editorState,
          onChange = _props.onChange;

      onChange(RichUtils.toggleInlineStyle(editorState, style));
    }
  }, {
    key: "toggleEntity",
    value: function toggleEntity(entity, active) {
      var _props2 = this.props,
          editorState = _props2.editorState,
          onChange = _props2.onChange;

      if (active) {
        var selection = editorState.getSelection();
        onChange(RichUtils.toggleLink(editorState, selection, null));
      } else {
        var entityKey = Entity.create(entity.type, entity.mutability, entity.defaultData);
        var newState = RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
        newState = EditorState.forceSelection(newState, editorState.getSelection());
        onChange(newState);
      }
    }
  }, {
    key: "renderFormatters",
    value: function renderFormatters(formatters) {
      var _this2 = this;

      var editorState = this.props.editorState;

      var currentStyle = editorState.getCurrentInlineStyle();

      return formatters.map(function (formatter) {
        var active = currentStyle.has(formatter.style);
        var buttonClassNames = classNames(styles.button, _defineProperty({}, "" + styles.buttonActive, active));
        var iconWrapperClassNames = classNames(styles.iconWrapper, _defineProperty({}, "" + styles.iconWrapperActive, active));
        // TODO Asses whether to remove this binding
        /* eslint-disable react/jsx-no-bind */
        return React.createElement(
          "button",
          {
            key: formatter.label,
            className: buttonClassNames,
            onClick: function onClick(e) {
              e.preventDefault();
              _this2.toggleFormat(formatter.style);
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 62
            },
            __self: _this2
          },
          formatter.icon ? React.createElement("span", {
            title: formatter.label,
            className: iconWrapperClassNames,
            dangerouslySetInnerHTML: { __html: formatter.icon },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 71
            },
            __self: _this2
          }) : formatter.label
        );
        /* eslint-enable react/jsx-no-bind */
      });
    }
  }, {
    key: "renderEntities",
    value: function renderEntities(entities) {
      var _this3 = this;

      var editorState = this.props.editorState;

      var selectedEntityTypes = getSelectedEntityTypes(editorState);
      return entities.map(function (entity) {
        var active = selectedEntityTypes ? selectedEntityTypes.includes(entity.type) : false;
        var buttonClassNames = classNames(styles.button, _defineProperty({}, "" + styles.buttonActive, active));
        var iconWrapperClassNames = classNames(styles.iconWrapper, _defineProperty({}, "" + styles.iconWrapperActive, active));
        // TODO Asses whether to remove this binding
        /* eslint-disable react/jsx-no-bind */
        return React.createElement(
          "button",
          {
            key: entity.label,
            className: buttonClassNames,
            onClick: function onClick(e) {
              e.preventDefault();
              _this3.toggleEntity(entity, active);
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 101
            },
            __self: _this3
          },
          entity.icon ? React.createElement("span", {
            title: entity.label,
            className: iconWrapperClassNames,
            dangerouslySetInnerHTML: { __html: entity.icon },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 110
            },
            __self: _this3
          }) : entity.label
        );
        /* eslint-enable react/jsx-no-bind */
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          formatters = _props3.formatters,
          entities = _props3.entities;

      return React.createElement(
        "div",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 127
          },
          __self: this
        },
        React.createElement(
          "ul",
          { className: styles.list, __source: {
              fileName: _jsxFileName,
              lineNumber: 128
            },
            __self: this
          },
          this.renderFormatters(formatters),
          this.renderEntities(entities)
        )
      );
    }
  }]);

  return InlineToolbarItems;
}(Component);

InlineToolbarItems.defaultPprops = {
  entities: [],
  formatters: []
};

InlineToolbarItems.propTypes = {
  editorState: PropTypes.object.isRequired,
  entities: PropTypes.array,
  formatters: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default InlineToolbarItems;