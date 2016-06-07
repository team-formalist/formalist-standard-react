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
 * Block Toolbar
 *
 */
var BlockToolbar = _react2.default.createClass({
  displayName: 'BlockToolbar',

  propTypes: {
    blockItems: _react2.default.PropTypes.array,
    editorHasFocus: _react2.default.PropTypes.bool.isRequired,
    editorState: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      open: false
    };
  },


  /**
   * Handle position and visibility of the toolbar
   */
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _this = this;

    // We have to wait a tick to calculate the position
    window.requestAnimationFrame(function () {
      _this.setState({
        positionStyle: _this.calculatePosition()
      });
    });
  },


  /**
   * Calculate the position of the toolbar based on the visible selection
   * and the position of the `positioner`s offsetParent.
   *
   * @return {Object} Description of the position/size of the positioner
   */
  calculatePosition: function calculatePosition() {
    var editorState = this.props.editorState;

    var selection = editorState.getSelection();
    var selectedBlockKey = selection.getStartKey();
    var selectedBlock = document.querySelector('[data-block][data-offset-key^=\'' + selectedBlockKey + '\']');
    if (selectedBlock && this.positioner) {
      var blockRect = selectedBlock.getBoundingClientRect();
      var positionerParentRect = this.positioner.offsetParent.getBoundingClientRect();
      return {
        top: Math.floor(blockRect.top - positionerParentRect.top - 8)
      };
    }
    return {};
  },
  openToolbar: function openToolbar() {
    this.setState({
      open: true
    });
  },
  closeToolbar: function closeToolbar() {
    this.setState({
      open: false
    });
  },
  render: function render() {
    var _this2 = this;

    var _props = this.props;
    var blockItems = _props.blockItems;
    var editorState = _props.editorState;
    var onChange = _props.onChange;
    var _state = this.state;
    var open = _state.open;
    var positionStyle = _state.positionStyle;


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _popout2.default,
        { placement: 'bottom', isOpened: open, closeOnOutsideClick: true, closeOnEsc: true, onClose: this.closeToolbar },
        _react2.default.createElement(
          'div',
          { style: positionStyle, className: _toolbar2.default.positioner, ref: function ref(r) {
              return _this2.positioner = r;
            } },
          _react2.default.createElement(
            'button',
            {
              className: _toolbar2.default.toggle,
              onClick: function onClick(e) {
                e.preventDefault();
                _this2.openToolbar();
              },
              onMouseDown: function onMouseDown(e) {
                return e.preventDefault();
              } },
            '¶',
            _react2.default.createElement(
              'span',
              { className: _toolbar2.default.toggleText },
              'View block elements'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_items2.default, { items: blockItems, editorState: editorState, onChange: onChange, onSelect: this.closeToolbar })
        )
      )
    );
  }
});
// Styles

// Components


exports.default = BlockToolbar;