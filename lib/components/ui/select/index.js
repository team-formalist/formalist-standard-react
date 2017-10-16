'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Select
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
var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Select);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focus: false
    }, _this.onFocus = function (e) {
      _this.setState({ focus: true });
      if (_this.props.onFocus) {
        _this.props.onFocus(e);
      }
    }, _this.onBlur = function (e) {
      _this.setState({ focus: false });
      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }
    }, _this.onChange = function (e) {
      _this.props.onChange(e, e.target.value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Select, [{
    key: 'render',
    value: function render() {
      var _classNames, _classNames2;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var clearable = _props.clearable;
      var defaultValue = _props.defaultValue;
      var error = _props.error;
      var placeholder = _props.placeholder;
      var size = _props.size;
      var focus = this.state.focus;


      var labelClassNames = (0, _classnames2.default)(styles.label, (_classNames = {}, _defineProperty(_classNames, '' + styles.labelError, error), _defineProperty(_classNames, '' + styles.labelFocus, focus), _classNames));
      var inputClassNames = (0, _classnames2.default)(className, styles.select, (_classNames2 = {}, _defineProperty(_classNames2, '' + styles.error, error), _defineProperty(_classNames2, '' + styles.focus, focus), _classNames2), '' + styles[size]);

      // Generate a placeholder with a fake value seed to trick our <select>
      // into appearing to show it correctly
      var placeholderOption = _react2.default.createElement(
        'option',
        {
          value: '',
          hidden: !clearable,
          disabled: !clearable
        },
        placeholder
      );

      // Extract any other props
      var id = this.props.id;


      return _react2.default.createElement(
        'label',
        { className: labelClassNames },
        _react2.default.createElement(
          'select',
          {
            id: id,
            defaultValue: defaultValue || '',
            className: inputClassNames,
            onBlur: this.onBlur,
            onFocus: this.onFocus,
            onChange: this.onChange },
          placeholderOption,
          children
        )
      );
    }
  }]);

  return Select;
}(_react2.default.Component);

Select.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  error: _propTypes2.default.bool,
  defaultValue: _propTypes2.default.string,
  id: _propTypes2.default.string,
  clearable: _propTypes2.default.bool,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge'])
};
Select.defaultProps = {
  clearable: true,
  error: false,
  placeholder: 'Select an option',
  size: 'normal'
};
exports.default = Select;