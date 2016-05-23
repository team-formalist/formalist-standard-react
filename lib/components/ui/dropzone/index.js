'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = _react2.default.createClass({

  /**
   * displayName
   */

  displayName: 'DropZone',

  /**
   * propTypes
   */

  propTypes: {
    buttonText: _react2.default.PropTypes.string,
    onChange: _react2.default.PropTypes.func.isRequired,
    renderPreview: _react2.default.PropTypes.bool,
    multiple: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node,
    disableClick: _react2.default.PropTypes.bool,
    hideDropZoneBtn: _react2.default.PropTypes.bool
  },

  /**
   * getDefaultProps
   */

  getDefaultProps: function getDefaultProps() {
    return {
      disableClick: false
    };
  },


  /**
   * getInitialState
   */

  getInitialState: function getInitialState() {
    return {
      files: [],
      isActive: false
    };
  },


  /**
   * onDragOver
   * Set `isActive` to true
   */

  onDragOver: function onDragOver(e) {
    e.preventDefault();
    var isActive = e.dataTransfer.types[0] === 'Files';
    if (isActive === this.state.isActive) return;
    this.setState({
      isActive: isActive
    });
  },


  /**
   * onDragLeave
   * Set `isActive` to false
   */

  onDragLeave: function onDragLeave(e) {
    e.preventDefault();
    if (!this.state.isActive) return;
    this.setState({
      isActive: false
    });
  },


  /**
   * componentDidMount
   * Create event listener for drag events on the body and update state
   */

  componentDidMount: function componentDidMount() {
    document.addEventListener('dragover', this.onDragOver);
    document.addEventListener('dragleave', this.onDragLeave);
    document.addEventListener('drop', this.onDragLeave);
  },


  /**
   * onDrop
   * If this.props.onChange exists - pass it files.
   * set files on this.state
   * if there is no `children` hide the dropzone (show it on receiveing props)
   * @param  {Array} files
   */

  onDrop: function onDrop(files) {
    var onChange = this.props.onChange;

    if (typeof onChange === 'function') onChange(files);
    this.setState({
      files: files
    });
  },


  /**
   * onClick
   * Open the dropzone
   * @param  {event} e
   */

  onClick: function onClick(e) {
    e.preventDefault();
    this.refs.dropzone.open();
  },


  /**
   * renderPreview
   * Optionally render a preview for any files
   * NOTE: this is mostly handled by the 'onChange' function
   * passed in and triggered  in 'onDrop'
   * @param  {Array} files
   * @return {vnode}
   */

  renderPreview: function renderPreview(files) {
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
  },


  /**
   * renderButton
   * Render a button for the dropzone field
   * @param  {string} buttonText
   * @return {vnode}
   */

  renderButton: function renderButton(buttonText) {
    return _react2.default.createElement(
      'button',
      { onClick: this.onClick, className: _index2.default.dropzone__button },
      buttonText != null ? buttonText : 'Upload an image'
    );
  },


  /**
   * render
   * @return {vnode}
   */

  render: function render() {
    var _classNames;

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
          'div',
          { className: _index2.default.parent },
          _react2.default.createElement(
            _reactDropzone2.default,
            {
              disableClick: disableClick,
              activeClassName: _index2.default.dropzone__active,
              className: dropZoneClassNames,
              multiple: multiple,
              onDrop: this.onDrop,
              ref: 'dropzone',
              style: {} },
            children,
            _react2.default.createElement(
              'span',
              { className: _index2.default.dropzone__label },
              label || 'Upload an image'
            )
          )
        )
      ),
      renderPreview && files.length > 0 ? this.renderPreview(files) : null
    );
  }
});