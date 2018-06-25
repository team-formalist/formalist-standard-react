var _jsxFileName = "src/components/ui/rich-text-editor/block-toolbar-plugin/index.js";
import React from "react";
import { DefaultDraftBlockRenderMap, EditorState } from "draft-js";
import mergeDefaults from "../../../../utils/merge-defaults";

// Components
import Toolbar from "./toolbar";
import AtomicBlock from "./blocks/atomic";
import PullquoteBlock from "./blocks/pull-quote";
import HorizontalRuleBlock from "./blocks/horizontal-rule";
import blockItemsGroupsMapping from "./block-items/groups-mapping";
import { removeAtomicBlock, getNextBlockKey, getPreviousBlockKey } from "../utils";

var commands = {
  BACKSPACE_BLOCK: "btp-backspace-block",
  DELETE_BLOCK: "btp-delete-block",
  BACKSPACE_UNEDITABLE_BLOCK: "btp-backspace-uneditable-block"
};

var defaults = {
  blockFormatters: ["unstyled", "header-one", "header-two", "unordered-list-item", "ordered-list-item", "blockquote", "pullquote", "code-block", "horizontal-rule"],
  blockSet: {
    atomic: {
      component: AtomicBlock
    },
    pullquote: {
      component: PullquoteBlock
    },
    "horizontal-rule": {
      component: HorizontalRuleBlock,
      editable: false
    }
  },
  blockRenderMap: {
    pullquote: {
      element: "blockquote"
    },
    "horizontal-rule": {
      element: "div"
    }
  }
};

/**
 * Reduce groups and return a list of editable types
 * @param  {Array} groups
 * @return {Array}
 */
function getEditableBlockTypesFromGroups(groups) {
  return groups.reduce(function (a, b) {
    return a.concat(b);
  }, []).filter(function (item) {
    return item.editable !== false;
  }).map(function (item) {
    return item.type;
  });
}

/**
 * Remove the block before the current one
 * @param  {EditorState} editorState Current editor state
 * @return {EditorState} Updated editor state
 */
function removeBlockBeforeCurrent(editorState) {
  var selection = editorState.getSelection();
  var contentState = editorState.getCurrentContent();
  var previousBlock = contentState.getBlockBefore(selection.getEndKey());
  var blockMap = contentState.getBlockMap();
  // Split the blocks
  var blocksBefore = blockMap.toSeq().takeUntil(function (v) {
    return v === previousBlock;
  });
  var blocksAfter = blockMap.toSeq().skipUntil(function (v) {
    return v === previousBlock;
  }).rest();
  // Rejoin without the current block
  var newBlocks = blocksBefore.concat(blocksAfter).toOrderedMap();
  var newContentState = contentState.merge({
    blockMap: newBlocks,
    selectionBefore: selection,
    selectionAfter: selection
  });
  return EditorState.push(editorState, newContentState, "remove-range");
}

/**
 * Plugin for the block toolbar

 * @param  {Array} options.blockFormatters Optional list of block commands to
 * allow. Will default to defaults.blockFormatters
 *
 * @return {Object} draft-js-editor-plugin compatible object
 */
