'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Components

// Styles


/**
 * Block Toolbar
 *
 */
var BlockToolbar = function (_React$Component) {
  _inherits(BlockToolbar, _React$Component);

  function BlockToolbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BlockToolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BlockToolbar.__proto__ || Object.getPrototypeOf(BlockToolbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.calculatePosition = function () {
      var editorState = _this.props.editorState;

      var selection = editorState.getSelection();
      var selectedBlockKey = selection.getStartKey();
      var selectedBlock = document.querySelector('[data-block][data-offset-key^=\'' + selectedBlockKey + '\']');
      if (selectedBlock && _this._positioner) {
        var blockRect = selectedBlock.getBoundingClientRect();
        var positionerParentRect = _this._positioner.offsetParent.getBoundingClientRect();
        return {
          top: Math.floor(blockRect.top - positionerParentRect.top - 8)
        };
      }
      return {};
    }, _this.onKeyDown = function (e) {
      _this.closeToolbar();
    }, _this.openToolbar = function () {
      _this.setState({
        open: true
      });
    }, _this.closeToolbar = function () {
      _this.setState({
        open: false
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BlockToolbar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      window.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.onKeyDown);
    }

    /**
     * Handle position and visibility of the toolbar
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      // We have to wait a tick to calculate the position
      window.requestAnimationFrame(function () {
        _this2.setState({
          positionStyle: _this2.calculatePosition()
        });
      });
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
                _this3._positioner = r;
              }
            },
            currentBlockType !== 'atomic' ? _react2.default.createElement(
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
  }]);

  return BlockToolbar;
}(_react2.default.Component);

BlockToolbar.propTypes = {
  blockItemsGroups: _react2.default.PropTypes.array,
  embeddableForms: _react2.default.PropTypes.object,
  editorHasFocus: _react2.default.PropTypes.bool.isRequired,
  editorState: _react2.default.PropTypes.object.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired
};
exports.default = BlockToolbar;