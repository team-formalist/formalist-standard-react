'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _checkbox = require('./checkbox.mcss');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Checkbox
 *
 * States:
 * - focus
 * - error
 *
 * Sizes:
 * - small
 * - normal*
 * - large
 *
 */
var Checkbox = function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      id: (0, _uid2.default)(10),
      focus: false
    }, _this.onBlur = function (e) {
      _this.setState({ focus: false });
    }, _this.onFocus = function (e) {
      _this.setState({ focus: true });
    }, _this.onChange = function (e) {
      _this.props.onChange(e, e.target.checked);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Checkbox, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props;
      var defaultChecked = _props.defaultChecked;
      var label = _props.label;
      var name = _props.name;
      var value = _props.value;

      var labelClassNames = (0, _classnames2.default)(_checkbox2.default.label, (_classNames = {}, _defineProperty(_classNames, '' + _checkbox2.default.error, this.props.error), _defineProperty(_classNames, '' + _checkbox2.default.focus, this.state.focus), _classNames));

      return _react2.default.createElement(
        'div',
        { className: _checkbox2.default.button },
        _react2.default.createElement('input', {
          className: _checkbox2.default.input,
          id: this.state.id,
          type: 'checkbox',
          name: name,
          value: value,
          defaultChecked: defaultChecked,
          onBlur: this.onBlur,
          onFocus: this.onFocus,
          onChange: this.onChange
        }),
        _react2.default.createElement(
          'label',
          {
            className: labelClassNames,
            htmlFor: this.state.id
          },
          label
        )
      );
    }
  }]);

  return Checkbox;
}(_react2.default.Component);

Checkbox.propTypes = {
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  defaultChecked: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  error: _propTypes2.default.bool,
  label: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
  value: _propTypes2.default.bool
};
Checkbox.defaultProps = {
  disabled: false,
  error: false,
  size: 'normal'
};
exports.default = Checkbox;