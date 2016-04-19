'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

// Import components


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _dropzone = require('../../ui/dropzone');

var _dropzone2 = _interopRequireDefault(_dropzone);

var _validation = require('./validation.js');

var _validation2 = _interopRequireDefault(_validation);

var _upload = require('./upload.js');

var _bus = require('./bus');

var _bus2 = _interopRequireDefault(_bus);

var _index = require('./index.mcss');

var _index2 = _interopRequireDefault(_index);

var _sortable = require('../../ui/sortable');

var _sortable2 = _interopRequireDefault(_sortable);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * EXAMPLE PROP FILES
 * An example of previously uploaded files being passed in via props
 * Note: geometry is not being used as yet, but is saved to all
 * file objects created after a successful upload
 *
 * WHY?!
 * We need to give each file a unique id. Instead of jamming it
 * into the actual file object itself, we create a wrapping object
 * with all the specific properties we need - it prevents touching the
 * file itself too
 */

// const propFiles = [
//   {
//     name: 'boo.jpg',
//     path_to_original: 'http://attache.icelab.com.au/view/b6/4c/62/82/87/6c/f6/33/0a/14/89/55/59/48/ed/e0/original/sagrada.jpg'
//  },
//   {
//     name: 'baz.jpg',
//     path_to_original: 'http://attache.icelab.com.au/view/49/29/fe/c3/f7/9f/a7/28/76/48/84/9c/17/88/68/bb/original/sunglasses.jpg'
//  }
// ]

