'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('../../../../../');

var _2 = _interopRequireDefault(_);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _formalistDataObjectRenderer = require('formalist-data-object-renderer');

var _formalistDataObjectRenderer2 = _interopRequireDefault(_formalistDataObjectRenderer);

var _atomic = require('./atomic.mcss');

var _atomic2 = _interopRequireDefault(_atomic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dataObjectRenderer = (0, _formalistDataObjectRenderer2.default)();
var configuredTemplate = void 0;

var AtomicBlock = _react2.default.createClass({
  displayName: 'AtomicBlock',

  propTypes: {
    block: _react2.default.PropTypes.object.isRequired,
    blockProps: _react2.default.PropTypes.shape({
      editorEmitter: _react2.default.PropTypes.object.isRequired,
      remove: _react2.default.PropTypes.func.isRequired,
      setReadOnly: _react2.default.PropTypes.func.isRequired
    })
  },

  getInitialState: function getInitialState() {
    this.entityKey = this.props.block.getEntityAt(0);
    this.entity = _draftJs.Entity.get(this.entityKey);
    return {
      isSelected: false
    };
  },


  /**
   * Enable parent to pass context
   */

  contextTypes: {
    globalConfig: _react2.default.PropTypes.object
  },

  componentWillMount: function componentWillMount() {
    var _this = this;

    document.addEventListener('mouseup', this.handleOutsideMouseClick);
    document.addEventListener('touchstart', this.handleOutsideMouseClick);

    // Memoize the configured template the first time this runs
    // We need to invoke this at execution time so that the circular
    // dependencies are properly resolved.
    configuredTemplate = configuredTemplate || (0, _2.default)(null, { global: this.context.globalConfig });

    // Extract the entity
    var entityData = this.entity.getData();

    // Create the formalist form with config
    this.form = configuredTemplate(entityData.form);

    this.form.store.subscribe(function () {
      var formTemplate = _this.form.store.getState();
      _draftJs.Entity.replaceData(_this.entityKey, {
        name: entityData.name,
        label: entityData.label,
        form: formTemplate,
        data: dataObjectRenderer(formTemplate)
      });
      _this.forceUpdate();
    });

    // Subscribe to the editorEmitter’s onChange event
    var editorEmitter = this.props.blockProps.editorEmitter;

    editorEmitter.on('change', this.onEditorChange);
    editorEmitter.on('focus', this.checkEditorSelection);
    editorEmitter.on('blur', this.checkEditorSelection);
  },
  componentWillUnmount: function componentWillUnmount() {
    var editorEmitter = this.props.blockProps.editorEmitter;

    editorEmitter.off('change', this.onEditorChange);
    editorEmitter.off('focus', this.checkEditorSelection);
    editorEmitter.off('blur', this.checkEditorSelection);
  },
  onEditorChange: function onEditorChange(editorState) {
    this.checkEditorSelection(editorState);
  },
  onEditorFocus: function onEditorFocus(editorState) {
    this.checkEditorSelection(editorState);
  },
  checkEditorSelection: function checkEditorSelection(editorState) {
    var editorEmitter = this.props.blockProps.editorEmitter;

    var selection = editorState.getSelection();
    var isSelected = false;
    // Is a collapsed selection at the start?
    if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
      var block = this.props.block;

      var blockKey = block.getKey();
      var selectedBlockKey = selection.getFocusKey();
      if (blockKey === selectedBlockKey) {
        isSelected = true;
        editorEmitter.emit('atomic:selected', blockKey);
      }
    }
    this.setState({
      isSelected: isSelected
    });
  },
  onFocus: function onFocus(e) {
    this.setState({
      isSelected: false
    });
    this.setReadOnly(true);
  },
  onBlur: function onBlur(e) {
    this.setReadOnly(false);
  },
  remove: function remove() {
    var _props = this.props;
    var block = _props.block;
    var blockProps = _props.blockProps;

    this.setReadOnly(false);
    blockProps.remove(block.getKey());
  },
  setReadOnly: function setReadOnly(readOnly) {
    var blockProps = this.props.blockProps;

    blockProps.setReadOnly(readOnly);
  },
  render: function render() {
    var _this2 = this;

    var isSelected = this.state.isSelected;

    var _entity$getData = this.entity.getData();

    var label = _entity$getData.label;


    var containerClassNames = (0, _classnames2.default)(_atomic2.default.container, _defineProperty({}, '' + _atomic2.default.containerSelected, isSelected));

    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return _react2.default.createElement(
      'div',
      { className: _atomic2.default.wrapper, 'data-debug-block-key': this.props.block.getKey() },
      _react2.default.createElement(
        'div',
        { className: _atomic2.default.caret },
        _react2.default.createElement('br', null)
      ),
      _react2.default.createElement(
        'div',
        {
          ref: function ref(r) {
            _this2._blockContainer = r;
          },
          className: containerClassNames,
          onClick: this.onFocus,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          contentEditable: false },
        _react2.default.createElement(
          'div',
          { className: _atomic2.default.header },
          _react2.default.createElement(
            'h3',
            { className: _atomic2.default.label },
            label
          ),
          _react2.default.createElement(
            'div',
            { className: _atomic2.default.toolbar },
            _react2.default.createElement(
              'button',
              { className: _atomic2.default.remove, onClick: function onClick(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  _this2.remove();
                } },
              _react2.default.createElement(
                'span',
                { className: _atomic2.default.removeText },
                'Remove'
              ),
              _react2.default.createElement(
                'div',
                { className: _atomic2.default.removeX },
                '\xD7'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _atomic2.default.content },
          this.form.render()
        )
      )
    );
    /* eslint-enable react/jsx-no-bind */
  }
});

exports.default = AtomicBlock;