'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _index = require('./index.mcss');

var _index2 = _interopRequireDefault(_index);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      files: [],
      isActive: false
    }, _this.onDragOver = function (e) {
      e.preventDefault();
      var isActive = e.dataTransfer.types[0] === 'Files';
      if (isActive === _this.state.isActive) return;
      _this.setState({
        isActive: isActive
      });
    }, _this.onDragLeave = function (e) {
      e.preventDefault();
      if (!_this.state.isActive) return;
      _this.setState({
        isActive: false
      });
    }, _this.onDragStart = function (e) {
      e.dataTransfer.effectAllowed = 'move';
    }, _this.onDrop = function (files) {
      var onChange = _this.props.onChange;

      if (typeof onChange === 'function') onChange(files);
      _this.setState({
        files: files
      });
    }, _this.onClick = function (e) {
      e.preventDefault();
      _this._dropzone.open();
    }, _this.renderPreview = function (files) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Uploading ',
          files.length,
          ' files...'
        ),
        _react2.default.createElement(
          'div',
          null,
          files.map(function (file, i) {
            return _react2.default.createElement('img', { key: i, src: file.preview });
          })
        )
      );
    }, _this.renderButton = function (buttonText) {
      return _react2.default.createElement(
        'button',
        { onClick: _this.onClick, className: _index2.default.dropzone__button },
        buttonText != null ? buttonText : 'Upload file'
      );
    }, _this.renderLabel = function (label) {
      return _react2.default.createElement(
        'span',
        { className: _index2.default.dropzone__label__wrapper },
        _react2.default.createElement(
          'span',
          { className: _index2.default.dropzone__label },
          label || 'Drop file to upload'
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * displayName
   */

  /**
   * propTypes
   */

  /**
   * getDefaultProps
   */

  /**
   * getInitialState
   */

  /**
   * onDragOver
   * Set `isActive` to true
   */

  /**
   * onDragLeave
   * Set `isActive` to false
   */

  _createClass(_class, [{
    key: 'componentDidMount',


    /**
     * componentDidMount
     * Create event listener for drag events on the body and update state
     */

    value: function componentDidMount() {
      document.addEventListener('dragover', this.onDragOver);
      document.addEventListener('dragleave', this.onDragLeave);
      document.addEventListener('drop', this.onDragLeave);
    }

    /**
     * onDragStart
     * on dragStart of the dropzone, override it's `effectAllowed`
     * to not display the green (+) move cursor
     * @param  {Event} e
     */

    /**
     * onDrop
     * If this.props.onChange exists - pass it files.
     * set files on this.state
     * if there is no `children` hide the dropzone (show it on receiveing props)
     * @param  {Array} files
     */

    /**
     * onClick
     * Open the dropzone
     * @param  {event} e
     */

    /**
     * renderPreview
     * Optionally render a preview for any files
     * NOTE: this is mostly handled by the 'onChange' function
     * passed in and triggered  in 'onDrop'
     * @param  {Array} files
     * @return {vnode}
     */

    /**
     * renderButton
     * Render a button for the dropzone field
     * @param  {string} buttonText
     * @return {vnode}
     */

    /**
     * renderLabel
     * Render a label for the dropzone field
     * @param  {string} label
     * @return {vnode}
     */

  }, {
    key: 'render',


    /**
     * render
     * @return {vnode}
     */

    value: function render() {
      var _classNames,
          _this2 = this;

      var _state = this.state;
      var files = _state.files;
      var isActive = _state.isActive;
      var _props = this.props;
      var buttonText = _props.buttonText;
      var renderPreview = _props.renderPreview;
      var multiple = _props.multiple;
      var children = _props.children;
      var disableClick = _props.disableClick;
      var hideDropZoneBtn = _props.hideDropZoneBtn;
      var label = _props.label;


      var dropZoneClassNames = (0, _classnames2.default)(_index2.default.dropzone, (_classNames = {}, _defineProperty(_classNames, '' + _index2.default.dropzone__empty, !children), _defineProperty(_classNames, '' + _index2.default.dropzone__disable_hover, children), _defineProperty(_classNames, '' + _index2.default.dropzone__drag_over, isActive), _classNames));

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'dropzone__container' },
          !hideDropZoneBtn ? this.renderButton(buttonText) : null,
          _react2.default.createElement(
            _reactDropzone2.default,
            {
              ref: function ref(r) {
                _this2._dropzone = r;
              },
              disableClick: disableClick,
              activeClassName: _index2.default.dropzone__active,
              className: dropZoneClassNames,
              multiple: multiple,
              onDragStart: this.onDragStart,
              onDrop: this.onDrop,
              style: {} },
            children,
            this.renderLabel(label)
          )
        ),
        renderPreview && files.length > 0 ? this.renderPreview(files) : null
      );
    }
  }]);

  return _class;
}(_react2.default.Component);

_class.displayName = 'DropZone';
_class.propTypes = {
  label: _react2.default.PropTypes.string,
  buttonText: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func.isRequired,
  renderPreview: _react2.default.PropTypes.bool,
  multiple: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.node,
  disableClick: _react2.default.PropTypes.bool,
  hideDropZoneBtn: _react2.default.PropTypes.bool
};
_class.defaultProps = {
  disableClick: false
};
exports.default = _class;