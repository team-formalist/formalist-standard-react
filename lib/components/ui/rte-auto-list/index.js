'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

function autoList() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var previousKey = null;

  return {
    keyBindingFn: function keyBindingFn(e) {
      var currentKey = e.keyCode;
      // currentKey = space, previousKey = *
      if (currentKey === 32 && previousKey === 56) {
        previousKey = currentKey;
        return 'list-unordered';
      }
      previousKey = currentKey;
      return (0, _draftJs.getDefaultKeyBinding)(e);
    },
    handleKeyCommand: function handleKeyCommand(command, _ref) {
      var getEditorState = _ref.getEditorState;
      var setEditorState = _ref.setEditorState;

      if (command === 'list-unordered') {
        var editorState = getEditorState();
        var content = editorState.getCurrentContent();

        // Retrieve the current block
        var selection = editorState.getSelection();
        var blockKey = selection.getStartKey();
        var block = content.getBlockForKey(blockKey);

        // Check if it matches our criteria for creating a list
        if (block.getDepth() === 0 && block.getText() === "*") {
          // Convert the existing block to an unordered list
          editorState = _draftJs.RichUtils.toggleBlockType(editorState, 'unordered-list-item');
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
          // Insert a space
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