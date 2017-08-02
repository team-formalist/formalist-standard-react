'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = softNewlinesKeyboardPlugin;

var _draftJs = require('draft-js');

var SOFT_NEWLINE_COMMAND = 'insert-soft-newline';

/**
 * Plugin for the allowing soft newlines to be added using the keyboard
 * @return {Object} draft-js-editor-plugin compatible object
 */
function softNewlinesKeyboardPlugin() {
  return {
    /**
     * Check if the current key combination is `Shift + Enter`
     *
     * @param  {KeyboardEvent} e Synthetic keyboard event from draft-js
     * @return {Command} String command based on the keyboard event
     */
    keyBindingFn: function keyBindingFn(e) {
      // ENTER
      if (e.keyCode === 13 && e.shiftKey) {
        return SOFT_NEWLINE_COMMAND;
      }
    },


    /**
     * handleKeyCommand
     *
     * Adjust the editorState if the soft-newline command is sent
     *
     * @param  {String}   command The command-as-string as passed by draft-js
     * @param  {EditorState} editorState The current editorState
     * @return {Boolean} Handled or not?
     */
    handleKeyCommand: function handleKeyCommand(command, editorState, _ref) {
      var setEditorState = _ref.setEditorState;

      if (command === SOFT_NEWLINE_COMMAND) {
        setEditorState(_draftJs.RichUtils.insertSoftNewline(editorState));
        return 'handled';
      }
      return 'not-handled';
    }
  };
}