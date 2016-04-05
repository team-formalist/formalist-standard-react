'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _dropzone = require('../../ui/dropzone');

var _dropzone2 = _interopRequireDefault(_dropzone);

var _validation = require('./validation.js');

var _validation2 = _interopRequireDefault(_validation);

var _uploadToS = require('./upload-to-S3.js');

var _bus = require('./bus');

var _bus2 = _interopRequireDefault(_bus);

var _index = require('./index.mcss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * generateUniqueID
 * @return {[type]} [description]
 */

function generateUniqueID(file_name) {
  return (0, _uid2.default)(10) + '_' + file_name;
}

// Import components


var MultiUploadField = _react2.default.createClass({

  /**
   * displayName
   */

  displayName: 'MultiUploadField',

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
    multiple: _react2.default.PropTypes.bool,
    uploadedFiles: _react2.default.PropTypes.array
  },

  /**
   * getInitialState
   * @return {Object}
   */

  getInitialState: function getInitialState() {
    return {
      progressValue: 0,
      XHRErrorMessage: null,
      uploadedFiles: this.props.uploadedFiles || [],
      previewFiles: []
    };
  },


  /**
   * [removePreviewItem description]
   * @param  {[type]} uid [description]
   * @return {[type]}     [description]
   */

  removePreviewItem: function removePreviewItem(uid) {
    var previewFiles = this.state.previewFiles.filter(function (file) {
      return file.uid !== uid;
    });

    this.setState({
      previewFiles: previewFiles
    });
  },


  /**
   * abortRequest
   * Get the `data-uid` from the clicked preview element.
   * Emit abortUploadRequest() along with the uid
   * @param  {Event} e - click
   */

  abortUploadRequest: function abortUploadRequest(e) {
    e.preventDefault();
    var uid = e.target.getAttribute('data-uid');
    _bus2.default.emit('abortUploadRequest', uid);
    this.removePreviewItem(uid);
    this.resetState();
  },


  /**
   * onProgress
   * Clone any existing preview files
   * Iterate the existing file and assign the progress value and uid to a file
   * matching the same name
   * Update the state of the previewFiles
   * @param  {Event} e - XHR progress
   * @param  {Object} file - the uploaded file
   */

  onProgress: function onProgress(e, file) {
    var name = file.name;

    var previewFiles = this.state.previewFiles.slice(0);

    previewFiles.map(function (file) {
      if (file.name === name) {
        file.progress = e.percent;
      }
    });

    this.setState({
      previewFiles: previewFiles
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
      XHRErrorMessage: null,
      files: []
    });
  },


  /**
   * updateUploadedFiles
   * Take a `file`.
   * Iterate previewFiles aand returna ll files that are not `file`
   * Push `file` into uploadedFiles and save the state
   * @param  {Object} file
   */

  updateUploadedFiles: function updateUploadedFiles(file) {
    var previewFiles = this.state.previewFiles.filter(function (preview) {
      return preview.name !== file.name;
    });

    var uploadedFiles = this.state.uploadedFiles.slice(0);
    uploadedFiles.push(file);

    this.setState({
      uploadedFiles: uploadedFiles,
      previewFiles: previewFiles
    });
  },


  /**
   * uploadFile
   * Create a new uid for this XHR request of this file
   * Take a file and call `preSign` passing it's response to `upload`
   * On completion of 'upload' pass the newly uploaded file to `updateUploadedFiles()`
   * Otherwise throw and error
   * @param {Object} file
   */

  uploadFile: function uploadFile(obj) {
    if (!obj) return;
    var presign_url = this.props.attributes.presign_url;
    var token = this.props.token;
    var file = obj.file;

    var self = this;

    (0, _uploadToS.preSign)(file, presign_url, token).then(function (presignResponse) {
      return (0, _uploadToS.upload)(presignResponse, file, token, self.onProgress);
    }).then(function (uploadResponse) {
      console.log('uploadResponse', uploadResponse);
      self.updateUploadedFiles(file);
    }).catch(function (err) {
      var error = new Error(err.message);
      throw error;
    });
  },


  /**
   * onChange
   * Iterate and validate each file spliting valid and invalid file up.
   * For any valid file, call this.uploadFile()
   * @param  {Array} - dropped files
   */

  onChange: function onChange(files) {
    var _this = this;

    if (!files.length) return;

    var status = void 0;
    var validFiles = [];
    var invalidFiles = [];

    // iterate and validate
    files.map(function (file) {
      status = (0, _validation2.default)(file);
      if (!status.success) {
        invalidFiles.push(status);
      } else {
        validFiles.push(file);
      }
    });

    // Save invalid files
    if (invalidFiles.length) {
      this.setState({
        invalidFiles: invalidFiles
      });
    }

    // Create objects of valid files and assign to `previewFiles`
    // each 'file' object looks something like:
    // {
    //   name: small.jpg,
    //   file: {file},
    //   uid: "wyertyiopdop_small.jpg"
    // }
    if (!validFiles.length) return;
    var previewFiles = validFiles.map(function (file) {
      var name = file.name;

      var uid = generateUniqueID(name);
      file.uid = uid;

      return {
        name: name,
        file: file,
        uid: uid
      };
    });

    this.setState({
      previewFiles: previewFiles
    });

    // upload each valid file
    previewFiles.map(function (file) {
      _this.uploadFile(file);
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
   * Render the URL for the uploaded file
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
   * renderPreviewItem
   * Take a file object and an index value
   * @param  {Object} Object containing {file, name, uid, progress}
   * @param  {Number} idx
   * @return {vnode}
   */

  renderPreviewItem: function renderPreviewItem(obj, idx) {
    var progress = obj.progress;
    var _obj$file = obj.file;
    var preview = _obj$file.preview;
    var name = _obj$file.name;
    var uid = _obj$file.uid;


    var inlineStyleWidth = {
      width: progress ? progress + '%' : '0%'
    };

    return _react2.default.createElement(
      'div',
      { className: _index2.default.listItem, key: idx },
      _react2.default.createElement(
        'div',
        { className: _index2.default.listItem__body },
        _react2.default.createElement(
          'div',
          { className: _index2.default.listItem__img },
          _react2.default.createElement('img', { src: preview, alt: name })
        ),
        _react2.default.createElement(
          'div',
          { className: _index2.default.listItem__title },
          'Uploading: ',
          name
        )
      ),
      _react2.default.createElement(
        'button',
        {
          className: _index2.default.close,
          onClick: this.abortUploadRequest,
          'data-uid': uid },
        String.fromCharCode(215)
      ),
      _react2.default.createElement('span', {
        className: _index2.default.progress_bar,
        style: inlineStyleWidth })
    );
  },


  /**
   * renderPreviewItems
   * Take an array of file objects, iterate & pass to renderPreviewItem()
   * @param  {Array} files
   * @return {vnode}
   */

  renderPreviewItems: function renderPreviewItems(files) {
    return _react2.default.createElement(
      'div',
      { className: _index2.default.previewItems },
      files.map(this.renderPreviewItem)
    );
  },


  /**
   * renderValidationMessage
   * Render a file validation message
   * @param  {Object} error
   * @param  {Number} i
   * @return {vnode}
   */

  renderValidationMessage: function renderValidationMessage(error, i) {
    var message = error.message;
    var file = error.file;
    var name = file.name;

    return _react2.default.createElement(
      'div',
      { key: i },
      name,
      ': ',
      message
    );
  },


  /**
   * renderValidationErrors
   * Iterate errors and call renderValidationMessage() for each object
   * @param  {Array}
   * @return {vnode}
   */

  renderValidationErrors: function renderValidationErrors(errors) {
    return _react2.default.createElement(
      'div',
      { className: 'validationMessages' },
      errors.map(this.renderValidationMessage)
    );
  },


  /**
   * removeUploadedFile
   * remove the selected file from `uploadedFiles`
   * @param  {Event} e - click
   */

  removeUploadedFile: function removeUploadedFile(e) {
    e.preventDefault();
    var name = e.target.getAttribute('data-name');
    console.log('remove: ', name);

    var uploadedFiles = this.state.uploadedFiles.filter(function (file) {
      return file.name !== name;
    });

    this.setState({
      uploadedFiles: uploadedFiles
    });
  },


  /**
   * renderPreviewItem
   * Take a file object and an index value
   * @param  {Object} file
   * @param  {Number} idx
   * @return {vnode}
   */

  renderUploadedFileItem: function renderUploadedFileItem(file, idx) {
    var name = file.name;
    var preview = file.preview;

    var uid = generateUniqueID(name);

    return _react2.default.createElement(
      'div',
      { className: _index2.default.listItem, key: idx },
      _react2.default.createElement(
        'div',
        { className: _index2.default.listItem__body },
        _react2.default.createElement(
          'div',
          { className: _index2.default.listItem__img },
          _react2.default.createElement('img', { src: preview, alt: name })
        ),
        _react2.default.createElement(
          'span',
          { className: _index2.default.listItem__title },
          name
        )
      ),
      _react2.default.createElement(
        'button',
        {
          className: _index2.default.close,
          onClick: this.removeUploadedFile,
          'data-name': name },
        String.fromCharCode(215)
      )
    );
  },


  /**
   * renderUploadedFiles
   * Render existing uploaded files
   * @param  {Array} files
   * @return {vnode}
   */

  renderUploadedFiles: function renderUploadedFiles(files) {
    return _react2.default.createElement(
      'div',
      { className: _index2.default.uploadedItems },
      files.map(this.renderUploadedFileItem)
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
    var multiple = _props.multiple;

    var hasErrors = errors.count() > 0;
    var _state = this.state;
    var XHRErrorMessage = _state.XHRErrorMessage;
    var uploadedFiles = _state.uploadedFiles;
    var invalidFiles = _state.invalidFiles;
    var previewFiles = _state.previewFiles;


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
        XHRErrorMessage ? this.renderResult(XHRErrorMessage) : null,
        _react2.default.createElement(_dropzone2.default, {
          multiple: multiple,
          text: label,
          onChange: this.onChange
        }),
        invalidFiles ? this.renderValidationErrors(invalidFiles) : null,
        previewFiles.length > 0 ? this.renderPreviewItems(previewFiles) : null,
        uploadedFiles.length > 0 ? this.renderUploadedFiles(uploadedFiles) : null,
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      )
    );
  }
});

exports.default = MultiUploadField;