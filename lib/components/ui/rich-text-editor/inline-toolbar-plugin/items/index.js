'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

var _items = require('./items.mcss');

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InlineToolbarItems = _react2.default.createClass({
  displayName: 'InlineToolbarItems',


  propTypes: {
    formatters: _react2.default.PropTypes.array,
    editorState: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      formatters: []
    };
  },
  toggleStyle: function toggleStyle(style) {
    var _props = this.props;
    var editorState = _props.editorState;
    var onChange = _props.onChange;

    onChange(_draftJs.RichUtils.toggleInlineStyle(editorState, style));
  },
  renderFormatters: function renderFormatters(formatters) {
    var _this = this;

    var editorState = this.props.editorState;

    var currentStyle = editorState.getCurrentInlineStyle();

    return formatters.map(function (formatter) {
      var active = currentStyle.has(formatter.style);
      var buttonClassNames = (0, _classnames2.default)(_items2.default.button, _defineProperty({}, '' + _items2.default.buttonActive, active));
      var iconWrapperClassNames = (0, _classnames2.default)(_items2.default.iconWrapper, _defineProperty({}, '' + _items2.default.iconWrapperActive, active));
      return _react2.default.createElement(
        'button',
        { key: formatter.label, className: buttonClassNames, onClick: function onClick(e) {
            e.preventDefault();
            _this.toggleStyle(formatter.style);
          } },
        formatter.icon ? _react2.default.createElement('span', { title: formatter.label, className: iconWrapperClassNames, dangerouslySetInnerHTML: { __html: formatter.icon } }) : formatter.label
      );
    });
  },
  render: function render() {
    var formatters = this.props.formatters;
    // We need to cancel onMouseDown to avoid the buttons capturing focus

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'ul',
        { className: _items2.default.list, onMouseDown: function onMouseDown(e) {
            return e.preventDefault();
          } },
        this.renderFormatters(formatters)
      )
    );
  }
});

exports.default = InlineToolbarItems;