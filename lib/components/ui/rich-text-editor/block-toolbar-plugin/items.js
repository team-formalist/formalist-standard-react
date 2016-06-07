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

var BlockItems = _react2.default.createClass({
  displayName: 'BlockItems',


  propTypes: {
    items: _react2.default.PropTypes.array,
    editorState: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      items: []
    };
  },
  toggleBlockType: function toggleBlockType(blockType) {
    var _props = this.props;
    var editorState = _props.editorState;
    var onChange = _props.onChange;
    var onSelect = _props.onSelect;

    onChange(_draftJs.RichUtils.toggleBlockType(editorState, blockType));
    onSelect();
  },
  renderItems: function renderItems(items) {
    var _this = this;

    var editorState = this.props.editorState;

    var currentBlockType = _draftJs.RichUtils.getCurrentBlockType(editorState);
    return items.map(function (item) {
      var active = currentBlockType === item.type;
      var buttonClassNames = (0, _classnames2.default)(_items2.default.button, _defineProperty({}, '' + _items2.default.buttonActive, active));
      return _react2.default.createElement(
        'button',
        { key: item.label, className: buttonClassNames, onClick: function onClick(e) {
            e.preventDefault();
            _this.toggleBlockType(item.type);
          } },
        item.label
      );
    });
  },
  render: function render() {
    var items = this.props.items;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'ul',
        { className: _items2.default.list, onMouseDown: function onMouseDown(e) {
            return e.preventDefault();
          } },
        this.renderItems(items)
      )
    );
  }
});

exports.default = BlockItems;