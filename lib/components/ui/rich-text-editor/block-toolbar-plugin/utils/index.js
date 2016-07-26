'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAtomicBlock = removeAtomicBlock;
exports.getNextBlockKey = getNextBlockKey;
exports.getPreviousBlockKey = getPreviousBlockKey;

var _draftJs = require('draft-js');

/**
 * Remove an atomic block with a `key` and return an `editorState`
 *
 * @param  {[type]}  key         [description]
 * @param  {[type]}  editorState [description]
 * @param  {Boolean} focusAfter  [description]
 * @return {[type]}              [description]
 */
function removeAtomicBlock(key, editorState) {
  var focusAfter = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  var selection = editorState.getSelection();
  var contentState = editorState.getCurrentContent();
  var blockMap = contentState.getBlockMap();
  var blockKeys = blockMap.keySeq().toJS();
  var selectedBlockIndex = blockKeys.indexOf(key);

  // Next selection props
  var selectionBlockIndex = void 0;
  var selectionBlockKey = void 0;
  var selectionOffset = void 0;

  // Decide next focus based on deletion direction
  // focusAfter = select the previous block
  if (focusAfter === false) {
    selectionBlockIndex = selectedBlockIndex - 1;
    var selectionBlock = blockMap.get(blockKeys[selectionBlockIndex]);
    selectionBlockKey = selectionBlock.getKey();
    selectionOffset = selectionBlock.getLength();
  } else {
    selectionBlockIndex = selectedBlockIndex + 1;
    var _selectionBlock = blockMap.get(blockKeys[selectionBlockIndex]);
    selectionBlockKey = _selectionBlock.getKey();
    selectionOffset = 0;
  }

  blockMap = blockMap.delete(key);
  contentState = contentState.merge({
    blockMap: blockMap,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: selectionBlockKey,
      anchorOffset: selectionOffset,
      focusKey: selectionBlockKey,
      focusOffset: selectionOffset,
      isBackward: false
    })
  });
  // Set the state
  return _draftJs.EditorState.push(editorState, contentState, 'delete-character');
}

/**
 * Get the key of the next block from the passed `currentBlockKey`
 *
 * @param  {String} currentBlockKey The current block key for context.
 * @param  {EditorState} editorState The editor state to look through
 * @return {Mixed} The string of the next block’s key or `null` if there is none
 */
function getNextBlockKey(currentBlockKey, editorState) {
  var surroundingBlockKeys = getSurroundingBlockKeys(currentBlockKey, editorState);
  return surroundingBlockKeys[1];
}

/**
 * Get the key of the previous block from the passed `currentBlockKey`
 *
 * @param  {String} currentBlockKey The current block key for context.
 * @param  {EditorState} editorState The editor state to look through
 * @return {Mixed} The string of the previous block’s key or `null` if there is none
 */
function getPreviousBlockKey(currentBlockKey, editorState) {
  var surroundingBlockKeys = getSurroundingBlockKeys(currentBlockKey, editorState);
  return surroundingBlockKeys[0];
}

/**
 * Retrieve the next/previous blocks given a `currentBlockKey`
 * @param  {String} currentBlockKey The current block key for context
 * @param  {EditorState} editorState The editor state to look through
 * @return {Array} An array of block keys `[prev, next]`
 */
function getSurroundingBlockKeys(currentBlockKey, editorState) {
  var contentState = editorState.getCurrentContent();
  var blockMapKeys = contentState.getBlocksAsArray().map(function (block) {
    return block.getKey();
  });
  var selectedBlockIndex = blockMapKeys.indexOf(currentBlockKey);
  return [blockMapKeys[selectedBlockIndex - 1], blockMapKeys[selectedBlockIndex + 1]];
}