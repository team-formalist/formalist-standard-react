'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _update = require('react/lib/update');

var _update2 = _interopRequireDefault(_update);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _sortable = require('./sortable.mcss');

var _sortable2 = _interopRequireDefault(_sortable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Container for a sortable set of items
 *
 * <Sortable canRemove onRemove={(index) => ... } onSort={(newOrder) => ...}>
 *   <item/>
 *   <image/>
 *   {otherItems}
 * </Sortable>
 */
var Sortable = _react2.default.createClass({
  displayName: 'Sortable',


  propTypes: {
    /**
     * canRemove
     * Indicates whether items are removable
     * @type {Boolean}
     */
    canRemove: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node,
    /**
     * onDrop
     * Callback. Fired _after_ the sort is effected
     * @type {Function}
     */
    onDrop: _react2.default.PropTypes.func,
    /**
     * onRemove
     * Callback. Fired when the remove button is clicked. Is passed the
     * *current* index of the item to be removed
     * @type {Function}
     */
    onRemove: _react2.default.PropTypes.func,
    /**
     * onSort
     * Callback. Fired when the sort change is effected
     * @type {Function}
     */
    onSort: _react2.default.PropTypes.func,
    verticalControls: _react2.default.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    return {
      instanceKey: (0, _uid2.default)(),
      items: _react2.default.Children.map(this.props.children, function (child, index) {
        return {
          component: child,
          originalIndex: index
        };
      })
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      items: _react2.default.Children.map(nextProps.children, function (child, index) {
        return {
          component: child,
          originalIndex: index
        };
      })
    });
  },


  /**
   * onDrop
   *
   * Updates the internal representation of the list, and propagates that data
   * changes upward through `this.props.onDrop`
   */
  onDrop: function onDrop() {
    if (this.props.onDrop) {
      this.props.onDrop(this.state.items.map(function (item) {
        return item.originalIndex;
      }));
    }
  },


  /**
   * onSort
   *
   * Updates the internal representation of the list, and propagates that data
   * changes upward through `this.props.onSort`
   */
  onSort: function onSort() {
    if (this.props.onSort) {
      this.props.onSort(this.state.items.map(function (item) {
        return item.originalIndex;
      }));
    }
  },


  /**
   * moveItem
   *
   * Updates the internal representation of the list
   *
   * @param  {Number} dragIndex The current index of the item being dragged
   * @param  {Number} hoverIndex The current index of the item being hovered
   */
  moveItem: function moveItem(dragIndex, hoverIndex) {
    var items = this.state.items;

    var dragItem = items[dragIndex];
    this.setState((0, _update2.default)(this.state, {
      items: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
      }
    }));
  },
  render: function render() {
    var _this = this;

    var _state = this.state;
    var instanceKey = _state.instanceKey;
    var items = _state.items;
    var _props = this.props;
    var canRemove = _props.canRemove;
    var onRemove = _props.onRemove;
    var verticalControls = _props.verticalControls;
    var canSort = _props.canSort;

    var isSortable = canSort === false || items.length <= 1 ? false : true;

    return _react2.default.createElement(
      'div',
      { className: _sortable2.default.base, 'data-name': 'sortable-item' },
      items.map(function (item, index) {
        return _react2.default.createElement(
          _item2.default,
          {
            key: instanceKey + '_' + item.originalIndex,
            instanceKey: instanceKey,
            moveItem: _this.moveItem,
            onDrop: _this.onDrop,
            index: index,
            originalIndex: item.originalIndex,
            canSort: isSortable,
            canRemove: canRemove,
            onRemove: onRemove,
            verticalControls: verticalControls },
          item.component
        );
      })
    );
  }
});

exports.default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(Sortable);