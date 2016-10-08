'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _popout = require('../../popout');

var _popout2 = _interopRequireDefault(_popout);

var _blockItems = require('./block-items');

var _blockItems2 = _interopRequireDefault(_blockItems);

var _formItems = require('./form-items');

var _formItems2 = _interopRequireDefault(_formItems);

var _toolbar = require('./toolbar.mcss');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Block Toolbar
 *
 */

// Components
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
    var editorState = this.props.editorState;

    var selection = editorState.getSelection();
    var selectedBlockKey = selection.getStartKey();
    var selectedBlock = document.querySelector('[data-block][data-offset-key^=\'' + selectedBlockKey + '\']');
    if (selectedBlock && this._positioner) {
      var blockRect = selectedBlock.getBoundingClientRect();
      var positionerParentRect = this._positioner.offsetParent.getBoundingClientRect();
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
  render: function render() {
    var _this2 = this;

    var _props = this.props;
    var blockItemsGroups = _props.blockItemsGroups;
    var editorState = _props.editorState;
    var embeddableForms = _props.embeddableForms;
    var onChange = _props.onChange;
    var _state = this.state;
    var open = _state.open;
    var positionStyle = _state.positionStyle;

    var currentBlockType = _draftJs.RichUtils.getCurrentBlockType(editorState);

    // Suck out our forms into a slightly friendly format
    var embeddableFormsButtons = [];
    if (embeddableForms) {
      embeddableFormsButtons = Object.keys(embeddableForms).map(function (identifier) {
        var form = embeddableForms[identifier];
        return Object.assign({}, form, { name: identifier });
      });
    }

    // Extract the icon for the active block
    var activeBlockItem = blockItemsGroups.reduce(function (a, b) {
      return a.concat(b);
    }, []).find(function (item) {
      return item.type === currentBlockType;
    });

    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _popout2.default,
        { placement: 'bottom', isOpened: open, closeOnOutsideClick: true, closeOnEsc: true, onClose: this.closeToolbar },
        _react2.default.createElement(
          'div',
          {
            style: positionStyle,
            className: _toolbar2.default.positioner,
            ref: function ref(r) {
              _this2._positioner = r;
            }
          },
          currentBlockType !== 'atomic' ? _react2.default.createElement(
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
            activeBlockItem && activeBlockItem.icon ? _react2.default.createElement('span', {
              title: activeBlockItem.label,
              className: _toolbar2.default.iconWrapper,
              dangerouslySetInnerHTML: { __html: activeBlockItem.icon }
            }) : activeBlockItem ? activeBlockItem.label : '¶',
            _react2.default.createElement(
              'span',
              { className: _toolbar2.default.toggleText },
              'View block elements'
            )
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: _toolbar2.default.buttonsWrapper },
          _react2.default.createElement(_blockItems2.default, {
            itemsGroups: blockItemsGroups,
            currentBlockType: currentBlockType,
            closeToolbar: this.closeToolbar,
            openToolbar: this.openToolbar,
            editorState: editorState,
            onChange: onChange
          }),
          _react2.default.createElement(_formItems2.default, {
            embeddableForms: embeddableFormsButtons,
            closeToolbar: this.closeToolbar,
            openToolbar: this.openToolbar,
            editorState: editorState,
            onChange: onChange
          })
        )
      )
    );
    /* eslint-enable react/jsx-no-bind */
  }
});
// Styles


exports.default = BlockToolbar;