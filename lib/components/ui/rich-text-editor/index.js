'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// Plugins

// Styles


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _componentEmitter = require('component-emitter');

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _utils = require('./utils');

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

var _softNewlinesKeyboardPlugin = require('./soft-newlines-keyboard-plugin');

var _softNewlinesKeyboardPlugin2 = _interopRequireDefault(_softNewlinesKeyboardPlugin);

var _richTextEditor = require('./rich-text-editor.mcss');

var _richTextEditor2 = _interopRequireDefault(_richTextEditor);

require('./tmp.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Rich Text Editor
 */
var RichTextEditor = _react2.default.createClass({
  displayName: 'RichTextEditor',

  propTypes: {
    embeddableForms: _react2.default.PropTypes.object,
    blockFormatters: _react2.default.PropTypes.array,
    boxSize: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.object,
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
    var _this = this;

    // Create a per-instance event emitter to pass through to the atomic blocks
    // so that we can subscribe to `onChange` events in the editor proper
    // This is not really great, but there’s no way for this to get
    // passed down through props atm
    this.emitter = new _componentEmitter2.default();
    // Atomic blocks trigger an `atomic:change` event when they update their
    // embedded entity data. We have to listen to it and trigger an `onChange`
    // of the current data to get things to propagate around _immediately_.
    this.emitter.on('atomic:change', function () {
      var editorState = _this.props.editorState;

      _this.onChange(editorState);
    });

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
    var blockFormatters = _props.blockFormatters;
    var boxSize = _props.boxSize;
    var config = _props.config;
    var embeddableForms = _props.embeddableForms;
    var inlineFormatters = _props.inlineFormatters;

    // Extract config for each type of toolbar

    var block = config.block;
    var inline = config.inline;


    var autoListPlugin = (0, _draftJsAutolistPlugin2.default)();
    var singleLinePlugin = (0, _draftJsSingleLinePlugin2.default)();

    // Configure the blockToolbarPlugin
    // Pass through any
    this.blockToolbarPlugin = (0, _blockToolbarPlugin2.default)(_extends({
      setReadOnly: this.setReadOnly,
      editorEmitter: this.emitter,
      blockFormatters: blockFormatters,
      embeddableForms: embeddableForms
    }, block));
    var inlineToolbarPlugin = (0, _inlineToolbarPlugin2.default)(_extends({
      allowedFormatters: inlineFormatters
    }, inline));
    // Build up the list of plugins
    var plugins = [inlineToolbarPlugin, (0, _draftJsBlockBreakoutPlugin2.default)(), (0, _softNewlinesKeyboardPlugin2.default)()];
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
   * Set the editor to read-only (or not)
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
    var atomic = (0, _utils.belongsToAtomicBlock)(e.target);
    if (!atomic && this.state.readOnly === true) {
      this.setReadOnly(false);
    }
    if (e.target === this.contentEl) {
      this._editor.focus();
    }
  },


  /**
   * onChange
   */
  onChange: function onChange(editorState) {
    var onChange = this.props.onChange;

    this.emitter.emit('change', editorState);
    onChange(editorState);
  },
  render: function render() {
    var _this2 = this;

    var _props2 = this.props;
    var boxSize = _props2.boxSize;
    var blockFormatters = _props2.blockFormatters;
    var editorState = _props2.editorState;
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
          onChange: this.onChange
        })
      ) : null,
      _react2.default.createElement(
        'div',
        {
          className: contentClassNames,
          ref: function ref(c) {
            _this2.contentEl = c;
          },
          onClick: this.onContentClick
        },
        _react2.default.createElement(InlineToolbar, {
          editorHasFocus: hasFocus,
          editorState: editorState,
          onChange: this.onChange }),
        _react2.default.createElement(_draftJsPluginsEditor2.default, {
          ref: function ref(c) {
            _this2._editor = c;
          },
          blockRenderMap: this.blockRenderMap,
          placeholder: placeholder,
          plugins: this.state.plugins,
          editorState: editorState,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onChange: this.onChange,
          readOnly: readOnly
        })
      )
    );
    /* eslint-enable react/jsx-no-bind */
  }
});

exports.default = RichTextEditor;