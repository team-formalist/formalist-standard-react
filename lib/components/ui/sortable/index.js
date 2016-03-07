'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
    onSort: _react2.default.PropTypes.func
  },

  getInitialState: function getInitialState() {
    return {
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
   * moveItem
   *
   * Updates the internal representation of the list, and propagates that data
   * changes upward through `onSort`
   *
   * @param  {Number} dragIndex The current index of the item being dragged
   * @param  {Number} hoverIndex The current index of the item being hovered
   */
  moveItem: function moveItem(dragIndex, hoverIndex) {
    var _this = this;

    var items = this.state.items;

    var dragItem = items[dragIndex];

    this.setState((0, _update2.default)(this.state, {
      items: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
      }
    }), function () {
      _this.props.onSort(_this.state.items.map(function (item) {
        return item.originalIndex;
      }));
    });
  },
  render: function render() {
    var _this2 = this;

    var items = this.state.items;
    var _props = this.props;
    var canRemove = _props.canRemove;
    var onRemove = _props.onRemove;


    return _react2.default.createElement(
      'div',
      { className: _sortable2.default.base },
      items.map(function (item, index) {
        return _react2.default.createElement(
          _item2.default,
          {
            key: item.originalIndex,
            moveItem: _this2.moveItem,
            index: index,
            originalIndex: item.originalIndex,
            canRemove: canRemove,
            onRemove: onRemove },
          item.component
        );
      })
    );
  }
});

module.exports = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(Sortable);