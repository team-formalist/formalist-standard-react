'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _checkbox = require('../../ui/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _checkBox = require('./check-box.mcss');

var _checkBox2 = _interopRequireDefault(_checkBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import components


// Import styles


/**
 * Base class for the `check_box`
 *
 */
var CheckBox = function (_React$Component) {
  _inherits(CheckBox, _React$Component);

  function CheckBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CheckBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (e, value) {
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


  _createClass(CheckBox, [{
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
      var fieldClassNames = (0, _classnames2.default)(_checkBox2.default.base, _defineProperty({}, '' + _checkBox2.default.baseInline, attributes.inline));

      // Set up the label
      var checkboxLabel = attributes.question_text || label;

      return _react2.default.createElement(
        'div',
        { className: fieldClassNames },
        _react2.default.createElement(
          'div',
          { className: _checkBox2.default.header },
          _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
        ),
        _react2.default.createElement(
          'div',
          { className: _checkBox2.default.display },
          _react2.default.createElement(_checkbox2.default, {
            name: name,
            label: checkboxLabel,
            error: hasErrors,
            value: value,
            defaultChecked: value,
            onChange: this.onChange }),
          hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
        )
      );
    }
  }]);

  return CheckBox;
}(_react2.default.Component);

CheckBox.propTypes = {
  actions: _react2.default.PropTypes.object,
  name: _react2.default.PropTypes.string,
  config: _react2.default.PropTypes.object,
  attributes: _react2.default.PropTypes.shape({
    label: _react2.default.PropTypes.string,
    hint: _react2.default.PropTypes.string,
    placeholder: _react2.default.PropTypes.string,
    inline: _react2.default.PropTypes.bool
  }),
  hint: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  errors: _reactImmutableProptypes2.default.list,
  value: _react2.default.PropTypes.bool
};
CheckBox.contextTypes = {
  globalConfig: _react2.default.PropTypes.object
};
exports.default = CheckBox;