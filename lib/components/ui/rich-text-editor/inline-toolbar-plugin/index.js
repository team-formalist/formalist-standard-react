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
  style: 'BOLD'
}, {
  command: 'italic',
  label: 'Italic',
  style: 'ITALIC'
}, {
  command: 'code',
  label: 'Code',
  style: 'CODE'
}, {
  command: 'underline',
  label: 'Underline',
  style: 'UNDERLINE'
}, {
  command: 'strikethrough',
  label: 'Strikethrough',
  style: 'STRIKETHROUGH'
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