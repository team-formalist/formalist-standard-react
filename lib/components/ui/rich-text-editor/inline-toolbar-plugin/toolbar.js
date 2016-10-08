'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _utils = require('../utils');

var _popout = require('../../popout');

var _popout2 = _interopRequireDefault(_popout);

var _items = require('./items');

var _items2 = _interopRequireDefault(_items);

var _toolbar = require('./toolbar.mcss');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var Toolbar = _react2.default.createClass({
  displayName: 'Toolbar',

  propTypes: {
    editorHasFocus: _react2.default.PropTypes.bool.isRequired,
    editorState: _react2.default.PropTypes.object.isRequired,
    formatters: _react2.default.PropTypes.array,
    entities: _react2.default.PropTypes.array,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      visible: false,
      forceVisible: false
    };
  },


  /**
   * Handle position and visibility of the toolbar
   */
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _this = this;

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
        _this.setState({
          positionStyle: _this.calculatePosition()
        });
      });
    }
  },
  forceVisible: function forceVisible(force) {
    this.setState({
      forceVisible: force
    });
  },
  removeEntity: function removeEntity(entityKey) {
    var _props = this.props;
    var editorState = _props.editorState;
    var onChange = _props.onChange;

    var selection = editorState.getSelection();
    onChange(_draftJs.RichUtils.toggleLink(editorState, selection, null));
  },


  /**
   * Calculate the position of the toolbar based on the visible selection
   * and the position of the `positioner`s offsetParent.
   *
   * @return {Object} Description of the position/size of the positioner
   */
  calculatePosition: function calculatePosition() {
    var visible = this.state.visible;

    if (visible) {
      var selectionRect = (0, _draftJs.getVisibleSelectionRect)(window);
      if (selectionRect && this.positioner) {
        var positionerRect = this.positioner.offsetParent.getBoundingClientRect();
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
  },
  onPopoutClose: function onPopoutClose() {
    this.setState({
      forceVisible: false
    });
  },
  render: function render() {
    var _this2 = this;

    var _props2 = this.props;
    var editorState = _props2.editorState;
    var formatters = _props2.formatters;
    var entities = _props2.entities;
    var onChange = _props2.onChange;
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
              className: _toolbar2.default.positioner,
              ref: function ref(r) {
                _this2.positioner = r;
              },
              style: positionStyle },
            ' '
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
              { className: _toolbar2.default.entityWrapper },
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
});
// Styles

// Components


exports.default = Toolbar;