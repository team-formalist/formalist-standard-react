import {
  EditorState,
  Entity,
} from 'draft-js'

function uniq (e, i, arr) {
  return arr.lastIndexOf(e) === i
}

/**
 * Remove an atomic block with a `key` and return an `editorState`
 *
 * @param  {[type]}  key         [description]
 * @param  {[type]}  editorState [description]
 * @param  {Boolean} focusAfter  [description]
 * @return {[type]}              [description]
 */
export function removeAtomicBlock (key, editorState, focusAfter = true) {
  const selection = editorState.getSelection()
  let contentState = editorState.getCurrentContent()
  let blockMap = contentState.getBlockMap()
  const blockKeys = blockMap.keySeq().toJS()
  const selectedBlockIndex = blockKeys.indexOf(key)

  // Next selection props
  let selectionBlockIndex
  let selectionBlockKey
  let selectionOffset

  // Decide next focus based on deletion direction
  // focusAfter = select the previous block
  if (focusAfter === false) {
    selectionBlockIndex = selectedBlockIndex - 1
    const selectionBlock = blockMap.get(blockKeys[selectionBlockIndex])
    selectionBlockKey = selectionBlock.getKey()
    selectionOffset = selectionBlock.getLength()
  } else {
    selectionBlockIndex = selectedBlockIndex + 1
    const selectionBlock = blockMap.get(blockKeys[selectionBlockIndex])
    selectionBlockKey = selectionBlock.getKey()
    selectionOffset = 0
  }

  blockMap = blockMap.delete(key)
  contentState = contentState.merge({
    blockMap,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: selectionBlockKey,
      anchorOffset: selectionOffset,
      focusKey: selectionBlockKey,
      focusOffset: selectionOffset,
      isBackward: false,
    }),
  })
  // Set the state
  return EditorState.push(editorState, contentState, 'delete-character')
}

/**
 * Get the key of the next block from the passed `currentBlockKey`
 *
 * @param  {String} currentBlockKey The current block key for context.
 * @param  {EditorState} editorState The editor state to look through
 * @return {Mixed} The string of the next block’s key or `null` if there is none
 */
export function getNextBlockKey (currentBlockKey, editorState) {
  const surroundingBlockKeys = getSurroundingBlockKeys(currentBlockKey, editorState)
  return surroundingBlockKeys[1]
}

/**
 * Get the key of the previous block from the passed `currentBlockKey`
 *
 * @param  {String} currentBlockKey The current block key for context.
 * @param  {EditorState} editorState The editor state to look through
 * @return {Mixed} The string of the previous block’s key or `null` if there is none
 */
export function getPreviousBlockKey (currentBlockKey, editorState) {
  const surroundingBlockKeys = getSurroundingBlockKeys(currentBlockKey, editorState)
  return surroundingBlockKeys[0]
}

/**
 * Retrieve the next/previous blocks given a `currentBlockKey`
 * @param  {String} currentBlockKey The current block key for context
 * @param  {EditorState} editorState The editor state to look through
 * @return {Array} An array of block keys `[prev, next]`
 */
function getSurroundingBlockKeys (currentBlockKey, editorState) {
  const contentState = editorState.getCurrentContent()
  const blockMapKeys = contentState
    .getBlocksAsArray()
    .map((block) => {
      return block.getKey()
    })
  const selectedBlockIndex = blockMapKeys.indexOf(currentBlockKey)
  return [
    blockMapKeys[selectedBlockIndex - 1],
    blockMapKeys[selectedBlockIndex + 1],
  ]
}

/**
 * Naively assumes a singular block for now.
 */
function getCharacterListForSelection (editorState, selection) {
  selection = selection || editorState.getSelection()
  const startKey = selection.getStartKey()
  const startOffset = selection.getStartOffset()
  const endOffset = selection.getEndOffset()
  const contentState = editorState.getCurrentContent()
  const currentBlock = contentState.getBlockForKey(startKey)
  return currentBlock.getCharacterList().slice(startOffset, endOffset)
}

/**
 * getSelectedEntityKey
 */

export function getSelectedEntityKey (editorState) {
  const currentSelection = editorState.getSelection()
  const startKey = currentSelection.getStartKey()
  const endKey = currentSelection.getEndKey()
  const isSameBlock = startKey === endKey
  // Only check if we’re in a single block
  if (isSameBlock && !currentSelection.isCollapsed()) {
    const characterList = getCharacterListForSelection(editorState, currentSelection)
    const entities = characterList.map((character) => {
      return character.getEntity()
    }).filter(uniq)
    // If we have one entity for the entire string, return it
    if (entities.count() === 1) {
      return entities.first()
    }
  }
  // Default to returning false
  return false
}

/**
 * getSelectedEntityTypes
 */

export function getSelectedEntityTypes (editorState) {
  const currentSelection = editorState.getSelection()
  const startKey = currentSelection.getStartKey()
  const endKey = currentSelection.getEndKey()
  const isSameBlock = startKey === endKey
  // Only check if we’re in a single block
  if (isSameBlock && !currentSelection.isCollapsed()) {
    const characterList = getCharacterListForSelection(editorState, currentSelection)
    const entities = characterList.map((character) => {
      const entityKey = character.getEntity()
      return (entityKey) ? Entity.get(entityKey).getType() : null
    }).filter(uniq)

    if (entities.count() > 0) {
      return entities
    }
  }
  // Default to returning false
  return false
}
