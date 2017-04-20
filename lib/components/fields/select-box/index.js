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

var _select = require('../../ui/select');

var _select2 = _interopRequireDefault(_select);

var _selectBox = require('./select-box.mcss');

var _selectBox2 = _interopRequireDefault(_selectBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import components


// Import styles


/**
 * Select Box field
 */
var SelectBox = function (_React$Component) {
  _inherits(SelectBox, _React$Component);

  function SelectBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectBox.__proto__ || Object.getPrototypeOf(SelectBox)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (e, value) {
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


  _createClass(SelectBox, [{
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
      var fieldClassNames = (0, _classnames2.default)(_selectBox2.default.base, _defineProperty({}, '' + _selectBox2.default.baseInline, attributes.inline));

      // Reach into the validation attributes to determine whether the select
      // should be clearable (i.e., it’s not required)
      var clearable = !(attributes.validation && attributes.validation.filled === true);

      // Extract options
      var options = attributes.options;
      // Return nothing if we have no values
      if (options && options.length === 0) {
        return false;
      }

      return _react2.default.createElement(
        'div',
        { className: fieldClassNames },
        _react2.default.createElement(
          'div',
          { className: _selectBox2.default.header },
          _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
        ),
        _react2.default.createElement(
          'div',
          { className: _selectBox2.default.display },
          _react2.default.createElement(
            _select2.default,
            {
              id: name,
              defaultValue: value != null && value.toString ? value.toString() : value,
              placeholder: attributes.placeholder,
              error: hasErrors,
              onChange: this.onChange,
              clearable: clearable
            },
            options.map(function (option, i) {
              var value = void 0,
                  label = void 0;
              if (Array.isArray(option)) {
                value = option[0];
                label = option[1] || value;
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
          ),
          hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
        )
      );
    }
  }]);

  return SelectBox;
}(_react2.default.Component);

SelectBox.propTypes = {
  actions: _react2.default.PropTypes.object,
  name: _react2.default.PropTypes.string,
  config: _react2.default.PropTypes.object,
  attributes: _react2.default.PropTypes.shape({
    label: _react2.default.PropTypes.string,
    hint: _react2.default.PropTypes.string,
    placeholder: _react2.default.PropTypes.string,
    options: _react2.default.PropTypes.array.isRequired,
    inline: _react2.default.PropTypes.bool
  }),
  hint: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  errors: _reactImmutableProptypes2.default.list,
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
};
SelectBox.contextTypes = {
  globalConfig: _react2.default.PropTypes.object
};
exports.default = SelectBox;