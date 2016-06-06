import React from 'react'
import {
  RichUtils,
  getDefaultKeyBinding,
  getVisibleSelectionRect,
  KeyBindingUtil,
} from 'draft-js'
const {hasCommandModifier} = KeyBindingUtil
// Components
import Toolbar from './toolbar'

/**
 * The default inline formatting options
 * @type {Array}
 */
const defaultInlineItems = [
  {
    command: 'bold',
    label: 'Bold',
    style: 'BOLD',
  },
  {
    command: 'italic',
    label: 'Italic',
    style: 'ITALIC',
  },
  {
    command: 'code',
    label: 'Code',
    style: 'CODE',
  },
]

export default function inlineToolbarPlugin (options = {}) {

  const inlineItems = options.inlineItems || defaultInlineItems

  return {
    /**
     * handleKeyCommand
     *
     * Match a command to the inline or block style to apply.
     *
     * @param  {String} command The command-as-string as passed by Draft.
     * @param  {Function} options.getEditorState Getter for the current editorState
     * @param  {Function} options.setEditorState Setter for the current editorState
     * @return {Boolean} Handled or not?
     */
    handleKeyCommand: function handleKeyCommand (command, { getEditorState, setEditorState }) {
      const inlineItem = inlineItems.find((item) => item.command === command)
      if (inlineItem) {
        setEditorState(
          RichUtils.toggleInlineStyle(getEditorState(), inlineItem.style)
        )
        return true
      }
      return false
    },

    /**
     * Export the `InlineToolbar` component with curried `options`
     *
     * @param  {Object} props Props for the toolbar
     * @return {ReactComponent} The curried component
     */
    InlineToolbar: (props) => {
      props = Object.assign({}, {inlineItems}, props)
      return (
        <Toolbar {...props}/>
      )
    }
  }
}