export default function blockToolbarPlugin() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Default state
  var selectedAtomicBlockKey = null;

  // Pull out the options
  options = mergeDefaults({}, defaults, options);
  var _options = options,
      blockFormatters = _options.blockFormatters,
      blockRenderMap = _options.blockRenderMap,
      blockSet = _options.blockSet,
      fieldBus = _options.fieldBus,
      editorEmitter = _options.editorEmitter,
      embeddableForms = _options.embeddableForms,
      setReadOnly = _options.setReadOnly;

  // Filter out the un-allowed block-item types

  var blockItemsGroups = blockItemsGroupsMapping.map(function (group) {
    return group.filter(function (item) {
      return blockFormatters.indexOf(item.type) > -1;
    });
  }).filter(function (group) {
    return group.length > 0;
  });
  // Suck in editable attributes from the blockSet definitions since they
  // need to be defined there to pass into draft.
  blockItemsGroups.map(function (group) {
    return group.map(function (item) {
      var blockSetDefinition = blockSet[item.type];
      if (blockSetDefinition && blockSetDefinition.editable === false) {
        item.editable = false;
      }
      return item;
    });
  });
  var editableBlockTypes = getEditableBlockTypesFromGroups(blockItemsGroups);

  // Keep track of when an atomic block is selected
  editorEmitter.on('change', function (key) {
    selectedAtomicBlockKey = null;
  });
  editorEmitter.on('atomic:selected', function (key) {
    selectedAtomicBlockKey = key;
  });

  return {
    /**
     * Customer block renderer resolver
     * @param  {ContentBlock} contentBlock The draft `ContentBlock` object to
     * render
     * @return {Object} A compatible renderer object definition
     */
    blockRendererFn: function blockRendererFn(contentBlock, _ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;

      var type = contentBlock.getType();
      // Pull out the renderer from our `blockSet` object
      if (type && blockSet[type]) {
        // Add the get/set state methods to the atomic set of `props`
        if (type === "atomic") {
          var atomicProps = mergeDefaults({
            editorEmitter: editorEmitter,
            embeddableForms: embeddableForms,
            fieldBus: fieldBus,
            setReadOnly: setReadOnly,
            remove: function remove(key) {
              setEditorState(removeAtomicBlock(key, getEditorState()));
            }
          }, blockSet[type].props);
          return mergeDefaults({}, { props: atomicProps }, blockSet[type]);
        }
        return blockSet[type];
      }
    },


    /**
     * @param  {KeyboardEvent} e Synthetic keyboard event from draftjs
     * @return {Command} String command based on the keyboard event
     */
    keyBindingFn: function keyBindingFn(e, _ref2) {
      var getEditorState = _ref2.getEditorState,
          setEditorState = _ref2.setEditorState;

      if (selectedAtomicBlockKey !== null) {
        // 46 = DELETE, 8 = BACKSPACE
        if (e.keyCode === 46) {
          return commands.DELETE_BLOCK;
        } else if (e.keyCode === 8) {
          return commands.BACKSPACE_BLOCK;
        } else {
          var editorState = getEditorState();
          // Move the selection to the block below so that the content pla
          var selection = editorState.getSelection();
          var contentState = editorState.getCurrentContent();
          var nextBlockKey = getNextBlockKey(selectedAtomicBlockKey, editorState);
          contentState = contentState.merge({
            selectionBefore: selection,
            selectionAfter: selection.merge({
              anchorKey: nextBlockKey,
              focusKey: nextBlockKey
            })
          });
          setEditorState(EditorState.push(editorState, contentState));
        }
      } else if (e.keyCode === 8) {
        var _editorState = getEditorState();
        // Handle case where BACKSPACE before an uneditable block results in
        // screwed up selections
        var _selection = _editorState.getSelection();
        var _contentState = _editorState.getCurrentContent();
        var atStartOfBlock = _selection.isCollapsed() && _selection.getEndOffset() === 0;
        // Are we at the start of the current block?
        if (atStartOfBlock) {
          var previousBlock = _contentState.getBlockBefore(_selection.getEndKey());
          var previousBlockEditable = editableBlockTypes.indexOf(previousBlock.getType()) > -1;
          // Is previous block uneditable?
          if (!previousBlockEditable) {
            return commands.BACKSPACE_UNEDITABLE_BLOCK;
          }
        }
      }
    },


    /**
     * Handle return when atomic blocks are selected
     */
    handleReturn: function handleReturn(e, editorState, _ref3) {
      var setEditorState = _ref3.setEditorState;

      if (selectedAtomicBlockKey !== null) {
        // Move the selection to the block below so that the content pla
        var selection = editorState.getSelection();
        var contentState = editorState.getCurrentContent();
        var nextBlockKey = getNextBlockKey(selectedAtomicBlockKey, editorState);
        contentState = contentState.merge({
          selectionBefore: selection,
          selectionAfter: selection.merge({
            anchorKey: nextBlockKey,
            focusKey: nextBlockKey
          })
        });
        setEditorState(EditorState.push(editorState, contentState));
        return true;
      }
      return false;
    },


    /**
     * Handle our custom command
     * @param  {String} command
     * @param  {EditorState} editorState The current editorState
     * @param  {Function} options.setEditorState
     * @return {Boolean} Did we handle it?
     */
    handleKeyCommand: function handleKeyCommand(command, editorState, _ref4) {
      var setEditorState = _ref4.setEditorState;

      // Handle deletion of atomic blocks using our custom commands
      if (command === commands.DELETE_BLOCK) {
        var selection = editorState.getSelection();
        if (selection.isCollapsed()) {
          setEditorState(removeAtomicBlock(selectedAtomicBlockKey, editorState, true));
          return true;
        }
      } else if (command === commands.BACKSPACE_BLOCK) {
        var _selection2 = editorState.getSelection();
        if (_selection2.isCollapsed()) {
          setEditorState(removeAtomicBlock(selectedAtomicBlockKey, editorState, false));
          return true;
        }
      } else if (command === commands.BACKSPACE_UNEDITABLE_BLOCK) {
        setEditorState(removeBlockBeforeCurrent(editorState));
        return true;
      } else if (command === "delete") {
        var contentState = editorState.getCurrentContent();
        var _selection3 = editorState.getSelection();
        // At the end of the block?
        var selectedBlockKey = _selection3.getAnchorKey();
        var selectedBlock = contentState.getBlockForKey(selectedBlockKey);
        if (_selection3.isCollapsed() && _selection3.getAnchorOffset() === selectedBlock.getLength()) {
          // Check if the _next_ block is an atomic block
          var blockToCheckKey = getNextBlockKey(selectedBlockKey, editorState);

          if (blockToCheckKey && contentState.getBlockForKey(blockToCheckKey).getType() === "atomic") {
            setEditorState(removeAtomicBlock(blockToCheckKey, editorState, false));
            return true;
          }
        }
      } else if (command === "backspace") {
        var _selection4 = editorState.getSelection();
        if (_selection4.isCollapsed() && _selection4.getAnchorOffset() === 0) {
          var _contentState2 = editorState.getCurrentContent();
          // Check if the _next_ block is an atomic block
          var _blockToCheckKey = getPreviousBlockKey(_selection4.getAnchorKey(), editorState);
          if (_blockToCheckKey && _contentState2.getBlockForKey(_blockToCheckKey).getType() === "atomic") {
            setEditorState(removeAtomicBlock(_blockToCheckKey, editorState, true));
            return true;
          }
        }
      }
      return false;
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
    BlockToolbar: function BlockToolbar(props) {
      // Merge a couple of props that are set up in the initial plugin
      // creation
      props = Object.assign({}, {
        blockItemsGroups: blockItemsGroups,
        editableBlockTypes: editableBlockTypes,
        embeddableForms: embeddableForms
      }, props);
      return React.createElement(Toolbar, Object.assign({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 360
        },
        __self: _this
      }));
    }
  };
}