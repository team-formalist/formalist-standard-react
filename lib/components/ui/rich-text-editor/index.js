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

require('./tmp.css');

var _richTextEditorInlineToolbar = require('../rich-text-editor-inline-toolbar');

var _richTextEditorInlineToolbar2 = _interopRequireDefault(_richTextEditorInlineToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inlineToolbarPlugin = (0, _richTextEditorInlineToolbar2.default)();

// Plugins

var InlineToolbar = inlineToolbarPlugin.InlineToolbar;


var RichTextEditor = _react2.default.createClass({
  displayName: 'RichTextEditor',

  propTypes: {},

  getInitialState: function getInitialState() {
    var _props = this.props;
    var editorState = _props.editorState;
    var onChange = _props.onChange;


    return {
      plugins: [inlineToolbarPlugin]
    };
  },
  render: function render() {
    var _props2 = this.props;
    var editorState = _props2.editorState;
    var onChange = _props2.onChange;


    return _react2.default.createElement(
      'div',
      { className: this.props.className },
      _react2.default.createElement(InlineToolbar, {
        editorState: editorState,
        onChange: onChange }),
      _react2.default.createElement(_draftJsPluginsEditor2.default, {
        plugins: this.state.plugins,
        editorState: editorState,
        onChange: onChange })
    );
  }
});

/**
 * Plugins
 */

exports.default = RichTextEditor;