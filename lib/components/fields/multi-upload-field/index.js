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

var _attacheUpload = require('attache-upload');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _dropzone = require('../../ui/dropzone');

var _dropzone2 = _interopRequireDefault(_dropzone);

var _validation = require('./validation.js');

var _validation2 = _interopRequireDefault(_validation);

var _bus = require('bus');

var _bus2 = _interopRequireDefault(_bus);

var _index = require('./index.mcss');

var _index2 = _interopRequireDefault(_index);

var _sortable = require('../../ui/sortable');

var _sortable2 = _interopRequireDefault(_sortable);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    actions: _react2.default.PropTypes.object,
    attributes: _react2.default.PropTypes.shape({
      label: _react2.default.PropTypes.string,
      presign_url: _react2.default.PropTypes.string
    }),
    name: _react2.default.PropTypes.string,
    presign_url: _react2.default.PropTypes.string,
    multiple: _react2.default.PropTypes.bool,
    fileTypeRegex: _react2.default.PropTypes.object,
    fileTypeRegexMessage: _react2.default.PropTypes.string,
    maxFileSize: _react2.default.PropTypes.number,
    maxFileSizeMessage: _react2.default.PropTypes.string,
    buttonText: _react2.default.PropTypes.string,
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    errors: _reactImmutableProptypes2.default.list,
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
   * Assign existing uploaded files (passed in by `value`) to `uploadedFiles`
   * See the example `propFiles` format above
   * @return {object}
   */

  getInitialState: function getInitialState() {
    var value = this.props.value;

    value = value ? value.toJS() : value;
    var uploadedFiles = [];
    var previewFiles = [];

    // is not null/array but is an object
    // or is a List with a size greater than 0
    if (value != null && !Array.isArray(value) && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      uploadedFiles = [value];
    } else if (value != null) {
      uploadedFiles = value;
    }

    return {
      uploadedFiles: uploadedFiles,
      previewFiles: previewFiles
    };
  },


  /**
   * componentWillReceiveProps
   * Check for new uploadedFiles passed in.
   * Also ignore this lifecycle step for a single upload field.
   * First check the props exist and filter out any unique objects passed in.
   * If there are unique objects, add them to uploadedFiles and update state
   * @param {object} nextProps
   */

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!nextProps.multple || !nextProps.value.length) return;

    var uploadedFiles = this.state.uploadedFiles.slice(0);
    var newValueProps = (0, _utils.filterUniqueObjects)(uploadedFiles, nextProps.value);

    if (!newValueProps.length) return;
    uploadedFiles = uploadedFiles.concat(newValueProps);

    this.setState({
      uploadedFiles: uploadedFiles
    });
  },


  /**
   * createFileObjects
   * Create a file object for a file
   * A file object includes the name, the file and a uid
   *
   * {
   * 		file_name: small.jpg,
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
      var size = file.size;
      var type = file.type;
      var lastModifiedDate = file.lastModifiedDate;

      return {
        file: file,
        file_name: name,
        size: size,
        type: type,
        lastModifiedDate: lastModifiedDate.toString(),
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
      if (file.file_name === name) {
        file.progress = e.percent;
      }
    });

    this.setState({
      previewFiles: previewFiles
    });
  },


  /**
   * updateUploadedFiles
   * Take a `file`.
   * Iterate previewFiles and return all files that are not `file`
   * Push `file` into uploadedFiles and save the state
   * @param {object} a file object
   * @param {object} attache server response
   */

  updateUploadedFiles: function updateUploadedFiles(fileObject, response) {
    var previewFiles = this.state.previewFiles.filter(function (preview) {
      return preview.file_name !== fileObject.file_name;
    });

    var uploadedFiles = this.state.uploadedFiles ? this.state.uploadedFiles.slice(0) : [];

    // store the response from attache to the fileObject
    // so we can export easily in onUpdate()
    fileObject.attache_response = response;
    uploadedFiles.push(fileObject);

    this.setState({
      uploadedFiles: uploadedFiles,
      previewFiles: previewFiles
    });

    this.onUpdate(uploadedFiles);
  },


  /**
   * onUpdate
   * normalise each fileObject for export upstream.
   * If `multiple` return the array of file(s), otherwise just the first
   * @param  {array} uploadedFiles
   * @return {array/object}
   */

  onUpdate: function onUpdate(uploadedFiles) {
    var multiple = this.props.multiple;

    // abstract attache_response from each uploaded file

    uploadedFiles.map(function (fileObject) {
      return fileObject.attache_response;
    });

    var value = multiple ? uploadedFiles : uploadedFiles[0];

    this.props.actions.edit(function (val) {
      return _immutable2.default.fromJS(value);
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
    var csrfToken = this.context.globalConfig.csrfToken;


    (0, _attacheUpload.presign)(presign_url, csrfToken).then(function (presignResponse) {
      return (0, _attacheUpload.upload)(presignResponse, fileObject, onProgress);
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

    // if it's a single upload field, remove existing uploadedFiles
    var multiple = this.props.multiple;

    if (!multiple && this.state.uploadedFiles.length) {
      this.setState({
        uploadedFiles: []
      });
    }

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
    this.onUpdate(uploadedFiles);
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
    var uploadedFiles = this.removeKeyFromState('uploadedFiles', index);

    this.setState({
      uploadedFiles: uploadedFiles
    });

    this.onUpdate(uploadedFiles);
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
   * [renderThumbnail description]
   * @param  {[type]} thumbnail_url [description]
   * @param  {[type]} name          [description]
   * @param  {[type]} uploadURL     [description]
   * @param  {[type]} path          [description]
   * @return {[type]}               [description]
   */

  renderThumbnail: function renderThumbnail(url, name, uploadURL, path) {
    return _react2.default.createElement('img', { src: url || this.buildPath(uploadURL, path, '50x'), alt: name });
  },


  /**
   * [renderPreviewDetails description]
   * @param  {[type]} name           [description]
   * @param  {[type]} thumbnailImage [description]
   * @return {[type]}                [description]
   */

  renderPreviewDetails: function renderPreviewDetails(name, thumbnailImage) {
    var _classNames;

    var isProgressTitle = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

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
          name
        )
      )
    );
  },
  renderPreviewItem: function renderPreviewItem(fileObject, i) {
    var progress = fileObject.progress;
    var file = fileObject.file;
    var uid = fileObject.uid;
    var file_name = fileObject.file_name;
    var preview = file.preview;

    var hasThumbnail = (0, _utils.filenameIsImage)(file_name);
    var thumbnailImage = hasThumbnail ? this.renderThumbnail(preview, file_name) : null;

    var currentProgress = {
      width: progress > 0 ? progress + '%' : '0%'
    };

    return _react2.default.createElement(
      'div',
      { className: _index2.default.previewItem, key: i },
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
    var attache_response = fileObject.attache_response;
    var file_name = fileObject.file_name;
    var thumbnail_url = fileObject.thumbnail_url;
    var path = attache_response.path;
    var uploadURL = attache_response.uploadURL;

    var original_url = this.buildPath(uploadURL, path);

    var hasThumbnail = thumbnail_url != null || (0, _utils.filenameIsImage)(file_name);
    var thumbnailImage = hasThumbnail ? this.renderThumbnail(thumbnail_url, file_name, uploadURL, path) : null;

    var bodyClassNames = (0, _classnames2.default)(_index2.default.listItem__body, _index2.default.fade_in);

    return _react2.default.createElement(
      'div',
      { className: _index2.default.listItem, key: idx },
      _react2.default.createElement(
        'div',
        { className: bodyClassNames },
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