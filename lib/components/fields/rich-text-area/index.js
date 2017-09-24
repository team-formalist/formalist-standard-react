'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

var _richTextEditor = require('../../ui/rich-text-editor');

var _richTextEditor2 = _interopRequireDefault(_richTextEditor);

var _draftJsAstExporter = require('draft-js-ast-exporter');

var _draftJsAstExporter2 = _interopRequireDefault(_draftJsAstExporter);

var _draftJsAstImporter = require('draft-js-ast-importer');

var _draftJsAstImporter2 = _interopRequireDefault(_draftJsAstImporter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import components


// Import styles


// HTML


/**
 * Text Area field
 */
var RichTextArea = function (_React$Component) {
  _inherits(RichTextArea, _React$Component);

  function RichTextArea(props) {
    _classCallCheck(this, RichTextArea);

    var _this = _possibleConstructorReturn(this, (RichTextArea.__proto__ || Object.getPrototypeOf(RichTextArea)).call(this, props));

    _initialiseProps.call(_this);

    var value = props.value;
    // Convert from an Immutable structure?

    value = value && value.toJS ? value.toJS() : value;
    // Convert from a string?
    value = typeof value === 'string' ? JSON.parse(value) : value;

    _this.state = {
      editorState: value ? _draftJs.EditorState.createWithContent((0, _draftJsAstImporter2.default)(value)) : _draftJs.EditorState.createEmpty()
    };
    return _this;
  }

  /**
   * onChange handler
   *
   * @param  {EditorState} editorState State from the editor
   */


  _createClass(RichTextArea, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var attributes = _props.attributes;
      var config = _props.config;
      var errors = _props.errors;
      var hint = _props.hint;
      var label = _props.label;
      var name = _props.name;
      var editorState = this.state.editorState;

      var hasErrors = errors.count() > 0;

      // Set up field classes
      var fieldClassNames = (0, _classnames2.default)(styles.base, _defineProperty({}, '' + styles.baseInline, attributes.inline));

      return _react2.default.createElement(
        'div',
        { className: fieldClassNames },
        _react2.default.createElement(
          'div',
          { className: styles.header },
          _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
        ),
        _react2.default.createElement(
          'div',
          { className: styles.display },
          _react2.default.createElement(_richTextEditor2.default, {
            editorState: editorState,
            config: config,
            onChange: this.onChange,
            inlineFormatters: attributes.inline_formatters,
            blockFormatters: attributes.block_formatters,
            embeddableForms: attributes.embeddable_forms,
            boxSize: attributes.box_size,
            textSize: attributes.text_size,
            placeholder: attributes.placeholder
          }),
          hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
        )
      );
    }
  }]);

  return RichTextArea;
}(_react2.default.Component);

RichTextArea.propTypes = {
  actions: _propTypes2.default.object,
  name: _propTypes2.default.string,
  config: _propTypes2.default.object,
  attributes: _propTypes2.default.shape({
    label: _propTypes2.default.string,
    hint: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    inline: _propTypes2.default.bool,
    box_size: _propTypes2.default.oneOf(['single', 'small', 'normal', 'large', 'xlarge']),
    inline_formatters: _propTypes2.default.array,
    block_formatters: _propTypes2.default.array,
    embeddable_forms: _propTypes2.default.object
  }),
  hint: _propTypes2.default.string,
  label: _propTypes2.default.string,
  errors: _reactImmutableProptypes2.default.list,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array, _reactImmutableProptypes2.default.list])
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onChange = function (editorState) {
    var value = _this2.props.value;

    var exporterOptions = {
      entityModifiers: {
        'formalist': function formalist(data) {
          var copy = Object.assign({}, data);
          delete copy['label'];
          delete copy['form'];
          return copy;
        }
      }
    };
    var currentContent = editorState.getCurrentContent();
    var hasText = currentContent.hasText();
    var newValue = hasText ? (0, _draftJsAstExporter2.default)(editorState, exporterOptions) : null;
    var hasChangedToNull = newValue === null && value !== null;

    // Persist the value to the AST, but only if it is:
    // * Not null
    // * Has changed to null
    if (newValue != null || hasChangedToNull) {
      _this2.props.actions.edit(function (val) {
        return newValue;
      });
    }
    // Keep track of the state here
    _this2.setState({
      editorState: editorState
    });
  };
};

exports.default = RichTextArea;