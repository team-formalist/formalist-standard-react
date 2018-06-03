'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _formalistValidation = require('formalist-validation');

var _formalistValidation2 = _interopRequireDefault(_formalistValidation);

var _container = require('./container.mcss');

var _container2 = _interopRequireDefault(_container);

var _formalistCompose = require('formalist-compose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var deleteField = _formalistCompose.actions.deleteField;
var editField = _formalistCompose.actions.editField;
var validateField = _formalistCompose.actions.validateField;

/**
 * Container class for fields.
 *
 * Consolidates common attributes and actions into a single place.
 *
 */

var FieldContainer = function (_React$Component) {
  _inherits(FieldContainer, _React$Component);

  function FieldContainer() {
    _classCallCheck(this, FieldContainer);

    return _possibleConstructorReturn(this, (FieldContainer.__proto__ || Object.getPrototypeOf(FieldContainer)).apply(this, arguments));
  }

  _createClass(FieldContainer, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        globalConfig: this.props.globalConfig
      };
    }

    /**
     * Create `context` object for each field to access
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // Use the path hash-code to determine whether or not to rerender this
      // field. This should take account of any change to the AST.
      // It will not account for changes to the overall form definition (but they
      // should not change after runtime anyway)
      return this.props.hashCode !== nextProps.hashCode;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var attributes = _props.attributes;
      var bus = _props.bus;
      var config = _props.config;
      var errors = _props.errors;
      var field = _props.field;
      var name = _props.name;
      var path = _props.path;
      var rules = _props.rules;
      var store = _props.store;
      var value = _props.value;

      var Field = field;

      // Turn the attributes from an Immutable.Map into a POJO
      attributes = attributes.toJS();

      // Extract a few things from attributes
      var label = attributes.label || this.props.name.replace(/_/g, ' ');
      var _attributes = attributes;
      var hint = _attributes.hint;

      // Curry with the form validation schema

      var validate = (0, _formalistValidation2.default)(attributes.validation);

      // Abstract the actions so that each field doesn't have to worry about
      // the action implementation
      var fieldActions = {
        delete: function _delete() {
          return store.dispatch(deleteField(path));
        },
        edit: function edit(val) {
          var editedValue = val();
          // Ensure we're not passing Immutable stuff through
          // to the validator
          if (_immutable.List.isList(editedValue)) {
            editedValue = editedValue.toJS();
          }
          return store.batchDispatch([editField(path, val), validateField(path, validate(editedValue))]);
        }
      };

      // Set up standard classNames
      var containerClassNames = (0, _classnames2.default)(_container2.default.base, _defineProperty({}, '' + _container2.default.errors, errors.count() > 0));

      return (
        // *Explicitly* pass all the props we care about down to the field
        // rather than dumping everything through
        _react2.default.createElement(
          'div',
          { className: containerClassNames },
          _react2.default.createElement(Field, {
            actions: fieldActions,
            bus: bus,
            config: config,
            name: name,
            value: value,
            rules: rules,
            errors: errors,
            attributes: attributes,
            label: label,
            hint: hint })
        )
      );
    }
  }]);

  return FieldContainer;
}(_react2.default.Component);

FieldContainer.propTypes = {
  attributes: _reactImmutableProptypes2.default.map,
  bus: _propTypes2.default.object.isRequired,
  config: _propTypes2.default.object,
  errors: _reactImmutableProptypes2.default.list,
  field: _propTypes2.default.func.isRequired,
  globalConfig: _propTypes2.default.object,
  hashCode: _propTypes2.default.number.isRequired,
  name: _propTypes2.default.string.isRequired,
  path: _reactImmutableProptypes2.default.list.isRequired,
  rules: _reactImmutableProptypes2.default.list,
  store: _propTypes2.default.object.isRequired,
  type: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.any
};
FieldContainer.childContextTypes = {
  globalConfig: _propTypes2.default.object
};
exports.default = FieldContainer;