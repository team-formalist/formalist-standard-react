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

var _inlineToolbarPlugin = require('./inline-toolbar-plugin');

var _inlineToolbarPlugin2 = _interopRequireDefault(_inlineToolbarPlugin);

require('./tmp.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles


/**
 * Rich Text Editor
 */

// Plugins
var RichTextEditor = _react2.default.createClass({
  displayName: 'RichTextEditor',

  propTypes: {
    editorState: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  getInitialState: function getInitialState() {
    var inlineFormatters = this.props.inlineFormatters;

    var inlineToolbarPlugin = (0, _inlineToolbarPlugin2.default)({
      inlineFormatters: inlineFormatters
    });
    this.InlineToolbar = inlineToolbarPlugin.InlineToolbar;
    var _props = this.props;
    var editorState = _props.editorState;
    var onChange = _props.onChange;


    return {
      plugins: [inlineToolbarPlugin],
      hasFocus: false
    };
  },
  onFocus: function onFocus(e) {
    this.setState({ hasFocus: true });
  },
  onBlur: function onBlur(e) {
    this.setState({ hasFocus: false });
  },
  render: function render() {
    var _props2 = this.props;
    var editorState = _props2.editorState;
    var onChange = _props2.onChange;
    var hasFocus = this.state.hasFocus;
    var InlineToolbar = this.InlineToolbar;


    return _react2.default.createElement(
      'div',
      { className: this.props.className },
      _react2.default.createElement(InlineToolbar, {
        editorHasFocus: hasFocus,
        editorState: editorState,
        onChange: onChange }),
      _react2.default.createElement(_draftJsPluginsEditor2.default, {
        plugins: this.state.plugins,
        editorState: editorState,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onChange: onChange })
    );
  }
});

exports.default = RichTextEditor;