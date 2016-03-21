'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDnd = require('react-dnd');

var _item = require('./item.mcss');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Item: DragSource methods
 */
var itemSource = {
  beginDrag: function beginDrag(props) {
    return {
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

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
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
var Item = _react2.default.createClass({
  displayName: 'Item',


  propTypes: {

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
     * Child component we care about sorting
     * @type {ReactElement}
     */
    children: _react2.default.PropTypes.node.isRequired
  },

  /**
   * Send current `index` to the onRemove callback
   * @param  {Event} e Click event
   */
  onRemoveClick: function onRemoveClick(e) {
    e.preventDefault();
    var _props = this.props;
    var canRemove = _props.canRemove;
    var onRemove = _props.onRemove;

    if (canRemove && onRemove) {
      onRemove(this.props.index);
    }
  },


  /**
   * Stop the handle click propagating
   * @param  {Event} e Click event
   */
  onHandleClick: function onHandleClick(e) {
    e.preventDefault();
  },
  render: function render() {
    var _props2 = this.props;
    var canSort = _props2.canSort;
    var canRemove = _props2.canRemove;
    var children = _props2.children;
    var connectDragPreview = _props2.connectDragPreview;
    var connectDragSource = _props2.connectDragSource;
    var connectDropTarget = _props2.connectDropTarget;
    var isDragging = _props2.isDragging;

    var inline = {
      opacity: isDragging ? 0 : 1
    };

    return connectDropTarget(connectDragPreview(_react2.default.createElement(
      'div',
      { className: _item2.default.base, style: inline },
      _react2.default.createElement(
        'div',
        { className: _item2.default.inner },
        children
      ),
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
          '×'
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
    )));
  }
});

/**
 * DropTargetDecorator
 * Set up items to behave as drop targets for sorting
 */
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