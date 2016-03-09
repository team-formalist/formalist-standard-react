'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _section = require('./section.mcss');

var _section2 = _interopRequireDefault(_section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Section = _react2.default.createClass({
  displayName: 'Section',


  propTypes: {
    children: _reactImmutableProptypes2.default.list,
    config: _react2.default.PropTypes.object,
    hashCode: _react2.default.PropTypes.number.isRequired,
    name: _react2.default.PropTypes.string
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
    var children = _props.children;
    var config = _props.config;
    var name = _props.name;

    var label = config.label || name.replace(/_/, ' ');

    return _react2.default.createElement(
      'section',
      { className: _section2.default.base },
      _react2.default.createElement(
        'h2',
        { className: _section2.default.name },
        label
      ),
      _react2.default.createElement(
        'div',
        { className: children },
        children
      )
    );
  }
});

exports.default = Section;
var SectionFactory = exports.SectionFactory = _react2.default.createFactory(Section);