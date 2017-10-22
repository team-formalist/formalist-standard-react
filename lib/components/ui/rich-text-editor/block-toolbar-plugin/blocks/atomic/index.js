var _jsxFileName = "src/components/ui/rich-text-editor/block-toolbar-plugin/blocks/atomic/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import classNames from "classnames";
import template from "../../../../../../";
import React from "react";
import PropTypes from "prop-types";
import { Entity } from "draft-js";
import createDataObjectRenderer from "formalist-data-object-renderer";
import * as styles from "./styles";

var dataObjectRenderer = createDataObjectRenderer();
var configuredTemplate = void 0;

var AtomicBlock = function (_React$Component) {
  _inherits(AtomicBlock, _React$Component);

  function AtomicBlock(props) {
    _classCallCheck(this, AtomicBlock);

    var _this = _possibleConstructorReturn(this, (AtomicBlock.__proto__ || Object.getPrototypeOf(AtomicBlock)).call(this, props));

    _this.onEditorChange = function (editorState) {
      _this.checkEditorSelection(editorState);
    };

    _this.onEditorFocus = function (editorState) {
      _this.checkEditorSelection(editorState);
    };

    _this.checkEditorSelection = function (editorState) {
      var editorEmitter = _this.props.blockProps.editorEmitter;

      var selection = editorState.getSelection();
      var isSelected = false;
      // Is a collapsed selection at the start?
      if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
        var block = _this.props.block;

        var blockKey = block.getKey();
        var selectedBlockKey = selection.getFocusKey();
        if (blockKey === selectedBlockKey) {
          isSelected = true;
          editorEmitter.emit("atomic:selected", blockKey);
        }
      }
      _this.setState({
        isSelected: isSelected
      });
    };

    _this.onFocus = function (e) {
      _this.setState({
        isSelected: false
      });
      _this.setReadOnly(true);
    };

    _this.onBlur = function (e) {
      _this.setReadOnly(false);
    };

    _this.remove = function () {
      var _this$props = _this.props,
          block = _this$props.block,
          blockProps = _this$props.blockProps;

      _this.setReadOnly(false);
      blockProps.remove(block.getKey());
    };

    _this.setReadOnly = function (readOnly) {
      var blockProps = _this.props.blockProps;

      blockProps.setReadOnly(readOnly);
    };

    _this.entityKey = props.block.getEntityAt(0);
    _this.entity = Entity.get(_this.entityKey);

    _this.state = {
      isSelected: false
    };
    return _this;
  }

  /**
   * Enable parent to pass context
   */

  _createClass(AtomicBlock, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      document.addEventListener("mouseup", this.handleOutsideMouseClick);
      document.addEventListener("touchstart", this.handleOutsideMouseClick);

      // Memoize the configured template the first time this runs
      // We need to invoke this at execution time so that the circular
      // dependencies are properly resolved.
      configuredTemplate = configuredTemplate || template(null, { global: this.context.globalConfig });

      // Extract the entity
      var entityData = this.entity.getData();

      // Create the formalist form with config
      this.form = configuredTemplate(entityData.form);

      this.form.on("change", function (getState) {
        var formTemplate = getState();
        Entity.replaceData(_this2.entityKey, {
          name: entityData.name,
          label: entityData.label,
          form: formTemplate,
          data: dataObjectRenderer(formTemplate)
        });
        // Let the RTE parent component know that the entity data has changed
        editorEmitter.emit("atomic:change");
        _this2.forceUpdate();
      });

      // Subscribe to the editorEmitter’s onChange event
      var editorEmitter = this.props.blockProps.editorEmitter;

      editorEmitter.on("change", this.onEditorChange);
      editorEmitter.on("focus", this.checkEditorSelection);
      editorEmitter.on("blur", this.checkEditorSelection);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var editorEmitter = this.props.blockProps.editorEmitter;

      editorEmitter.off("change", this.onEditorChange);
      editorEmitter.off("focus", this.checkEditorSelection);
      editorEmitter.off("blur", this.checkEditorSelection);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var isSelected = this.state.isSelected;

      var _entity$getData = this.entity.getData(),
          label = _entity$getData.label;

      var containerClassNames = classNames(styles.container, _defineProperty({}, "" + styles.containerSelected, isSelected));

      // TODO Assess whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return React.createElement(
        "div",
        {
          "data-atomic": true,
          className: styles.wrapper,
          "data-debug-block-key": this.props.block.getKey(),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 144
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.caret, __source: {
              fileName: _jsxFileName,
              lineNumber: 149
            },
            __self: this
          },
          React.createElement("br", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 150
            },
            __self: this
          })
        ),
        React.createElement(
          "div",
          {
            ref: function ref(r) {
              _this3._blockContainer = r;
            },
            className: containerClassNames,
            onClick: this.onFocus,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            contentEditable: false,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 152
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: styles.header, __source: {
                fileName: _jsxFileName,
                lineNumber: 162
              },
              __self: this
            },
            React.createElement(
              "h3",
              { className: styles.label, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 163
                },
                __self: this
              },
              label
            ),
            React.createElement(
              "div",
              { className: styles.toolbar, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 164
                },
                __self: this
              },
              React.createElement(
                "button",
                {
                  className: styles.remove,
                  onClick: function onClick(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    _this3.remove();
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 165
                  },
                  __self: this
                },
                React.createElement(
                  "span",
                  { className: styles.removeText, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 173
                    },
                    __self: this
                  },
                  "Remove"
                ),
                React.createElement(
                  "div",
                  { className: styles.removeX, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 174
                    },
                    __self: this
                  },
                  "\xD7"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: styles.content, __source: {
                fileName: _jsxFileName,
                lineNumber: 178
              },
              __self: this
            },
            this.form.render()
          )
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return AtomicBlock;
}(React.Component);

AtomicBlock.propTypes = {
  block: PropTypes.object.isRequired,
  blockProps: PropTypes.shape({
    editorEmitter: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
    setReadOnly: PropTypes.func.isRequired
  })
};
AtomicBlock.contextTypes = {
  globalConfig: PropTypes.object
};


export default AtomicBlock;