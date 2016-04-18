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
    text: _react2.default.PropTypes.string,
    onChange: _react2.default.PropTypes.func.isRequired,
    renderPreview: _react2.default.PropTypes.bool,
    multiple: _react2.default.PropTypes.bool
  },

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
      highlight: false
    };
  },


  /**
   * onDragEnter
   * Set `highlight` to true
   */

  onDragEnter: function onDragEnter(e) {
    e.preventDefault();
    this.setState({
      highlight: true
    });
  },


  /**
   * onDragLeave
   * Set `highlight` to false
   */

  onDragLeave: function onDragLeave(e) {
    e.preventDefault();
    this.setState({
      highlight: false
    });
  },


  /**
   * componentDidMount
   * Create event listener for drag events on the body and update state
   */

  componentDidMount: function componentDidMount() {
    document.addEventListener('dragenter', this.onDragEnter);
    document.addEventListener('dragleave', this.onDragLeave);
  },


  /**
   * onDrop
   * of this.props.onChange exists - pass it files.
   * set files on this.state
   * @param  {Array} files
   */

  onDrop: function onDrop(files) {
    var onChange = this.props.onChange;

    if (typeof onChange === 'function') onChange(files);
    this.setState({
      files: files
    });
  },
  onOpenClick: function onOpenClick(e) {
    e.preventDefault();
    this.refs.dropzone.open();
  },


  /**
   * renderPreview
   * Optinally render a preview for any files
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
   * render
   * @return {vnode}
   */

  render: function render() {
    var _state = this.state;
    var files = _state.files;
    var highlight = _state.highlight;
    var _props = this.props;
    var text = _props.text;
    var renderPreview = _props.renderPreview;
    var multiple = _props.multiple;
    var children = _props.children;
    var disableClick = _props.disableClick;
    var hideDropZoneBtn = _props.hideDropZoneBtn;


    var label = void 0;
    if (multiple && !text) {
      label = 'Drop/Upload Files';
    } else if (!multiple && !text) {
      label = 'Drop/Upload File';
    } else {
      label = text;
    }

    var dropZoneClassNames = (0, _classnames2.default)('js-dropzone', _index2.default.dropzone, _defineProperty({}, '' + _index2.default.dropzone__highlight, highlight));

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'dropzone__container' },
        !hideDropZoneBtn ? _react2.default.createElement(
          'button',
          { onClick: this.onOpenClick },
          'Click me'
        ) : null,
        _react2.default.createElement(
          _reactDropzone2.default,
          {
            disableClick: disableClick,
            activeClassName: _index2.default.dropzone__active,
            className: dropZoneClassNames,
            multiple: multiple,
            onDrop: this.onDrop,
            ref: 'dropzone',
            style: {}
          },
          children
        )
      ),
      renderPreview && files.length > 0 ? this.renderPreview(files) : null
    );
  }
});