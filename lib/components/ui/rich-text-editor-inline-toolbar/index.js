'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inlineToolbarPlugin;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _popout = require('../popout');

var _popout2 = _interopRequireDefault(_popout);

var _items = require('./items');

var _items2 = _interopRequireDefault(_items);

var _richTextEditorInlineToolbar = require('./rich-text-editor-inline-toolbar.mcss');

var _richTextEditorInlineToolbar2 = _interopRequireDefault(_richTextEditorInlineToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Components
var hasCommandModifier = _draftJs.KeyBindingUtil.hasCommandModifier;


function withinBounds(rect, bounds) {
  return rect.left >= bounds.left && rect.top >= bounds.top && rect.right <= bounds.right && rect.bottom <= bounds.bottom;
}

var _InlineToolbar = _react2.default.createClass({
  displayName: 'InlineToolbar',

  propTypes: {
    editorHasFocus: _react2.default.PropTypes.bool.isRequired,
    editorState: _react2.default.PropTypes.object.isRequired,
    entityButtons: _react2.default.PropTypes.array,
    inlineButtons: _react2.default.PropTypes.array,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      visible: false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _this = this;

    var editorState = nextProps.editorState;
    var editorHasFocus = nextProps.editorHasFocus;

    var selection = editorState.getSelection();
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
          { className: _richTextEditorInlineToolbar2.default.positioner, ref: function ref(r) {
              return _this2.positioner = r;
            }, style: positionStyle },
          ' '
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_items2.default, { editorState: editorState, onChange: onChange })
        )
      )
    );
  }
});

function handleKeyCommand(command, _ref) {
  var getEditorState = _ref.getEditorState;
  var setEditorState = _ref.setEditorState;

  switch (command) {
    case 'bold':
      setEditorState(_draftJs.RichUtils.toggleInlineStyle(getEditorState(), 'BOLD'));
      return true;
    case 'italic':
      setEditorState(_draftJs.RichUtils.toggleInlineStyle(getEditorState(), 'ITALIC'));
      return true;
    case 'underline':
      setEditorState(_draftJs.RichUtils.toggleInlineStyle(getEditorState(), 'UNDERLINE'));
      return true;
  }
  return false;
}

function inlineToolbarPlugin() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return {
    handleKeyCommand: handleKeyCommand,
    // Wrapper for the toolbar to mix in curried options
    InlineToolbar: function InlineToolbar(props, children) {
      props = Object.assign({}, { something: "else" }, props);
      return _react2.default.createElement(_InlineToolbar, props);
    }
  };
}