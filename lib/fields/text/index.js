'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextFieldFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _standard = require('./standard');

var _standard2 = _interopRequireDefault(_standard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import code from './code'

var displayTypes = {
  code: _standard2.default
};

var TextFieldContainer = _react2.default.createClass({
  displayName: 'TextFieldContainer',

  propTypes: {
    actions: _react2.default.PropTypes.object,
    config: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    path: _react2.default.PropTypes.array,
    value: _react2.default.PropTypes.string
  },

  getInitialState: function getInitialState() {
    var field = this.props.config.display_as ? displayTypes[this.props.config.display_as] : _standard2.default;
    return { field: field };
  },
  onChange: function onChange(e) {
    var value = e.target.value;
    this.props.actions.editField(this.props.path, function (val) {
      return value;
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'field' },
      _react2.default.createElement(
        'h3',
        { className: 'field__name' },
        this.props.name.replace(/_/, ' ')
      ),
      _react2.default.createElement(this.state.field, _extends({ onChange: this.onChange }, props))
    );
  }
});

exports.default = TextFieldContainer;
var TextFieldFactory = exports.TextFieldFactory = _react2.default.createFactory(TextFieldContainer);