'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

var _immutable = require('immutable');

var _blockItems = require('./block-items.mcss');

var _blockItems2 = _interopRequireDefault(_blockItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Find the current block type to apply from the list of `types`, rotating
 * through the list.
 * @param  {String} currentType Name of the current block type
 * @param  {Array} types List of the allowed types
 * @return {String} Name of the next block type to apply
 */
function getNextBlockTypeToApply(currentType, types) {
  var index = types.indexOf(currentType);
  if (index === -1) {
    return types[0];
  } else if (index < types.length - 1) {
    return types[index + 1];
  }
  return 'unstyled';
}

/**
 * Insert a new block of `blockType` after the current block
 * @param  {EditorState} editorState
 * @param  {String} blockType Block type to insert
 * @param  {Array} editableBlockTypes List of editable types
 * @return {EditorState} Modified EditorState
 */
function insertBlockAfterCurrentBlock(editorState, blockType, editableBlockTypes) {
  var selection = editorState.getSelection();
  var contentState = editorState.getCurrentContent();
  var currentBlock = contentState.getBlockForKey(selection.getEndKey());

  var blockMap = contentState.getBlockMap();
  // Split the blocks
  var blocksBefore = blockMap.toSeq().takeUntil(function (v) {
    return v === currentBlock;
  });
  var blocksAfter = blockMap.toSeq().skipUntil(function (v) {
    return v === currentBlock;
  }).rest();

  var newBlockKey = (0, _draftJs.genKey)();
  var emptyBlockKey = (0, _draftJs.genKey)();
  var newBlocks = [[currentBlock.getKey(), currentBlock], [newBlockKey, new _draftJs.ContentBlock({
    key: newBlockKey,
    type: blockType,
    text: '',
    characterList: (0, _immutable.List)()
  })]];
  // If current block is the last block, or the next block isn't editable,
  // ensure we inject a new editable block afterwards to try and keep the editor
  // state reasonably consistent.
  var nextBlock = contentState.getBlockAfter(currentBlock.getKey());
  var nextBlockIsEditable = nextBlock && editableBlockTypes.indexOf(nextBlock.getType()) > -1;
  var isLastBlock = currentBlock === contentState.getLastBlock();
  if (!nextBlockIsEditable || isLastBlock) {
    newBlocks = newBlocks.concat([[emptyBlockKey, new _draftJs.ContentBlock({
      key: emptyBlockKey,
      type: 'unstyled',
      text: '',
      characterList: (0, _immutable.List)()
    })]]);
  }

  var newBlockMap = blocksBefore.concat(newBlocks, blocksAfter).toOrderedMap();
  var newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection
  });
  return _draftJs.EditorState.push(editorState, newContentState, 'insert-fragment');
}

/**
 * Block items buttons
 */
var BlockItems = _react2.default.createClass({
  displayName: 'BlockItems',

  propTypes: {
    currentBlockType: _react2.default.PropTypes.string,
    itemsGroups: _react2.default.PropTypes.array,
    editableBlockTypes: _react2.default.PropTypes.array,
    editorState: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      itemsGroups: [],
      editableBlockTypes: []
    };
  },
  toggleBlockType: function toggleBlockType(blockType) {
    var _props = this.props;
    var editorState = _props.editorState;
    var onChange = _props.onChange;

    var editable = this.props.editableBlockTypes.indexOf(blockType) > -1;
    if (editable) {
      onChange(_draftJs.RichUtils.toggleBlockType(editorState, blockType));
    } else {
      onChange(insertBlockAfterCurrentBlock(editorState, blockType, this.props.editableBlockTypes));
    }
  },
  renderItemsGroups: function renderItemsGroups(itemsGroups) {
    var _this = this;

    var currentBlockType = this.props.currentBlockType;

    return itemsGroups.map(function (group) {
      var types = group.map(function (item) {
        return item.type;
      });
      var activeIndex = types.indexOf(currentBlockType);
      var isActive = activeIndex > -1;
      var displayItem = isActive ? group[activeIndex] : group[0];

      var buttonClassNames = (0, _classnames2.default)(_blockItems2.default.button, _defineProperty({}, '' + _blockItems2.default.buttonActive, isActive));
      var iconWrapperClassNames = (0, _classnames2.default)(_blockItems2.default.iconWrapper, _defineProperty({}, '' + _blockItems2.default.iconWrapperActive, isActive));

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return _react2.default.createElement(
        'button',
        { key: displayItem.type, className: buttonClassNames, onClick: function onClick(e) {
            e.preventDefault();
            var nextBlockType = getNextBlockTypeToApply(currentBlockType, types);
            _this.toggleBlockType(nextBlockType);
          } },
        displayItem.icon ? _react2.default.createElement('span', {
          title: displayItem.label,
          className: iconWrapperClassNames,
          dangerouslySetInnerHTML: { __html: displayItem.icon }
        }) : displayItem.label
      );
      /* eslint-enable react/jsx-no-bind */
    });
  },
  render: function render() {
    var itemsGroups = this.props.itemsGroups;

    if (itemsGroups.length === 0) {
      return null;
    }
    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return _react2.default.createElement(
      'div',
      { className: _blockItems2.default.container },
      _react2.default.createElement(
        'ul',
        { className: _blockItems2.default.list, onMouseDown: function onMouseDown(e) {
            return e.preventDefault();
          } },
        this.renderItemsGroups(itemsGroups)
      )
    );
    /* eslint-enable react/jsx-no-bind */
  }
});

exports.default = BlockItems;