'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJs = require('draft-js');

var _immutable = require('immutable');

var _draftJsAutolistPlugin = require('draft-js-autolist-plugin');

var _draftJsAutolistPlugin2 = _interopRequireDefault(_draftJsAutolistPlugin);

var _draftJsSingleLinePlugin = require('draft-js-single-line-plugin');

var _draftJsSingleLinePlugin2 = _interopRequireDefault(_draftJsSingleLinePlugin);

var _blockToolbarPlugin = require('./block-toolbar-plugin');

var _blockToolbarPlugin2 = _interopRequireDefault(_blockToolbarPlugin);

var _inlineToolbarPlugin = require('./inline-toolbar-plugin');

var _inlineToolbarPlugin2 = _interopRequireDefault(_inlineToolbarPlugin);

var _richTextEditor = require('./rich-text-editor.mcss');

var _richTextEditor2 = _interopRequireDefault(_richTextEditor);

require('./tmp.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Rich Text Editor
 */

// Styles

// Plugins
var RichTextEditor = _react2.default.createClass({
  displayName: 'RichTextEditor',

  propTypes: {
    editorState: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    placeholder: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      placeholder: 'Start writing …',
      blockFormatters: ['unstyled', 'header-one', 'unordered-list-item', 'ordered-list-item', 'blockquote', 'code']
    };
  },
  getInitialState: function getInitialState() {
    var plugins = this.configurePlugins();

    return {
      plugins: plugins,
      hasFocus: false
    };
  },


  /**
   * Handle the configuration of the various plugins we allow to pass in
   * @return {Array} List of draft-js-plugins compatible plugins
   */
  configurePlugins: function configurePlugins() {
    var _props = this.props;
    var blockFormatters = _props.blockFormatters;
    var inlineFormatters = _props.inlineFormatters;
    var boxSize = _props.boxSize;

    var autoListPlugin = (0, _draftJsAutolistPlugin2.default)();
    var singleLinePlugin = (0, _draftJsSingleLinePlugin2.default)();
    var blockToolbarPlugin = (0, _blockToolbarPlugin2.default)({
      blockFormatters: blockFormatters
    });
    var inlineToolbarPlugin = (0, _inlineToolbarPlugin2.default)({
      inlineFormatters: inlineFormatters
    });
    // Build up the list of plugins
    var plugins = [inlineToolbarPlugin];
    // Add singleLine plugin if the boxSize matches
    if (boxSize === 'single') {
      plugins = plugins.concat([singleLinePlugin]);
    } else {
      plugins = plugins.concat([autoListPlugin, blockToolbarPlugin]);
    }
    // Extract the toolbar component for use in rendering
    this.BlockToolbar = blockToolbarPlugin.BlockToolbar;
    this.InlineToolbar = inlineToolbarPlugin.InlineToolbar;
    return plugins;
  },
  onFocus: function onFocus(e) {
    this.setState({ hasFocus: true });
  },
  onBlur: function onBlur(e) {
    this.setState({ hasFocus: false });
  },


  /**
   * Focus the editor when the `contentEl` is clicked
   * @param  {MouseEvent} e
   */
  onContentClick: function onContentClick(e) {
    e.preventDefault();
    if (e.target === this.contentEl) {
      this.editor.focus();
    }
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var boxSize = _props2.boxSize;
    var blockFormatters = _props2.blockFormatters;
    var editorState = _props2.editorState;
    var onChange = _props2.onChange;
    var placeholder = _props2.placeholder;
    var hasFocus = this.state.hasFocus;
    var BlockToolbar = this.BlockToolbar;
    var InlineToolbar = this.InlineToolbar;


    return _react2.default.createElement(
      'div',
      { className: _richTextEditor2.default.base },
      boxSize !== 'single' ? _react2.default.createElement(
        'div',
        { className: _richTextEditor2.default.gutter },
        _react2.default.createElement(BlockToolbar, {
          blockFormatters: blockFormatters,
          editorHasFocus: hasFocus,
          editorState: editorState,
          onChange: onChange })
      ) : null,
      _react2.default.createElement(
        'div',
        { className: _richTextEditor2.default.content, ref: function ref(c) {
            return _this.contentEl = c;
          }, onClick: this.onContentClick },
        _react2.default.createElement(InlineToolbar, {
          editorHasFocus: hasFocus,
          editorState: editorState,
          onChange: onChange }),
        _react2.default.createElement(_draftJsPluginsEditor2.default, {
          ref: function ref(c) {
            return _this.editor = c;
          },
          placeholder: placeholder,
          plugins: this.state.plugins,
          editorState: editorState,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onChange: onChange })
      )
    );
  }
});

exports.default = RichTextEditor;