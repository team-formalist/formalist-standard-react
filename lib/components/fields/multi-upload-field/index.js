'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Import components


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _attacheUpload = require('attache-upload');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _dropzone = require('../../ui/dropzone');

var _dropzone2 = _interopRequireDefault(_dropzone);

var _validation = require('./validation.js');

var _validation2 = _interopRequireDefault(_validation);

var _index = require('./index.mcss');

var _index2 = _interopRequireDefault(_index);

var _sortable = require('../../ui/sortable');

var _sortable2 = _interopRequireDefault(_sortable);

var _utils = require('./utils');

var _extractComponent = require('../../../utils/extract-component');

var _extractComponent2 = _interopRequireDefault(_extractComponent);

var _parseRegexFromString = require('../../../utils/parse-regex-from-string');

var _parseRegexFromString2 = _interopRequireDefault(_parseRegexFromString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * MultiUploadField
 */

var MultiUploadField = _react2.default.createClass({

  /**
   * displayName
   */

  displayName: 'UploadField',

  /**
   * propTypes
   */

  propTypes: {
    actions: _react2.default.PropTypes.object,
    attributes: _react2.default.PropTypes.shape({
      max_file_size: _react2.default.PropTypes.number,
      max_file_size_message: _react2.default.PropTypes.string,
      multiple: _react2.default.PropTypes.bool,
      permitted_file_type_message: _react2.default.PropTypes.string,
      permitted_file_type_regex: _react2.default.PropTypes.string,
      presign_url: _react2.default.PropTypes.string,
      render_uploaded_as: _react2.default.PropTypes.string,
      upload_action_label: _react2.default.PropTypes.string,
      upload_prompt: _react2.default.PropTypes.string
    }),
    config: _react2.default.PropTypes.object,
    errors: _reactImmutableProptypes2.default.list,
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    multiple: _react2.default.PropTypes.bool,
    name: _react2.default.PropTypes.string,
    value: _react2.default.PropTypes.oneOfType([_reactImmutableProptypes2.default.list, _react2.default.PropTypes.object])
  },

  /**
   * Enable parent to pass context
   */

  contextTypes: {
    globalConfig: _react2.default.PropTypes.object
  },

  /**
   * getDefaultProps
   * set 'multiple' as true by default
   */

  getDefaultProps: function getDefaultProps() {
    return {
      multiple: true
    };
  },


  /**
   * getInitialState
   * Assign existing files (passed in by `value`) to `files`
   * See the example `propFiles` format above
   * @return {object}
   */

  getInitialState: function getInitialState() {
    var _this = this;

    var value = this.props.value;

    var allowMultipleFiles = this.props.multiple || this.props.attributes.multiple;
    value = value ? value.toJS() : value;
    var files = [];

    // check if 'value' exists.
    // if it's an 'object' and put it in array
    if (value != null) {
      if (!allowMultipleFiles && value.length > 1) {
        value = value.splice(0, 1);
      }
      if (!Array.isArray(value) && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        files = [this.populateExistingAttributes(value)];
      } else {
        files = value.map(function (file) {
          return _this.populateExistingAttributes(file);
        });
      }
    }

    return {
      files: files
    };
  },


  /**
   * populateExistingAttributes
   * take an object and copy it's contents to `fileAttributes` of a new object
   * return the new object
   * @param  {obj} file
   * @return {obj}
   */

  populateExistingAttributes: function populateExistingAttributes(file) {
    var obj = {};
    obj.fileAttributes = {};
    for (var key in file) {
      obj.fileAttributes[key] = file[key];
    }
    return obj;
  },


  /**
   * componentWillReceiveProps
   * Check for new uploadedFiles passed in via 'value'.
   * Also ignore this lifecycle step for a single upload field.
   * First check the props exist and filter out any unique objects passed in.
   * If there are unique objects, add them to 'files' and update state
   * @param {object} nextProps
   */

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!nextProps.multple || !nextProps.value || !nextProps.value.length) return;
    var files = this.state.files.slice(0);

    var newValueProps = (0, _utils.filterUniqueObjects)(files, nextProps.value);
    if (!newValueProps.length) return;

    files = files.concat(newValueProps);
    this.setState({
      files: files
    });
  },


  /**
   * createFileObjects
   * Create a file object for a file
   * A file object includes the file_name, the file and a uid
   * The uid is generated using the actual file's name.
   * Example:
   * {
   *  file_name: small.jpg,
   *  file: {file},
   *  uid: "wyertyiopdop_small.jpg"
   * }
   *
   * @param {array || object} val - a existing file object or an array of dropped files
   * @return {array || object} an array of objects - of just an object
   */

  createFileObjects: function createFileObjects(val) {
    // format the object
    function formatObject(file) {
      var name = file.name;
      var size = file.size;
      var type = file.type;
      var lastModifiedDate = file.lastModifiedDate;
      var lastModified = file.lastModified;

      var lastModifiedAsString = lastModifiedDate ? lastModifiedDate.toString() : lastModified.toString();
      return {
        file: file,
        fileAttributes: {
          file_name: name
        },
        size: size,
        type: type,
        lastModifiedDate: lastModifiedAsString,
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
   * Pass a file's `uid` to the `deleteXHRRequest` method of attache-upload
   * @param {number} index
   * @param {object} file
   */

  abortUploadRequest: function abortUploadRequest(file) {
    (0, _attacheUpload.abortXHRRequest)(file.uid);
  },


  /**
   * onProgress
   * Clone and iterate existing files.
   * Assign the progress value to a specific file
   * Update the state of the 'files'
   * @param {event} e - XHR progress
   * @param {object} file - the uploaded file
   */

  onProgress: function onProgress(e, fileObject) {
    var files = this.state.files.slice(0);

    files.map(function (existingFile) {
      if (existingFile.uid === fileObject.uid) {
        existingFile.progress = e.percent;
      }
    });

    this.setState({
      files: files
    });
  },


  /**
   * updateFiles
   * Take a `fileObject`
   * Filter existing files by 'uid' & return all files that do not match
   * Apply additional properties from the `response` to the `fileObject`
   * Delete the `fileObject` 'file' property
   * Push `fileObject` into `files` and save
   * Pass our updated `files` to  this.onUpdate()
   * @param {object} a file object
   */

  updateUploadedFiles: function updateUploadedFiles(fileObject, response, upload_url) {
    var copy = Object.assign({}, fileObject);
    delete copy.file;

    // apply response key/values to existing `fileAttributes`
    for (var key in response) {
      copy.fileAttributes[key] = response[key];
    }

    // apply the 'original_url' to existing `fileAttributes`
    copy.fileAttributes['original_url'] = this.buildPath(upload_url, response.path);

    var files = this.state.files.slice(0);
    var indexOfFile = files.findIndex(function (file) {
      return file.uid === fileObject.uid;
    });
    files.splice(indexOfFile, 1, copy);

    this.setState({
      files: files
    });

    this.onUpdate(files);
  },


  /**
   * onUpdate
   * If `multiple` return the array of file(s), otherwise just the first
   * normalise each fileObject, returning it's fileAttributes object
   * @param  {array} files
   * @return {array/object}
   */

  onUpdate: function onUpdate(files) {
    var uploadedFiles = files.map(this.normaliseFileExport);

    var value = this.props.attributes.multiple || this.props.multiple ? uploadedFiles : uploadedFiles[0];

    this.props.actions.edit(function (val) {
      return _immutable2.default.fromJS(value);
    });
  },


  /**
   * normaliseFileExport
   * Remove 'file_name' and 'original_url' from the fileObject.fileAttributes object
   * return the object
   * @param {object} obj
   */

  normaliseFileExport: function normaliseFileExport(obj) {
    var copy = Object.assign({}, obj.fileAttributes);
    delete copy.file_name;
    delete copy.original_url;
    return copy;
  },


  /**
   * removeFailedUpload
   * If an XHR error has occured while uploading a file,
   * remove the file from the current list of `files` in state
   * @param {object} file object
   */

  removeFailedUpload: function removeFailedUpload(fileObject) {
    var files = this.state.files.filter(function (file) {
      return file.uid !== fileObject.uid;
    });

    this.setState({
      files: files
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
   * Take a file object and call `preSign` passing it's response to `upload`.
   * On completion of 'upload' pass the newly uploaded file to `updateFiles()`
   * Catch any attache-upload specific errors and render them.
   * Otherwise log the error.
   * @param {object} file object
   * @param {function} optionally show the progress of an upload. We dont show this
   *                   for when we remove uploaded files and POST the remaining
   */

  uploadFile: function uploadFile(fileObject) {
    var _this2 = this;

    var onProgress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noOp;

    if (!fileObject) return;
    var presign_url = this.props.attributes.presign_url;
    var csrfToken = this.context.globalConfig.csrfToken;

    var upload_url = void 0;

    (0, _attacheUpload.presign)(presign_url, csrfToken).then(function (presignResponse) {
      // assign the return 'url' to upload_url so
      // we can create paths to the file
      upload_url = presignResponse.url;
      return (0, _attacheUpload.upload)(presignResponse, fileObject, onProgress);
    }).then(function (uploadResponse) {
      return _this2.updateUploadedFiles(fileObject, uploadResponse, upload_url);
    }).catch(function (err) {
      var name = err.name;

      if (name === 'presignRequest' || name === 'uploadRequest' || name === 'responseStatus') {
        _this2.removeFailedUpload(fileObject);
        _this2.storeXHRErrorMessage(err.message);
      } else {
        console.error(err);
        throw err;
      }
    });
  },


  /**
   * onChange
   * Iterate and validate each file.
   * Split valid and invalid files up into separate arrays.
   * Create new File Objects from valid files and concat with existing `files`
   * Call this.uploadFile() for each valid file object
   * @param {array} - dropped/uploaded files
   */

  onChange: function onChange(files) {
    var _this3 = this;

    if (!files.length) return;

    var attributes = this.props.attributes;

    var isMultiple = this.props.attributes.multiple || this.props.multiple;

    if (!isMultiple && this.state.files.length) {
      this.removeFile(0);
    }

    var permitted_file_type_regex = attributes.permitted_file_type_regex;
    var permitted_file_type_message = attributes.permitted_file_type_message;
    var max_file_size = attributes.max_file_size;
    var max_file_size_message = attributes.max_file_size_message;


    var status = void 0;
    var validFiles = [];
    var invalidFiles = this.state.invalidFiles ? this.state.invalidFiles.slice(0) : [];

    var permittedFileTypeRegex = (0, _parseRegexFromString2.default)(permitted_file_type_regex);

    // Iterate and validate each file
    files.map(function (file) {
      status = (0, _validation2.default)(file, permittedFileTypeRegex, permitted_file_type_message, max_file_size, max_file_size_message);

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
    var uploadingFiles = validFiles.map(function (file) {
      return _this3.createFileObjects(file);
    });

    // if `multiple` concat dropped file with existing,
    // otherwise just the dropped file
    var allFiles = isMultiple ? this.state.files.concat(uploadingFiles) : uploadingFiles;

    this.setState({
      files: allFiles
    });

    // upload each valid file and passing in a progress event handler
    uploadingFiles.map(function (fileObject) {
      _this3.uploadFile(fileObject, _this3.onProgress);
    });
  },


  /**
   * onDrop
   * When a sortable upload items is 'dropped' re-arrage `files` to
   * match the same order and save to state
   * @param  {Array} newOrder - an array of indexs returned from Sortable
   */

  onDrop: function onDrop(newOrder) {
    var existingFiles = this.state.files.slice(0);
    var files = (0, _utils.sortArrayByOrder)(existingFiles, newOrder);

    this.setState({
      files: files
    });

    this.onUpdate(files);
  },


  /**
   * removeKeyFromState
   * A helper to copy an array from state, and remove a key, returning array
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
   * removeFile
   * Copy existing `files` from state.
   * Check if the file at `index` has a `file` property. if so, cancel it's XHR.
   * Remove the file at `index` from `files` and save
   * @param {number} index - sourtable item index passed back from Sortable
   * @param {Event} e - click event passed back from Sortable
   */

  removeFile: function removeFile(index, e) {
    if (e) e.preventDefault();
    var files = this.state.files.slice(0);

    var file = files[index];
    if (file.file) this.abortUploadRequest(file);

    files.splice(index, 1);
    this.setState({
      files: files
    });

    this.onUpdate(files);
  },


  /**
   * removeInvalidFile
   * Filter out an file by key
   * save remaining `invalidFiles` to state
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
   * removeXHRErrorMessage
   * Filter out an error by `key`
   * Save remaining `XHRErrorMessages` to state
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
   * @param {number} index
   * @return {vnode}
   */

  renderXHRErrorMessage: function renderXHRErrorMessage(errorObject, index) {
    var message = errorObject.message;


    return _react2.default.createElement(
      'div',
      {
        key: index,
        className: _index2.default.validationMessage },
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
            'data-key': index
          },
          '\xD7'
        )
      )
    );
  },


  /**
   * renderXHRErrorMessages
   * Iterate `XHRErrorMessages` and call renderXHRErrorMessage() for each object
   * @param {array} XHRErrorMessages - an array of error objects
   * @return {vnode}
   */

  renderXHRErrorMessages: function renderXHRErrorMessages(XHRErrorMessages) {
    return _react2.default.createElement(
      'div',
      { className: _index2.default.validationMessages },
      XHRErrorMessages.map(this.renderXHRErrorMessage)
    );
  },


  /**
   * renderInvalidFile
   * Render a file validation message
   * @param {object} error object
   * @param {number} index
   * @return {vnode}
   */

  renderInvalidFile: function renderInvalidFile(errorObject, index) {
    var message = errorObject.message;
    var file = errorObject.file;
    var name = file.name;


    return _react2.default.createElement(
      'div',
      {
        key: index,
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
            'data-key': index },
          '\xD7'
        )
      )
    );
  },


  /**
   * renderInvalidFiles
   * Iterate `invalidFiles` and call renderInvalidFile() for each object
   * @param {array} invalidFiles
   * @return {vnode}
   */

  renderInvalidFiles: function renderInvalidFiles(invalidFiles) {
    return _react2.default.createElement(
      'div',
      { className: _index2.default.validationMessages },
      invalidFiles.map(this.renderInvalidFile)
    );
  },


  /**
   * renderThumbnail
   * Return a thumbnail image based on `thumbnail_url` or building one from 'original_url'
   * @param  {string} thumbnail_url
   * @param  {string} original_url
   * @param  {string} file_name
   * @return {vnode}
   */

  renderThumbnail: function renderThumbnail(thumbnail_url, original_url, file_name) {
    if (!thumbnail_url && !original_url) return;

    return _react2.default.createElement('img', { src: thumbnail_url || this.buildThumbnailPath(original_url, '50x'), alt: file_name });
  },


  /**
   * renderPreviewDetails
   * Render the file details for a preview item
   * @param  {string} file_name
   * @param  {image} thumbnailImage
   * @return {vnode}
   */

  renderPreviewDetails: function renderPreviewDetails(file_name, thumbnailImage) {
    var _classNames;

    var isProgressTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var titleClassNames = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, '' + _index2.default.listItem__title, !isProgressTitle), _defineProperty(_classNames, '' + _index2.default.progress__title, isProgressTitle), _classNames));

    var wrapperClassNames = (0, _classnames2.default)(_index2.default.align_middle, _index2.default.previewItem__details);

    return _react2.default.createElement(
      'div',
      { className: wrapperClassNames },
      _react2.default.createElement(
        'div',
        { className: _index2.default.align_middle__content },
        _react2.default.createElement(
          'div',
          { className: _index2.default.listItem__img },
          thumbnailImage
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _index2.default.align_middle__content },
        _react2.default.createElement(
          'div',
          { className: titleClassNames },
          'Uploading: ',
          file_name
        )
      )
    );
  },


  /**
   * renderPreviewItem
   * Render an node represeting an preview (uploading) file
   * @param {object} fileObject
   * @param {number} index
   * @return {vnode}
   */

  renderPreviewItem: function renderPreviewItem(fileObject, index) {
    var progress = fileObject.progress;
    var file = fileObject.file;
    var fileAttributes = fileObject.fileAttributes;
    var file_name = fileAttributes.file_name;
    var preview = file.preview;

    var hasThumbnail = (0, _utils.hasImageFormatType)(file_name);
    var thumbnailImage = hasThumbnail ? this.renderThumbnail(preview, null, file_name) : null;

    var currentProgress = {
      width: progress > 0 ? progress + '%' : '0%'
    };

    return _react2.default.createElement(
      'div',
      { className: _index2.default.previewItem, key: index },
      _react2.default.createElement(
        'span',
        {
          className: _index2.default.progress_bar,
          style: currentProgress },
        this.renderPreviewDetails(file_name, thumbnailImage, true)
      ),
      this.renderPreviewDetails(file_name, thumbnailImage)
    );
  },


  /**
   * buildPath
   * Take a url, path and and optional size (defaults to 'original')
   * Split the path before it's file name.
   * Replace 'upload' with 'view' in the url amd return the string
   * @param {string} url
   * @param {string} path
   * @param {string} dimension: 'original', '50x', '100x100', '400x100', etc
   * @return {string}
   */

  buildPath: function buildPath(url, path) {
    var dimension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'original';

    var pattern = /([^/]*)$/;
    var splitPath = path.split(pattern);
    return url.replace('/upload', '/view') + '/' + splitPath[0] + dimension + '/' + splitPath[1];
  },


  /**
   * buildThumbnailPath
   * Replace 'original' with a specific dimension. Defaults to `50x`
   * @param  {string} original_url
   * @param  {string} dimension
   * @return {string}
   */

  buildThumbnailPath: function buildThumbnailPath(original_url) {
    var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '50x';

    return original_url.replace('original', dimension);
  },


  /**
   * renderDefaultTemplate
   * Render an node represeting an uploaded file
   * @param {object} fileObject
   * @param {number} index
   * @return {vnode}
   */

  renderDefaultTemplate: function renderDefaultTemplate(fileObject, index) {
    var fileAttributes = fileObject.fileAttributes;
    var file_name = fileAttributes.file_name;
    var thumbnail_url = fileAttributes.thumbnail_url;
    var original_url = fileAttributes.original_url;

    var hasThumbnail = thumbnail_url != null || (0, _utils.hasImageFormatType)(file_name);
    var thumbnailImage = hasThumbnail ? this.renderThumbnail(thumbnail_url, original_url, file_name) : null;

    return _react2.default.createElement(
      'div',
      { className: _index2.default.listItem, key: index },
      _react2.default.createElement(
        'div',
        { className: _index2.default.listItem__body },
        _react2.default.createElement(
          'div',
          { className: _index2.default.align_middle },
          _react2.default.createElement(
            'div',
            { className: _index2.default.align_middle__content },
            _react2.default.createElement(
              'div',
              { className: _index2.default.listItem__img },
              thumbnailImage
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _index2.default.align_middle__content },
            _react2.default.createElement(
              'div',
              { className: _index2.default.listItem__title },
              _react2.default.createElement(
                'a',
                { target: '_blank', href: original_url },
                file_name
              )
            )
          )
        )
      )
    );
  },


  /**
   * renderCustomTemplate
   * Try and extract the custom template from `config` passing it our `fileObject`
   * The `extractComponent` will try and match a `name` property in `config` with
   * properties defined in the form class.
   * e.g.
   *
   * // form class
   *
   * multi_upload_field :multi_upload_field,
   *  label: "Upload all the photos",
   *  presign_url: "http://some/presign",
   *  render_uploaded_as: "admin"
   *
   *
   * // form config
   *
   * multiUploadField: {
   *   components: [
   *     {
   *       name: 'admin',
   *       component: (file, index) => (<div key={index}>I see {file.name}</div>)
   *     }
   *   ]
   * }
   *
   * If that fails, return null and log the error.
   * @param  {object} fileObject
   * @param  {number} index
   * @return {vnode | null}
   */

  renderCustomTemplate: function renderCustomTemplate(fileObject, index, config, attribute) {
    try {
      return (0, _extractComponent2.default)(config.components, attribute)(fileObject);
    } catch (err) {
      console.error(err);
      return null;
    }
  },


  /**
   * customComponentExists
   * Does a component with the same name as the `attribute` exist ?
   * @param  {object} config - components: [...]
   * @param  {string} attribute
   * @return {bool}
   */

  customComponentExists: function customComponentExists(config, attribute) {
    if (!config || !attribute) return false;

    var result = false;
    config.components.map(function (component) {
      if (component.name === attribute) result = true;
    });
    return result;
  },


  /**
   * renderFiles
   * Iterate all files in state.
   * If the file has a 'file' property, call `renderPreviewItem()`
   * otherwise :
   * - check if we need to renderCustomTemplate()
   * - otherwise render a default template
   * Toggle `isSortable` based on if preview items exist
   * @param  {Array} files
   * @return {vnode}
   */

  renderFiles: function renderFiles(files) {
    var _this4 = this;

    var isSortable = true;
    var _props = this.props;
    var config = _props.config;
    var attributes = _props.attributes;
    var render_uploaded_as = attributes.render_uploaded_as;


    var allFiles = files.map(function (fileObject, index) {
      if (fileObject.file) {
        isSortable = false;
        return _this4.renderPreviewItem(fileObject, index);
      } else {
        var template = _this4.customComponentExists(config, render_uploaded_as) ? _this4.renderCustomTemplate(fileObject, index, config, render_uploaded_as) : _this4.renderDefaultTemplate(fileObject, index);
        return template;
      }
    });

    return _react2.default.createElement(
      _sortable2.default,
      { canRemove: true, canSort: isSortable, onRemove: this.removeFile, onDrop: this.onDrop },
      allFiles
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
    var errors = _props2.errors;
    var upload_prompt = attributes.upload_prompt;
    var upload_action_label = attributes.upload_action_label;


    var hasErrors = errors.count() > 0;

    var _state = this.state;
    var XHRErrorMessages = _state.XHRErrorMessages;
    var files = _state.files;
    var invalidFiles = _state.invalidFiles;

    // Set up field classes

    var fieldClassNames = (0, _classnames2.default)(_index2.default.base, _defineProperty({}, '' + _index2.default.baseInline, attributes.inline));

    return _react2.default.createElement(
      'div',
      { className: fieldClassNames },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_header2.default, { hint: hint, id: name, label: label })
        ),
        XHRErrorMessages && XHRErrorMessages.length > 0 ? this.renderXHRErrorMessages(XHRErrorMessages) : null,
        invalidFiles && invalidFiles.length > 0 ? this.renderInvalidFiles(invalidFiles) : null,
        _react2.default.createElement(
          _dropzone2.default,
          {
            multiple: this.props.attributes.multiple || this.props.multiple,
            onChange: this.onChange,
            label: upload_prompt,
            buttonText: upload_action_label,
            disableClick: files.length > 0 },
          files.length > 0 ? this.renderFiles(files) : null
        ),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      )
    );
  }
});

exports.default = MultiUploadField;