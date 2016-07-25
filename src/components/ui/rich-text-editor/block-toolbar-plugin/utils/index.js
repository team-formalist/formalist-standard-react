import {
  EditorState,
} from 'draft-js'

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
      isBackward: false
    })
  })
  // Set the state
  return EditorState.push(editorState, contentState, 'delete-character')
}
