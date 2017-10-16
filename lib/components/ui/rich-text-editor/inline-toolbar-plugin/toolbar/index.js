'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _utils = require('../../utils');

var _popout = require('../../../popout');

var _popout2 = _interopRequireDefault(_popout);

var _items = require('../items');

var _items2 = _interopRequireDefault(_items);

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Components

// Styles


/**
 * Inline Toolbar
 *
 * An inline toolbar for the `rich-text-editor` that pops out when text is
 * selected.
 *
 * It uses the common <Popout/> UI component so there’s a slightly strange dance
 * to set the position using a reference element `this.refs.positioner`.
 *
 */
var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Toolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      visible: false,
      forceVisible: false
    }, _this.forceVisible = function (force) {
      _this.setState({
        forceVisible: force
      });
    }, _this.removeEntity = function (entityKey) {
      var _this$props = _this.props;
      var editorState = _this$props.editorState;
      var onChange = _this$props.onChange;

      var selection = editorState.getSelection();
      onChange(_draftJs.RichUtils.toggleLink(editorState, selection, null));
    }, _this.calculatePosition = function () {
      var visible = _this.state.visible;

      if (visible) {
        var selectionRect = (0, _draftJs.getVisibleSelectionRect)(window);
        if (selectionRect && _this.positioner) {
          var positionerRect = _this.positioner.offsetParent.getBoundingClientRect();
          return {
            left: selectionRect.left - positionerRect.left,
            top: selectionRect.top - positionerRect.top,
            width: selectionRect.width
          };
        }
      }
      return {
        left: 0,
        right: 0,
        width: 0
      };
    }, _this.onPopoutClose = function () {
      _this.setState({
        forceVisible: false
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Toolbar, [{
    key: 'componentWillReceiveProps',


    /**
     * Handle position and visibility of the toolbar
     */
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var editorState = nextProps.editorState;
      var editorHasFocus = nextProps.editorHasFocus;
      var forceVisible = this.state.forceVisible;

      var selection = editorState.getSelection();

      // Determine visibility of the toolbar
      var selectionVisible = !selection.isCollapsed() && editorHasFocus;

      this.setState({
        visible: forceVisible || selectionVisible
      });

      if (selectionVisible) {
        // We have to wait a tick to calculate the position
        window.requestAnimationFrame(function () {
          _this2.setState({
            positionStyle: _this2.calculatePosition()
          });
        });
      }
    }

    /**
     * Calculate the position of the toolbar based on the visible selection
     * and the position of the `positioner`s offsetParent.
     *
     * @return {Object} Description of the position/size of the positioner
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var editorState = _props.editorState;
      var formatters = _props.formatters;
      var entities = _props.entities;
      var onChange = _props.onChange;
      var _state = this.state;
      var visible = _state.visible;
      var forceVisible = _state.forceVisible;
      var positionStyle = _state.positionStyle;

      var SelectedEntityHandler = null;
      var selectedEntity = void 0;

      // Retrieve the selected entity if there is one
      // and pull out any handlers we have available
      var selectedEntityKey = (0, _utils.getSelectedEntityKey)(editorState);
      if (selectedEntityKey) {
        (function () {
          selectedEntity = _draftJs.Entity.get(selectedEntityKey);
          var selectedEntityType = selectedEntity.getType();

          var _entities$find = entities.find(function (entity) {
            return entity.type.toLowerCase() === selectedEntityType.toLowerCase();
          });

          var handler = _entities$find.handler;

          SelectedEntityHandler = handler;
        })();
      }

      // Only display if we have some `formatters` configured
      if (formatters.length > 0 || entities.length > 0) {
        // We need to cancel onMouseDown to avoid the buttons capturing focus
        // TODO Asses whether to remove this binding
        /* eslint-disable react/jsx-no-bind */
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _popout2.default,
            { ref: 'popout', placement: 'top', isOpened: visible, closeOnOutsideClick: true, onClose: this.onPopoutClose },
            _react2.default.createElement(
              'div',
              {
                className: styles.positioner,
                ref: function ref(r) {
                  _this3.positioner = r;
                },
                style: positionStyle },
              '\xA0'
            ),
            _react2.default.createElement(
              'div',
              { onMouseDown: function onMouseDown(e) {
                  if (!forceVisible) {
                    e.preventDefault();
                  }
                } },
              _react2.default.createElement(_items2.default, {
                formatters: formatters,
                entities: entities,
                editorState: editorState,
                onChange: onChange
              }),
              SelectedEntityHandler ? _react2.default.createElement(
                'div',
                { className: styles.entityWrapper },
                _react2.default.createElement(SelectedEntityHandler, {
                  entityKey: selectedEntityKey,
                  editorState: editorState,
                  onChange: onChange,
                  forceVisible: this.forceVisible,
                  remove: this.removeEntity
                })
              ) : null
            )
          )
        );
        /* eslint-enable react/jsx-no-bind */
      } else {
        return null;
      }
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

Toolbar.propTypes = {
  editorHasFocus: _propTypes2.default.bool.isRequired,
  editorState: _propTypes2.default.object.isRequired,
  formatters: _propTypes2.default.array,
  entities: _propTypes2.default.array,
  onChange: _propTypes2.default.func.isRequired
};
exports.default = Toolbar;