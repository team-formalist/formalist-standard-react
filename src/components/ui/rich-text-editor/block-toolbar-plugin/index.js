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
    {
      type: 'unstyled',
      label: 'Paragraph',
      icon: '¶',
    }
  ],
  [
    {
      type: 'header-one',
      label: 'Heading 1',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M0 0v1h.5c.28 0 .5.22.5.5v4c0 .28-.22.5-.5.5h-.5v1h3v-1h-.5c-.28 0-.5-.22-.5-.5v-1.5h3v1.5c0 .28-.22.5-.5.5h-.5v1h3v-1h-.5c-.28 0-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5h.5v-1h-3v1h.5c.28 0 .5.22.5.5v1.5h-3v-1.5c0-.28.22-.5.5-.5h.5v-1h-3z" /></svg>',
    },
    {
      type: 'header-two',
      label: 'Heading 2',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M0 0v1h.5c.28 0 .5.22.5.5v4c0 .28-.22.5-.5.5h-.5v1h3v-1h-.5c-.28 0-.5-.22-.5-.5v-1.5h3v1.5c0 .28-.22.5-.5.5h-.5v1h3v-1h-.5c-.28 0-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5h.5v-1h-3v1h.5c.28 0 .5.22.5.5v1.5h-3v-1.5c0-.28.22-.5.5-.5h.5v-1h-3z" /></svg>',
    },
    {
      type: 'header-three',
      label: 'Heading 3',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M0 0v1h.5c.28 0 .5.22.5.5v4c0 .28-.22.5-.5.5h-.5v1h3v-1h-.5c-.28 0-.5-.22-.5-.5v-1.5h3v1.5c0 .28-.22.5-.5.5h-.5v1h3v-1h-.5c-.28 0-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5h.5v-1h-3v1h.5c.28 0 .5.22.5.5v1.5h-3v-1.5c0-.28.22-.5.5-.5h.5v-1h-3z" /></svg>',
    },
    {
      type: 'header-four',
      label: 'Heading 4',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M0 0v1h.5c.28 0 .5.22.5.5v4c0 .28-.22.5-.5.5h-.5v1h3v-1h-.5c-.28 0-.5-.22-.5-.5v-1.5h3v1.5c0 .28-.22.5-.5.5h-.5v1h3v-1h-.5c-.28 0-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5h.5v-1h-3v1h.5c.28 0 .5.22.5.5v1.5h-3v-1.5c0-.28.22-.5.5-.5h.5v-1h-3z" /></svg>',
    },
    {
      type: 'header-five',
      label: 'Heading 5',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M0 0v1h.5c.28 0 .5.22.5.5v4c0 .28-.22.5-.5.5h-.5v1h3v-1h-.5c-.28 0-.5-.22-.5-.5v-1.5h3v1.5c0 .28-.22.5-.5.5h-.5v1h3v-1h-.5c-.28 0-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5h.5v-1h-3v1h.5c.28 0 .5.22.5.5v1.5h-3v-1.5c0-.28.22-.5.5-.5h.5v-1h-3z" /></svg>',
    },
    {
      type: 'header-six',
      label: 'Heading 6',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M0 0v1h.5c.28 0 .5.22.5.5v4c0 .28-.22.5-.5.5h-.5v1h3v-1h-.5c-.28 0-.5-.22-.5-.5v-1.5h3v1.5c0 .28-.22.5-.5.5h-.5v1h3v-1h-.5c-.28 0-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5h.5v-1h-3v1h.5c.28 0 .5.22.5.5v1.5h-3v-1.5c0-.28.22-.5.5-.5h.5v-1h-3z" /></svg>',
    },
  ],
  [
    {
      type: 'unordered-list-item',
      label: 'Unordered list',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M.5 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm1.5 0v1h6v-1h-6zm-1.5 2c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm1.5 0v1h6v-1h-6zm-1.5 2c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm1.5 0v1h6v-1h-6zm-1.5 2c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm1.5 0v1h6v-1h-6z" /></svg>',
    }
  ],
  [
    {
      type: 'ordered-list-item',
      label: 'Ordered list',
      icon: '<svg width="17" height="15" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-23 -94) translate(22 11)"><path d="M6 86h12v-2h-12v2zm0 3v2h12v-2h-12zm0 5v2h12v-2h-12z"/><path d="M2.815 83.7c-.16.235-.57.46-.995.53v1.035c.25-.04.52-.15.76-.3v2.035h1.165v-3.3h-.93zm.24 7.455l-.435.035c.825-.495 1.23-.85 1.23-1.48 0-.435-.33-1.06-1.335-1.06-.785 0-1.42.385-1.395 1.22l.995.24c-.015-.405.095-.585.32-.585.2 0 .27.14.27.3 0 .385-.47.945-1.48 1.475h.005v.7h2.64v-.845h-.815zm-.535 2.495c-.73 0-1.31.22-1.39.955l1.005.31c-.005-.325.13-.41.285-.41.12 0 .205.1.205.265 0 .18-.07.27-.255.27h-.16v.66l.225.005c.19.005.25.07.255.215 0 .19-.11.275-.25.275-.165 0-.32-.065-.305-.41l-1.05.425c.17.62.625.84 1.41.84.765 0 1.36-.365 1.36-.96 0-.695-.59-.735-.68-.735v-.01c.08 0 .62-.115.62-.725 0-.63-.47-.97-1.275-.97z"/></g></svg>'
    },
  ],
  [
    {
      type: 'blockquote',
      label: 'Blockquote',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M0 0v6l3-3v-3h-3zm5 0v6l3-3v-3h-3z" transform="translate(0 1)" /></svg>',
    },
    {
      type: 'pullquote',
      label: 'Pullquote',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M3 0c-1.65 0-3 1.35-3 3v3h3v-3h-2c0-1.11.89-2 2-2v-1zm5 0c-1.65 0-3 1.35-3 3v3h3v-3h-2c0-1.11.89-2 2-2v-1z" transform="translate(0 1)" /></svg>',
    },
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
