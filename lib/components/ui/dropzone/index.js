var _jsxFileName = "src/components/ui/dropzone/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import * as styles from "./styles";
import classNames from "classnames";

var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    var _ref,
        _this2 = this;

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
      var isActive = e.dataTransfer.types[0] === "Files";
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
      e.dataTransfer.effectAllowed = "move";
    }, _this.onDrop = function (files) {
      var onChange = _this.props.onChange;

      if (typeof onChange === "function") onChange(files);
      _this.setState({
        files: files
      });
    }, _this.onClick = function (e) {
      e.preventDefault();
      _this._dropzone.open();
    }, _this.renderPreview = function (files) {
      return React.createElement(
        "div",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 133
          },
          __self: _this2
        },
        React.createElement(
          "h2",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 134
            },
            __self: _this2
          },
          "Uploading ",
          files.length,
          " files..."
        ),
        React.createElement(
          "div",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 135
            },
            __self: _this2
          },
          files.map(function (file, i) {
            return React.createElement("img", { key: i, src: file.preview, __source: {
                fileName: _jsxFileName,
                lineNumber: 135
              },
              __self: _this2
            });
          })
        )
      );
    }, _this.renderButton = function (buttonText) {
      return React.createElement(
        "button",
        { onClick: _this.onClick, className: styles.dropzone__button, __source: {
            fileName: _jsxFileName,
            lineNumber: 149
          },
          __self: _this2
        },
        buttonText != null ? buttonText : "Upload file"
      );
    }, _this.renderLabel = function (label) {
      return React.createElement(
        "span",
        { className: styles.dropzone__label__wrapper, __source: {
            fileName: _jsxFileName,
            lineNumber: 164
          },
          __self: _this2
        },
        React.createElement(
          "span",
          { className: styles.dropzone__label, __source: {
              fileName: _jsxFileName,
              lineNumber: 165
            },
            __self: _this2
          },
          label || "Drop file to upload"
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
    key: "componentDidMount",


    /**
     * componentDidMount
     * Create event listener for drag events on the body and update state
     */

    value: function componentDidMount() {
      document.addEventListener("dragover", this.onDragOver);
      document.addEventListener("dragleave", this.onDragLeave);
      document.addEventListener("drop", this.onDragLeave);
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
    key: "render",


    /**
     * render
     * @return {vnode}
     */

    value: function render() {
      var _classNames,
          _this3 = this;

      var _state = this.state,
          files = _state.files,
          isActive = _state.isActive;
      var _props = this.props,
          buttonText = _props.buttonText,
          renderPreview = _props.renderPreview,
          multiple = _props.multiple,
          children = _props.children,
          disableClick = _props.disableClick,
          hideDropZoneBtn = _props.hideDropZoneBtn,
          label = _props.label;


      var dropZoneClassNames = classNames(styles.dropzone, (_classNames = {}, _defineProperty(_classNames, "" + styles.dropzone__empty, !children), _defineProperty(_classNames, "" + styles.dropzone__disable_hover, children), _defineProperty(_classNames, "" + styles.dropzone__drag_over, isActive), _classNames));

      return React.createElement(
        "div",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 196
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "dropzone__container", __source: {
              fileName: _jsxFileName,
              lineNumber: 197
            },
            __self: this
          },
          !hideDropZoneBtn ? this.renderButton(buttonText) : null,
          React.createElement(
            Dropzone,
            {
              ref: function ref(r) {
                _this3._dropzone = r;
              },
              disableClick: disableClick,
              activeClassName: styles.dropzone__active,
              className: dropZoneClassNames,
              multiple: multiple,
              onDragStart: this.onDragStart,
              onDrop: this.onDrop,
              style: {},
              __source: {
                fileName: _jsxFileName,
                lineNumber: 200
              },
              __self: this
            },
            children,
            this.renderLabel(label)
          )
        ),
        renderPreview && files.length > 0 ? this.renderPreview(files) : null
      );
    }
  }]);

  return _class;
}(React.Component);

_class.displayName = "DropZone";
_class.propTypes = {
  label: PropTypes.string,
  buttonText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  renderPreview: PropTypes.bool,
  multiple: PropTypes.bool,
  children: PropTypes.node,
  disableClick: PropTypes.bool,
  hideDropZoneBtn: PropTypes.bool
};
_class.defaultProps = {
  disableClick: false
};
export default _class;