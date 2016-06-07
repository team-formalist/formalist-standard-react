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
 * The block item mappings
 * @type {Array}
 */
const blockItemsMapping = [
  {
    type: 'unstyled',
    label: 'Paragraph',
  },
  {
    type: 'paragraph',
    label: 'Paragraph',
  },
  {
    type: 'header-one',
    label: 'Heading 1',
  },
  {
    type: 'header-two',
    label: 'Heading 2',
  },
  {
    type: 'header-three',
    label: 'Heading 3',
  },
  {
    type: 'header-four',
    label: 'Heading 4',
  },
  {
    type: 'header-five',
    label: 'Heading 5',
  },
  {
    type: 'header-six',
    label: 'Heading 6',
  },
  {
    type: 'unordered-list-item',
    label: 'UL',
  },
  {
    type: 'ordered-list-item',
    label: 'OL',
  },
  {
    type: 'blockquote',
    label: 'Blockquote',
  },
  {
    type: 'code-block',
    label: 'Code',
  },
]

const defaults = {
  allowedBlockFormatters: [
    'unstyled',
    'header-one',
    'unordered-list-item',
    'ordered-list-item',
    'blockquote-list-item',
    'code',
  ]
}

/**
 * Plugin for the block toolbar

 * @param  {Array} options.blockFormatters Optional list of block commands to
 * allow. Will default to defaults.allowedBlockFormatters
 *
 * @return {Object} draft-js-editor-plugin compatible object
 */
export default function blockToolbarPlugin (options = {}) {

  const blockFormatters = options.blockFormatters || defaults.allowedBlockFormatters
  const blockItems = blockItemsMapping.filter((item) => blockFormatters.indexOf(item.type) > -1)

  return {
    /**
     * Export the `BlockToolbar` component with curried `options`
     *
     * @param  {Object} props Props for the toolbar
     * @return {ReactComponent} The curried component
     */
    BlockToolbar: (props) => {
      props = Object.assign({}, {blockItems}, props)
      return (
        <Toolbar {...props}/>
      )
    }
  }
}
