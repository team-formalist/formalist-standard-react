'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _fileInput = require('../../ui/file-input');

var _fileInput2 = _interopRequireDefault(_fileInput);

var _validation = require('./validation.js');

var _uploadToS = require('./upload-to-S3.js');

var _bus = require('./bus');

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import styles
// import styles from './index.mcss'

// Import components
exports.default = _react2.default.createClass({

  /**
   * displayName
   */

  displayName: 'FileUploadField',

  /**
   * propTypes
   */

  propTypes: {
    attributes: _react2.default.PropTypes.shape({
      label: _react2.default.PropTypes.string,
      presign_url: _react2.default.PropTypes.string
    }),
    errors: _reactImmutableProptypes2.default.list,
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    name: _react2.default.PropTypes.string,
    presign_url: _react2.default.PropTypes.string,
    token: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      token: ''
    };
  },


  /**
   * getInitialState
   * @return {Object}
   */

  getInitialState: function getInitialState() {
    return {
      showProgress: false,
      progressValue: 0,
      clearInput: false,
      uploadURL: null
    };
  },


  /**
   * abortRequest
   * abort the upload request and reset state
   * emit a custom event out to the XHR in upload-to-S3.js
   * @param  {Event} e - click
   */

  abortUploadRequest: function abortUploadRequest(e) {
    e.preventDefault();
    this.resetState();
    _bus2.default.emit('abortUploadRequest');
  },


  /**
   * onProgress
   * set the upload percentage to `progressValue`
   * @param  {Event} e - XHR progress
   */

  onProgress: function onProgress(e) {
    this.setState({
      progressValue: e.percent
    });
  },


  /**
   * showProgress
   * set `showProgress` to true
   */

  showProgress: function showProgress() {
    this.setState({
      showProgress: true
    });
  },


  /**
   * resetState
   * reset the original state
   */

  resetState: function resetState() {
    this.setState({
      progressValue: 0,
      showProgress: false,
      uploadUrl: null,
      clearInput: true
    });
  },


  /**
   * onChange
   * @param  {Event} e
   * @return {[type]}   [description]
   */

  onChange: function onChange(e) {
    var file = e.target.files[0];
    if (!file) return;

    var presign_url = this.props.attributes.presign_url;
    var token = this.props.token;

    var self = this;

    // validate the file
    //  => request a presign to upload file
    //  => show progress
    //     pass presignResponse and onProgress handler to 'upload'
    //  => set the uploadResponse to state

    (0, _validation.validate)(file).then(function () {
      return (0, _uploadToS.preSign)(file, presign_url, token);
    }).then(function (presignResponse) {
      self.showProgress();
      return (0, _uploadToS.upload)(presignResponse, file, token, self.onProgress);
    }).then(function (uploadResponse) {
      self.setState({
        uploadURL: uploadResponse.upload_url
      });
    }).catch(function (err) {
      console.log('err', err);
    });
  },


  /**
   * closeProgressIndicator
   * reset state
   * @param  {Event} e - click
   */

  closeProgressIndicator: function closeProgressIndicator(e) {
    e.preventDefault();
    this.resetState();
  },


  /**
   * renderProgressIndicator
   * display the upload progress or final URL of uploaded file
   * @param  {Number} val - XHR progress event
   * @param  {null / String} uploadURL - the file's url
   * @return {vnode}
   */

  renderProgressIndicator: function renderProgressIndicator(val, uploadURL) {
    var text = uploadURL != null ? uploadURL : "Uploading";
    var action = uploadURL == null ? this.abortUploadRequest : this.closeProgressIndicator;
    return _react2.default.createElement(
      'div',
      null,
      text,
      ' ',
      !uploadURL ? val + "%" : null,
      _react2.default.createElement(
        'button',
        { onClick: action },
        'x'
      )
    );
  },


  /**
   * render
   * @return {vnode}
   */

  render: function render() {
    var _props = this.props;
    var errors = _props.errors;
    var hint = _props.hint;
    var label = _props.label;
    var name = _props.name;

    var hasErrors = errors.count() > 0;
    var _state = this.state;
    var progressValue = _state.progressValue;
    var clearInput = _state.clearInput;
    var uploadURL = _state.uploadURL;
    var showProgress = _state.showProgress;

    console.log('render', showProgress ? 'true' : 'false');
    return _react2.default.createElement(
      'div',
      { className: '' },
      _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(_header2.default, {
          error: hasErrors,
          hint: hint,
          id: name,
          label: label
        })
      ),
      _react2.default.createElement(
        'div',
        { className: '' },
        showProgress ? this.renderProgressIndicator(progressValue, uploadURL) : null,
        _react2.default.createElement(_fileInput2.default, {
          clearInput: clearInput,
          error: hasErrors,
          id: name,
          name: name,
          onChange: this.onChange
        }),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      )
    );
  }
});
// import classNames from 'classnames'