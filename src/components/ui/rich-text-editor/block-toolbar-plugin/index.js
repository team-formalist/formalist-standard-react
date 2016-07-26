import React from 'react'
import {Map} from 'immutable'
import {
  DefaultDraftBlockRenderMap,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  RichUtils,
} from 'draft-js'
import mergeDefaults from '../../../../utils/merge-defaults'
const {hasCommandModifier} = KeyBindingUtil

// Components
import Toolbar from './toolbar'
import AtomicBlock from './blocks/atomic'
import PullquoteBlock from './blocks/pull-quote'
import blockItemsGroupsMapping from './block-items/groups-mapping'
import {removeAtomicBlock, getNextBlockKey, getPreviousBlockKey} from './utils'

const commands = {
  BACKSPACE_BLOCK: 'btp-backspace-block',
  DELETE_BLOCK: 'btp-delete-block',
}

const defaults = {
  blockFormatters: [
    'unstyled',
    'header-one',
    'header-two',
    'unordered-list-item',
    'ordered-list-item',
    'blockquote',
    'pullquote',
    'code-block',
  ],
  blockSet: {
    atomic: {
      component: AtomicBlock,
      // editable: true,
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
  // Default state
  let selectedAtomicBlockKey = null

  // Pull out the options
  options = mergeDefaults({}, defaults, options)
  let {
    blockFormatters,
    blockRenderMap,
    blockSet,
    editorEmitter,
    embeddableForms,
    setReadOnly,
  } = options

  // Filter out the un-allowed block-item types
  const blockItemsGroups = blockItemsGroupsMapping.map((group) => {
    return group.filter((item) => blockFormatters.indexOf(item.type) > -1)
  }).filter((group) => {
    return group.length > 0
  })

  // Keep track of when an atomic block is selected
  editorEmitter.on('change', (key) => {
    // console.log('Set no atomic selected')
    selectedAtomicBlockKey = null
  })
  editorEmitter.on('atomic:selected', (key) => {
    // console.log('Atomic block is selected: ' + key)
    selectedAtomicBlockKey = key
  })

  return {

    /**
     * Customer block renderer resolver
     * @param  {ContentBlock} contentBlock The draft `ContentBlock` object to
     * render
     * @return {Object} A compatible renderer object definition
     */
    blockRendererFn (contentBlock, {getEditorState, setEditorState}) {
      const type = contentBlock.getType()
      // Pull out the renderer from our `blockSet` object
      if (type && blockSet[type]) {
        // Add the get/set state methods to the atomic set of `props`
        if (type === 'atomic') {
          const atomicProps = mergeDefaults({
            editorEmitter,
            embeddableForms,
            setReadOnly,
            remove: function (key) {
              setEditorState(
                removeAtomicBlock(key, getEditorState())
              )
            },
          }, blockSet[type].props)
          return mergeDefaults({}, {props: atomicProps}, blockSet[type])
        }
        return blockSet[type]
      }
    },

    /**
     * @param  {KeyboardEvent} e Synthetic keyboard event from draftjs
     * @return {Command} String command based on the keyboard event
     */
    keyBindingFn (e, {getEditorState, setEditorState}) {
      if (selectedAtomicBlockKey !== null) {
        // 46 = DELETE, 8 = BACKSPACE
        if (e.keyCode === 46) {
          return commands.DELETE_BLOCK
        } else if (e.keyCode === 8) {
          return commands.BACKSPACE_BLOCK
        } else {
          // Move the selection to the block below so that the content pla
          const editorState = getEditorState()
          const selection = editorState.getSelection()
          let contentState = editorState.getCurrentContent()
          const nextBlockKey = getNextBlockKey(selectedAtomicBlockKey, editorState)
          contentState = contentState.merge({
            selectionBefore: selection,
            selectionAfter: selection.merge({
              anchorKey: nextBlockKey,
              focusKey: nextBlockKey
            })
          })
          setEditorState(
            EditorState.push(editorState, contentState)
          )
        }
      }
    },

    /**
     * Handle our custom command
     * @param  {String} command
     * @param  {Function} options.getEditorState
     * @param  {Function} options.setEditorState
     * @return {Boolean} Did we handle it?
     */
    handleKeyCommand (command, { getEditorState, setEditorState }) {
      // Handle deletion of atomic blocks using our custom commands
      if (command === commands.DELETE_BLOCK) {
        const editorState = getEditorState()
        const selection = editorState.getSelection()
        if (selection.isCollapsed()) {
          setEditorState(
            removeAtomicBlock(selectedAtomicBlockKey, editorState, true)
          )
          return true
        }
      } else if (command === commands.BACKSPACE_BLOCK) {
        const editorState = getEditorState()
        const selection = editorState.getSelection()
        if (selection.isCollapsed()) {
          setEditorState(
            removeAtomicBlock(selectedAtomicBlockKey, editorState, false)
          )
          return true
        }
      } else if (command === 'delete') {
        const editorState = getEditorState()
        const contentState = editorState.getCurrentContent()
        const selection = editorState.getSelection()
        // At the end of the block?
        const selectedBlockKey = selection.getAnchorKey()
        const selectedBlock = contentState.getBlockForKey(selectedBlockKey)
        if (selection.isCollapsed() && selection.getAnchorOffset() === selectedBlock.getLength()) {
          // Check if the _next_ block is an atomic block
          let blockToCheckKey = getNextBlockKey(selectedBlockKey, editorState)

          if (blockToCheckKey && contentState.getBlockForKey(blockToCheckKey).getType() === 'atomic') {
            setEditorState(
              removeAtomicBlock(blockToCheckKey, editorState, false)
            )
            return true
          }
        }
      } else if (command === 'backspace') {
        const editorState = getEditorState()
        const selection = editorState.getSelection()
        if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
          const contentState = editorState.getCurrentContent()
          // Check if the _next_ block is an atomic block
          let blockToCheckKey = getPreviousBlockKey(selection.getAnchorKey(), editorState)
          if (blockToCheckKey && contentState.getBlockForKey(blockToCheckKey).getType() === 'atomic') {
            setEditorState(
              removeAtomicBlock(blockToCheckKey, editorState, true)
            )
            return true
          }
        }
      }
      return false
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
