'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _section = require('./section.mcss');

var _section2 = _interopRequireDefault(_section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Section = _react2.default.createClass({
  displayName: 'Section',


  propTypes: {
    hashCode: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.array,
    name: _react2.default.PropTypes.string,
    children: _react2.default.PropTypes.array
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return this.props.hashCode !== nextProps.hashCode;
  },
  render: function render() {
    var label = this.props.config.label || this.props.name.replace(/_/, ' ');
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
        { className: _section2.default.children },
        this.props.children
      )
    );
  }
});

exports.default = Section;
var SectionFactory = exports.SectionFactory = _react2.default.createFactory(Section);