import React from 'react'
import {Map} from 'immutable'
import {
  DefaultDraftBlockRenderMap,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from 'draft-js'
const {hasCommandModifier} = KeyBindingUtil

// Components
import Toolbar from './toolbar'
import AtomicBlock from './blocks/atomic'
import PullquoteBlock from './blocks/pull-quote'

const blockItemsGroupsMapping = [
  {
    label: 'Paragraph',
    types: [
      'unstyled',
    ],
  },
  {
    label: 'Heading',
    types: [
      'header-one',
      'header-two',
      'header-three',
      'header-four',
      'header-five',
      'header-six',
    ],
  },
  {
    label: 'Unordered',
    types: [
      'unordered-list-item',
    ],
  },
  {
    label: 'Ordered',
    types: [
      'ordered-list-item',
    ],
  },
  {
    label: 'Quote',
    types: [
      'blockquote',
      'pullquote',
    ],
  },
]

const defaults = {
  blockFormatters: [
    'unstyled',
    'header-one',
    'header-two',
    'unordered-list-item',
    'ordered-list-item',
    'blockquote',
    'pullquote',
    'code',
  ],
  blockSet: {
    atomic: {
      component: AtomicBlock,
      editable: false,
    },
    pullquote: {
      component: PullquoteBlock,
    },
  },
  blockRenderMap: {
    pullquote: {
      element: 'blockquote',
    },
  },
}

/**
 * Plugin for the block toolbar

 * @param  {Array} options.blockFormatters Optional list of block commands to
 * allow. Will default to defaults.blockFormatters
 *
 * @return {Object} draft-js-editor-plugin compatible object
 */
export default function blockToolbarPlugin (options = {}) {
  // Pull out the options
  const blockFormatters = options.blockFormatters || defaults.blockFormatters
  const blockSet = options.blockSet || defaults.blockSet
  blockSet.atomic.props = {setReadOnly: options.setReadOnly}
  const blockRenderMap = Map(options.blockRenderMap || defaults.blockRenderMap)

  // Filter out the un-allowed block-item types
  const blockItemsGroups = blockItemsGroupsMapping.map((group) => {
    const types = group.types.filter((type) => blockFormatters.indexOf(type) > -1)
    return {
      label: group.label,
      types
    }
  }).filter((group) => {
    return group.types.length > 0
  })

  return {

    /**
     * Customer block renderer resolver
     * @param  {ContentBlock} contentBlock The draft `ContentBlock` object to
     * render
     * @return {Object} A compatible renderer object definition
     */
    blockRendererFn (contentBlock) {
      const type = contentBlock.getType()
      // Pull out the renderer from our `blockSet` object
      if (type && blockSet[type]) {
        return blockSet[type]
      }
    },

    /**
     * Merge our blockRenderMap with the draft defaults
     * @type {Map}
     */
    blockRenderMap: DefaultDraftBlockRenderMap.merge(blockRenderMap),

    /**
     * Export the `BlockToolbar` component with curried `options`
     *
     * @param  {Object} props Props for the toolbar
     * @return {ReactComponent} The curried component
     */
    BlockToolbar: (props) => {
      props = Object.assign({}, {blockItemsGroups}, props)
      return (
        <Toolbar {...props}/>
      )
    }
  }
}
