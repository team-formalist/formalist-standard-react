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

var _container = require('./container.mcss');

var _container2 = _interopRequireDefault(_container);

var _formalistCompose = require('formalist-compose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addField = _formalistCompose.actions.addField;
var deleteField = _formalistCompose.actions.deleteField;
var editField = _formalistCompose.actions.editField;
var validateField = _formalistCompose.actions.validateField;

/**
 * Container class for fields.Consolidates common attributes and actions into a
 * single place.
 *
 */

var FieldContainer = _react2.default.createClass({
  displayName: 'FieldContainer',

  propTypes: {
    hashCode: _react2.default.PropTypes.number.isRequired,
    path: _reactImmutableProptypes2.default.list.isRequired,
    store: _react2.default.PropTypes.object.isRequired,
    type: _react2.default.PropTypes.string.isRequired,
    name: _react2.default.PropTypes.string.isRequired,
    config: _react2.default.PropTypes.object,
    field: _react2.default.PropTypes.func.isRequired,
    value: _react2.default.PropTypes.any
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // field. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return this.props.hashCode !== nextProps.hashCode;
  },
  render: function render() {
    var _props = this.props;
    var config = _props.config;
    var displayVariant = _props.displayVariant;
    var displayVariants = _props.displayVariants;
    var errors = _props.errors;
    var field = _props.field;
    var name = _props.name;
    var path = _props.path;
    var rules = _props.rules;
    var store = _props.store;
    var type = _props.type;
    var value = _props.value;

    var Field = field;

    // Abstract the actions so that each field doesn't have to worry about
    // the action implementation
    var fieldActions = {
      add: function add(options) {
        return store.dispatch(addField(options));
      },
      delete: function _delete() {
        return store.dispatch(deleteField(path));
      },
      edit: function edit(val) {
        return store.batchDispatch([editField(path, val), validateField(path, val)]);
      }
    };

    // Extract a few config things
    var label = config.label || this.props.name.replace(/_/g, ' ');

    // Set up standard classNames based on `type`
    var containerClassNames = (0, _classnames2.default)(_container2.default.base, _defineProperty({}, '' + _container2.default.errors, this.props.errors.count() > 0));

    return(
      // *Explicitly* pass all the props we care about down to the field
      // rather than dumping everything through
      _react2.default.createElement(
        'div',
        { className: containerClassNames },
        _react2.default.createElement(Field, {
          actions: fieldActions,
          name: name,
          displayVariant: displayVariant,
          value: value,
          rules: rules,
          errors: errors,
          config: config,
          label: label,
          hint: config.hint,
          displayVariants: displayVariants })
      )
    );
  }
});

exports.default = FieldContainer;