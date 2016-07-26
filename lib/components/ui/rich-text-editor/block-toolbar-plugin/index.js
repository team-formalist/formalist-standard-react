'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blockToolbarPlugin;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _draftJs = require('draft-js');

var _mergeDefaults = require('../../../../utils/merge-defaults');

var _mergeDefaults2 = _interopRequireDefault(_mergeDefaults);

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _atomic = require('./blocks/atomic');

var _atomic2 = _interopRequireDefault(_atomic);

var _pullQuote = require('./blocks/pull-quote');

var _pullQuote2 = _interopRequireDefault(_pullQuote);

var _groupsMapping = require('./block-items/groups-mapping');

var _groupsMapping2 = _interopRequireDefault(_groupsMapping);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasCommandModifier = _draftJs.KeyBindingUtil.hasCommandModifier;

// Components

var commands = {
  BACKSPACE_BLOCK: 'btp-backspace-block',
  DELETE_BLOCK: 'btp-delete-block'
};

var defaults = {
  blockFormatters: ['unstyled', 'header-one', 'header-two', 'unordered-list-item', 'ordered-list-item', 'blockquote', 'pullquote', 'code-block'],
  blockSet: {
    atomic: {
      component: _atomic2.default
    },
    pullquote: {
      component: _pullQuote2.default
    }
  },
  blockRenderMap: {
    pullquote: {
      element: 'blockquote'
    }
  }
};

/**
 * Plugin for the block toolbar

 * @param  {Array} options.blockFormatters Optional list of block commands to
 * allow. Will default to defaults.blockFormatters
 *
 * @return {Object} draft-js-editor-plugin compatible object
 */
