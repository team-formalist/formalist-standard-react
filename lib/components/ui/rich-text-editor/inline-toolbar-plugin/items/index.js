'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

var _utils = require('../../utils');

var _items = require('./items.mcss');

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InlineToolbarItems = function (_Component) {
  _inherits(InlineToolbarItems, _Component);

  function InlineToolbarItems(props) {
    _classCallCheck(this, InlineToolbarItems);

    // Bindings

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InlineToolbarItems).call(this, props));

    _this.toggleFormat = _this.toggleFormat.bind(_this);
    _this.toggleEntity = _this.toggleEntity.bind(_this);
    _this.renderFormatters = _this.renderFormatters.bind(_this);
    _this.renderEntities = _this.renderEntities.bind(_this);
    return _this;
  }

  _createClass(InlineToolbarItems, [{
    key: 'toggleFormat',
    value: function toggleFormat(style) {
      var _props = this.props;
      var editorState = _props.editorState;
      var onChange = _props.onChange;

      onChange(_draftJs.RichUtils.toggleInlineStyle(editorState, style));
    }
  }, {
    key: 'toggleEntity',
    value: function toggleEntity(entity, active) {
      var _props2 = this.props;
      var editorState = _props2.editorState;
      var onChange = _props2.onChange;

      if (active) {
        var selection = editorState.getSelection();
        onChange(_draftJs.RichUtils.toggleLink(editorState, selection, null));
      } else {
        var entityKey = _draftJs.Entity.create(entity.type, entity.mutability, entity.defaultData);
        var newState = _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
        newState = _draftJs.EditorState.forceSelection(newState, editorState.getSelection());
        onChange(newState);
      }
    }
  }, {
    key: 'renderFormatters',
    value: function renderFormatters(formatters) {
      var _this2 = this;

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
              _this2.toggleFormat(formatter.style);
            } },
          formatter.icon ? _react2.default.createElement('span', { title: formatter.label, className: iconWrapperClassNames, dangerouslySetInnerHTML: { __html: formatter.icon } }) : formatter.label
        );
      });
    }
  }, {
    key: 'renderEntities',
    value: function renderEntities(entities) {
      var _this3 = this;

      var editorState = this.props.editorState;

      var selectedEntityTypes = (0, _utils.getSelectedEntityTypes)(editorState);
      return entities.map(function (entity) {
        var active = selectedEntityTypes ? selectedEntityTypes.includes(entity.type) : false;
        var buttonClassNames = (0, _classnames2.default)(_items2.default.button, _defineProperty({}, '' + _items2.default.buttonActive, active));
        var iconWrapperClassNames = (0, _classnames2.default)(_items2.default.iconWrapper, _defineProperty({}, '' + _items2.default.iconWrapperActive, active));
        return _react2.default.createElement(
          'button',
          { key: entity.label, className: buttonClassNames, onClick: function onClick(e) {
              e.preventDefault();
              _this3.toggleEntity(entity, active);
            } },
          entity.icon ? _react2.default.createElement('span', { title: entity.label, className: iconWrapperClassNames, dangerouslySetInnerHTML: { __html: entity.icon } }) : entity.label
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var formatters = _props3.formatters;
      var entities = _props3.entities;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'ul',
          { className: _items2.default.list },
          this.renderFormatters(formatters),
          this.renderEntities(entities)
        )
      );
    }
  }]);

  return InlineToolbarItems;
}(_react.Component);

InlineToolbarItems.defaultPprops = {
  entities: [],
  formatters: []
};

InlineToolbarItems.propTypes = {
  editorState: _react2.default.PropTypes.object.isRequired,
  entities: _react2.default.PropTypes.array,
  formatters: _react2.default.PropTypes.array,
  onChange: _react2.default.PropTypes.func.isRequired
};

exports.default = InlineToolbarItems;