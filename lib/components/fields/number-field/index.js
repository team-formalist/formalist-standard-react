'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isNumber = require('is-number');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _input = require('../../ui/input');

var _input2 = _interopRequireDefault(_input);

var _numberField = require('./number-field.mcss');

var _numberField2 = _interopRequireDefault(_numberField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import components


// Import styles


/**
 * Number field
 */
var NumberField = function (_React$Component) {
  _inherits(NumberField, _React$Component);

  function NumberField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NumberField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NumberField.__proto__ || Object.getPrototypeOf(NumberField)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (e, value) {
      if ((0, _isNumber2.default)(value)) {
        value = parseFloat(value);
      } else {
        value = null;
      }
      _this.props.actions.edit(function (val) {
        return value;
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Enable parent to pass context
   */

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */


  _createClass(NumberField, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var attributes = _props.attributes;
      var errors = _props.errors;
      var hint = _props.hint;
      var label = _props.label;
      var name = _props.name;
      var value = _props.value;

      var hasErrors = errors.count() > 0;

      // Set up field classes
      var fieldClassNames = (0, _classnames2.default)(_numberField2.default.base, _defineProperty({}, '' + _numberField2.default.baseInline, attributes.inline));

      // Set up input classes
      var inputClassNames = (0, _classnames2.default)(_defineProperty({}, '' + _numberField2.default.code, attributes.code));

      // Configure specific number attributes from the attributes
      var numberProps = {};
      var numberConfig = ['step', 'min', 'max'];
      numberConfig.forEach(function (option) {
        var value = attributes[option];
        if (value && (0, _isNumber2.default)(value)) {
          numberProps[option] = value;
        }
      });

      return _react2.default.createElement(
        'div',
        { className: fieldClassNames },
        _react2.default.createElement(
          'div',
          { className: _numberField2.default.header },
          _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
        ),
        _react2.default.createElement(
          'div',
          { className: _numberField2.default.display },
          _react2.default.createElement(_input2.default, _extends({
            type: 'number',
            id: name,
            error: hasErrors,
            className: inputClassNames,
            placeholder: attributes.placeholder,
            defaultValue: value,
            onChange: this.onChange
          }, numberProps)),
          hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
        )
      );
    }
  }]);

  return NumberField;
}(_react2.default.Component);

NumberField.propTypes = {
  actions: _propTypes2.default.object,
  attributes: _propTypes2.default.shape({
    label: _propTypes2.default.string,
    hint: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    inline: _propTypes2.default.bool,
    step: _propTypes2.default.number,
    min: _propTypes2.default.number,
    max: _propTypes2.default.number
  }),
  name: _propTypes2.default.string,
  config: _propTypes2.default.object,
  value: _propTypes2.default.number,
  hint: _propTypes2.default.string,
  label: _propTypes2.default.string,
  errors: _reactImmutableProptypes2.default.list
};
NumberField.contextTypes = {
  globalConfig: _propTypes2.default.object
};
exports.default = NumberField;