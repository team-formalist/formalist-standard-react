import {
  RichUtils,
} from 'draft-js'

const SOFT_NEWLINE_COMMAND = 'insert-soft-newline'

/**
 * Plugin for the allowing soft newlines to be added using the keyboard
 * @return {Object} draft-js-editor-plugin compatible object
 */
export default function softNewlinesKeyboardPlugin () {
  return {
    /**
     * Check if the current key combination is `Shift + Enter`
     *
     * @param  {KeyboardEvent} e Synthetic keyboard event from draft-js
     * @return {Command} String command based on the keyboard event
     */
    keyBindingFn (e) {
      // ENTER
      if (e.keyCode === 13 && e.shiftKey) {
        return SOFT_NEWLINE_COMMAND
      }
    },

    /**
     * handleKeyCommand
     *
     * Adjust the editorState if the soft-newline command is sent
     *
     * @param  {String}   command The command-as-string as passed by draft-js
     * @param  {Function} options.getEditorState Getter for the current editorState
     * @param  {Function} options.setEditorState Setter for the current editorState
     * @return {Boolean} Handled or not?
     */
    handleKeyCommand: function handleKeyCommand (command, { getEditorState, setEditorState }) {
      if (command === SOFT_NEWLINE_COMMAND) {
        setEditorState(
          RichUtils.insertSoftNewline(getEditorState())
        )
        return true
      }
      return false
    },
  }
}
