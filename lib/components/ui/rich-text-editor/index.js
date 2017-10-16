'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

require('./tmp.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Plugins

// Styles


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
      var _this$props = _this.props;
      var blockFormatters = _this$props.blockFormatters;
      var boxSize = _this$props.boxSize;
      var config = _this$props.config;
      var embeddableForms = _this$props.embeddableForms;
      var inlineFormatters = _this$props.inlineFormatters;

      // Extract config for each type of toolbar

      var block = config.block;
      var inline = config.inline;


      var autoListPlugin = (0, _draftJsAutolistPlugin2.default)();
      var singleLinePlugin = (0, _draftJsSingleLinePlugin2.default)();

      // Configure the blockToolbarPlugin
      // Pass through any
      _this.blockToolbarPlugin = (0, _blockToolbarPlugin2.default)(_extends({
        setReadOnly: _this.setReadOnly,
        editorEmitter: _this.emitter,
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
        plugins = plugins.concat([autoListPlugin, _this.blockToolbarPlugin]);
      }
      // Extract the toolbar component for use in rendering
      _this.BlockToolbar = _this.blockToolbarPlugin.BlockToolbar;
      _this.blockRenderMap = _this.blockToolbarPlugin.blockRenderMap;
      _this.InlineToolbar = inlineToolbarPlugin.InlineToolbar;
      return plugins;
    }, _this.onFocus = function (e) {
      var editorState = _this.props.editorState;

      _this.emitter.emit('focus', editorState);
      _this.setState({ hasFocus: true });
    }, _this.onBlur = function (e) {
      var editorState = _this.props.editorState;

      _this.emitter.emit('blur', editorState);
      _this.setState({ hasFocus: false });
    }, _this.setReadOnly = function (readOnly) {
      _this.setState({ readOnly: readOnly });
    }, _this.onContentClick = function (e) {
      var atomic = (0, _utils.belongsToAtomicBlock)(e.target);
      if (!atomic && _this.state.readOnly === true) {
        _this.setReadOnly(false);
      }
      if (e.target === _this.contentEl) {
        _this._editor.focus();
      }
    }, _this.onChange = function (editorState) {
      var onChange = _this.props.onChange;

      _this.emitter.emit('change', editorState);
      onChange(editorState);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RichTextEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      // Create a per-instance event emitter to pass through to the atomic blocks
      // so that we can subscribe to `onChange` events in the editor proper
      // This is not really great, but there’s no way for this to get
      // passed down through props atm
      this.emitter = new _componentEmitter2.default();
      // Atomic blocks trigger an `atomic:change` event when they update their
      // embedded entity data. We have to listen to it and trigger an `onChange`
      // of the current data to get things to propagate around _immediately_.
      this.emitter.on('atomic:change', function () {
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var boxSize = _props.boxSize;
      var blockFormatters = _props.blockFormatters;
      var editorState = _props.editorState;
      var placeholder = _props.placeholder;
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
      var placeholderBlockTypeCapitalized = placeholderBlockType.charAt(0).toUpperCase() + placeholderBlockType.substr(1);

      // Set up content wrapper classes
      var contentClassNames = (0, _classnames2.default)(styles.content, _defineProperty({}, '' + styles['contentPlaceholder' + placeholderBlockTypeCapitalized], placeholderBlockType && styles['contentPlaceholder' + placeholderBlockTypeCapitalized]));

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return _react2.default.createElement(
        'div',
        { className: styles.base },
        boxSize !== 'single' ? _react2.default.createElement(
          'div',
          { className: styles.gutter },
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
              _this3.contentEl = c;
            },
            onClick: this.onContentClick
          },
          _react2.default.createElement(InlineToolbar, {
            editorHasFocus: hasFocus,
            editorState: editorState,
            onChange: this.onChange }),
          _react2.default.createElement(_draftJsPluginsEditor2.default, {
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
            readOnly: readOnly
          })
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return RichTextEditor;
}(_react2.default.Component);

RichTextEditor.propTypes = {
  embeddableForms: _propTypes2.default.object,
  blockFormatters: _propTypes2.default.array,
  boxSize: _propTypes2.default.string,
  config: _propTypes2.default.object,
  inlineFormatters: _propTypes2.default.array,
  editorState: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string
};
RichTextEditor.defaultProps = {
  placeholder: 'Start writing …'
};
exports.default = RichTextEditor;