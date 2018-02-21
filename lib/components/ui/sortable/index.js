'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Container for a sortable set of items
 *
 * <Sortable canRemove onRemove={(index) => ... } onSort={(newOrder) => ...}>
 *   <item/>
 *   <image/>
 *   {otherItems}
 * </Sortable>
 */
var Sortable = function (_React$Component) {
  _inherits(Sortable, _React$Component);

  function Sortable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Sortable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Sortable.__proto__ || Object.getPrototypeOf(Sortable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      instanceKey: (0, _uid2.default)(),
      items: _react2.default.Children.map(_this.props.children, function (child, index) {
        return {
          component: child,
          originalIndex: index
        };
      })
    }, _this.onDrop = function () {
      if (_this.props.onDrop) {
        _this.props.onDrop(_this.state.items.map(function (item) {
          return item.originalIndex;
        }));
      }
    }, _this.onSort = function () {
      if (_this.props.onSort) {
        _this.props.onSort(_this.state.items.map(function (item) {
          return item.originalIndex;
        }));
      }
    }, _this.moveItem = function (dragIndex, hoverIndex) {
      var items = _this.state.items;

      var dragItem = items[dragIndex];
      _this.setState((0, _update2.default)(_this.state, {
        items: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
        }
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Sortable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        items: _react2.default.Children.map(nextProps.children, function (child, index) {
          return {
            component: child,
            originalIndex: index
          };
        })
      });
    }

    /**
     * onDrop
     *
     * Updates the internal representation of the list, and propagates that data
     * changes upward through `this.props.onDrop`
     */


    /**
     * onSort
     *
     * Updates the internal representation of the list, and propagates that data
     * changes upward through `this.props.onSort`
     */


    /**
     * moveItem
     *
     * Updates the internal representation of the list
     *
     * @param  {Number} dragIndex The current index of the item being dragged
     * @param  {Number} hoverIndex The current index of the item being hovered
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          instanceKey = _state.instanceKey,
          items = _state.items;
      var _props = this.props,
          canRemove = _props.canRemove,
          onRemove = _props.onRemove,
          verticalControls = _props.verticalControls,
          canSort = _props.canSort;

      var isSortable = !(canSort === false || items.length <= 1);

      return _react2.default.createElement(
        'div',
        { className: _sortable2.default.base, 'data-name': 'sortable-item' },
        items.map(function (item, index) {
          return _react2.default.createElement(
            _item2.default,
            {
              key: instanceKey + '_' + item.originalIndex,
              instanceKey: instanceKey,
              moveItem: _this2.moveItem,
              onDrop: _this2.onDrop,
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
  }]);

  return Sortable;
}(_react2.default.Component);

Sortable.propTypes = {
  /**
   * canRemove
   * Indicates whether items are removable
   * @type {Boolean}
   */
  canRemove: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  /**
   * onDrop
   * Callback. Fired _after_ the sort is effected
   * @type {Function}
   */
  onDrop: _propTypes2.default.func,
  /**
   * onRemove
   * Callback. Fired when the remove button is clicked. Is passed the
   * *current* index of the item to be removed
   * @type {Function}
   */
  onRemove: _propTypes2.default.func,
  /**
   * onSort
   * Callback. Fired when the sort change is effected
   * @type {Function}
   */
  onSort: _propTypes2.default.func,
  canSort: _propTypes2.default.bool,
  verticalControls: _propTypes2.default.bool
};
exports.default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(Sortable);