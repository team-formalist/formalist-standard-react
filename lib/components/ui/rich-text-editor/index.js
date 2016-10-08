'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _componentEmitter = require('component-emitter');

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _draftJsAutolistPlugin = require('draft-js-autolist-plugin');

var _draftJsAutolistPlugin2 = _interopRequireDefault(_draftJsAutolistPlugin);

var _draftJsBlockBreakoutPlugin = require('draft-js-block-breakout-plugin');

var _draftJsBlockBreakoutPlugin2 = _interopRequireDefault(_draftJsBlockBreakoutPlugin);

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// Plugins

// Styles


/**
 * Rich Text Editor
 */
var RichTextEditor = _react2.default.createClass({
  displayName: 'RichTextEditor',

  propTypes: {
    embeddableForms: _react2.default.PropTypes.object,
    blockFormatters: _react2.default.PropTypes.array,
    boxSize: _react2.default.PropTypes.string,
    inlineFormatters: _react2.default.PropTypes.array,
    editorState: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    placeholder: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      placeholder: 'Start writing …'
    };
  },
  getInitialState: function getInitialState() {
    return {
      someProp: Date.now(),
      hasFocus: false
    };
  },
  componentWillMount: function componentWillMount() {
    // Create a per-instance event emitter to pass through to the atomic blocks
    // so that we can subscribe to `onChange` events in the editor proper
    // This is not really great, but there’s way for a prop
    this.emitter = new _componentEmitter2.default();
    var plugins = this.configurePlugins();
    this.setState({
      plugins: plugins
    });
  },


  /**
   * Handle the configuration of the various plugins we allow to pass in
   * @return {Array} List of draft-js-plugins compatible plugins
   */
  configurePlugins: function configurePlugins() {
    var _props = this.props;
    var embeddableForms = _props.embeddableForms;
    var blockFormatters = _props.blockFormatters;
    var boxSize = _props.boxSize;
    var inlineFormatters = _props.inlineFormatters;

    var autoListPlugin = (0, _draftJsAutolistPlugin2.default)();
    var singleLinePlugin = (0, _draftJsSingleLinePlugin2.default)();

    // Configure the blockToolbarPlugin
    // Pass through any
    this.blockToolbarPlugin = (0, _blockToolbarPlugin2.default)({
      setReadOnly: this.setReadOnly,
      editorEmitter: this.emitter,
      blockFormatters: blockFormatters,
      embeddableForms: embeddableForms
    });
    var inlineToolbarPlugin = (0, _inlineToolbarPlugin2.default)({
      inlineFormatters: inlineFormatters
    });
    // Build up the list of plugins
    var plugins = [inlineToolbarPlugin, (0, _draftJsBlockBreakoutPlugin2.default)()];
    // Add singleLine plugin if the boxSize matches
    if (boxSize === 'single') {
      plugins = plugins.concat([singleLinePlugin]);
    } else {
      plugins = plugins.concat([autoListPlugin, this.blockToolbarPlugin]);
    }
    // Extract the toolbar component for use in rendering
    this.BlockToolbar = this.blockToolbarPlugin.BlockToolbar;
    this.blockRenderMap = this.blockToolbarPlugin.blockRenderMap;
    this.InlineToolbar = inlineToolbarPlugin.InlineToolbar;
    return plugins;
  },
  onFocus: function onFocus(e) {
    var editorState = this.props.editorState;

    this.emitter.emit('focus', editorState);
    this.setState({ hasFocus: true });
  },
  onBlur: function onBlur(e) {
    var editorState = this.props.editorState;

    this.emitter.emit('blur', editorState);
    this.setState({ hasFocus: false });
  },


  /**
   * Set the editor to read-only (or note)
   * @param {Boolean} readOnly
   */
  setReadOnly: function setReadOnly(readOnly) {
    this.setState({ readOnly: readOnly });
  },


  /**
   * Focus the editor when the `contentEl` is clicked
   * @param  {MouseEvent} e
   */
  onContentClick: function onContentClick(e) {
    e.preventDefault();
    if (e.target === this.contentEl) {
      this._editor.focus();
    }
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var boxSize = _props2.boxSize;
    var blockFormatters = _props2.blockFormatters;
    var editorState = _props2.editorState;
    var _onChange = _props2.onChange;
    var placeholder = _props2.placeholder;
    var _state = this.state;
    var hasFocus = _state.hasFocus;
    var readOnly = _state.readOnly;
    var BlockToolbar = this.BlockToolbar;
    var InlineToolbar = this.InlineToolbar;


    var placeholderBlockType = false;
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      placeholderBlockType = contentState.getBlockMap().first().getType();
    }

    // Set up content wrapper classes
    var contentClassNames = (0, _classnames2.default)(_richTextEditor2.default.content, _defineProperty({}, '' + _richTextEditor2.default['contentPlaceholder--' + placeholderBlockType], placeholderBlockType && _richTextEditor2.default['contentPlaceholder--' + placeholderBlockType]));

    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
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
          onChange: _onChange
        })
      ) : null,
      _react2.default.createElement(
        'div',
        {
          className: contentClassNames,
          ref: function ref(c) {
            _this.contentEl = c;
          },
          onClick: this.onContentClick
        },
        _react2.default.createElement(InlineToolbar, {
          editorHasFocus: hasFocus,
          editorState: editorState,
          onChange: _onChange }),
        _react2.default.createElement(_draftJsPluginsEditor2.default, {
          ref: function ref(c) {
            _this._editor = c;
          },
          blockRenderMap: this.blockRenderMap,
          placeholder: placeholder,
          plugins: this.state.plugins,
          editorState: editorState,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onChange: function onChange(editorState) {
            // Emit the onChange event so we can listen to it
            // from within our atomic blocks
            _this.emitter.emit('change', editorState);
            _onChange(editorState);
          },
          readOnly: readOnly
        })
      )
    );
    /* eslint-enable react/jsx-no-bind */
  }
});

exports.default = RichTextEditor;