'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _select = require('../../ui/select');

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringDisplaySelect = _react2.default.createClass({
  displayName: 'StringDisplaySelect',

  propTypes: {
    className: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.object,
    error: _react2.default.PropTypes.bool,
    name: _react2.default.PropTypes.string.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
  },

  render: function render() {
    var _props = this.props;
    var config = _props.config;
    var className = _props.className;
    var error = _props.error;
    var name = _props.name;
    var value = _props.value;
    var onChange = _props.onChange;
    var option_values = config.option_values;
    var placeholder = config.placeholder;

    // Return nothing if we have no values

    if (option_values && option_values.count() === 0) {
      return false;
    }

    return _react2.default.createElement(
      _select2.default,
      {
        id: name,
        className: className,
        defaultValue: value,
        placeholder: placeholder,
        error: error,
        onChange: onChange },
      option_values.map(function (option, i) {
        var value = void 0,
            label = void 0;
        if (_immutable.List.isList(option)) {
          value = option.get(0);
          label = option.get(1) || value;
        } else {
          value = option;
          label = option;
        }
        return _react2.default.createElement(
          'option',
          { key: i, value: value },
          label
        );
      })
    );
  }
});

// Components


exports.default = StringDisplaySelect;