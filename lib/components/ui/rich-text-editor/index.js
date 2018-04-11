var _jsxFileName = "src/components/ui/rich-text-editor/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import PluginsEditor from "draft-js-plugins-editor";
import Emitter from "component-emitter";
import { belongsToAtomicBlock } from "./utils";
import capitalize from "../../../utils/capitalize";

// Plugins
import createAutoListPlugin from "draft-js-autolist-plugin";
import createBlockBreakoutPlugin from "draft-js-block-breakout-plugin";
import createSingleLinePlugin from "draft-js-single-line-plugin";
import createBlockToolbarPlugin from "./block-toolbar-plugin";
import createInlineToolbarPlugin from "./inline-toolbar-plugin";
import createSoftNewlinesKeyboardPlugin from "./soft-newlines-keyboard-plugin";
// Styles
import * as styles from "./styles";
import "./tmp.css";

/**
 * Rich Text Editor
 */

var RichTextEditor = function (_React$Component) {
  _inherits(RichTextEditor, _React$Component);

  function RichTextEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RichTextEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RichTextEditor.__proto__ || Object.getPrototypeOf(RichTextEditor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      someProp: Date.now(),
      hasFocus: false
    }, _this.configurePlugins = function () {
      var _this$props = _this.props,
          blockFormatters = _this$props.blockFormatters,
          boxSize = _this$props.boxSize,
          config = _this$props.config,
          embeddableForms = _this$props.embeddableForms,
          fieldBus = _this$props.fieldBus,
          inlineFormatters = _this$props.inlineFormatters;

      // Extract config for each type of toolbar

      var block = config.block,
          inline = config.inline;


      var autoListPlugin = createAutoListPlugin();
      var singleLinePlugin = createSingleLinePlugin();

      // Configure the blockToolbarPlugin
      // Pass through any
      _this.blockToolbarPlugin = createBlockToolbarPlugin(Object.assign({
        setReadOnly: _this.setReadOnly,
        editorEmitter: _this.emitter,
        blockFormatters: blockFormatters,
        embeddableForms: embeddableForms,
        fieldBus: fieldBus
      }, block));
      var inlineToolbarPlugin = createInlineToolbarPlugin(Object.assign({
        allowedFormatters: inlineFormatters
      }, inline));
      // Build up the list of plugins
      var plugins = [inlineToolbarPlugin, createBlockBreakoutPlugin(), createSoftNewlinesKeyboardPlugin()];
      // Add singleLine plugin if the boxSize matches
      if (boxSize === "single") {
        plugins = plugins.concat([singleLinePlugin]);
      } else {
        plugins = plugins.concat([autoListPlugin, _this.blockToolbarPlugin]);
      }
      // Extract the toolbar component for use in rendering
      _this.BlockToolbar = _this.blockToolbarPlugin.BlockToolbar;
      _this.blockRenderMap = _this.blockToolbarPlugin.blockRenderMap;
      _this.InlineToolbar = inlineToolbarPlugin.InlineToolbar;
      return plugins;
    }, _this.onFocus = function (e) {
      var editorState = _this.props.editorState;

      _this.emitter.emit("focus", editorState);
      _this.setState({ hasFocus: true });
    }, _this.onBlur = function (e) {
      var editorState = _this.props.editorState;

      _this.emitter.emit("blur", editorState);
      _this.setState({ hasFocus: false });
    }, _this.setReadOnly = function (readOnly) {
      _this.setState({ readOnly: readOnly });
    }, _this.onContentClick = function (e) {
      var atomic = belongsToAtomicBlock(e.target);
      if (!atomic && _this.state.readOnly === true) {
        _this.setReadOnly(false);
      }
      if (e.target === _this.contentEl) {
        _this._editor.focus();
      }
    }, _this.onChange = function (editorState) {
      var onChange = _this.props.onChange;

      _this.emitter.emit("change", editorState);
      onChange(editorState);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RichTextEditor, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      // Create a per-instance event emitter to pass through to the atomic blocks
      // so that we can subscribe to `onChange` events in the editor proper
      // This is not really great, but there’s no way for this to get
      // passed down through props atm
      this.emitter = new Emitter();
      // Atomic blocks trigger an `atomic:change` event when they update their
      // embedded entity data. We have to listen to it and trigger an `onChange`
      // of the current data to get things to propagate around _immediately_.
      this.emitter.on("atomic:change", function () {
        var editorState = _this2.props.editorState;

        _this2.onChange(editorState);
      });

      var plugins = this.configurePlugins();
      this.setState({
        plugins: plugins
      });
    }

    /**
     * Handle the configuration of the various plugins we allow to pass in
     * @return {Array} List of draft-js-plugins compatible plugins
     */


    /**
     * Set the editor to read-only (or not)
     * @param {Boolean} readOnly
     */


    /**
     * Focus the editor when the `contentEl` is clicked
     * @param  {MouseEvent} e
     */


    /**
     * onChange
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          boxSize = _props.boxSize,
          blockFormatters = _props.blockFormatters,
          editorState = _props.editorState,
          placeholder = _props.placeholder,
          webDriverTestID = _props.webDriverTestID;
      var _state = this.state,
          hasFocus = _state.hasFocus,
          readOnly = _state.readOnly;
      var BlockToolbar = this.BlockToolbar,
          InlineToolbar = this.InlineToolbar;


      var placeholderBlockType = false;
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        placeholderBlockType = contentState.getBlockMap().first().getType();
      }

      // Set up content wrapper classes
      var contentClassNames = classNames(styles.content, _defineProperty({}, "" + styles["contentPlaceholder" + capitalize(placeholderBlockType)], placeholderBlockType && styles["contentPlaceholder" + capitalize(placeholderBlockType)]));

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return React.createElement(
        "div",
        { className: styles.base, __source: {
            fileName: _jsxFileName,
            lineNumber: 192
          },
          __self: this
        },
        boxSize !== "single" ? React.createElement(
          "div",
          { className: styles.gutter, __source: {
              fileName: _jsxFileName,
              lineNumber: 194
            },
            __self: this
          },
          React.createElement(BlockToolbar, {
            blockFormatters: blockFormatters,
            editorHasFocus: hasFocus,
            editorState: editorState,
            onChange: this.onChange,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 195
            },
            __self: this
          })
        ) : null,
        React.createElement(
          "div",
          {
            className: contentClassNames,
            ref: function ref(c) {
              _this3.contentEl = c;
            },
            onClick: this.onContentClick,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 203
            },
            __self: this
          },
          React.createElement(InlineToolbar, {
            editorHasFocus: hasFocus,
            editorState: editorState,
            onChange: this.onChange,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 210
            },
            __self: this
          }),
          React.createElement(PluginsEditor, {
            ref: function ref(c) {
              _this3._editor = c;
            },
            blockRenderMap: this.blockRenderMap,
            placeholder: placeholder,
            plugins: this.state.plugins,
            editorState: editorState,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.onChange,
            readOnly: readOnly,
            webDriverTestID: webDriverTestID,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 215
            },
            __self: this
          })
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return RichTextEditor;
}(React.Component);

RichTextEditor.propTypes = {
  embeddableForms: PropTypes.object,
  blockFormatters: PropTypes.array,
  boxSize: PropTypes.string,
  config: PropTypes.object,
  inlineFormatters: PropTypes.array,
  editorState: PropTypes.object.isRequired,
  fieldBus: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  webDriverTestID: PropTypes.string
};
RichTextEditor.defaultProps = {
  placeholder: "Start writing …"
};


export default RichTextEditor;