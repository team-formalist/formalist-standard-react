'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

var _immutable = require('immutable');

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var BlockItems = function (_React$Component) {
  _inherits(BlockItems, _React$Component);

  function BlockItems() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BlockItems);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BlockItems.__proto__ || Object.getPrototypeOf(BlockItems)).call.apply(_ref, [this].concat(args))), _this), _this.toggleBlockType = function (blockType) {
      var _this$props = _this.props;
      var editorState = _this$props.editorState;
      var onChange = _this$props.onChange;

      var editable = _this.props.editableBlockTypes.indexOf(blockType) > -1;
      if (editable) {
        onChange(_draftJs.RichUtils.toggleBlockType(editorState, blockType));
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

        var buttonClassNames = (0, _classnames2.default)(styles.button, _defineProperty({}, '' + styles.buttonActive, isActive));
        var iconWrapperClassNames = (0, _classnames2.default)(styles.iconWrapper, _defineProperty({}, '' + styles.iconWrapperActive, isActive));

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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BlockItems, [{
    key: 'render',
    value: function render() {
      var itemsGroups = this.props.itemsGroups;

      if (itemsGroups.length === 0) {
        return null;
      }
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return _react2.default.createElement(
        'div',
        { className: styles.container },
        _react2.default.createElement(
          'ul',
          { className: styles.list, onMouseDown: function onMouseDown(e) {
              return e.preventDefault();
            } },
          this.renderItemsGroups(itemsGroups)
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return BlockItems;
}(_react2.default.Component);

BlockItems.propTypes = {
  currentBlockType: _propTypes2.default.string,
  itemsGroups: _propTypes2.default.array,
  editableBlockTypes: _propTypes2.default.array,
  editorState: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired
};
BlockItems.defaultProps = {
  itemsGroups: [],
  editableBlockTypes: []
};
exports.default = BlockItems;