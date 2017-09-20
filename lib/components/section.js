'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _sectionStyles = require('./section-styles');

var _sectionStyles2 = _interopRequireDefault(_sectionStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = function (_React$Component) {
  _inherits(Section, _React$Component);

  function Section() {
    _classCallCheck(this, Section);

    return _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).apply(this, arguments));
  }

  _createClass(Section, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // Use the path hash-code to determine whether or not to rerender this
      // section. This should take account of any change to the AST.
      // It will not account for changes to the overall form definition (but they
      // should not change after runtime anyway)
      return this.props.hashCode !== nextProps.hashCode;
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(_sectionStyles2.default);
      var label = this.props.attributes.get('label') || this.props.name.replace(/_/, ' ');
      return _react2.default.createElement(
        'section',
        { className: _sectionStyles2.default.base },
        _react2.default.createElement(
          'h2',
          { className: _sectionStyles2.default.label },
          label
        ),
        _react2.default.createElement(
          'div',
          { className: _sectionStyles2.default.children },
          this.props.children
        )
      );
    }
  }]);

  return Section;
}(_react2.default.Component);

Section.propTypes = {
  hashCode: _propTypes2.default.number.isRequired,
  type: _propTypes2.default.string,
  attributes: _reactImmutableProptypes2.default.map,
  name: _propTypes2.default.string,
  children: _reactImmutableProptypes2.default.list
};
exports.default = Section;
var SectionFactory = exports.SectionFactory = _react2.default.createFactory(Section);