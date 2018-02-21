'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _formalistDataObjectRenderer = require('formalist-data-object-renderer');

var _formalistDataObjectRenderer2 = _interopRequireDefault(_formalistDataObjectRenderer);

var _formItems = require('./form-items.mcss');

var _formItems2 = _interopRequireDefault(_formItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Initialise the dataObjectRenderer
var dataObjectRenderer = (0, _formalistDataObjectRenderer2.default)();

var FormItems = function (_React$Component) {
  _inherits(FormItems, _React$Component);

  function FormItems() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormItems);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormItems.__proto__ || Object.getPrototypeOf(FormItems)).call.apply(_ref, [this].concat(args))), _this), _this.insertAtomicBlock = function (formConfig) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange,
          closeToolbar = _this$props.closeToolbar;

      var entityKey = _draftJs.Entity.create('formalist', 'IMMUTABLE', {
        name: formConfig.name,
        label: formConfig.label,
        form: formConfig.form,
        data: dataObjectRenderer(formConfig.form)
      });
      onChange(_draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, '¶'));
      closeToolbar();
    }, _this.renderFormButtons = function (embeddableForms) {
      return embeddableForms.map(function (form) {
        var onClick = function onClick(e) {
          e.preventDefault();
          _this.insertAtomicBlock(form);
        };
        return _react2.default.createElement(
          'button',
          { className: _formItems2.default.button, key: form.name, onClick: onClick },
          form.label || form.name
        );
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FormItems, [{
    key: 'render',
    value: function render() {
      var embeddableForms = this.props.embeddableForms;

      if (embeddableForms.length === 0) {
        return null;
      }

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return _react2.default.createElement(
        'div',
        { className: _formItems2.default.container },
        _react2.default.createElement(
          'ul',
          { className: _formItems2.default.list, onMouseDown: function onMouseDown(e) {
              return e.preventDefault();
            } },
          this.renderFormButtons(embeddableForms)
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return FormItems;
}(_react2.default.Component);

FormItems.propTypes = {
  embeddableForms: _propTypes2.default.array,
  editorState: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  closeToolbar: _propTypes2.default.func.isRequired
};
FormItems.defaultProps = {
  embeddableForms: []
};
exports.default = FormItems;