var _jsxFileName = "src/components/ui/rich-text-editor/block-toolbar-plugin/block-items/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { genKey, ContentBlock, EditorState, RichUtils } from "draft-js";
import { List } from "immutable";
import * as styles from "./styles";

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
  return "unstyled";
}

/**
 * Insert a new block of `blockType` after the current block
 * @param  {EditorState} editorState
 * @param  {String} blockType Block type to insert
 * @param  {Array} editableBlockTypes List of editable types
 * @return {EditorState} Modified EditorState
 */
export function insertBlockAfterCurrentBlock(editorState, blockType, editableBlockTypes) {
  var selectInsertedBlock = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

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

  var newBlockKey = genKey();
  var selectedBlockKey = newBlockKey;
  var newBlocks = [[currentBlock.getKey(), currentBlock], [newBlockKey, new ContentBlock({
    key: newBlockKey,
    type: blockType,
    text: "",
    characterList: List()
  })]];
  // If current block is the last block, or the next block isn't editable,
  // ensure we inject a new editable block afterwards to try and keep the editor
  // state reasonably consistent.
  var nextBlock = contentState.getBlockAfter(currentBlock.getKey());
  var nextBlockIsEditable = nextBlock && editableBlockTypes.indexOf(nextBlock.getType()) > -1;
  var isLastBlock = currentBlock === contentState.getLastBlock();
  if (!nextBlockIsEditable || isLastBlock) {
    var emptyBlockKey = genKey();
    selectedBlockKey = emptyBlockKey;
    newBlocks = newBlocks.concat([[emptyBlockKey, new ContentBlock({
      key: emptyBlockKey,
      type: "unstyled",
      text: "",
      characterList: List()
    })]]);
  }

  var newBlockMap = blocksBefore.concat(newBlocks, blocksAfter).toOrderedMap();

  var selectionAfter = selection;
  if (selectInsertedBlock === true) {
    // Set selection to start of empty block
    selectionAfter = selectionAfter.merge({
      anchorKey: selectedBlockKey,
      anchorOffset: 0,
      focusKey: selectedBlockKey,
      focusOffset: 0,
      isBackward: false
    });
  }
  var newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selectionAfter
  });
  return EditorState.push(editorState, newContentState, "insert-fragment");
}

/**
 * Block items buttons
 */

var BlockItems = function (_React$Component) {
  _inherits(BlockItems, _React$Component);

  function BlockItems() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, BlockItems);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BlockItems.__proto__ || Object.getPrototypeOf(BlockItems)).call.apply(_ref, [this].concat(args))), _this), _this.toggleBlockType = function (blockType) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var editable = _this.props.editableBlockTypes.indexOf(blockType) > -1;
      if (editable) {
        onChange(RichUtils.toggleBlockType(editorState, blockType));
      } else {
        onChange(insertBlockAfterCurrentBlock(editorState, blockType, _this.props.editableBlockTypes));
      }
    }, _this.renderItemsGroups = function (itemsGroups) {
      var currentBlockType = _this.props.currentBlockType;

      return itemsGroups.map(function (group) {
        var types = group.map(function (item) {
          return item.type;
        });
        var activeIndex = types.indexOf(currentBlockType);
        var isActive = activeIndex > -1;
        var displayItem = isActive ? group[activeIndex] : group[0];

        var buttonClassNames = classNames(styles.button, _defineProperty({}, "" + styles.buttonActive, isActive));
        var iconWrapperClassNames = classNames(styles.iconWrapper, _defineProperty({}, "" + styles.iconWrapperActive, isActive));

        // TODO Asses whether to remove this binding
        /* eslint-disable react/jsx-no-bind */
        return React.createElement(
          "button",
          {
            key: displayItem.type,
            className: buttonClassNames,
            onClick: function onClick(e) {
              e.preventDefault();
              var nextBlockType = getNextBlockTypeToApply(currentBlockType, types);
              _this.toggleBlockType(nextBlockType);
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 165
            },
            __self: _this2
          },
          displayItem.icon ? React.createElement("span", {
            title: displayItem.label,
            className: iconWrapperClassNames,
            dangerouslySetInnerHTML: { __html: displayItem.icon },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 178
            },
            __self: _this2
          }) : displayItem.label
        );
        /* eslint-enable react/jsx-no-bind */
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BlockItems, [{
    key: "render",
    value: function render() {
      var itemsGroups = this.props.itemsGroups;

      if (itemsGroups.length === 0) {
        return null;
      }
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return React.createElement(
        "div",
        { className: styles.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 200
          },
          __self: this
        },
        React.createElement(
          "ul",
          { className: styles.list, onMouseDown: function onMouseDown(e) {
              return e.preventDefault();
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 201
            },
            __self: this
          },
          this.renderItemsGroups(itemsGroups)
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return BlockItems;
}(React.Component);

BlockItems.propTypes = {
  currentBlockType: PropTypes.string,
  itemsGroups: PropTypes.array,
  editableBlockTypes: PropTypes.array,
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
BlockItems.defaultProps = {
  itemsGroups: [],
  editableBlockTypes: []
};


export default BlockItems;