/**
 * MultiUploadField
 */

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
    multiple: _react2.default.PropTypes.bool,
    uploadedFiles: _react2.default.PropTypes.array,
    fileTypeRegex: _react2.default.PropTypes.object,
    fileTypeRegexMessage: _react2.default.PropTypes.string,
    maxFileSize: _react2.default.PropTypes.number,
    maxFileSizeMessage: _react2.default.PropTypes.string,
    buttonText: _react2.default.PropTypes.string
  },

  /**
   * getInitialState
   * Assign existing uploaded files to `uploadedFiles`
   * See the example `propFiles` format above
   * @return {object}
   */

  getInitialState: function getInitialState() {
    return {
      uploadedFiles: this.props.uploadedFiles || []
    };
  },


  /**
   * createFileObjects
   * Create a file object for a file
   * A file object includes the name, the file and a uid
   *
   * {
   * 		name: small.jpg,
   * 		file: {file},
   * 		uid: "wyertyiopdop_small.jpg"
   *}
   *
   * @param {array || object} val - a existing file object or an array of dropped files
   * @return {array || object} an array of objects - of just an object
   */

  createFileObjects: function createFileObjects(val) {
    // format the object
    function formatObject(file) {
      var name = file.name;

      return {
        file: file,
        name: name,
        uid: (0, _utils.generateUniqueID)(name)
      };
    }

    // iterate array calling formatObject()
    function formatObjects(files) {
      return files.map(function (file) {
        return formatObject(file);
      });
    }

    if (Array.isArray(val) && val.length > 0) {
      return formatObjects(val);
    } else if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      return formatObject(val);
    } else {
      return;
    }
  },


  /**
   * abortRequest
   * Get the `data-uid` from the clicked preview element.
   * Emit abortUploadRequest() along with the uid
   * @param {event} e - click
   */

  abortUploadRequest: function abortUploadRequest(e) {
    e.preventDefault();
    var uid = e.target.getAttribute('data-uid');
    _bus2.default.emit('abortUploadRequest', uid);
    this.removePreviewFile(e);
  },


  /**
   * onProgress
   * Clone any existing preview files
   * Iterate the existing file and assign the progress value and uid to a file
   * matching the same name
   * Update the state of the previewFiles
   * @param {event} e - XHR progress
   * @param {object} file - the uploaded file
   */

  onProgress: function onProgress(e, file) {
    var name = file.name;

    var previewFiles = this.state.previewFiles ? this.state.previewFiles.slice(0) : [];

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
   * updateUploadedFiles
   * Take a `file`.
   * Iterate previewFiles aand returna ll files that are not `file`
   * Push `file` into uploadedFiles and save the state
   * @param {object} a file object
   */

  updateUploadedFiles: function updateUploadedFiles(fileObject, response) {
    var path = response.path;
    var geometry = response.geometry;
    var uploadURL = response.uploadURL;


    var previewFiles = this.state.previewFiles.filter(function (preview) {
      return preview.name !== fileObject.name;
    });

    var uploadedFiles = this.state.uploadedFiles ? this.state.uploadedFiles.slice(0) : [];

    if ((0, _utils.containsObject)(fileObject, uploadedFiles)) {
      uploadedFiles.filter(function (existingFile) {
        return existingFile.uid !== fileObject.uid;
      });
    } else {
      // same XHR response properties to file object
      fileObject.path = path;
      fileObject.geometry = geometry;
      fileObject.uploadURL = uploadURL;
      uploadedFiles.push(fileObject);
    }

    this.setState({
      previewFiles: previewFiles,
      uploadedFiles: uploadedFiles
    });
  },


  /**
   * removeFileFromPreviewFiles
   * If an XHR error has occured while uploading a file,
   * remove the file from the current list of `previewFiles`
   * @param {object} file object
   */

  removeFileFromPreviewFiles: function removeFileFromPreviewFiles(fileObject) {
    var previewFiles = this.state.previewFiles.filter(function (previewFileObject) {
      return previewFileObject.uid !== fileObject.uid;
    });

    this.setState({
      previewFiles: previewFiles
    });
  },


  /**
   * storeXHRErrorMessage
   * Assign an XHR message to an array with a unique uid and save to state
   * This allows the user to click and remove specific errors
   * @param {string} message
   */

  storeXHRErrorMessage: function storeXHRErrorMessage(message) {
    var XHRErrorMessages = this.state.XHRErrorMessages ? this.state.XHRErrorMessages.slice(0) : [];

    XHRErrorMessages.push({
      uid: (0, _uid2.default)(10),
      message: message
    });

    this.setState({
      XHRErrorMessages: XHRErrorMessages
    });
  },


  /**
   * uploadFile
   * Create a new uid for this XHR request of this file
   * Take a file and call `preSign` passing it's response to `upload`
   * On completion of 'upload' pass the newly uploaded file to `updateUploadedFiles()`
   * Otherwise throw and error
   * @param {object} file object
   * @param {function} optionally show the progress of an upload. We dont show this
   *                   for when we remove uploaded files and POST the remaining
   */

  uploadFile: function uploadFile(fileObject) {
    var _this = this;

    var onProgress = arguments.length <= 1 || arguments[1] === undefined ? _utils.noOp : arguments[1];
    var updateUploadedFilesStatus = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    if (!fileObject) return;
    var presign_url = this.props.attributes.presign_url;
    var token = this.props.token;


    (0, _upload.preSign)(fileObject, presign_url, token).then(function (presignResponse) {
      return (0, _upload.upload)(presignResponse, fileObject, token, onProgress);
    }).then(function (uploadResponse) {
      if (!updateUploadedFilesStatus) return;
      return _this.updateUploadedFiles(fileObject, uploadResponse);
    }).catch(function (err) {
      _this.removeFileFromPreviewFiles(fileObject);
      _this.storeXHRErrorMessage(err.message);
      throw new Error(err.message);
    });
  },


  /**
   * onChange
   * Iterate and validate each file spliting valid and invalid file up.
   * For any valid file, call this.uploadFile()
   * @param {array} - dropped/uploaded files
   */

  onChange: function onChange(files) {
    var _this2 = this;

    if (!files.length) return;

    var status = void 0;
    var validFiles = [];
    var invalidFiles = this.state.invalidFiles ? this.state.invalidFiles.slice(0) : [];

    var _props = this.props;
    var fileTypeRegex = _props.fileTypeRegex;
    var fileTypeRegexMessage = _props.fileTypeRegexMessage;
    var maxFileSize = _props.maxFileSize;
    var maxFileSizeMessage = _props.maxFileSizeMessage;

    // iterate and validate each file

    files.map(function (file) {
      status = (0, _validation2.default)(file, fileTypeRegex, fileTypeRegexMessage, maxFileSize, maxFileSizeMessage);
      if (!status.success) {
        invalidFiles.push({
          file: file,
          uid: (0, _uid2.default)(10),
          message: status.message
        });
      } else {
        validFiles.push(file);
      }
    });

    // store invalid files to `invalidFiles`
    if (invalidFiles.length) {
      this.setState({
        invalidFiles: invalidFiles
      });
    }

    if (!validFiles.length) return;

    // Create 'file objects' of valid files and assign to `previewFiles`
    var previewFiles = validFiles.map(function (file) {
      return _this2.createFileObjects(file);
    });

    this.setState({
      previewFiles: previewFiles
    });

    // upload each valid file and passing in a progress event handler
    previewFiles.map(function (fileObject) {
      _this2.uploadFile(fileObject, _this2.onProgress);
    });
  },


  /**
   * onDrop
   * When a sortable upload items is 'dropped' re-arrage `uploadedFiles` to
   * match the same order and save to state
   * @param  {Array} newOrder - an array of indexs returned from Sortable
   */

  onDrop: function onDrop(newOrder) {
    var existingUploadedFiles = this.state.uploadedFiles.slice(0);
    var uploadedFiles = (0, _utils.sortArrayByOrder)(existingUploadedFiles, newOrder);

    this.setState({
      uploadedFiles: uploadedFiles
    });
  },


  /**
   * removeKeyFromState
   * Copy and array from state, and remove a key and return array
   * @param {string} array - a name for an array in state
   * @param {number/string} key
   * @return {array}
   */

  removeKeyFromState: function removeKeyFromState(array, key) {
    var arr = this.state[array].slice(0);
    if (typeof key === 'string') {
      key = parseInt(key);
    }
    arr.splice(key, 1);
    return arr;
  },


  /**
   * removeUploadedFile
   * uploaded files are wrapped in a Sortable list item.
   * we need to get the clicked element (x)
   * 	- search for the files parent element
   * 	- query that parent element for a uid value
   * 	- filter out `uploadedFiles` without that uid
   * 	- save to state
   * Send the remaining files to this.uploadFile()
   * @param {number} index - sourtable item index passed back from Sortable
   * @param {Event} e - click event passed back from Sortable
   */

  removeUploadedFile: function removeUploadedFile(index) {
    var _this3 = this;

    var uploadedFiles = this.removeKeyFromState('uploadedFiles', index);

    this.setState({
      uploadedFiles: uploadedFiles
    });

    uploadedFiles.map(function (file) {
      _this3.uploadFile(file, _utils.noOp, false);
    });
  },


  /**
   * removeInvalidFile
   * Filter out an file by uid
   * save remaining files to state
   * @param {event} e - click
   */

  removeInvalidFile: function removeInvalidFile(e) {
    e.preventDefault();
    var key = e.target.getAttribute('data-key');
    var invalidFiles = this.removeKeyFromState('invalidFiles', key);
    this.setState({
      invalidFiles: invalidFiles
    });
  },


  /**
   * removeInvalidFile
   * Filter out an file by uid
   * save remaining files to state
   * @param {event} e - click
   */

  removePreviewFile: function removePreviewFile(e) {
    e.preventDefault();
    var key = e.target.getAttribute('data-key');
    var previewFiles = this.removeKeyFromState('previewFiles', key);
    this.setState({
      previewFiles: previewFiles
    });
  },


  /**
   * removeXHRErrorMessage
   * Filter out an error by `uid`
   * Save remaining errors back to state
   * @param {event} e - click event
   */

  removeXHRErrorMessage: function removeXHRErrorMessage(e) {
    e.preventDefault();
    var key = e.target.getAttribute('data-key');
    var XHRErrorMessages = this.removeKeyFromState('XHRErrorMessages', key);
    this.setState({
      XHRErrorMessages: XHRErrorMessages
    });
  },


  /**
   * renderXHRErrorMessage
   * Render an element for each XHR error object message
   * @param {object} error object
   * @param {number} i
   * @return {vnode}
   */

  renderXHRErrorMessage: function renderXHRErrorMessage(errorObject, i) {
    var message = errorObject.message;


    return _react2.default.createElement(
      'div',
      {
        key: i,
        className: _index2.default.validationMessage },
      'Server Error: ',
      message,
      _react2.default.createElement(
        'button',
        { className: _index2.default.remove },
        _react2.default.createElement(
          'span',
          { className: _index2.default.removeText },
          'Remove'
        ),
        _react2.default.createElement(
          'div',
          {
            className: _index2.default.removeX,
            onClick: this.removeXHRErrorMessage,
            'data-key': i },
          '×'
        )
      )
    );
  },


  /**
   * renderXHRErrorMessages
   * Iterate error objects and call renderXHRErrorMessage() for each object
   * @param {array} XHRErrorObjects - an array of error objects
   * @return {vnode}
   */

  renderXHRErrorMessages: function renderXHRErrorMessages(XHRErrorObjects) {
    return _react2.default.createElement(
      'div',
      { className: _index2.default.validationMessages },
      XHRErrorObjects.map(this.renderXHRErrorMessage)
    );
  },


  /**
   * renderInvalidFile
   * Render a file validation message
   * @param {object} error object
   * @param {number} i
   * @return {vnode}
   */

  renderInvalidFile: function renderInvalidFile(errorObject, i) {
    var message = errorObject.message;
    var file = errorObject.file;
    var name = file.name;


    return _react2.default.createElement(
      'div',
      {
        key: i,
        className: _index2.default.validationMessage },
      _react2.default.createElement(
        'strong',
        null,
        name
      ),
      ': ',
      message,
      _react2.default.createElement(
        'button',
        { className: _index2.default.remove },
        _react2.default.createElement(
          'span',
          { className: _index2.default.removeText },
          'Remove'
        ),
        _react2.default.createElement(
          'div',
          {
            className: _index2.default.removeX,
            onClick: this.removeInvalidFile,
            'data-key': i },
          '×'
        )
      )
    );
  },


  /**
   * renderInvalidFiles
   * Iterate error objects and call renderInvalidFile() for each object
   * @param {array} and array of error objects
   * @return {vnode}
   */

  renderInvalidFiles: function renderInvalidFiles(errorsObjects) {
    return _react2.default.createElement(
      'div',
      { className: _index2.default.validationMessages },
      errorsObjects.map(this.renderInvalidFile)
    );
  },


  /**
   * renderPreviewItem
   * Take a file object and an index value
   * @param {object} an object containing {file, name, uid, progress}
   * @param {number} i
   * @return {vnode}
   */

  renderPreviewItem: function renderPreviewItem(fileObject, i) {
    var progress = fileObject.progress;
    var file = fileObject.file;
    var uid = fileObject.uid;
    var name = fileObject.name;
    var preview = file.preview;


    var inlineStyleWidth = {
      width: progress > 0 ? progress + '%' : '0%'
    };

    return _react2.default.createElement(
      'div',
      { className: _index2.default.listItem, key: i },
      _react2.default.createElement(
        'div',
        { className: _index2.default.listItem__body },
        _react2.default.createElement(
          'div',
          { className: _index2.default.listItem__img },
          (0, _utils.previewIsImage)(name) ? _react2.default.createElement('img', { src: preview, alt: name }) : null
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
        { className: _index2.default.remove },
        _react2.default.createElement(
          'span',
          { className: _index2.default.removeText },
          'Remove'
        ),
        _react2.default.createElement(
          'div',
          {
            className: _index2.default.removeX,
            onClick: this.abortUploadRequest,
            'data-key': i,
            'data-uid': uid },
          '×'
        )
      ),
      _react2.default.createElement('span', {
        className: _index2.default.progress_bar,
        style: inlineStyleWidth })
    );
  },


  /**
   * renderPreviewItems
   * Take an array of file objects, iterate & pass to renderPreviewItem()
   * @param {array} and array of file objects
   * @return {vnode}
   */

  renderPreviewItems: function renderPreviewItems(fileObjects) {
    return _react2.default.createElement(
      'div',
      { className: _index2.default.previewItems },
      fileObjects.map(this.renderPreviewItem)
    );
  },


  /**
   * buildFilePath
   * Take a url, path and and optional size (defaults to 'original')
   * Split the path before it's file name.
   * Replace 'upload' with 'view' in the url amd return the string
   * @param {string} url
   * @param {string} path
   * @param {string} dimension: 'original', '50x', '100x100', '400x100', etc
   * @return {string}
   */

  buildFilePath: function buildFilePath(url, path) {
    var dimension = arguments.length <= 2 || arguments[2] === undefined ? 'original' : arguments[2];

    var pattern = /([^/]*)$/;
    var splitPath = path.split(pattern);
    return url.replace('/upload', '/view') + '/' + splitPath[0] + dimension + '/' + splitPath[1];
  },


  /**
   * renderUploadedFileItem
   * Render an node represeting an uploaded file
   * @param {object} fileObject
   * @param {number} idx
   * @return {vnode}
   */

  renderUploadedFileItem: function renderUploadedFileItem(fileObject, idx) {
    var path = fileObject.path;
    var name = fileObject.name;
    var uploadURL = fileObject.uploadURL;
    var path_to_original = fileObject.path_to_original;

    var pathToOriginal = path_to_original != null ? path_to_original : this.buildFilePath(uploadURL, path);

    return _react2.default.createElement(
      'div',
      { className: _index2.default.listItem, key: idx },
      _react2.default.createElement(
        'div',
        { className: _index2.default.listItem__body },
        _react2.default.createElement(
          'a',
          { target: '_blank', href: pathToOriginal, className: _index2.default.uploadeditem__title },
          name
        )
      )
    );
  },


  /**
   * renderUploadedFiles
   * Generate an element passing it's contents to renderUploadedFileItem().
   * Wrap this item in a Sortable component
   * @param  {array} filesObjects
   * @return {vnode}
   */

  renderUploadedFiles: function renderUploadedFiles(filesObjects) {
    return _react2.default.createElement(
      'div',
      { className: _index2.default.uploadedItems },
      _react2.default.createElement(
        _sortable2.default,
        { canRemove: true, onRemove: this.removeUploadedFile, onDrop: this.onDrop },
        filesObjects.map(this.renderUploadedFileItem)
      )
    );
  },


  /**
   * render
   * @return {vnode}
   */

  render: function render() {
    var _props2 = this.props;
    var attributes = _props2.attributes;
    var hint = _props2.hint;
    var label = _props2.label;
    var name = _props2.name;
    var multiple = _props2.multiple;
    var _state = this.state;
    var XHRErrorMessages = _state.XHRErrorMessages;
    var uploadedFiles = _state.uploadedFiles;
    var invalidFiles = _state.invalidFiles;
    var previewFiles = _state.previewFiles;

    // Set up field classes

    var fieldClassNames = (0, _classnames2.default)(_index2.default.base, _defineProperty({}, '' + _index2.default.baseInline, attributes.inline));

    return _react2.default.createElement(
      'div',
      { className: fieldClassNames },
      _react2.default.createElement(
        'div',
        { className: _index2.default.field },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_header2.default, { hint: hint, id: name, label: label })
        ),
        XHRErrorMessages && XHRErrorMessages.length > 0 ? this.renderXHRErrorMessages(XHRErrorMessages) : null,
        invalidFiles && invalidFiles.length > 0 ? this.renderInvalidFiles(invalidFiles) : null,
        previewFiles && previewFiles.length > 0 ? this.renderPreviewItems(previewFiles) : null,
        _react2.default.createElement(
          _dropzone2.default,
          {
            multiple: multiple,
            onChange: this.onChange,
            disableClick: uploadedFiles.length > 0 },
          uploadedFiles.length > 0 ? this.renderUploadedFiles(uploadedFiles) : null
        )
      )
    );
  }
});

exports.default = MultiUploadField;