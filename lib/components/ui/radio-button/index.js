'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _radioButton = require('./radio-button.mcss');

var _radioButton2 = _interopRequireDefault(_radioButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RadioButton
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
var RadioButton = function (_React$Component) {
  _inherits(RadioButton, _React$Component);

  function RadioButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RadioButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      id: (0, _uid2.default)(10),
      focus: false
    }, _this.onBlur = function (e) {
      _this.setState({ focus: false });
    }, _this.onFocus = function (e) {
      _this.setState({ focus: true });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RadioButton, [{
    key: 'render',
    value: function render() {
      var _classNames,
          _this2 = this;

      var _props = this.props;
      var defaultChecked = _props.defaultChecked;
      var label = _props.label;
      var name = _props.name;
      var onChange = _props.onChange;
      var value = _props.value;

      var labelClassNames = (0, _classnames2.default)(_radioButton2.default.label, (_classNames = {}, _defineProperty(_classNames, '' + _radioButton2.default.error, this.props.error), _defineProperty(_classNames, '' + _radioButton2.default.focus, this.state.focus), _classNames));

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return _react2.default.createElement(
        'div',
        { className: _radioButton2.default.button },
        _react2.default.createElement(
          'button',
          {
            onClick: function onClick(e) {
              e.preventDefault();
              if (_this2._input) {
                e.stopPropagation();
                _this2.props.onChange({ target: { value: _this2.props.value } });
              }
            },
            onBlur: this.onBlur,
            onFocus: this.onFocus
          },
          _react2.default.createElement('input', {
            ref: function ref(c) {
              _this2._input = c;
            },
            className: _radioButton2.default.input,
            id: this.state.id,
            type: 'radio',
            name: name,
            value: value,
            checked: defaultChecked,
            disabled: this.state.focus,
            onChange: onChange
          }),
          _react2.default.createElement(
            'label',
            {
              className: labelClassNames,
              htmlFor: this.state.id
            },
            label
          )
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return RadioButton;
}(_react2.default.Component);

RadioButton.propTypes = {
  id: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  defaultChecked: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  error: _react2.default.PropTypes.bool,
  label: _react2.default.PropTypes.string.isRequired,
  name: _react2.default.PropTypes.string.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired,
  size: _react2.default.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.number, _react2.default.PropTypes.string])
};
RadioButton.defaultProps = {
  disabled: false,
  error: false,
  size: 'normal'
};
exports.default = RadioButton;