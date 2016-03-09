'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManyFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManySet = _react2.default.createClass({
  displayName: 'ManySet',


  propTypes: {
    children: _react2.default.PropTypes.array
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      this.props.children
    );
  }
});

var Many = function Many(_ref) {
  var name = _ref.name;
  var children = _ref.children;
  var errors = _ref.errors;

  return _react2.default.createElement(
    'div',
    { className: 'fm-many' },
    _react2.default.createElement(
      'h3',
      { className: 'fm-many__name' },
      name.replace(/_/, ' ')
    ),
    _react2.default.createElement(
      'div',
      { className: 'fm-many__controls' },
      _react2.default.createElement(
        'button',
        null,
        'Add new ',
        name.replace(/_/, ' ')
      )
    ),
    children.map(function (setChildren) {
      return _react2.default.createElement(
        ManySet,
        null,
        setChildren
      );
    })
  );
};

Many.propTypes = {
  children: _react2.default.PropTypes.array,
  errors: _react2.default.PropTypes.array,
  name: _react2.default.PropTypes.string
};

exports.default = Many;
var ManyFactory = exports.ManyFactory = _react2.default.createFactory(Many);