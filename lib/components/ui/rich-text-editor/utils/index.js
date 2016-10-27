'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAtomicBlock = removeAtomicBlock;
exports.getNextBlockKey = getNextBlockKey;
exports.getPreviousBlockKey = getPreviousBlockKey;
exports.getSelectedEntityKey = getSelectedEntityKey;
exports.getSelectedEntityTypes = getSelectedEntityTypes;
exports.belongsToAtomicBlock = belongsToAtomicBlock;

var _draftJs = require('draft-js');

function uniq(e, i, arr) {
  return arr.lastIndexOf(e) === i;
}

/**
 * Remove an atomic block with a `key` and return an `editorState`
 *
 * @param  {[type]}  key         [description]
 * @param  {[type]}  editorState [description]
 * @param  {Boolean} focusAfter  [description]
 * @return {[type]}              [description]
 */
function removeAtomicBlock(key, editorState) {
  var focusAfter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

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

/**
 * Naively assumes a singular block for now.
 */
function getCharacterListForSelection(editorState, selection) {
  selection = selection || editorState.getSelection();
  var startKey = selection.getStartKey();
  var startOffset = selection.getStartOffset();
  var endOffset = selection.getEndOffset();
  var contentState = editorState.getCurrentContent();
  var currentBlock = contentState.getBlockForKey(startKey);
  return currentBlock.getCharacterList().slice(startOffset, endOffset);
}

/**
 * getSelectedEntityKey
 */

function getSelectedEntityKey(editorState) {
  var currentSelection = editorState.getSelection();
  var startKey = currentSelection.getStartKey();
  var endKey = currentSelection.getEndKey();
  var isSameBlock = startKey === endKey;
  // Only check if we’re in a single block
  if (isSameBlock && !currentSelection.isCollapsed()) {
    var characterList = getCharacterListForSelection(editorState, currentSelection);
    var entities = characterList.map(function (character) {
      return character.getEntity();
    }).filter(uniq);
    // If we have one entity for the entire string, return it
    if (entities.count() === 1) {
      return entities.first();
    }
  }
  // Default to returning false
  return false;
}

/**
 * getSelectedEntityTypes
 */

function getSelectedEntityTypes(editorState) {
  var currentSelection = editorState.getSelection();
  var startKey = currentSelection.getStartKey();
  var endKey = currentSelection.getEndKey();
  var isSameBlock = startKey === endKey;
  // Only check if we’re in a single block
  if (isSameBlock && !currentSelection.isCollapsed()) {
    var characterList = getCharacterListForSelection(editorState, currentSelection);
    var entities = characterList.map(function (character) {
      var entityKey = character.getEntity();
      return entityKey ? _draftJs.Entity.get(entityKey).getType() : null;
    }).filter(uniq);

    if (entities.count() > 0) {
      return entities;
    }
  }
  // Default to returning false
  return false;
}

/**
 * Belongs to Atomic Block
 * Iterates through the parents of `target` and determines whether it is or
 * is contained by an atomic block by looking for a specific attr
 */

function belongsToAtomicBlock(target) {
  if (!target || target.parentNode == null) {
    return false;
  }
  var isAtomic = target.getAttribute('data-atomic');
  if (isAtomic) {
    return true;
  } else {
    return belongsToAtomicBlock(target.parentNode);
  }
}