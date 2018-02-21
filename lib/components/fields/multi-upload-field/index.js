'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _attacheUpload = require('attache-upload');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _formalistCompose = require('formalist-compose');

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import components


/**
 * MultiUploadField
 */

var MultiUploadField = function (_React$Component) {
  _inherits(MultiUploadField, _React$Component);

  /**
   * Enable parent to pass context
   */

  /**
   * displayName
   */

  function MultiUploadField(props, context) {
    _classCallCheck(this, MultiUploadField);

    var _this = _possibleConstructorReturn(this, (MultiUploadField.__proto__ || Object.getPrototypeOf(MultiUploadField)).call(this, props, context));

    _initialiseProps.call(_this);

    var value = props.value;

    var allowMultipleFiles = props.multiple || props.attributes.multiple;
    value = value ? value.toJS() : value;
    var files = [];

    // Set a per instance ID for talking to the bus
    _this.instanceId = (0, _uid2.default)();

    // check if 'value' exists.
    // if it's an 'object' and put it in array
    if (value != null) {
      if (!allowMultipleFiles && value.length > 1) {
        value = value.splice(0, 1);
      }
      if (!Array.isArray(value) && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        files = [_this.populateExistingAttributes(value)];
      } else {
        files = value.map(function (file) {
          return _this.populateExistingAttributes(file);
        });
      }
    }

    _this.state = {
      files: files,
      uploadQueue: []
    };
    return _this;
  }

  /**
   * populateExistingAttributes
   * take an object and copy it's contents to `fileAttributes` of a new object
   * return the new object
   * @param  {obj} file
   * @return {obj}
   */

  /**
   * getDefaultProps
   * set 'multiple' as true by default
   */

  /**
   * propTypes
   */

  _createClass(MultiUploadField, [{
    key: 'componentWillReceiveProps',


    /**
     * componentWillReceiveProps
     * Check for new uploadedFiles passed in via 'value'.
     * Also ignore this lifecycle step for a single upload field.
     * First check the props exist and filter out any unique objects passed in.
     * If there are unique objects, add them to 'files' and update state
     * @param {object} nextProps
     */

    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.multple || !nextProps.value || !nextProps.value.length) return;
      var files = this.state.files.slice(0);

      var newValueProps = (0, _utils.filterUniqueObjects)(files, nextProps.value);
      if (!newValueProps.length) return;

      files = files.concat(newValueProps);
      this.setState({
        files: files
      });
    }

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

    /**
     * abortRequest
     * Pass a file's `uid` to the `deleteXHRRequest` method of attache-upload
     * @param {number} index
     * @param {object} file
     */

    /**
     * onProgress
     * Clone and iterate existing files.
     * Assign the progress value to a specific file
     * Update the state of the 'files'
     * @param {event} e - XHR progress
     * @param {object} file - the uploaded file
     */

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

    /**
     * onUpdate
     * If `multiple` return the array of file(s), otherwise just the first
     * normalise each fileObject, returning its fileAttributes object
     * @param  {array} files
     * @return {array/object}
     */

    /**
     * normaliseFileExport
     * Remove 'file_name', 'original_url', 'thumbnail_url' from the fileObject.fileAttributes object
     * return the object
     * @param {object} obj
     */

    /**
     * removeFailedUpload
     * If an XHR error has occured while uploading a file,
     * remove the file from the current list of `files` in state
     * @param {object} file object
     */

    /**
     * storeXHRErrorMessage
     * Assign an XHR message to an array with a unique uid and save to state
     * This allows the user to click and remove specific errors
     * @param {string} message
     */

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

    /**
     * Add a file to the upload queue identified by its uid
    */


    /**
     * Remove a file to the upload queue identified by its uid
    */


    /**
     * onChange
     * Iterate and validate each file.
     * Split valid and invalid files up into separate arrays.
     * Create new File Objects from valid files and concat with existing `files`
     * Call this.uploadFile() for each valid file object
     * @param {array} - dropped/uploaded files
     */

    /**
     * onDrop
     * When a sortable upload items is 'dropped' re-arrage `files` to
     * match the same order and save to state
     * @param  {Array} newOrder - an array of indexs returned from Sortable
     */

    /**
     * removeKeyFromState
     * A helper to copy an array from state, and remove a key, returning array
     * @param {string} array - a name for an array in state
     * @param {number/string} key
     * @return {array}
     */

    /**
     * removeFile
     * Copy existing `files` from state.
     * Check if the file at `index` has a `file` property. if so, cancel it's XHR.
     * Remove the file at `index` from `files` and save
     * @param {number} index - sourtable item index passed back from Sortable
     * @param {Event} e - click event passed back from Sortable
     */

    /**
     * removeInvalidFile
     * Filter out an file by key
     * save remaining `invalidFiles` to state
     * @param {event} e - click
     */

    /**
     * removeXHRErrorMessage
     * Filter out an error by `key`
     * Save remaining `XHRErrorMessages` to state
     * @param {event} e - click event
     */

    /**
     * renderXHRErrorMessage
     * Render an element for each XHR error object message
     * @param {object} error object
     * @param {number} index
     * @return {vnode}
     */

    /**
     * renderXHRErrorMessages
     * Iterate `XHRErrorMessages` and call renderXHRErrorMessage() for each object
     * @param {array} XHRErrorMessages - an array of error objects
     * @return {vnode}
     */

    /**
     * renderInvalidFile
     * Render a file validation message
     * @param {object} error object
     * @param {number} index
     * @return {vnode}
     */

    /**
     * renderInvalidFiles
     * Iterate `invalidFiles` and call renderInvalidFile() for each object
     * @param {array} invalidFiles
     * @return {vnode}
     */

    /**
     * renderThumbnail
     * Return a thumbnail image based on `thumbnail_url` or building one from 'original_url'
     * @param  {string} thumbnail_url
     * @param  {string} file_name
     * @return {vnode}
     */

    /**
     * renderPreviewDetails
     * Render the file details for a preview item
     * @param  {string} file_name
     * @param  {image} thumbnailImage
     * @return {vnode}
     */

    /**
     * renderPreviewItem
     * Render an node represeting an preview (uploading) file
     * @param {object} fileObject
     * @param {number} index
     * @return {vnode}
     */

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

    /**
     * buildThumbnailPath
     * Replace 'original' with a specific dimension. Defaults to `50x`
     * @param  {string} original_url
     * @param  {string} dimension
     * @return {string}
     */

    /**
     * renderDefaultTemplate
     * Render an node represeting an uploaded file
     * @param {object} fileObject
     * @param {number} index
     * @return {vnode}
     */

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

    /**
     * customComponentExists
     * Does a component with the same name as the `attribute` exist ?
     * @param  {object} config - components: [...]
     * @param  {string} attribute
     * @return {bool}
     */

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

  }, {
    key: 'render',


    /**
     * render
     * @return {vnode}
     */

    value: function render() {
      var _props = this.props,
          attributes = _props.attributes,
          hint = _props.hint,
          label = _props.label,
          name = _props.name,
          errors = _props.errors;
      var upload_prompt = attributes.upload_prompt,
          upload_action_label = attributes.upload_action_label;


      var hasErrors = errors.count() > 0;

      var _state = this.state,
          XHRErrorMessages = _state.XHRErrorMessages,
          files = _state.files,
          invalidFiles = _state.invalidFiles;

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
  }]);

  return MultiUploadField;
}(_react2.default.Component);

