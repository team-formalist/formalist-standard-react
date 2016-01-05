'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formalistCompose = require('formalist-compose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  fieldProps: _react2.default.PropTypes.object
};

var bar = _react2.default.createClass({
  displayName: 'bar',
  render: function render() {
    return _react2.default.createElement(
      'p',
      null,
      'Hello ',
      _react2.default.createElement(
        'a',
        { href: '#' },
        'there'
      ),
      ', Max.'
    );
  }
});

/**
 * Container class for fields
 *
 * Consolidate common attributes.
 *
 */
var FieldContainer = _react2.default.createClass({
  displayName: 'FieldContainer',

  propTypes: propTypes,

  render: function render() {
    var _props = this.props;
    var fieldComponent = _props.fieldComponent;
    var fieldProps = _props.fieldProps;
    var store = fieldProps.store;

    // Abstract the actions so that each field doesn't have to worry about
    // the action implementation

    var actions = {
      add: function add(options) {
        return store.dispatch((0, _formalistCompose.addField)(options));
      },
      delete: function _delete() {
        return store.dispatch((0, _formalistCompose.deleteField)(fieldProps.path));
      },
      edit: function edit(val) {
        return store.dispatch((0, _formalistCompose.editField)(fieldProps.path, val));
      }
    };

    return _react2.default.createElement('bar', null);
  }
});

exports.default = FieldContainer;