var _jsxFileName = "src/components/ui/rich-text-editor/block-toolbar-plugin/blocks/atomic/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import classNames from "classnames";
import template from "../../../../../../";
import React from "react";
import uid from "uid";
import PropTypes from "prop-types";
import { Entity } from "draft-js";
import { events } from "formalist-compose";
import createDataObjectRenderer from "formalist-data-object-renderer";
import * as styles from "./styles";

var dataObjectRenderer = createDataObjectRenderer();
var configuredTemplate = void 0;

var AtomicBlock = function (_React$Component) {
  _inherits(AtomicBlock, _React$Component);

  function AtomicBlock(props) {
    _classCallCheck(this, AtomicBlock);

    // Set a per instance ID for talking to the bus
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
      _this.isSelected = isSelected;
      _this.manuallySetSelectedClass();
    };

    _this.onFocus = function (e) {
      _this.isSelected = false;
      _this.setReadOnly(true);
    };

    _this.onBlur = function (e) {
      _this.setReadOnly(false);
    };

    _this.remove = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var allowUndo = options.allowUndo;

      allowUndo = allowUndo === null ? true : allowUndo;
      var _this$props = _this.props,
          block = _this$props.block,
          blockProps = _this$props.blockProps;

      _this.setReadOnly(false);
      blockProps.remove(block.getKey(), { allowUndo: allowUndo });
    };

    _this.setReadOnly = function (readOnly) {
      var blockProps = _this.props.blockProps;

      blockProps.setReadOnly(readOnly);
    };

    _this.instanceId = uid();

    _this.isSelected = false;
    return _this;
  }

  /**
   * Enable parent to pass context
   */

  _createClass(AtomicBlock, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      var block = this.props.block;
      var fieldBus = this.props.blockProps.fieldBus;
      // Resolve the entity, atomic blocks _must_ have one

      this.entityKey = block.getEntityAt(0);
      // Remove if there's no key
      if (this.entityKey == null) {
        this.remove({ allowUndo: false });
        return;
      }
      this.entity = Entity.get(this.entityKey);
      // Extract the entity
      var entityData = this.entity.getData();
      // If the entity is the wrong _type_, we should remove the block too
      // our editor expects every atomic block to have an attached entity
      // of "formalist" type
      if (this.entity.getType() !== "formalist") {
        this.remove({ allowUndo: false });
        return;
      }

      document.addEventListener("mouseup", this.handleOutsideMouseClick);
      document.addEventListener("touchstart", this.handleOutsideMouseClick);

      // Atomic blocks are passed the original config and an extra _fieldsConfig
      // key so they can pass any configuration down to children
      var globalConfig = Object.assign({}, this.context.globalConfig);
      delete globalConfig["_fieldsConfig"];
      // Memoize the configured template the first time this runs
      // We need to invoke this at execution time so that the circular
      // dependencies are properly resolved.
      configuredTemplate = configuredTemplate || template(null, {
        global: globalConfig,
        fields: this.context.globalConfig._fieldsConfig
      });

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

      // Propagate busy/idle states upward
      this.form.on(events.external.FORM_BUSY, function () {
        fieldBus.emit(events.internal.FIELD_BUSY, _this2.instanceId);
      });
      this.form.on(events.external.FORM_IDLE, function () {
        fieldBus.emit(events.internal.FIELD_IDLE, _this2.instanceId);
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
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.manuallySetSelectedClass();
    }

    /*
     * NOTE: This function *must* manually set the className for the selected for
     * not-quite-known reasons. There appears to be a timing issue in the editor
     * that results in multiple but slightly out of sync changes being called
     * when:
     *
     * - A formalist atomic block is rendered that has a state change in its
     *   component
     * - User presses enter to create a new block
     * - User presses up
     *
     * The problem goes away when the exported editor state isn’t passed back to
     * the formalist AST, which makes it _seem_ like it’s tied to rendering but
     * the `editorState` object doesn’t get re-interpreted and so that seems odd.
     * At a guess, it’s a timing issue releated to setState being async and so
     * when the AST is updated and the component is rerendered it renders twice in
     * the same moment: one with the new state and the with the old state.
     */

  }, {
    key: "manuallySetSelectedClass",
    value: function manuallySetSelectedClass() {
      if (this._blockContainer) {
        this.isSelected ? this._blockContainer.classList.add(styles.containerSelected) : this._blockContainer.classList.remove(styles.containerSelected);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      // Don't render if we have no entity
      if (!this.entity || this.entity.getType() !== "formalist") {
        return null;
      }

      var _entity$getData = this.entity.getData(),
          label = _entity$getData.label;

      var containerClassNames = classNames(styles.container);

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
            lineNumber: 209
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.caret, __source: {
              fileName: _jsxFileName,
              lineNumber: 214
            },
            __self: this
          },
          React.createElement("br", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 215
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
              lineNumber: 217
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: styles.header, __source: {
                fileName: _jsxFileName,
                lineNumber: 227
              },
              __self: this
            },
            React.createElement(
              "h3",
              { className: styles.label, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 228
                },
                __self: this
              },
              label
            ),
            React.createElement(
              "div",
              { className: styles.toolbar, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 229
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
                    lineNumber: 230
                  },
                  __self: this
                },
                React.createElement(
                  "span",
                  { className: styles.removeText, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 238
                    },
                    __self: this
                  },
                  "Remove"
                ),
                React.createElement(
                  "div",
                  { className: styles.removeX, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 239
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
                lineNumber: 243
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
    fieldBus: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
    setReadOnly: PropTypes.func.isRequired
  })
};
AtomicBlock.contextTypes = {
  globalConfig: PropTypes.object
};


export default AtomicBlock;