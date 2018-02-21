import React from 'react'
import {
  DefaultDraftBlockRenderMap,
  EditorState,
} from 'draft-js'
import mergeDefaults from '../../../../utils/merge-defaults'

// Components
import Toolbar from './toolbar'
import AtomicBlock from './blocks/atomic'
import PullquoteBlock from './blocks/pull-quote'
import HorizontalRuleBlock from './blocks/horizontal-rule'
import blockItemsGroupsMapping from './block-items/groups-mapping'
import {removeAtomicBlock, getNextBlockKey, getPreviousBlockKey} from '../utils'

const commands = {
  BACKSPACE_BLOCK: 'btp-backspace-block',
  DELETE_BLOCK: 'btp-delete-block',
  BACKSPACE_UNEDITABLE_BLOCK: 'btp-backspace-uneditable-block',
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
    'horizontal-rule',
  ],
  blockSet: {
    atomic: {
      component: AtomicBlock,
    },
    pullquote: {
      component: PullquoteBlock,
    },
    'horizontal-rule': {
      component: HorizontalRuleBlock,
      editable: false,
    },
  },
  blockRenderMap: {
    pullquote: {
      element: 'blockquote',
    },
    'horizontal-rule': {
      element: 'div',
    },
  },
}

/**
 * Reduce grouops and return a list of editable types
 * @param  {Array} groups
 * @return {Array}
 */
function getEditableBlockTypesFromGroups (groups) {
  return groups.reduce((a, b) => a.concat(b), [])
    .filter((item) => {
      return item.editable !== false
    })
    .map((item) => item.type)
}

/**
 * Remove the block before the current one
 * @param  {EditorState} editorState Current editor state
 * @return {EditorState} Updated editor state
 */
function removeBlockBeforeCurrent (editorState) {
  const selection = editorState.getSelection()
  const contentState = editorState.getCurrentContent()
  const previousBlock = contentState.getBlockBefore(selection.getEndKey())
  const blockMap = contentState.getBlockMap()
  // Split the blocks
  const blocksBefore = blockMap.toSeq().takeUntil(function (v) {
    return v === previousBlock
  })
  const blocksAfter = blockMap.toSeq().skipUntil(function (v) {
    return v === previousBlock
  }).rest()
  // Rejoin without the current block
  const newBlocks = blocksBefore.concat(blocksAfter).toOrderedMap()
  const newContentState = contentState.merge({
    blockMap: newBlocks,
    selectionBefore: selection,
    selectionAfter: selection,
  })
  return EditorState.push(editorState, newContentState, 'remove-range')
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
  let blockItemsGroups = blockItemsGroupsMapping.map((group) => {
    return group.filter((item) => blockFormatters.indexOf(item.type) > -1)
  }).filter((group) => {
    return group.length > 0
  })
  // Suck in editable attributes from the blockSet definitions since they
  // need to be defined there to pass into draft.
  blockItemsGroups.map((group) => {
    return group.map((item) => {
      const blockSetDefinition = blockSet[item.type]
      if (blockSetDefinition && blockSetDefinition.editable === false) {
        item.editable = false
      }
      return item
    })
  })
  const editableBlockTypes = getEditableBlockTypesFromGroups(blockItemsGroups)

  // Keep track of when an atomic block is selected
  editorEmitter.on('change', (key) => {
    selectedAtomicBlockKey = null
  })
  editorEmitter.on('atomic:selected', (key) => {
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
            remove: function (key, options) {
              setEditorState(
                removeAtomicBlock(key, getEditorState()),
                options
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
          const editorState = getEditorState()
          // Move the selection to the block below so that the content pla
          const selection = editorState.getSelection()
          let contentState = editorState.getCurrentContent()
          const nextBlockKey = getNextBlockKey(selectedAtomicBlockKey, editorState)
          contentState = contentState.merge({
            selectionBefore: selection,
            selectionAfter: selection.merge({
              anchorKey: nextBlockKey,
              focusKey: nextBlockKey,
            }),
          })
          setEditorState(
            EditorState.push(editorState, contentState)
          )
        }
      } else if (e.keyCode === 8) {
        const editorState = getEditorState()
        // Handle case where BACKSPACE before an uneditable block results in
        // screwed up selections
        const selection = editorState.getSelection()
        const contentState = editorState.getCurrentContent()
        const atStartOfBlock = selection.isCollapsed() && selection.getEndOffset() === 0
        // Are we at the start of the current block?
        if (atStartOfBlock) {
          const previousBlock = contentState.getBlockBefore(selection.getEndKey())
          const previousBlockEditable = editableBlockTypes.indexOf(previousBlock.getType()) > -1
          // Is previous block uneditable?
          if (!previousBlockEditable) {
            return commands.BACKSPACE_UNEDITABLE_BLOCK
          }
        }
      }
    },

    /**
     * Handle return when atomic blocks are selected
     */
    handleReturn (e, editorState, {setEditorState}) {
      if (selectedAtomicBlockKey !== null) {
        // Move the selection to the block below so that the content pla
        const selection = editorState.getSelection()
        let contentState = editorState.getCurrentContent()
        const nextBlockKey = getNextBlockKey(selectedAtomicBlockKey, editorState)
        contentState = contentState.merge({
          selectionBefore: selection,
          selectionAfter: selection.merge({
            anchorKey: nextBlockKey,
            focusKey: nextBlockKey,
          }),
        })
        setEditorState(
          EditorState.push(editorState, contentState)
        )
        return true
      }
      return false
    },

    /**
     * Handle our custom command
     * @param  {String} command
     * @param  {EditorState} editorState The current editorState
     * @param  {Function} options.setEditorState
     * @return {Boolean} Did we handle it?
     */
    handleKeyCommand (command, editorState, { setEditorState }) {
      // Handle deletion of atomic blocks using our custom commands
      if (command === commands.DELETE_BLOCK) {
        const selection = editorState.getSelection()
        if (selection.isCollapsed()) {
          setEditorState(
            removeAtomicBlock(selectedAtomicBlockKey, editorState, true)
          )
          return true
        }
      } else if (command === commands.BACKSPACE_BLOCK) {
        const selection = editorState.getSelection()
        if (selection.isCollapsed()) {
          setEditorState(
            removeAtomicBlock(selectedAtomicBlockKey, editorState, false)
          )
          return true
        }
      } else if (command === commands.BACKSPACE_UNEDITABLE_BLOCK) {
        setEditorState(
          removeBlockBeforeCurrent(editorState)
        )
        return true
      } else if (command === 'delete') {
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
        editableBlockTypes,
        embeddableForms,
      }, props)
      return (
        <Toolbar {...props} />
      )
    },
  }
}
