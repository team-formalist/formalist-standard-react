'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inlineToolbarPlugin;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasCommandModifier = _draftJs.KeyBindingUtil.hasCommandModifier;
// Components

/**
 * The inline item mappings
 * @type {Array}
 */
var inlineItemsMapping = [{
  command: 'bold',
  label: 'Bold',
  style: 'BOLD',
  icon: '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v2c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2v2h11c2.76 0 5-2.24 5-5 0-2-1.18-3.7-2.88-4.5.54-.68.88-1.56.88-2.5 0-2.2-1.78-4-4-4h-10zm6 2h2c1.1 0 2 .9 2 2s-.9 2-2 2h-2v-4zm0 6h3c1.66 0 3 1.34 3 3s-1.34 3-3 3h-3v-6z"/></svg>'
}, {
  command: 'italic',
  label: 'Italic',
  style: 'ITALIC',
  icon: '<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg"><polygon points="3.98071795 2.21767396e-16 3.98071795 1.99750312 7.24130602 1.99750312 7.12128437 2.25717853 3.12056282 12.2446941 2.44044015 14.0024969 0 14.0024969 0 16 10.0018039 16 10.0018039 14.0024969 6.74121583 14.0024969 6.86123747 13.7428215 10.861959 3.75530587 11.5420817 1.99750312 13.9825218 1.99750312 13.9825218 0 3.98071795 0"/></svg>'
}, {
  command: 'code',
  label: 'Code',
  style: 'CODE',
  icon: '<svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M10 0l-6 12h2l6-12h-2zm-8 2l-2 4 2 4h2l-2-4 2-4h-2zm10 0l2 4-2 4h2l2-4-2-4h-2z"></svg>'
}, {
  command: 'underline',
  label: 'Underline',
  style: 'UNDERLINE',
  icon: '<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2 0v8c0 2.2 2.24 4 5 4h1c2.2 0 4-1.8 4-4v-8h-2v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-4zm-2 14v2h14v-2h-14z"/></svg>'
}, {
  command: 'strikethrough',
  label: 'Strikethrough',
  style: 'STRIKETHROUGH',
  icon: '<svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><g><polygon points="0 7 0 8 16 8 16 7"/><path d="M8.61.6c-3.42 0-5.4 1.82-5.4 4.16 0 4.94 7.96 3.32 7.96 5.64 0 1-.92 1.56-2.62 1.56-1.78 0-3.04-.46-4.08-2.18l-1.64 1.96c1.12 1.6 2.82 2.46 5.82 2.46 3.16 0 5.42-1.48 5.42-3.96 0-5.1-7.94-3.02-7.94-5.74 0-.94.84-1.62 2.5-1.62 1.78 0 2.88.7 3.56 2.12l1.9-1.86c-1.34-1.76-3.02-2.54-5.48-2.54z"/></g></svg>'
}];

var defaults = {
  allowedInlineFormatters: ['bold', 'italic', 'code']
};

/**
 * Plugin for the inline toolbar

 * @param  {Array} options.inlineFormatters Optional list of inline commands to
 * allow. Will default to defaults.allowedInlineFormatters
 *
 * @return {Object} draft-js-editor-plugin compatible object
 */
function inlineToolbarPlugin() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


  var inlineFormatters = options.inlineFormatters || defaults.allowedInlineFormatters;
  var inlineItems = inlineItemsMapping.filter(function (item) {
    return inlineFormatters.indexOf(item.command) > -1;
  });

  return {
    /**
     * handleKeyCommand
     *
     * Match a command to the inline or block style to apply.
     *
     * @param  {String}   command The command-as-string as passed by Draft.
     * @param  {Function} options.getEditorState Getter for the current editorState
     * @param  {Function} options.setEditorState Setter for the current editorState
     * @return {Boolean} Handled or not?
     */
    handleKeyCommand: function handleKeyCommand(command, _ref) {
      var getEditorState = _ref.getEditorState;
      var setEditorState = _ref.setEditorState;

      var inlineItem = inlineItems.find(function (item) {
        return item.command === command;
      });
      if (inlineItem) {
        setEditorState(_draftJs.RichUtils.toggleInlineStyle(getEditorState(), inlineItem.style));
        return true;
      }
      return false;
    },

    /**
     * Override the inline style for code to match our typeface.
     * In the future this will hopefully be addressable through CSS when
     * https://github.com/facebook/draft-js/pull/354 is merged.
     * @type {Object}
     */
    customStyleMap: {
      CODE: {
        fontFamily: 'inconsolata, monospace',
        lineHeight: 1.35,
        wordWrap: 'break-word'
      }
    },

    /**
     * Export the `InlineToolbar` component with curried `options`
     *
     * @param  {Object} props Props for the toolbar
     * @return {ReactComponent} The curried component
     */
    InlineToolbar: function InlineToolbar(props) {
      props = Object.assign({}, { inlineItems: inlineItems }, props);
      return _react2.default.createElement(_toolbar2.default, props);
    }
  };
}