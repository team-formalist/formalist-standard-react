'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManyFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _many = require('./many.mcss');

var _many2 = _interopRequireDefault(_many);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    type: _react2.default.PropTypes.string,
    rules: _reactImmutableProptypes2.default.list,
    errors: _reactImmutableProptypes2.default.list,
    attributes: _reactImmutableProptypes2.default.map,
    template: _react2.default.PropTypes.object,
    children: _reactImmutableProptypes2.default.list
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return this.props.hashCode !== nextProps.hashCode;
  },
  render: function render() {
    var _props = this.props;
    var attributes = _props.attributes;
    var children = _props.children;
    var name = _props.name;

    var label = attributes.get('label') || name.replace(/_/, ' ');

    return _react2.default.createElement(
      'div',
      { className: _many2.default.base },
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
          null,
          'Add new ',
          name.replace(/_/, ' ')
        )
      ),
      children.map(function (setChildren, i) {
        return _react2.default.createElement(
          ManySet,
          { key: i },
          setChildren
        );
      })
    );
  }
});

exports.default = Many;
var ManyFactory = exports.ManyFactory = _react2.default.createFactory(Many);