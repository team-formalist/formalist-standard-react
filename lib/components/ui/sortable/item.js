'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDnd = require('react-dnd');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _item = require('./item.mcss');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Item: DragSource methods
 */
var itemSource = {
  beginDrag: function beginDrag(props) {
    return {
      instanceKey: props.instanceKey,
      index: props.index,
      originalIndex: props.originalIndex
    };
  }
};

/**
 * Item: DragTarget methods
 */
var itemTarget = {
  drop: function drop(props, monitor) {
    props.onDrop();
  },
  hover: function hover(props, monitor, component) {
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index;
    var dragInstanceKey = monitor.getItem().instanceKey;
    var hoverInstanceKey = props.instanceKey;

    // Don't replace items with themselves
    // or from other instances of a sortable
    if (dragInstanceKey !== hoverInstanceKey || dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();

    // Get vertical middle
    var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    var clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    var hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

/**
 * Item
 */

var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Item);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.onRemoveClick = function (e) {
      e.preventDefault();
      var _this$props = _this.props;
      var canRemove = _this$props.canRemove;
      var onRemove = _this$props.onRemove;

      if (canRemove && onRemove) {
        onRemove(_this.props.index, e);
      }
    }, _this.onHandleClick = function (e) {
      e.preventDefault();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Send current `index` to the onRemove callback
   * @param  {Event} e Click event
   */


  /**
   * Stop the handle click propagating
   * @param  {Event} e Click event
   */


  _createClass(Item, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var canSort = _props.canSort;
      var canRemove = _props.canRemove;
      var children = _props.children;
      var connectDragPreview = _props.connectDragPreview;
      var connectDragSource = _props.connectDragSource;
      var connectDropTarget = _props.connectDropTarget;
      var isDragging = _props.isDragging;
      var verticalControls = _props.verticalControls;

      var inline = {
        opacity: isDragging ? 0 : 1
      };

      var controlsClasses = (0, _classnames2.default)(_item2.default.controls, _defineProperty({}, '' + _item2.default.controlsVertical, verticalControls));

      return connectDropTarget(connectDragPreview(_react2.default.createElement(
        'div',
        { className: _item2.default.base, style: inline, 'data-name': 'sortable-item' },
        _react2.default.createElement(
          'div',
          { className: _item2.default.inner },
          children
        ),
        _react2.default.createElement(
          'div',
          { className: controlsClasses },
          canRemove ? _react2.default.createElement(
            'button',
            { className: _item2.default.remove, onClick: this.onRemoveClick },
            _react2.default.createElement(
              'span',
              { className: _item2.default.removeText },
              'Remove'
            ),
            _react2.default.createElement(
              'div',
              { className: _item2.default.removeX },
              '\xD7'
            )
          ) : null,
          canSort ? connectDragSource(_react2.default.createElement(
            'button',
            { className: _item2.default.handle, onClick: this.onHandleClick },
            _react2.default.createElement(
              'span',
              { className: _item2.default.handleText },
              'Drag to reorder'
            ),
            _react2.default.createElement('div', { className: _item2.default.handleLine })
          )) : null
        )
      )));
    }
  }]);

  return Item;
}(_react2.default.Component);

/**
 * DropTargetDecorator
 * Set up items to behave as drop targets for sorting
 */


Item.propTypes = {

  /**
   * Current index of the item in context of the sortable
   * @type {Number}
   */
  index: _react2.default.PropTypes.number.isRequired,

  /**
   * The original index of the item in context of the sortable. Should only
   * differ between data updates.
   * @type {Number}
   */
  originalIndex: _react2.default.PropTypes.number.isRequired,

  /**
   * Callback: Fires when item is moved
   * @type {Function}
   */
  moveItem: _react2.default.PropTypes.func,

  /**
   * Can this item be removed?
   * @type {Boolean}
   */
  canRemove: _react2.default.PropTypes.bool,

  /**
   * Callback: Fired when item is removed
   * @type {Function}
   */
  onRemove: _react2.default.PropTypes.func,

  /**
   * Can this item be sorted?
   * @type {Boolean}
   */
  canSort: _react2.default.PropTypes.bool,

  /**
   * Is the item being dragged?
   * @type {Boolean}
   */
  isDragging: _react2.default.PropTypes.bool,

  /**
   * React DnD provided decorators
   * @type {Function}
   */
  connectDragPreview: _react2.default.PropTypes.func,
  connectDragSource: _react2.default.PropTypes.func,
  connectDropTarget: _react2.default.PropTypes.func,

  /**
   * Child component we care about sorting
   * @type {ReactElement}
   */
  children: _react2.default.PropTypes.node.isRequired,
  verticalControls: _react2.default.PropTypes.bool
};
var DropTargetDecorator = (0, _reactDnd.DropTarget)('item', itemTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
});

/**
 * DragSourceDecorator
 * Set up items to behave as draggable UI
 */
var DragSourceDecorator = (0, _reactDnd.DragSource)('item', itemSource, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
});

/**
 * Export the decorated `<Item/>`
 */
exports.default = DropTargetDecorator(DragSourceDecorator(Item));