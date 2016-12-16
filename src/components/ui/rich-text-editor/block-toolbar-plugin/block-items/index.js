import React from 'react'
import classNames from 'classnames'
import {
  genKey,
  ContentBlock,
  EditorState,
  RichUtils,
} from 'draft-js'
import {List} from 'immutable'
import styles from './block-items.mcss'

/**
 * Find the current block type to apply from the list of `types`, rotating
 * through the list.
 * @param  {String} currentType Name of the current block type
 * @param  {Array} types List of the allowed types
 * @return {String} Name of the next block type to apply
 */
function getNextBlockTypeToApply (currentType, types) {
  const index = types.indexOf(currentType)
  if (index === -1) {
    return types[0]
  } else if (index < types.length - 1) {
    return types[index + 1]
  }
  return 'unstyled'
}

/**
 * Insert a new block of `blockType` after the current block
 * @param  {EditorState} editorState
 * @param  {String} blockType Block type to insert
 * @param  {Array} editableBlockTypes List of editable types
 * @return {EditorState} Modified EditorState
 */
function insertBlockAfterCurrentBlock (editorState, blockType, editableBlockTypes) {
  const selection = editorState.getSelection()
  const contentState = editorState.getCurrentContent()
  const currentBlock = contentState.getBlockForKey(selection.getEndKey())

  const blockMap = contentState.getBlockMap()
  // Split the blocks
  const blocksBefore = blockMap.toSeq().takeUntil(function (v) {
    return v === currentBlock
  })
  const blocksAfter = blockMap.toSeq().skipUntil(function (v) {
    return v === currentBlock
  }).rest()

  const newBlockKey = genKey()
  const emptyBlockKey = genKey()
  let newBlocks = [
    [currentBlock.getKey(), currentBlock],
    [newBlockKey, new ContentBlock({
      key: newBlockKey,
      type: blockType,
      text: '',
      characterList: List(),
    })]
  ]
  // If current block is the last block, or the next block isn't editable,
  // ensure we inject a new editable block afterwards to try and keep the editor
  // state reasonably consistent.
  const nextBlock = contentState.getBlockAfter(currentBlock.getKey())
  const nextBlockIsEditable = nextBlock && editableBlockTypes.indexOf(nextBlock.getType()) > -1
  const isLastBlock = currentBlock === contentState.getLastBlock()
  if (!nextBlockIsEditable || isLastBlock) {
    newBlocks = newBlocks.concat([
      [emptyBlockKey, new ContentBlock({
        key: emptyBlockKey,
        type: 'unstyled',
        text: '',
        characterList: List(),
      })]
    ])
  }

  const newBlockMap = blocksBefore.concat(newBlocks, blocksAfter).toOrderedMap()
  const newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection,
  })
  return EditorState.push(editorState, newContentState, 'insert-fragment')
}

/**
 * Block items buttons
 */
const BlockItems = React.createClass({
  propTypes: {
    currentBlockType: React.PropTypes.string,
    itemsGroups: React.PropTypes.array,
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getDefaultProps () {
    return {
      itemsGroups: [],
      editableBlockTypes: [],
    }
  },

  toggleBlockType (blockType) {
    const {editorState, onChange} = this.props
    const editable = (this.props.editableBlockTypes.indexOf(blockType) > -1)
    if (editable) {
      onChange(
        RichUtils.toggleBlockType(editorState, blockType)
      )
    } else {
      onChange(
        insertBlockAfterCurrentBlock(editorState, blockType, this.props.editableBlockTypes)
      )
    }
  },

  renderItemsGroups (itemsGroups) {
    const {currentBlockType} = this.props
    return itemsGroups.map((group) => {
      const types = group.map((item) => item.type)
      const activeIndex = types.indexOf(currentBlockType)
      const isActive = (activeIndex > -1)
      const displayItem = (isActive) ? group[activeIndex] : group[0]

      const buttonClassNames = classNames(
        styles.button,
        {
          [`${styles.buttonActive}`]: isActive,
        }
      )
      const iconWrapperClassNames = classNames(
        styles.iconWrapper,
        {
          [`${styles.iconWrapperActive}`]: isActive,
        }
      )

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return (
        <button key={displayItem.type} className={buttonClassNames} onClick={(e) => {
          e.preventDefault()
          const nextBlockType = getNextBlockTypeToApply(currentBlockType, types)
          this.toggleBlockType(nextBlockType)
        }}>
          {(displayItem.icon)
            ? <span
              title={displayItem.label}
              className={iconWrapperClassNames}
              dangerouslySetInnerHTML={{__html: displayItem.icon}}
            />
            : displayItem.label
          }
        </button>
      )
      /* eslint-enable react/jsx-no-bind */
    })
  },

  render () {
    const {itemsGroups} = this.props
    if (itemsGroups.length === 0) {
      return null
    }
    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return (
      <div className={styles.container}>
        <ul className={styles.list} onMouseDown={(e) => e.preventDefault()}>
          {this.renderItemsGroups(itemsGroups)}
        </ul>
      </div>
    )
    /* eslint-enable react/jsx-no-bind */
  },
})

export default BlockItems
