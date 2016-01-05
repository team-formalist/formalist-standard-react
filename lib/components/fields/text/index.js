'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Import the display types

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextFieldFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _displayStandard = require('./display-standard');

var _displayStandard2 = _interopRequireDefault(_displayStandard);

var _displayCode = require('./display-code');

var _displayCode2 = _interopRequireDefault(_displayCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var displayTypes = {
  code: _displayCode2.default
};

var TextFieldBase = _react2.default.createClass({
  displayName: 'TextFieldBase',

  propTypes: {
    actions: _react2.default.PropTypes.object,
    config: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
  },

  getInitialState: function getInitialState() {
    var fieldDisplay = this.props.config.display_as ? displayTypes[this.props.config.display_as] : _displayStandard2.default;
    return { fieldDisplay: fieldDisplay };
  },
  onChange: function onChange(e) {
    var value = e.target.value;
    this.props.actions.edit(function (val) {
      return value;
    });
  },
  render: function render() {
    var FieldDisplay = this.state.fieldDisplay;
    return _react2.default.createElement(
      'div',
      { className: 'field' },
      _react2.default.createElement(
        'h3',
        { className: 'field__name' },
        this.props.name.replace(/_/, ' ')
      ),
      _react2.default.createElement(FieldDisplay, _extends({ onChange: this.onChange }, this.props))
    );
  }
});

exports.default = TextFieldBase;
var TextFieldFactory = exports.TextFieldFactory = _react2.default.createFactory(TextFieldBase);