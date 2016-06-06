'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _popout = require('../../popout');

var _popout2 = _interopRequireDefault(_popout);

var _blockToolbar = require('./block-toolbar.mcss');

var _blockToolbar2 = _interopRequireDefault(_blockToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Block Toolbar
 *
 */

// Components
var BlockToolbar = _react2.default.createClass({
  displayName: 'BlockToolbar',

  propTypes: {
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
        top: Math.floor(blockRect.top - positionerParentRect.top - 10)
      };
    }
    return {};
  },
  openToolbar: function openToolbar(e) {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  },
  onClose: function onClose(e) {
    this.setState({
      open: false
    });
  },
  render: function render() {
    var _this2 = this;

    var _props = this.props;
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
        { placement: 'bottom', isOpened: open, closeOnOutsideClick: true, closeOnEsc: true, onClose: this.onClose },
        _react2.default.createElement(
          'div',
          { style: positionStyle, className: _blockToolbar2.default.positioner, ref: function ref(r) {
              return _this2.positioner = r;
            } },
          _react2.default.createElement(
            'button',
            { className: _blockToolbar2.default.toggle, onClick: this.openToolbar },
            '¶',
            _react2.default.createElement(
              'span',
              { className: _blockToolbar2.default.toggleText },
              'View block elements'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          'I AM BUTTONS'
        )
      )
    );
  }
});
// Styles


exports.default = BlockToolbar;