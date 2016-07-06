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
    blockItemsGroups: _react2.default.PropTypes.array,
    embeddableForms: _react2.default.PropTypes.object,
    editorHasFocus: _react2.default.PropTypes.bool.isRequired,
    editorState: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      open: false
    };
  },
  componentWillMount: function componentWillMount() {
    window.addEventListener('keydown', this.onKeyDown);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
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
    var _props = this.props;
    var editorState = _props.editorState;
    var setReadOnly = _props.setReadOnly;

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
  onKeyDown: function onKeyDown(e) {
    this.closeToolbar();
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
  insertAtomicBlock: function insertAtomicBlock(form) {
    var _props2 = this.props;
    var editorState = _props2.editorState;
    var onChange = _props2.onChange;

    var entityKey = _draftJs.Entity.create('formalist', 'IMMUTABLE', {
      name: form.name,
      ast: form.template
    });
    onChange(_draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, '¶'));
  },
  renderEmbeddableFormsButtons: function renderEmbeddableFormsButtons(buttons) {
    var _this2 = this;

    return buttons.map(function (button) {
      var onClick = function onClick(e) {
        e.preventDefault();
        _this2.insertAtomicBlock(button);
      };
      return _react2.default.createElement(
        'button',
        { key: button.name, onClick: onClick },
        button.label || button.name
      );
    });
  },
  render: function render() {
    var _this3 = this;

    var _props3 = this.props;
    var blockItemsGroups = _props3.blockItemsGroups;
    var editorState = _props3.editorState;
    var embeddableForms = _props3.embeddableForms;
    var onChange = _props3.onChange;
    var _state = this.state;
    var open = _state.open;
    var positionStyle = _state.positionStyle;

    // Suck out our forms into a slightly friendly format

    var embeddableFormsButtons = [];
    if (embeddableForms) {
      embeddableFormsButtons = Object.keys(embeddableForms).map(function (identifier) {
        var form = embeddableForms[identifier];
        return Object.assign({}, form, { name: identifier });
      });
    }

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _popout2.default,
        { placement: 'bottom', isOpened: open, closeOnOutsideClick: true, closeOnEsc: true, onClose: this.closeToolbar },
        _react2.default.createElement(
          'div',
          { style: positionStyle, className: _toolbar2.default.positioner, ref: function ref(r) {
              return _this3.positioner = r;
            } },
          _react2.default.createElement(
            'button',
            {
              className: _toolbar2.default.toggle,
              onClick: function onClick(e) {
                e.preventDefault();
                _this3.openToolbar();
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
          _react2.default.createElement(_items2.default, { itemsGroups: blockItemsGroups, editorState: editorState, onChange: onChange }),
          embeddableFormsButtons.length > 0 ? this.renderEmbeddableFormsButtons(embeddableFormsButtons) : null
        )
      )
    );
  }
});
// Styles

// Components


exports.default = BlockToolbar;