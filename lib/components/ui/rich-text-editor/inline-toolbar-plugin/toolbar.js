'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

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
    inlineItems: _react2.default.PropTypes.array,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      visible: false
    };
  },


  /**
   * Handle position and visibility of the toolbar
   */
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _this = this;

    var editorState = nextProps.editorState;
    var editorHasFocus = nextProps.editorHasFocus;

    var selection = editorState.getSelection();

    // Determine visibility of the toolbar
    var selectionVisible = !selection.isCollapsed() && editorHasFocus;

    this.setState({
      visible: selectionVisible
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
  render: function render() {
    var _this2 = this;

    var _props = this.props;
    var editorState = _props.editorState;
    var inlineItems = _props.inlineItems;
    var onChange = _props.onChange;
    var _state = this.state;
    var visible = _state.visible;
    var positionStyle = _state.positionStyle;


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _popout2.default,
        { ref: 'popout', placement: 'top', isOpened: visible, closeOnOutsideClick: true },
        _react2.default.createElement(
          'div',
          { className: _toolbar2.default.positioner, ref: function ref(r) {
              return _this2.positioner = r;
            }, style: positionStyle },
          ' '
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_items2.default, { items: inlineItems, editorState: editorState, onChange: onChange })
        )
      )
    );
  }
});
// Styles

// Components


exports.default = Toolbar;