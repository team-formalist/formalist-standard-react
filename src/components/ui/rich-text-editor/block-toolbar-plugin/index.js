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
      icon: '<svg width="10" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M9.287 0h-4.616c-3.034 0-4.671 1.49-4.671 3.862 0 2.317 1.637 3.807 4.285 3.844v8.294h1.343v-14.768h2.372v14.768h1.287v-16z"/></svg>',
    }
  ],
  [
    {
      type: 'header-one',
      label: 'Heading 1',
      icon: '<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><polygon points="9.5 0 9.5 5 4.5 5 4.5 0 0 0 0 14 4.5 14 4.5 9 9.5 9 9.5 14 14 14 14 0"/></svg>',
    },
    {
      type: 'header-two',
      label: 'Heading 2',
      icon: '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><polygon points="8.5512605 0 8.5512605 4.5 3.46890756 4.5 3.46890756 0 0 0 0 12 3.46890756 12 3.46890756 7.5 8.5512605 7.5 8.5512605 12 12 12 12 0"/></svg>',
    },
    {
      type: 'header-three',
      label: 'Heading 3',
      icon: '<svg width="10" height="12" xmlns="http://www.w3.org/2000/svg"><polygon points="7.5 0 7.5 5 2.5 5 2.5 0 0 0 0 12 2.5 12 2.5 6.94545455 7.5 6.94545455 7.5 12 10 12 10 0"/></svg>',
    },
    {
      type: 'header-four',
      label: 'Heading 4',
      icon: '<svg width="10" height="12" xmlns="http://www.w3.org/2000/svg"><polygon points="8.00369686 0 8.00369686 5.09090909 1.97781885 5.09090909 1.97781885 0 0 0 0 12 1.97781885 12 1.97781885 6.76363636 8.00369686 6.76363636 8.00369686 12 10 12 10 0"/></svg>',
    },
    {
      type: 'header-five',
      label: 'Heading 5',
      icon: '<svg width="8" height="10" xmlns="http://www.w3.org/2000/svg"><polygon points="6.76447876 0 6.76447876 4.36363636 1.23552124 4.36363636 1.23552124 0 0 0 0 10 1.23552124 10 1.23552124 5.5 6.76447876 5.5 6.76447876 10 8 10 8 0"/></svg>',
    },
    {
      type: 'header-six',
      label: 'Heading 6',
      icon: '<svg width="8" height="9" xmlns="http://www.w3.org/2000/svg"><polygon points="6.76447876 0 6.76447876 3.92727273 1.23552124 3.92727273 1.23552124 0 0 0 0 9 1.23552124 9 1.23552124 4.95 6.76447876 4.95 6.76447876 9 8 9 8 0"/></svg>',
    },
  ],
  [
    {
      type: 'unordered-list-item',
      label: 'Unordered list',
      icon: '<svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1 0c-.56 0-1 .44-1 1s.44 1 1 1 1-.44 1-1-.44-1-1-1zm3 0v2h12v-2h-12zm-3 5c-.56 0-1 .44-1 1s.44 1 1 1 1-.44 1-1-.44-1-1-1zm3 0v2h12v-2h-12zm-3 5c-.56 0-1 .44-1 1s.44 1 1 1 1-.44 1-1-.44-1-1-1zm3 0v2h12v-2h-12z"/></svg>',
    }
  ],
  [
    {
      type: 'ordered-list-item',
      label: 'Ordered list',
      icon: '<svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><g><path d="M5 1v2h11v-2h-11zm0 7h11v-2h-11v2zm0 3v2h11v-2h-11z"/><path d="M2.318 3.235v-3.11h-.959l-.967.671v.849l.916-.631h.051v2.221h-.967v.765h2.844v-.765h-.918zm-2.127 3.104v.016h.902v-.019c0-.32.231-.545.564-.545.317 0 .529.191.529.475 0 .234-.153.435-.714.951l-1.225 1.125v.658h2.946v-.768h-1.633v-.051l.639-.561c.682-.599.94-.988.94-1.423 0-.688-.583-1.149-1.448-1.149-.897 0-1.501.518-1.501 1.292zm1.037 6.021h.478c.373 0 .618.185.618.467 0 .282-.244.467-.618.467-.365 0-.596-.175-.61-.457h-.902c.035.76.631 1.241 1.539 1.241.94 0 1.566-.47 1.566-1.176 0-.502-.317-.838-.849-.894v-.051c.432-.078.706-.416.706-.865 0-.628-.567-1.045-1.423-1.045-.897 0-1.453.465-1.466 1.227h.857c.011-.298.239-.491.583-.491.349 0 .561.169.561.448s-.212.448-.561.448h-.478v.679z"/></g></svg>'
    },
  ],
  [
    {
      type: 'blockquote',
      label: 'Blockquote',
      icon: '<svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M6 0c-3.3 0-6 2.7-6 6v6h6v-6h-4c0-2.22 1.78-4 4-4v-2zm10 0c-3.3 0-6 2.7-6 6v6h6v-6h-4c0-2.22 1.78-4 4-4v-2z"/></svg>',
    },
    {
      type: 'pullquote',
      label: 'Pullquote',
      icon: '<svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v12l6-6v-6h-6zm10 0v12l6-6v-6h-6z"/></svg>',
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
