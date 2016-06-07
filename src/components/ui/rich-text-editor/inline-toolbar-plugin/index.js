import React from 'react'
import {
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from 'draft-js'
const {hasCommandModifier} = KeyBindingUtil
// Components
import Toolbar from './toolbar'

/**
 * The inline item mappings
 * @type {Array}
 */
const inlineItemsMapping = [
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
  {
    command: 'underline',
    label: 'Underline',
    style: 'UNDERLINE',
  },
  {
    command: 'strikethrough',
    label: 'Strikethrough',
    style: 'STRIKETHROUGH',
  },
]

const defaults = {
  allowedInlineFormatters: [
    'bold',
    'italic',
    'code',
  ]
}

/**
 * Plugin for the inline toolbar

 * @param  {Array} options.inlineFormatters Optional list of inline commands to
 * allow. Will default to defaults.allowedInlineFormatters
 *
 * @return {Object} draft-js-editor-plugin compatible object
 */
export default function inlineToolbarPlugin (options = {}) {

  const inlineFormatters = options.inlineFormatters || defaults.allowedInlineFormatters
  const inlineItems = inlineItemsMapping.filter((item) => inlineFormatters.indexOf(item.command) > -1)

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
     * Override the inline style for code to match our typeface.
     * In the future this will hopefully be addressable through CSS when
     * https://github.com/facebook/draft-js/pull/354 is merged.
     * @type {Object}
     */
    customStyleMap: {
      CODE: {
        fontFamily: 'inconsolata, monospace',
        lineHeight: 1.35,
        wordWrap: 'break-word',
      },
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
