'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManyFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _formalistCompose = require('formalist-compose');

var _formalistValidation = require('formalist-validation');

var _formalistValidation2 = _interopRequireDefault(_formalistValidation);

var _errors = require('./fields/common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _sortable = require('./ui/sortable');

var _sortable2 = _interopRequireDefault(_sortable);

var _many = require('./many.mcss');

var _many2 = _interopRequireDefault(_many);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addManyContent = _formalistCompose.actions.addManyContent;
var deleteManyContent = _formalistCompose.actions.deleteManyContent;
var reorderManyContents = _formalistCompose.actions.reorderManyContents;
var validateMany = _formalistCompose.actions.validateMany;

// Components


// Styles

var ManySet = _react2.default.createClass({
  displayName: 'ManySet',

  propTypes: {
    children: _reactImmutableProptypes2.default.list
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: _many2.default.set },
      this.props.children
    );
  }
});

var Many = _react2.default.createClass({
  displayName: 'Many',

  propTypes: {
    hashCode: _react2.default.PropTypes.number.isRequired,
    name: _react2.default.PropTypes.string,
    path: _reactImmutableProptypes2.default.list.isRequired,
    contentsPath: _reactImmutableProptypes2.default.list.isRequired,
    store: _react2.default.PropTypes.object.isRequired,
    type: _react2.default.PropTypes.string,
    rules: _reactImmutableProptypes2.default.list,
    errors: _reactImmutableProptypes2.default.list,
    attributes: _reactImmutableProptypes2.default.mapContains({
      label: _react2.default.PropTypes.string,
      placeholder: _react2.default.PropTypes.string,
      add_label: _react2.default.PropTypes.string
    }),
    template: _react2.default.PropTypes.object,
    children: _reactImmutableProptypes2.default.list
  },

  /**
   * Set an initial `contentsKey` so we can reliably render changes to the
   * contents/children as they are sorted
   * @return {Object}
   */
  getInitialState: function getInitialState() {
    return {
      contentsKey: Date.now()
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    // Naive check to see if the children have changed
    // so we can refresh the `contentsKey`
    if (this.props.children.count() !== nextProps.children.count()) {
      this.updateContentsKey();
    }
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    //
    // We also check the `contentsKey` we set in state
    return this.props.hashCode !== nextProps.hashCode || this.state.contentsKey !== nextState.contentsKey;
  },
  updateContentsKey: function updateContentsKey() {
    this.setState({
      contentsKey: Date.now()
    });
  },


  /**
   * Tell the store to inject a new content/child from the template
   * @param {Event} e Mouse/KeyboardEvent
   */
  addChild: function addChild(e) {
    e.preventDefault();
    var _props = this.props;
    var attributes = _props.attributes;
    var store = _props.store;
    var path = _props.path;


    store.batchDispatch([addManyContent(path), validateMany(path, (0, _formalistValidation2.default)(attributes.get('validation').toJS()))]);
    this.updateContentsKey();
  },


  /**
   * When selected item is removed
   * @param {Number} index Index of the item to remove
   * @return {Null}
   */
  onRemove: function onRemove(index) {
    var _props2 = this.props;
    var attributes = _props2.attributes;
    var store = _props2.store;
    var contentsPath = _props2.contentsPath;
    var path = _props2.path;

    var childPath = contentsPath.push(index);

    store.batchDispatch([deleteManyContent(childPath), validateMany(path, (0, _formalistValidation2.default)(attributes.get('validation').toJS()))]);
    this.updateContentsKey();
  },


  /**
   * When selected item is removed
   * @return {Null}
   */
  onDrop: function onDrop(newOrder) {
    var _props3 = this.props;
    var attributes = _props3.attributes;
    var store = _props3.store;
    var path = _props3.path;

    store.batchDispatch([reorderManyContents(path, newOrder), validateMany(path, (0, _formalistValidation2.default)(attributes.get('validation').toJS()))]);
    this.updateContentsKey();
  },
  render: function render() {
    var _props4 = this.props;
    var attributes = _props4.attributes;
    var children = _props4.children;
    var errors = _props4.errors;
    var name = _props4.name;

    var hasErrors = errors.count() > 0;
    var contentsKey = this.state.contentsKey;
    // Extract attributes from Immutable.Map

    var _attributes$toJS = attributes.toJS();

    var label = _attributes$toJS.label;
    var add_label = _attributes$toJS.add_label;
    var placeholder = _attributes$toJS.placeholder;

    label = label || name.replace(/_/, ' ');

    return _react2.default.createElement(
      'div',
      { className: _many2.default.base },
      _react2.default.createElement(
        'div',
        { className: _many2.default.header },
        _react2.default.createElement(
          'h3',
          { className: _many2.default.label },
          label
        ),
        _react2.default.createElement(
          'div',
          { className: _many2.default.controls },
          _react2.default.createElement(
            'button',
            { className: _many2.default.addButton, onClick: this.addChild },
            add_label || 'Add item'
          )
        )
      ),
      children.count() > 0 ? _react2.default.createElement(
        _sortable2.default,
        { canRemove: true, onRemove: this.onRemove, onDrop: this.onDrop, verticalControls: true },
        children.map(function (setChildren, i) {
          return _react2.default.createElement(
            ManySet,
            { key: contentsKey + '_' + i },
            setChildren
          );
        })
      ) : _react2.default.createElement(
        'div',
        { className: _many2.default.placeholder },
        _react2.default.createElement(
          'span',
          { className: _many2.default.placeholderText },
          placeholder || 'No items have been added.',
          ' '
        ),
        _react2.default.createElement(
          'button',
          { className: _many2.default.placeholderButton, onClick: this.addChild },
          'Add the first?'
        )
      ),
      hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
    );
  }
});

exports.default = Many;
var ManyFactory = exports.ManyFactory = _react2.default.createFactory(Many);