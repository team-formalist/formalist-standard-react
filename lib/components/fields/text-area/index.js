'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _textBox = require('../../ui/text-box');

var _textBox2 = _interopRequireDefault(_textBox);

var _textArea = require('./text-area.mcss');

var _textArea2 = _interopRequireDefault(_textArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import components


// Import styles


/**
 * Text Area field
 */
var TextArea = function (_React$Component) {
  _inherits(TextArea, _React$Component);

  function TextArea() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextArea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (e) {
      var value = e.target.value;
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


  _createClass(TextArea, [{
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
      var fieldClassNames = (0, _classnames2.default)(_textArea2.default.base, _defineProperty({}, '' + _textArea2.default.baseInline, attributes.inline));

      // Set up input classes
      var inputClassNames = (0, _classnames2.default)(_defineProperty({}, '' + _textArea2.default.code, attributes.code));

      return _react2.default.createElement(
        'div',
        { className: fieldClassNames },
        _react2.default.createElement(
          'div',
          { className: _textArea2.default.header },
          _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
        ),
        _react2.default.createElement(
          'div',
          { className: _textArea2.default.display },
          _react2.default.createElement(_textBox2.default, {
            id: name,
            error: hasErrors,
            className: inputClassNames,
            placeholder: attributes.placeholder,
            defaultValue: value,
            onChange: this.onChange,
            boxSize: attributes.box_size,
            textSize: attributes.text_size }),
          hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
        )
      );
    }
  }]);

  return TextArea;
}(_react2.default.Component);

TextArea.propTypes = {
  actions: _propTypes2.default.object,
  name: _propTypes2.default.string,
  config: _propTypes2.default.object,
  attributes: _propTypes2.default.shape({
    label: _propTypes2.default.string,
    hint: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    inline: _propTypes2.default.bool,
    code: _propTypes2.default.bool,
    box_size: _propTypes2.default.oneOf(['single', 'small', 'normal', 'large', 'xlarge']),
    text_size: _propTypes2.default.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge'])
  }),
  hint: _propTypes2.default.string,
  label: _propTypes2.default.string,
  errors: _reactImmutableProptypes2.default.list,
  value: _propTypes2.default.string
};
TextArea.contextTypes = {
  globalConfig: _propTypes2.default.object
};
exports.default = TextArea;