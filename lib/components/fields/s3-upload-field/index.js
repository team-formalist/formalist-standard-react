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

var _dropzone = require('../../ui/dropzone');

var _dropzone2 = _interopRequireDefault(_dropzone);

var _validation = require('./validation.js');

var _uploadToS = require('./upload-to-S3.js');

var _bus = require('./bus');

var _bus2 = _interopRequireDefault(_bus);

var _index = require('./index.mcss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import classNames from 'classnames'
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
    token: _react2.default.PropTypes.string,
    fileType: _react2.default.PropTypes.object,
    maxFileSize: _react2.default.PropTypes.number,
    value: _react2.default.PropTypes.string,
    multiple: _react2.default.PropTypes.bool
  },

  /**
   * getInitialState
   * @return {Object}
   */

  getInitialState: function getInitialState() {
    return {
      progressValue: 0,
      uploadURL: null,
      XHRErrorMessage: null,
      files: []
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
      uploadURL: null,
      XHRErrorMessage: null,
      files: []
    });
  },


  /**
   * onChange
   * @param  {Event} e
   * @return {[type]}   [description]
   */

  // onDrop: function(files){
  //   var req = request.post('/upload');
  // files.forEach((file)=> {
  //   req.attach(file.name, file);
  // });
  //   req.end(callback);
  // }

  onChange: function onChange(files) {
    if (!files.length) return;
    var presign_url = this.props.attributes.presign_url;
    var _props = this.props;
    var token = _props.token;
    var fileType = _props.fileType;
    var maxFileSize = _props.maxFileSize;

    var self = this;

    this.setState({
      files: files
    });

    // validate the file
    //  => request a presign to upload file
    //  => show progress
    //     pass presignResponse and onProgress handler to 'upload'
    //  => set the uploadResponse to state

    (0, _validation.validate)(files, fileType, maxFileSize).then(function () {
      return (0, _uploadToS.preSign)(files, presign_url, token);
    }).then(function (presignResponse) {
      return (0, _uploadToS.upload)(presignResponse, files, token, self.onProgress);
    }).then(function (uploadResponse) {
      self.setState({
        uploadURL: uploadResponse.upload_url
      });
    }).catch(function (err) {
      self.setState({
        XHRErrorMessage: err.message
      });
    });
  },


  /**
   * close
   * reset state
   * @param  {Event} e - click
   */

  close: function close(e) {
    e.preventDefault();
    this.resetState();
  },


  /**
   * renderResult
   * Render the URL for the uploaded asset
   * @param  {String} url
   * @return {vnode}
   */

  renderResult: function renderResult(url, error) {
    var result = error || url;
    return _react2.default.createElement(
      'div',
      { className: _index2.default.result },
      _react2.default.createElement(
        'button',
        { className: _index2.default.close, onClick: this.close },
        _react2.default.createElement(
          'span',
          { className: _index2.default.closeText },
          'Close'
        ),
        _react2.default.createElement(
          'div',
          { className: _index2.default.closeX },
          String.fromCharCode(215)
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _index2.default.message },
        result
      )
    );
  },


  /**
   * renderProgress
   * display the upload progress of uploaded asset
   * @param  {Number} val - XHR progress event
   * @return {vnode}
   */

  renderProgress: function renderProgress(val, files) {
    var inlineStyleWidth = {
      width: val + '%'
    };

    var filesNames = files.map(function (file) {
      return file.name;
    });

    return _react2.default.createElement(
      'div',
      { className: _index2.default.progress },
      _react2.default.createElement(
        'button',
        { className: _index2.default.close, onClick: this.abortUploadRequest },
        _react2.default.createElement(
          'span',
          { className: _index2.default.closeText },
          'Close'
        ),
        _react2.default.createElement(
          'div',
          { className: _index2.default.closeX__white },
          String.fromCharCode(215)
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _index2.default.message },
        'Uploading ',
        filesNames.join(', '),
        _react2.default.createElement(
          'span',
          { className: _index2.default.percentage },
          val + '%'
        )
      ),
      _react2.default.createElement('span', {
        className: _index2.default.progress_bar,
        style: inlineStyleWidth })
    );
  },


  /**
   * render
   * @return {vnode}
   */

  render: function render() {
    var _props2 = this.props;
    var errors = _props2.errors;
    var hint = _props2.hint;
    var label = _props2.label;
    var name = _props2.name;
    var multiple = _props2.multiple;

    var hasErrors = errors.count() > 0;

    var _state = this.state;
    var progressValue = _state.progressValue;
    var uploadURL = _state.uploadURL;
    var XHRErrorMessage = _state.XHRErrorMessage;
    var files = _state.files;


    return _react2.default.createElement(
      'div',
      null,
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
        { className: _index2.default.field },
        progressValue > 0 && !uploadURL ? this.renderProgress(progressValue, files) : null,
        uploadURL || XHRErrorMessage ? this.renderResult(uploadURL, XHRErrorMessage) : null,
        _react2.default.createElement(_dropzone2.default, {
          multiple: multiple === false ? false : true,
          text: label,
          onChange: this.onChange
        }),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      )
    );
  }
});

// Import components