'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _group = require('./group.mcss');

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Group = _react2.default.createClass({
  displayName: 'Group',


  propTypes: {
    hashCode: _react2.default.PropTypes.number.isRequired,
    type: _react2.default.PropTypes.string,
    attributes: _reactImmutableProptypes2.default.map,
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

    var label = attributes.get('label');

    return _react2.default.createElement(
      'div',
      { className: _group2.default.group },
      label ? _react2.default.createElement(
        'h2',
        { className: _group2.default.label },
        label
      ) : null,
      _react2.default.createElement(
        'div',
        { className: _group2.default.groupItems },
        children.map(function (child, index) {
          return _react2.default.createElement(
            'div',
            { key: index, className: _group2.default.item },
            child
          );
        })
      )
    );
  }
});

exports.default = Group;
var GroupFactory = exports.GroupFactory = _react2.default.createFactory(Group);