'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _richTextArea = require('./rich-text-area.mcss');

var _richTextArea2 = _interopRequireDefault(_richTextArea);

var _richTextEditor = require('../../ui/rich-text-editor');

var _richTextEditor2 = _interopRequireDefault(_richTextEditor);

var _draftJsAstExporter = require('draft-js-ast-exporter');

var _draftJsAstExporter2 = _interopRequireDefault(_draftJsAstExporter);

var _draftJsAstImporter = require('draft-js-ast-importer');

var _draftJsAstImporter2 = _interopRequireDefault(_draftJsAstImporter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Import components


// Import styles


// HTML


/**
 * Text Area field
 */
var RichTextArea = _react2.default.createClass({
  displayName: 'RichTextArea',


  propTypes: {
    actions: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.object,
    attributes: _react2.default.PropTypes.shape({
      label: _react2.default.PropTypes.string,
      hint: _react2.default.PropTypes.string,
      placeholder: _react2.default.PropTypes.string,
      inline: _react2.default.PropTypes.bool,
      singleLine: _react2.default.PropTypes.bool
    }),
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    errors: _reactImmutableProptypes2.default.list,
    value: _react2.default.PropTypes.array
  },

  componentWillMount: function componentWillMount() {},
  getInitialState: function getInitialState() {
    var value = this.props.value;

    return {
      editorState: value ? _draftJs.EditorState.createWithContent((0, _draftJsAstImporter2.default)(value)) : _draftJs.EditorState.createEmpty()
    };
  },


  /**
   * onChange handler
   *
   * @param  {EditorState} editorState State from the editor
   */
  onChange: function onChange(editorState) {
    // Persist the value up
    this.props.actions.edit(function (val) {
      return (0, _draftJsAstExporter2.default)(editorState);
    });
    this.setState({
      editorState: editorState
    });
  },
  onBoldClick: function onBoldClick(e) {
    e.preventDefault();
    var editorState = this.state.editorState;

    this.onChange(_draftJs.RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  },
  onItalicClick: function onItalicClick(e) {
    e.preventDefault();
    var editorState = this.state.editorState;

    this.onChange(_draftJs.RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  },


  // onLinkClick (e) {
  //   e.preventDefault()
  //   const {editorState} = this.state
  //   const contentState = editorState.getCurrentContent()
  //   const targetRange = editorState.getSelection()
  //   const key = Entity.create('LINK', 'MUTABLE', {href: 'http://www.zombo.com'});
  //   const contentStateWithLink = Modifier.applyEntity(
  //     contentState,
  //     targetRange,
  //     key
  //   )
  //   const newEditorState = EditorState.push(
  //     editorState,
  //     contentStateWithLink
  //   )
  //   this.setState({
  //     editorState: newEditorState
  //   })
  // },

  render: function render() {
    var _props = this.props;
    var attributes = _props.attributes;
    var errors = _props.errors;
    var hint = _props.hint;
    var label = _props.label;
    var name = _props.name;
    var value = _props.value;
    var editorState = this.state.editorState;

    var hasErrors = errors.count() > 0;

    // Set up field classes
    var fieldClassNames = (0, _classnames2.default)(_richTextArea2.default.base, _defineProperty({}, '' + _richTextArea2.default.baseInline, attributes.inline));

    // Set up input classes
    var inputClassNames = (0, _classnames2.default)(_defineProperty({}, '' + _richTextArea2.default.code, attributes.code));

    return _react2.default.createElement(
      'div',
      { className: fieldClassNames },
      _react2.default.createElement(
        'div',
        { className: _richTextArea2.default.header },
        _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
      ),
      _react2.default.createElement(
        'div',
        { className: _richTextArea2.default.display },
        _react2.default.createElement(
          'button',
          { onClick: this.onBoldClick },
          'Bold'
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.onItalicClick },
          'Italic'
        ),
        _react2.default.createElement(_richTextEditor2.default, { className: _richTextArea2.default.editor, editorState: editorState, onChange: this.onChange }),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      )
    );
  }
});

exports.default = RichTextArea;