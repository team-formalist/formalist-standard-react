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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({

  /**
   * displayName
   */

  displayName: 'DropZone',

  /**
   * propTypes
   */

  propTypes: {
    text: _react2.default.PropTypes.string.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    renderPreview: _react2.default.PropTypes.bool,
    multiple: _react2.default.PropTypes.bool
  },

  /**
   * getInitialState
   */

  getInitialState: function getInitialState() {
    return {
      files: []
    };
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

  /**
   * renderPreview
   * Optinally render a preview for any files
   * @param  {Array} files
   * @return {vnode}
   */

  renderPreview: function renderPreview(files) {
    return _react2.default.createElement(
      'div',
      { ke: true },
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
    var files = this.state.files;
    var _props = this.props;
    var text = _props.text;
    var renderPreview = _props.renderPreview;
    var multiple = _props.multiple;


    var foo = {
      background: 'red', // note the capital 'W' here
      padding: '30px',
      marginTop: '-10px'
    };

    return _react2.default.createElement(
      'div',
      { className: 'dropzone' },
      _react2.default.createElement(
        _reactDropzone2.default,
        {
          multiple: multiple,
          onDrop: this.onDrop,
          className: _index2.default.dropzone,
          style: {},
          activeClassName: _index2.default.pulse },
        text
      ),
      renderPreview && files.length > 0 ? this.renderPreview(files) : null
    );
  }
});