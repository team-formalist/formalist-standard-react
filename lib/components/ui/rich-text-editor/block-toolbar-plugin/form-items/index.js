'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

var _formalistDataObjectRenderer = require('formalist-data-object-renderer');

var _formalistDataObjectRenderer2 = _interopRequireDefault(_formalistDataObjectRenderer);

var _formItems = require('./form-items.mcss');

var _formItems2 = _interopRequireDefault(_formItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialise the dataObjectRenderer
var dataObjectRenderer = (0, _formalistDataObjectRenderer2.default)();

var FormItems = _react2.default.createClass({
  displayName: 'FormItems',

  propTypes: {
    embeddableForms: _react2.default.PropTypes.array,
    editorState: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      embeddableForms: []
    };
  },
  insertAtomicBlock: function insertAtomicBlock(formConfig) {
    var _props = this.props;
    var editorState = _props.editorState;
    var onChange = _props.onChange;
    var closeToolbar = _props.closeToolbar;

    var entityKey = _draftJs.Entity.create('formalist', 'IMMUTABLE', {
      name: formConfig.name,
      label: formConfig.label,
      form: formConfig.form,
      data: dataObjectRenderer(formConfig.form)
    });
    onChange(_draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, '¶'));
    closeToolbar();
  },
  renderFormButtons: function renderFormButtons(embeddableForms) {
    var _this = this;

    return embeddableForms.map(function (form) {
      var onClick = function onClick(e) {
        e.preventDefault();
        _this.insertAtomicBlock(form);
      };
      return _react2.default.createElement(
        'button',
        { className: _formItems2.default.button, key: form.name, onClick: onClick },
        form.label || form.name
      );
    });
  },
  render: function render() {
    var embeddableForms = this.props.embeddableForms;

    if (embeddableForms.length === 0) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: _formItems2.default.container },
      _react2.default.createElement(
        'ul',
        { className: _formItems2.default.list, onMouseDown: function onMouseDown(e) {
            return e.preventDefault();
          } },
        this.renderFormButtons(embeddableForms)
      )
    );
  }
});

exports.default = FormItems;