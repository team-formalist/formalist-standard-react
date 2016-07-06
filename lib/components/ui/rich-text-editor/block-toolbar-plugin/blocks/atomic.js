'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('../../../../../');

var _2 = _interopRequireDefault(_);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _formalistDataObjectRenderer = require('formalist-data-object-renderer');

var _formalistDataObjectRenderer2 = _interopRequireDefault(_formalistDataObjectRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataObjectRenderer = (0, _formalistDataObjectRenderer2.default)();
var configuredTemplate = void 0;

var AtomicBlock = _react2.default.createClass({
  displayName: 'AtomicBlock',
  getInitialState: function getInitialState() {
    return {
      render: Date.now()
    };
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    document.addEventListener('mouseup', this.handleOutsideMouseClick);
    document.addEventListener('touchstart', this.handleOutsideMouseClick);

    // Memoize the configured template the first time this runs
    // We need to invoke this at execution time so that the circular
    // dependencies are properly resolved.
    configuredTemplate = configuredTemplate || (0, _2.default)();

    // Extract the entity
    var entityKey = this.props.block.getEntityAt(0);
    var entity = _draftJs.Entity.get(entityKey);

    var _entity$getData = entity.getData();

    var ast = _entity$getData.ast;

    var type = entity.getType();

    this.form = configuredTemplate(ast);

    this.form.store.subscribe(function () {
      var ast = _this.form.store.getState();
      var normalized = dataObjectRenderer(ast);
      _draftJs.Entity.replaceData(entityKey, {
        ast: ast,
        normalized: normalized
      });
      _this.setState({
        render: Date.now()
      });
    });
  },
  onFocus: function onFocus(e) {
    this.setReadOnly(true);
    console.log('focus');
  },
  onBlur: function onBlur(e) {
    this.setReadOnly(false);
    console.log('blur');
  },
  setReadOnly: function setReadOnly(readOnly) {
    var blockProps = this.props.blockProps;

    blockProps.setReadOnly(readOnly);
  },
  render: function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'div',
      {
        ref: function ref(r) {
          return _this2._blockContainer = r;
        },
        contentEditable: false,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        style: { backgroundColor: '#fff', padding: '1.5rem', marginBottom: '1.5rem' } },
      this.form.render()
    );
  }
});

exports.default = AtomicBlock;