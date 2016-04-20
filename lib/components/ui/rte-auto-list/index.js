'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var UL_FULL_REGEX = /^(\*|\-)\s$/;
var UL_INTERCEPT_REGEX = /^(\*|\-)$/;
var OL_FULL_REGEX = /^\d\.\s$/;
var OL_INTERCEPT_REGEX = /^\d\.$/;

var characterMapping = {
  106: '*',
  110: '.',
  189: '-',
  190: '.',
  'shift': {
    56: '*'
  }
};

function trackCharacters() {
  var history = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var e = arguments[1];
  var keyCode = e.keyCode;
  var shiftKey = e.shiftKey;


  if (history.length > 2) {
    history = history.slice(1);
  } else {
    history = history.slice();
  }

  // Map the keyCodes to characters we care about
  var character = shiftKey ? characterMapping.shift[e.keyCode] : characterMapping[e.keyCode];
  if (!character) {
    character = String.fromCharCode(e.keyCode);
  }
  history.push(character);
  return history;
}

function autoList() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var previousKey = null;
  var keyCharsHistory = [];

  return {
    keyBindingFn: function keyBindingFn(e) {
      keyCharsHistory = trackCharacters(keyCharsHistory, e);
      if (UL_FULL_REGEX.test(keyCharsHistory.slice(-2).join(''))) {
        return 'autolist-unordered';
      } else if (OL_FULL_REGEX.test(keyCharsHistory.join(''))) {
        return 'autolist-ordered';
      }
      return (0, _draftJs.getDefaultKeyBinding)(e);
    },
    handleReturn: function handleReturn(e, _ref) {
      var getEditorState = _ref.getEditorState;
      var setEditorState = _ref.setEditorState;

      var editorState = getEditorState();
      var content = editorState.getCurrentContent();

      // Retrieve current block
      var selection = editorState.getSelection();
      var blockKey = selection.getStartKey();
      var block = content.getBlockForKey(blockKey);
      var blockType = block.getType();

      if (/list-item/.test(blockType) && block.getText() === '') {
        editorState = _draftJs.RichUtils.toggleBlockType(editorState, blockType);
        content = editorState.getCurrentContent();
        editorState = _draftJs.EditorState.forceSelection(editorState, content.getSelectionAfter());
        setEditorState(editorState);
        return true;
      }

      return false;
    },
    handleKeyCommand: function handleKeyCommand(command, _ref2) {
      var getEditorState = _ref2.getEditorState;
      var setEditorState = _ref2.setEditorState;

      if (/autolist/.test(command)) {
        var listType = 'unordered-list-item';
        var listTest = function listTest(text) {
          return UL_INTERCEPT_REGEX.test(text);
        };
        if (command === 'autolist-ordered') {
          listType = 'ordered-list-item';
          listTest = function listTest(text) {
            return OL_INTERCEPT_REGEX.test(text);
          };
        }

        var editorState = getEditorState();
        var content = editorState.getCurrentContent();

        // Retrieve block that's selected
        var selection = editorState.getSelection();
        var blockKey = selection.getStartKey();
        var block = content.getBlockForKey(blockKey);

        // Check if it matches our criteria for creating a list
        if (block.getType() === 'unstyled' && block.getDepth() === 0 && listTest(block.getText())) {
          // Convert the existing block to an unordered list
          editorState = _draftJs.RichUtils.toggleBlockType(editorState, listType);
          content = editorState.getCurrentContent();
          block = content.getBlockForKey(blockKey);

          // Select the entire block
          var blockSelection = new _draftJs.SelectionState({
            anchorKey: blockKey,
            anchorOffset: 0,
            focusKey: blockKey,
            focusOffset: block.getLength()
          });

          // Replace with the text with either nothing (if we created a list)
          // or the existing content
          content = _draftJs.Modifier.replaceText(content, blockSelection, '');
        } else {
          // We've intercepted the key press, so we needs to manually insert a
          // space
          content = _draftJs.Modifier.insertText(content, selection, ' ');
        }
        editorState = _draftJs.EditorState.push(editorState, content);
        editorState = _draftJs.EditorState.forceSelection(editorState, content.getSelectionAfter());
        setEditorState(editorState);
        return true;
      }
      return false;
    }
  };
}

exports.default = autoList;