MultiUploadField.displayName = 'UploadField';
MultiUploadField.propTypes = {
  actions: _propTypes2.default.object,
  attributes: _propTypes2.default.shape({
    max_file_size: _propTypes2.default.number,
    max_file_size_message: _propTypes2.default.string,
    multiple: _propTypes2.default.bool,
    permitted_file_type_message: _propTypes2.default.string,
    permitted_file_type_regex: _propTypes2.default.string,
    presign_url: _propTypes2.default.string,
    render_uploaded_as: _propTypes2.default.string,
    upload_action_label: _propTypes2.default.string,
    upload_prompt: _propTypes2.default.string
  }),
  bus: _propTypes2.default.object,
  config: _propTypes2.default.object,
  errors: _reactImmutableProptypes2.default.list,
  hint: _propTypes2.default.string,
  label: _propTypes2.default.string,
  multiple: _propTypes2.default.bool,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_reactImmutableProptypes2.default.list, _propTypes2.default.object])
};
MultiUploadField.contextTypes = {
  globalConfig: _propTypes2.default.object
};
MultiUploadField.defaultProps = {
  multiple: true
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.populateExistingAttributes = function (file) {
    var obj = {};
    obj.fileAttributes = {};
    for (var key in file) {
      obj.fileAttributes[key] = file[key];
    }
    return obj;
  };

  this.createFileObjects = function (val) {
    // format the object
    function formatObject(file) {
      var name = file.name,
          size = file.size,
          type = file.type,
          lastModifiedDate = file.lastModifiedDate,
          lastModified = file.lastModified;

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
  };

  this.abortUploadRequest = function (file) {
    _this2.removeFromUploadQueue(file.uid);
    (0, _attacheUpload.abortXHRRequest)(file.uid);
  };

  this.onProgress = function (e, fileObject) {
    var files = _this2.state.files.slice(0);

    files.map(function (existingFile) {
      if (existingFile.uid === fileObject.uid) {
        existingFile.progress = e.percent;
      }
    });

    _this2.setState({
      files: files
    });
  };

  this.updateUploadedFiles = function (fileObject, response, upload_url) {
    var copy = Object.assign({}, fileObject);
    delete copy.file;

    // apply response key/values to existing `fileAttributes`
    for (var key in response) {
      copy.fileAttributes[key] = response[key];
    }

    // apply the 'original_url' to existing `fileAttributes`
    copy.fileAttributes['original_url'] = _this2.buildPath(upload_url, response.path);
    if ((0, _utils.hasImageFormatType)(copy.fileAttributes['file_name'])) {
      copy.fileAttributes['thumbnail_url'] = fileObject.file.preview;
    }

    var files = _this2.state.files.slice(0);
    var indexOfFile = files.findIndex(function (file) {
      return file.uid === fileObject.uid;
    });
    files.splice(indexOfFile, 1, copy);

    _this2.setState({
      files: files
    });

    _this2.onUpdate(files);
  };

  this.onUpdate = function (files) {
    var uploadedFiles = files.map(_this2.normaliseFileExport);

    var value = _this2.props.attributes.multiple || _this2.props.multiple ? uploadedFiles : uploadedFiles[0];

    _this2.props.actions.edit(function (val) {
      return _immutable2.default.fromJS(value);
    });
  };

  this.normaliseFileExport = function (obj) {
    var keysToRemove = ['file_name', 'original_url', 'thumbnail_url'];
    var copy = Object.assign({}, obj.fileAttributes);
    keysToRemove.forEach(function (key) {
      delete copy[key];
    });
    return copy;
  };

  this.removeFailedUpload = function (fileObject) {
    var files = _this2.state.files.filter(function (file) {
      return file.uid !== fileObject.uid;
    });

    _this2.setState({
      files: files
    });
  };

  this.storeXHRErrorMessage = function (message) {
    var XHRErrorMessages = _this2.state.XHRErrorMessages ? _this2.state.XHRErrorMessages.slice(0) : [];

    XHRErrorMessages.push({
      uid: (0, _uid2.default)(10),
      message: message
    });

    _this2.setState({
      XHRErrorMessages: XHRErrorMessages
    });
  };

  this.uploadFile = function (fileObject) {
    var onProgress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noOp;

    if (!fileObject) return;
    var presign_url = _this2.props.attributes.presign_url;
    var csrfToken = _this2.context.globalConfig.csrfToken;

    var upload_url = void 0;

    // Push into uploadQueue
    _this2.addToUploadQueue(fileObject.uid);

    (0, _attacheUpload.presign)(presign_url, csrfToken).then(function (presignResponse) {
      // assign the return 'url' to upload_url so
      // we can create paths to the file
      upload_url = presignResponse.url;
      return (0, _attacheUpload.upload)(presignResponse, fileObject, onProgress);
    }).then(function (uploadResponse) {
      _this2.removeFromUploadQueue(fileObject.uid);
      return _this2.updateUploadedFiles(fileObject, uploadResponse, upload_url);
    }).catch(function (err) {
      var name = err.name;

      if (name === 'presignRequest' || name === 'uploadRequest' || name === 'responseStatus') {
        _this2.removeFailedUpload(fileObject);
        _this2.storeXHRErrorMessage(err.message);
        _this2.removeFromUploadQueue(fileObject.uid);
      } else {
        console.error(err);
        throw err;
      }
    });
  };

  this.addToUploadQueue = function (id) {
    var bus = _this2.props.bus;
    var uploadQueue = _this2.state.uploadQueue;

    uploadQueue = uploadQueue.concat([id]);
    _this2.setState({
      uploadQueue: uploadQueue
    });
    // If the queue is 1, then we have changed from idle to busy
    if (uploadQueue.length === 1) {
      bus.emit(_formalistCompose.events.internal.FIELD_BUSY, _this2.instanceId);
    }
  };

  this.removeFromUploadQueue = function (id) {
    var bus = _this2.props.bus;

    var uploadQueue = _this2.state.uploadQueue.slice();
    var index = uploadQueue.indexOf(id);
    if (index > -1) {
      uploadQueue.splice(index, 1);
      _this2.setState({
        uploadQueue: uploadQueue
      });
    }
    // If the queue is 0, then we have changed from busy to idle
    if (uploadQueue.length === 0) {
      bus.emit(_formalistCompose.events.internal.FIELD_IDLE, _this2.instanceId);
    }
  };

  this.onChange = function (files) {
    if (!files.length) return;

    var attributes = _this2.props.attributes;

    var isMultiple = _this2.props.attributes.multiple || _this2.props.multiple;

    if (!isMultiple && _this2.state.files.length) {
      _this2.removeFile(0);
    }

    var permitted_file_type_regex = attributes.permitted_file_type_regex,
        permitted_file_type_message = attributes.permitted_file_type_message,
        max_file_size = attributes.max_file_size,
        max_file_size_message = attributes.max_file_size_message;


    var status = void 0;
    var validFiles = [];
    var invalidFiles = _this2.state.invalidFiles ? _this2.state.invalidFiles.slice(0) : [];

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
      _this2.setState({
        invalidFiles: invalidFiles
      });
    }

    if (!validFiles.length) return;

    // Create 'file objects' of valid files and assign to `uploadingFiles`
    var uploadingFiles = validFiles.map(function (file) {
      return _this2.createFileObjects(file);
    });

    // if `multiple` concat dropped file with existing,
    // otherwise just the dropped file
    var allFiles = isMultiple ? _this2.state.files.concat(uploadingFiles) : uploadingFiles;

    _this2.setState({
      files: allFiles
    });

    // upload each valid file and passing in a progress event handler
    uploadingFiles.map(function (fileObject) {
      _this2.uploadFile(fileObject, _this2.onProgress);
    });
  };

  this.onDrop = function (newOrder) {
    var existingFiles = _this2.state.files.slice(0);
    var files = (0, _utils.sortArrayByOrder)(existingFiles, newOrder);

    _this2.setState({
      files: files
    });

    _this2.onUpdate(files);
  };

  this.removeKeyFromState = function (array, key) {
    var arr = _this2.state[array].slice(0);
    if (typeof key === 'string') {
      key = parseInt(key);
    }
    arr.splice(key, 1);
    return arr;
  };

  this.removeFile = function (index, e) {
    if (e) e.preventDefault();
    var files = _this2.state.files.slice(0);

    var file = files[index];
    if (file.file) _this2.abortUploadRequest(file);

    files.splice(index, 1);
    _this2.setState({
      files: files
    });

    _this2.onUpdate(files);
  };

  this.removeInvalidFile = function (e) {
    e.preventDefault();
    var key = e.target.getAttribute('data-key');
    var invalidFiles = _this2.removeKeyFromState('invalidFiles', key);

    _this2.setState({
      invalidFiles: invalidFiles
    });
  };

  this.removeXHRErrorMessage = function (e) {
    e.preventDefault();
    var key = e.target.getAttribute('data-key');
    var XHRErrorMessages = _this2.removeKeyFromState('XHRErrorMessages', key);

    _this2.setState({
      XHRErrorMessages: XHRErrorMessages
    });
  };

  this.renderXHRErrorMessage = function (errorObject, index) {
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
            onClick: _this2.removeXHRErrorMessage,
            'data-key': index
          },
          '\xD7'
        )
      )
    );
  };

  this.renderXHRErrorMessages = function (XHRErrorMessages) {
    return _react2.default.createElement(
      'div',
      { className: _index2.default.validationMessages },
      XHRErrorMessages.map(_this2.renderXHRErrorMessage)
    );
  };

  this.renderInvalidFile = function (errorObject, index) {
    var message = errorObject.message,
        file = errorObject.file;
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
            onClick: _this2.removeInvalidFile,
            'data-key': index },
          '\xD7'
        )
      )
    );
  };

  this.renderInvalidFiles = function (invalidFiles) {
    return _react2.default.createElement(
      'div',
      { className: _index2.default.validationMessages },
      invalidFiles.map(_this2.renderInvalidFile)
    );
  };

  this.renderThumbnail = function (thumbnail_url, file_name) {
    if (!thumbnail_url) return;

    return _react2.default.createElement('img', { src: thumbnail_url, alt: file_name });
  };

  this.renderPreviewDetails = function (file_name, thumbnailImage) {
    var _classNames2;

    var isProgressTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var titleClassNames = (0, _classnames2.default)((_classNames2 = {}, _defineProperty(_classNames2, '' + _index2.default.listItem__title, !isProgressTitle), _defineProperty(_classNames2, '' + _index2.default.progress__title, isProgressTitle), _classNames2));

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
  };

  this.renderPreviewItem = function (fileObject, index) {
    var progress = fileObject.progress,
        file = fileObject.file,
        fileAttributes = fileObject.fileAttributes;
    var file_name = fileAttributes.file_name;
    var preview = file.preview;

    var hasThumbnail = (0, _utils.hasImageFormatType)(file_name);
    var thumbnailImage = hasThumbnail ? _this2.renderThumbnail(preview, file_name) : null;

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
        _this2.renderPreviewDetails(file_name, thumbnailImage, true)
      ),
      _this2.renderPreviewDetails(file_name, thumbnailImage)
    );
  };

  this.buildPath = function (url, path) {
    var dimension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'original';

    var pattern = /([^/]*)$/;
    var splitPath = path.split(pattern);
    return url.replace('/upload', '/view') + '/' + splitPath[0] + dimension + '/' + splitPath[1];
  };

  this.buildThumbnailPath = function (original_url) {
    var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '50x';

    return original_url.replace('original', dimension);
  };

  this.renderDefaultTemplate = function (fileObject, index) {
    var fileAttributes = fileObject.fileAttributes;
    var file_name = fileAttributes.file_name,
        thumbnail_url = fileAttributes.thumbnail_url,
        original_url = fileAttributes.original_url;

    var hasThumbnail = thumbnail_url != null || (0, _utils.hasImageFormatType)(file_name);
    var thumbnailImage = hasThumbnail ? _this2.renderThumbnail(thumbnail_url, file_name) : null;

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
  };

  this.renderCustomTemplate = function (fileObject, index, config, attribute) {
    try {
      return (0, _extractComponent2.default)(config.components, attribute)(fileObject);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  this.customComponentExists = function (config, attribute) {
    if (!config || !attribute) return false;

    var result = false;
    config.components.map(function (component) {
      if (component.name === attribute) result = true;
    });
    return result;
  };

  this.renderFiles = function (files) {
    var isSortable = _this2.state.uploadQueue.length === 0;
    var _props2 = _this2.props,
        config = _props2.config,
        attributes = _props2.attributes;
    var render_uploaded_as = attributes.render_uploaded_as;


    var allFiles = files.map(function (fileObject, index) {
      if (fileObject.file) {
        isSortable = false;
        return _this2.renderPreviewItem(fileObject, index);
      } else {
        var template = _this2.customComponentExists(config, render_uploaded_as) ? _this2.renderCustomTemplate(fileObject, index, config, render_uploaded_as) : _this2.renderDefaultTemplate(fileObject, index);
        return template;
      }
    });

    return _react2.default.createElement(
      _sortable2.default,
      { canRemove: true, canSort: isSortable, onRemove: _this2.removeFile, onDrop: _this2.onDrop },
      allFiles
    );
  };
};

exports.default = MultiUploadField;