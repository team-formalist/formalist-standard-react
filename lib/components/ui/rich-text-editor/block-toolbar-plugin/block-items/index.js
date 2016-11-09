'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

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
 * Block items buttons
 */
var BlockItems = _react2.default.createClass({
  displayName: 'BlockItems',

  propTypes: {
    currentBlockType: _react2.default.PropTypes.string,
    itemsGroups: _react2.default.PropTypes.array,
    editorState: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      itemsGroups: []
    };
  },
  toggleBlockType: function toggleBlockType(blockType) {
    var _props = this.props;
    var editorState = _props.editorState;
    var onChange = _props.onChange;

    onChange(_draftJs.RichUtils.toggleBlockType(editorState, blockType));
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
            _this.toggleBlockType(getNextBlockTypeToApply(currentBlockType, types));
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