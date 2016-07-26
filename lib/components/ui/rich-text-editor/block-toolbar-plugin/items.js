'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

var _items = require('./items.mcss');

var _items2 = _interopRequireDefault(_items);

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
 * @param  {[type]} options.propTypes: {                 itemsGroups: React.PropTypes.array,                                             editorState: React.PropTypes.object.isRequired,                  onChange: React.PropTypes.func.isRequired, [description]
 * @param  {[type]} getDefaultProps    ()            {                return                 {                                                                                           itemsGroups: []                                                          }  } [description]
 * @param  {[type]} toggleBlockType    (blockType)   {                const                  {editorState,  onChange}    [description]
 * @param  {[type]} renderItemsGroups  (itemsGroups) {                const                  {editorState} [description]
 * @return {[type]}                    [description]
 */
var BlockItems = _react2.default.createClass({
  displayName: 'BlockItems',

  propTypes: {
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

    var editorState = this.props.editorState;

    var currentBlockType = _draftJs.RichUtils.getCurrentBlockType(editorState);
    return itemsGroups.map(function (group) {
      var active = group.types.indexOf(currentBlockType) > -1;
      var buttonClassNames = (0, _classnames2.default)(_items2.default.button, _defineProperty({}, '' + _items2.default.buttonActive, active));
      return _react2.default.createElement(
        'button',
        { key: group.label, className: buttonClassNames, onClick: function onClick(e) {
            e.preventDefault();
            _this.toggleBlockType(getNextBlockTypeToApply(currentBlockType, group.types));
          } },
        group.label
      );
    });
  },
  render: function render() {
    var itemsGroups = this.props.itemsGroups;

    if (itemsGroups.length === 0) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: _items2.default.container },
      _react2.default.createElement(
        'ul',
        { className: _items2.default.list, onMouseDown: function onMouseDown(e) {
            return e.preventDefault();
          } },
        this.renderItemsGroups(itemsGroups)
      )
    );
  }
});

exports.default = BlockItems;