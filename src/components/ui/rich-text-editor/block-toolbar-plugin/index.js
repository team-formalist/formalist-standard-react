import React from 'react'
import {Map} from 'immutable'
import {
  DefaultDraftBlockRenderMap,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from 'draft-js'
import mergeDefaults from '../../../../utils/merge-defaults'
const {hasCommandModifier} = KeyBindingUtil

// Components
import Toolbar from './toolbar'
import AtomicBlock from './blocks/atomic'
import PullquoteBlock from './blocks/pull-quote'

const blockItemsGroupsMapping = [
  [
    {type: 'unstyled', label: 'P' }
  ],
  [
    {type: 'header-one', label: 'H1'},
    {type: 'header-two', label: 'H2'},
    {type: 'header-three', label: 'H3'},
    {type: 'header-four', label: 'H4'},
    {type: 'header-five', label: 'H5'},
    {type: 'header-six', label: 'H6'},
  ],
  [
    {type: 'unordered-list-item', label: 'UL' }
  ],
  [
    {type: 'ordered-list-item', label: 'OL'},
  ],
  [
    {type: 'blockquote', label: '>'},
    {type: 'pullquote', label: '”'},
  ],
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
  options = mergeDefaults({}, defaults, options)
  let {
    blockFormatters,
    blockRenderMap,
    blockSet,
    embeddableForms,
    setReadOnly,
  } = options

  // Assign the default props for the atomic block
  // Which includes _all_ our embedded form types
  blockSet.atomic.props = {
    setReadOnly,
    embeddableForms,
  }

  // Filter out the un-allowed block-item types
  const blockItemsGroups = blockItemsGroupsMapping.map((group) => {
    return group.filter((item) => blockFormatters.indexOf(item.type) > -1)
  }).filter((group) => {
    return group.length > 0
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
      // Merge a couple of props that are set up in the initial plugin
      // creation
      props = Object.assign({}, {
        blockItemsGroups,
        embeddableForms,
      }, props)
      return (
        <Toolbar {...props}/>
      )
    }
  }
}