function blockToolbarPlugin() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  // Default state
  var selectedAtomicBlockKey = null;

  // Pull out the options
  options = (0, _mergeDefaults2.default)({}, defaults, options);
  var _options = options;
  var blockFormatters = _options.blockFormatters;
  var blockRenderMap = _options.blockRenderMap;
  var blockSet = _options.blockSet;
  var editorEmitter = _options.editorEmitter;
  var embeddableForms = _options.embeddableForms;
  var setReadOnly = _options.setReadOnly;

  // Filter out the un-allowed block-item types

  var blockItemsGroups = _groupsMapping2.default.map(function (group) {
    return group.filter(function (item) {
      return blockFormatters.indexOf(item.type) > -1;
    });
  }).filter(function (group) {
    return group.length > 0;
  });

  // Keep track of when an atomic block is selected
  editorEmitter.on('change', function (key) {
    // console.log('Set no atomic selected')
    selectedAtomicBlockKey = null;
  });
  editorEmitter.on('atomic:selected', function (key) {
    // console.log('Atomic block is selected: ' + key)
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
      var getEditorState = _ref.getEditorState;
      var setEditorState = _ref.setEditorState;

      var type = contentBlock.getType();
      // Pull out the renderer from our `blockSet` object
      if (type && blockSet[type]) {
        // Add the get/set state methods to the atomic set of `props`
        if (type === 'atomic') {
          var atomicProps = (0, _mergeDefaults2.default)({
            editorEmitter: editorEmitter,
            embeddableForms: embeddableForms,
            setReadOnly: setReadOnly,
            remove: function remove(key) {
              setEditorState((0, _utils.removeAtomicBlock)(key, getEditorState()));
            }
          }, blockSet[type].props);
          return (0, _mergeDefaults2.default)({}, { props: atomicProps }, blockSet[type]);
        }
        return blockSet[type];
      }
    },


    /**
     * @param  {KeyboardEvent} e Synthetic keyboard event from draftjs
     * @return {Command} String command based on the keyboard event
     */
    keyBindingFn: function keyBindingFn(e, _ref2) {
      var getEditorState = _ref2.getEditorState;
      var setEditorState = _ref2.setEditorState;

      if (selectedAtomicBlockKey !== null) {
        // 46 = DELETE, 8 = BACKSPACE
        if (e.keyCode === 46) {
          return commands.DELETE_BLOCK;
        } else if (e.keyCode === 8) {
          return commands.BACKSPACE_BLOCK;
        } else {
          // Move the selection to the block below so that the content pla
          var editorState = getEditorState();
          var selection = editorState.getSelection();
          var contentState = editorState.getCurrentContent();
          var nextBlockKey = (0, _utils.getNextBlockKey)(selectedAtomicBlockKey, editorState);
          contentState = contentState.merge({
            selectionBefore: selection,
            selectionAfter: selection.merge({
              anchorKey: nextBlockKey,
              focusKey: nextBlockKey
            })
          });
          setEditorState(_draftJs.EditorState.push(editorState, contentState));
        }
      }
    },


    /**
     * Handle return when atomic blocks are selected
     */
    handleReturn: function handleReturn(e, _ref3) {
      var getEditorState = _ref3.getEditorState;
      var setEditorState = _ref3.setEditorState;

      if (selectedAtomicBlockKey !== null) {
        // Move the selection to the block below so that the content pla
        var editorState = getEditorState();
        var selection = editorState.getSelection();
        var contentState = editorState.getCurrentContent();
        var nextBlockKey = (0, _utils.getNextBlockKey)(selectedAtomicBlockKey, editorState);
        contentState = contentState.merge({
          selectionBefore: selection,
          selectionAfter: selection.merge({
            anchorKey: nextBlockKey,
            focusKey: nextBlockKey
          })
        });
        setEditorState(_draftJs.EditorState.push(editorState, contentState));
        return true;
      }
      return false;
    },


    /**
     * Handle our custom command
     * @param  {String} command
     * @param  {Function} options.getEditorState
     * @param  {Function} options.setEditorState
     * @return {Boolean} Did we handle it?
     */
    handleKeyCommand: function handleKeyCommand(command, _ref4) {
      var getEditorState = _ref4.getEditorState;
      var setEditorState = _ref4.setEditorState;

      // Handle deletion of atomic blocks using our custom commands
      if (command === commands.DELETE_BLOCK) {
        var editorState = getEditorState();
        var selection = editorState.getSelection();
        if (selection.isCollapsed()) {
          setEditorState((0, _utils.removeAtomicBlock)(selectedAtomicBlockKey, editorState, true));
          return true;
        }
      } else if (command === commands.BACKSPACE_BLOCK) {
        var _editorState = getEditorState();
        var _selection = _editorState.getSelection();
        if (_selection.isCollapsed()) {
          setEditorState((0, _utils.removeAtomicBlock)(selectedAtomicBlockKey, _editorState, false));
          return true;
        }
      } else if (command === 'delete') {
        var _editorState2 = getEditorState();
        var contentState = _editorState2.getCurrentContent();
        var _selection2 = _editorState2.getSelection();
        // At the end of the block?
        var selectedBlockKey = _selection2.getAnchorKey();
        var selectedBlock = contentState.getBlockForKey(selectedBlockKey);
        if (_selection2.isCollapsed() && _selection2.getAnchorOffset() === selectedBlock.getLength()) {
          // Check if the _next_ block is an atomic block
          var blockToCheckKey = (0, _utils.getNextBlockKey)(selectedBlockKey, _editorState2);

          if (blockToCheckKey && contentState.getBlockForKey(blockToCheckKey).getType() === 'atomic') {
            setEditorState((0, _utils.removeAtomicBlock)(blockToCheckKey, _editorState2, false));
            return true;
          }
        }
      } else if (command === 'backspace') {
        var _editorState3 = getEditorState();
        var _selection3 = _editorState3.getSelection();
        if (_selection3.isCollapsed() && _selection3.getAnchorOffset() === 0) {
          var _contentState = _editorState3.getCurrentContent();
          // Check if the _next_ block is an atomic block
          var _blockToCheckKey = (0, _utils.getPreviousBlockKey)(_selection3.getAnchorKey(), _editorState3);
          if (_blockToCheckKey && _contentState.getBlockForKey(_blockToCheckKey).getType() === 'atomic') {
            setEditorState((0, _utils.removeAtomicBlock)(_blockToCheckKey, _editorState3, true));
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
    blockRenderMap: _draftJs.DefaultDraftBlockRenderMap.merge(blockRenderMap),

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
        embeddableForms: embeddableForms
      }, props);
      return _react2.default.createElement(_toolbar2.default, props);
    }
  };
}