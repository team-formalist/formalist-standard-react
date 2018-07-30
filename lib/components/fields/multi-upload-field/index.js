var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jsxFileName = "src/components/fields/multi-upload-field/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import uid from "uid";
import classNames from "classnames";
import s3Upload from "../../../utils/s3-upload";
import attacheUpload from "attache-upload";
import Immutable from "immutable";
import Clipboard from "clipboard";
import { events } from "formalist-compose";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import Dropzone from "../../ui/dropzone";
import validate from "./validation.js";
import * as styles from "./styles";
import Sortable from "../../ui/sortable";
import { hasImageFormatType, sortArrayByOrder, generateUniqueID, noOp, filterUniqueObjects } from "./utils";
import extractComponent from "../../../utils/extract-component";
import parseRegexFromString from "../../../utils/parse-regex-from-string";

/**
 * sanitiseFileName
 * @param {String} fileName Name of file
 */
function sanitiseFileName(fileName) {
  return fileName.trim().replace(/[^\w\s-\.\+]/g, "") // Remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
  .replace(/[\s_-]+|\++/g, "-") // Swap any length of whitespace, underscore, hyphen characters with a single -
  .replace(/^-+|-+$/g, "");
}

/**
 * The default template for uploaded items
 */

var DefaultRenderTemplate = function (_React$Component) {
  _inherits(DefaultRenderTemplate, _React$Component);

  function DefaultRenderTemplate(props) {
    _classCallCheck(this, DefaultRenderTemplate);

    var _this = _possibleConstructorReturn(this, (DefaultRenderTemplate.__proto__ || Object.getPrototypeOf(DefaultRenderTemplate)).call(this, props));

    _this.state = {
      copied: false,
      copyText: "Copy URL"
    };
    return _this;
  }

  _createClass(DefaultRenderTemplate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.clipboard = new Clipboard(this._button, {
        target: function target() {
          return _this2._input;
        }
      });
      this.clipboard.on("success", function () {
        _this2.setState({ copied: true, copyText: "Copied!" });
        _this2.resetCopyText();
      });
      this.clipboard.on("error", function () {
        _this2.setState({ copyText: "Press Ctrl + C to copy" });
        _this2.resetCopyText();
      });
    }
  }, {
    key: "resetCopyText",
    value: function resetCopyText() {
      var _this3 = this;

      window.clearTimeout(this._copyTimeout);
      this._copyTimeout = window.setTimeout(function () {
        _this3.setState({ copied: false, copyText: "Copy URL" });
      }, 2000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clipboard.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          fileName = _props.fileName,
          thumbnailUrl = _props.thumbnailUrl,
          originalUrl = _props.originalUrl;
      var _state = this.state,
          copied = _state.copied,
          copyText = _state.copyText;


      var copyUrlButtonClasses = classNames(styles.copyUrlButton, _defineProperty({}, "" + styles.copyUrlButtonCopied, copied));

      return React.createElement(
        "div",
        { className: styles.listItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 94
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.listItem__body, __source: {
              fileName: _jsxFileName,
              lineNumber: 95
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: styles.align_middle, __source: {
                fileName: _jsxFileName,
                lineNumber: 96
              },
              __self: this
            },
            thumbnailUrl ? React.createElement(
              "div",
              { className: styles.listItem__img, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 98
                },
                __self: this
              },
              React.createElement("img", { src: thumbnailUrl, alt: fileName, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 99
                },
                __self: this
              })
            ) : null,
            React.createElement(
              "div",
              { className: styles.listItem__title, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 102
                },
                __self: this
              },
              React.createElement(
                "a",
                { target: "_blank", href: originalUrl, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 103
                  },
                  __self: this
                },
                fileName
              )
            ),
            React.createElement(
              "div",
              { className: styles.copyUrl, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 108
                },
                __self: this
              },
              React.createElement("input", {
                className: styles.copyUrlField,
                type: "text",
                ref: function ref(r) {
                  return _this4._input = r;
                },
                value: originalUrl,
                readOnly: true,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 109
                },
                __self: this
              }),
              React.createElement(
                "button",
                {
                  className: copyUrlButtonClasses,
                  ref: function ref(r) {
                    return _this4._button = r;
                  },
                  onClick: function onClick(e) {
                    e.preventDefault();
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 116
                  },
                  __self: this
                },
                React.createElement(
                  "span",
                  { className: styles.copyUrlButtonText, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 123
                    },
                    __self: this
                  },
                  copyText
                ),
                React.createElement(
                  "svg",
                  { width: "15", height: "16", xmlns: "http://www.w3.org/2000/svg", __source: {
                      fileName: _jsxFileName,
                      lineNumber: 124
                    },
                    __self: this
                  },
                  React.createElement(
                    "title",
                    {
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 125
                      },
                      __self: this
                    },
                    "Copy"
                  ),
                  React.createElement(
                    "g",
                    { fill: "none", __source: {
                        fileName: _jsxFileName,
                        lineNumber: 126
                      },
                      __self: this
                    },
                    React.createElement("rect", {
                      stroke: "#000",
                      x: "3.5",
                      y: "3.5",
                      width: "11",
                      height: "12",
                      className: styles.copyIconPrimary,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 127
                      },
                      __self: this
                    }),
                    React.createElement("polygon", {
                      fill: "#000",
                      opacity: ".3",
                      points: "0 13 3 13 3 12 1 12 1 1 11 1 11 3 12 3 12 0 0 0",
                      className: styles.copyIconSecondary,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 135
                      },
                      __self: this
                    })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return DefaultRenderTemplate;
}(React.Component);

/**
 * MultiUploadField
 */

DefaultRenderTemplate.propTypes = {
  fileName: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  originalUrl: PropTypes.string
};

var MultiUploadField = function (_React$Component2) {
  _inherits(MultiUploadField, _React$Component2);

  /**
   * Enable parent to pass context
   */

  /**
   * displayName
   */

  function MultiUploadField(props, context) {
    _classCallCheck(this, MultiUploadField);

    var _this5 = _possibleConstructorReturn(this, (MultiUploadField.__proto__ || Object.getPrototypeOf(MultiUploadField)).call(this, props, context));

    _initialiseProps.call(_this5);

    var value = props.value;
    var _props$attributes = props.attributes,
        presign_url = _props$attributes.presign_url,
        presign_options = _props$attributes.presign_options;

    var _ref = context.globalConfig || {},
        csrfToken = _ref.csrfToken,
        uploader = _ref.uploader;

    var allowMultipleFiles = props.multiple || props.attributes.multiple;
    value = value ? value.toJS() : value;
    var files = [];

    // Set a per instance ID for talking to the bus
    _this5.instanceId = uid();

    // check if 'value' exists.
    // if it's an 'object' and put it in array
    if (value != null) {
      if (!allowMultipleFiles && value.length > 1) {
        value = value.splice(0, 1);
      }
      if (!Array.isArray(value) && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
        files = [_this5.populateExistingAttributes(value)];
      } else {
        files = value.map(function (file) {
          return _this5.populateExistingAttributes(file);
        });
      }
    }

    _this5.state = {
      files: files,
      uploadQueue: []
    };

    // Switch uploaders if specified
    _this5.uploader = s3Upload;
    _this5.uploaderPresignArgs = [presign_url, csrfToken, presign_options];
    if (uploader === "attache") {
      _this5.uploader = attacheUpload;
      _this5.uploaderPresignArgs = [presign_url, csrfToken];
    }
    return _this5;
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
    key: "componentWillReceiveProps",


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

      var newValueProps = filterUniqueObjects(files, nextProps.value);
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

  }, {
    key: "renderDefaultTemplate",


    /**
     * renderDefaultTemplate
     */
    value: function renderDefaultTemplate(fileObject, index) {
      var fileAttributes = fileObject.fileAttributes;
      var file_name = fileAttributes.file_name,
          thumbnail_url = fileAttributes.thumbnail_url,
          original_url = fileAttributes.original_url;

      var hasThumbnail = thumbnail_url != null || hasImageFormatType(file_name);
      thumbnail_url = hasThumbnail ? thumbnail_url : null;
      return React.createElement(DefaultRenderTemplate, {
        key: index,
        fileName: file_name,
        originalUrl: original_url,
        thumbnailUrl: thumbnail_url,
        index: index,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 973
        },
        __self: this
      });
    }

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
    key: "render",


    /**
     * render
     * @return {vnode}
     */

    value: function render() {
      var _props2 = this.props,
          attributes = _props2.attributes,
          hint = _props2.hint,
          label = _props2.label,
          name = _props2.name,
          errors = _props2.errors;
      var upload_prompt = attributes.upload_prompt,
          upload_action_label = attributes.upload_action_label;


      var hasErrors = errors.count() > 0;

      var _state2 = this.state,
          XHRErrorMessages = _state2.XHRErrorMessages,
          files = _state2.files,
          invalidFiles = _state2.invalidFiles;

      // Set up field classes

      var fieldClassNames = classNames(styles.base, _defineProperty({}, "" + styles.baseInline, attributes.inline));
      var multiple = this.props.attributes.multiple || this.props.multiple;

      return React.createElement(
        "div",
        {
          className: fieldClassNames,
          "data-field-name": name,
          "data-field-type": multiple ? "multi-upload-field" : "upload-field",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1110
          },
          __self: this
        },
        React.createElement(
          "div",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 1115
            },
            __self: this
          },
          React.createElement(
            "div",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 1116
              },
              __self: this
            },
            React.createElement(FieldHeader, { hint: hint, id: name, label: label, __source: {
                fileName: _jsxFileName,
                lineNumber: 1117
              },
              __self: this
            })
          ),
          XHRErrorMessages && XHRErrorMessages.length > 0 ? this.renderXHRErrorMessages(XHRErrorMessages) : null,
          invalidFiles && invalidFiles.length > 0 ? this.renderInvalidFiles(invalidFiles) : null,
          React.createElement(
            Dropzone,
            {
              multiple: multiple,
              onChange: this.onChange,
              label: upload_prompt,
              buttonText: upload_action_label,
              disableClick: files.length > 0,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 1125
              },
              __self: this
            },
            files.length > 0 ? this.renderFiles(files) : null
          ),
          hasErrors ? React.createElement(FieldErrors, { errors: errors, __source: {
              fileName: _jsxFileName,
              lineNumber: 1134
            },
            __self: this
          }) : null
        )
      );
    }
  }]);

  return MultiUploadField;
}(React.Component);

MultiUploadField.displayName = "UploadField";
MultiUploadField.propTypes = {
  actions: PropTypes.object,
  attributes: PropTypes.shape({
    sortable: PropTypes.bool,
    max_file_size: PropTypes.number,
    max_file_size_message: PropTypes.string,
    max_height: PropTypes.string,
    multiple: PropTypes.bool,
    permitted_file_type_message: PropTypes.string,
    permitted_file_type_regex: PropTypes.string,
    presign_url: PropTypes.string,
    presign_options: PropTypes.object,
    render_uploaded_as: PropTypes.string,
    upload_action_label: PropTypes.string,
    upload_prompt: PropTypes.string
  }),
  bus: PropTypes.object,
  config: PropTypes.object,
  errors: ImmutablePropTypes.list,
  hint: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([ImmutablePropTypes.list, PropTypes.object])
};
MultiUploadField.contextTypes = {
  globalConfig: PropTypes.object
};
MultiUploadField.defaultProps = {
  multiple: true
};

var _initialiseProps = function _initialiseProps() {
  var _this6 = this;

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
          file_name: sanitiseFileName(name)
        },
        size: size,
        type: type,
        lastModifiedDate: lastModifiedAsString,
        uid: generateUniqueID(name)
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
    } else if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
      return formatObject(val);
    } else {
      return;
    }
  };

  this.abortUploadRequest = function (file) {
    _this6.removeFromUploadQueue(file.uid);
    _this6.uploader.abortXHRRequest(file.uid);
  };

  this.onProgress = function (e, fileObject) {
    var files = _this6.state.files.slice(0);

    files.forEach(function (existingFile) {
      if (existingFile.uid === fileObject.uid) {
        existingFile.progress = e.percent;
      }
    });

    _this6.setState({
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
    copy.fileAttributes["original_url"] = _this6.buildPath(upload_url, response.path);
    if (hasImageFormatType(copy.fileAttributes["file_name"])) {
      copy.fileAttributes["thumbnail_url"] = fileObject.file.preview;
    }

    var files = _this6.state.files.slice(0);
    var indexOfFile = files.findIndex(function (file) {
      return file.uid === fileObject.uid;
    });
    files.splice(indexOfFile, 1, copy);

    _this6.setState({
      files: files
    });

    _this6.onUpdate(files);
  };

  this.onUpdate = function (files) {
    var uploadedFiles = files.map(_this6.normaliseFileExport);

    var value = _this6.props.attributes.multiple || _this6.props.multiple ? uploadedFiles : uploadedFiles[0];

    _this6.props.actions.edit(function (val) {
      return Immutable.fromJS(value);
    });
  };

  this.normaliseFileExport = function (obj) {
    var keysToRemove = ["file_name", "original_url", "thumbnail_url"];
    var copy = Object.assign({}, obj.fileAttributes);
    keysToRemove.forEach(function (key) {
      delete copy[key];
    });
    return copy;
  };

  this.removeFailedUpload = function (fileObject) {
    var files = _this6.state.files.filter(function (file) {
      return file.uid !== fileObject.uid;
    });

    _this6.setState({
      files: files
    });
  };

  this.storeXHRErrorMessage = function (message) {
    var XHRErrorMessages = _this6.state.XHRErrorMessages ? _this6.state.XHRErrorMessages.slice(0) : [];

    XHRErrorMessages.push({
      uid: uid(10),
      message: message
    });

    _this6.setState({
      XHRErrorMessages: XHRErrorMessages
    });
  };

  this.uploadFile = function (fileObject) {
    var onProgress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noOp;

    if (!fileObject) return;
    var upload_url = void 0;

    // Push into uploadQueue
    _this6.addToUploadQueue(fileObject.uid);

    _this6.uploader.presign.apply(_this6, _this6.uploaderPresignArgs).then(function (presignResponse) {
      // assign the return 'url' to upload_url so
      // we can create paths to the file
      upload_url = presignResponse.url;
      return _this6.uploader.upload(presignResponse, fileObject, onProgress);
    }).then(function (uploadResponse) {
      _this6.removeFromUploadQueue(fileObject.uid);
      return _this6.updateUploadedFiles(fileObject, uploadResponse, upload_url);
    }).catch(function (err) {
      var name = err.name;

      if (name === "presignRequest" || name === "uploadRequest" || name === "responseStatus") {
        _this6.removeFailedUpload(fileObject);
        _this6.storeXHRErrorMessage(err.message);
        _this6.removeFromUploadQueue(fileObject.uid);
      } else {
        console.error(err);
        throw err;
      }
    });
  };

  this.addToUploadQueue = function (id) {
    var bus = _this6.props.bus;
    var uploadQueue = _this6.state.uploadQueue;

    uploadQueue = uploadQueue.concat([id]);
    _this6.setState({
      uploadQueue: uploadQueue
    });
    // If the queue is 1, then we have changed from idle to busy
    if (uploadQueue.length === 1) {
      bus.emit(events.internal.FIELD_BUSY, _this6.instanceId);
    }
  };

  this.removeFromUploadQueue = function (id) {
    var bus = _this6.props.bus;

    var uploadQueue = _this6.state.uploadQueue.slice();
    var index = uploadQueue.indexOf(id);
    if (index > -1) {
      uploadQueue.splice(index, 1);
      _this6.setState({
        uploadQueue: uploadQueue
      });
    }
    // If the queue is 0, then we have changed from busy to idle
    if (uploadQueue.length === 0) {
      bus.emit(events.internal.FIELD_IDLE, _this6.instanceId);
    }
  };

  this.onChange = function (files) {
    if (!files.length) return;

    var attributes = _this6.props.attributes;

    var isMultiple = _this6.props.attributes.multiple || _this6.props.multiple;

    if (!isMultiple && _this6.state.files.length) {
      _this6.removeFile(0);
    }

    var permitted_file_type_regex = attributes.permitted_file_type_regex,
        permitted_file_type_message = attributes.permitted_file_type_message,
        max_file_size = attributes.max_file_size,
        max_file_size_message = attributes.max_file_size_message;


    var status = void 0;
    var validFiles = [];
    var invalidFiles = _this6.state.invalidFiles ? _this6.state.invalidFiles.slice(0) : [];

    var permittedFileTypeRegex = parseRegexFromString(permitted_file_type_regex);

    // Iterate and validate each file
    files.forEach(function (file) {
      status = validate(file, permittedFileTypeRegex, permitted_file_type_message, max_file_size, max_file_size_message);

      if (!status.success) {
        invalidFiles.push({
          file: file,
          uid: uid(10),
          message: status.message
        });
      } else {
        validFiles.push(file);
      }
    });

    // store invalid files to `invalidFiles`
    if (invalidFiles.length) {
      _this6.setState({
        invalidFiles: invalidFiles
      });
    }

    if (!validFiles.length) return;

    // Create 'file objects' of valid files and assign to `uploadingFiles`
    var uploadingFiles = validFiles.map(function (file) {
      return _this6.createFileObjects(file);
    });

    // if `multiple` concat dropped file with existing,
    // otherwise just the dropped file
    var allFiles = isMultiple ? _this6.state.files.concat(uploadingFiles) : uploadingFiles;

    _this6.setState({
      files: allFiles
    });

    // upload each valid file and passing in a progress event handler
    uploadingFiles.forEach(function (fileObject) {
      _this6.uploadFile(fileObject, _this6.onProgress);
    });
  };

  this.onDrop = function (newOrder) {
    var existingFiles = _this6.state.files.slice(0);
    var files = sortArrayByOrder(existingFiles, newOrder);

    _this6.setState({
      files: files
    });

    _this6.onUpdate(files);
  };

  this.removeKeyFromState = function (array, key) {
    var arr = _this6.state[array].slice(0);
    if (typeof key === "string") {
      key = parseInt(key, 10);
    }
    arr.splice(key, 1);
    return arr;
  };

  this.removeFile = function (index, e) {
    if (e) e.preventDefault();
    var files = _this6.state.files.slice(0);

    var file = files[index];
    if (file.file) _this6.abortUploadRequest(file);

    files.splice(index, 1);
    _this6.setState({
      files: files
    });

    _this6.onUpdate(files);
  };

  this.removeInvalidFile = function (e) {
    e.preventDefault();
    var key = e.target.getAttribute("data-key");
    var invalidFiles = _this6.removeKeyFromState("invalidFiles", key);

    _this6.setState({
      invalidFiles: invalidFiles
    });
  };

  this.removeXHRErrorMessage = function (e) {
    e.preventDefault();
    var key = e.target.getAttribute("data-key");
    var XHRErrorMessages = _this6.removeKeyFromState("XHRErrorMessages", key);

    _this6.setState({
      XHRErrorMessages: XHRErrorMessages
    });
  };

  this.renderXHRErrorMessage = function (errorObject, index) {
    var message = errorObject.message;


    return React.createElement(
      "div",
      { key: index, className: styles.validationMessage, __source: {
          fileName: _jsxFileName,
          lineNumber: 766
        },
        __self: _this6
      },
      message,
      React.createElement(
        "button",
        { className: styles.remove, __source: {
            fileName: _jsxFileName,
            lineNumber: 768
          },
          __self: _this6
        },
        React.createElement(
          "span",
          { className: styles.removeText, __source: {
              fileName: _jsxFileName,
              lineNumber: 769
            },
            __self: _this6
          },
          "Remove"
        ),
        React.createElement(
          "div",
          {
            className: styles.removeX,
            onClick: _this6.removeXHRErrorMessage,
            "data-key": index,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 770
            },
            __self: _this6
          },
          "\xD7"
        )
      )
    );
  };

  this.renderXHRErrorMessages = function (XHRErrorMessages) {
    return React.createElement(
      "div",
      { className: styles.validationMessages, __source: {
          fileName: _jsxFileName,
          lineNumber: 791
        },
        __self: _this6
      },
      XHRErrorMessages.map(_this6.renderXHRErrorMessage)
    );
  };

  this.renderInvalidFile = function (errorObject, index) {
    var message = errorObject.message,
        file = errorObject.file;
    var name = file.name;


    return React.createElement(
      "div",
      { key: index, className: styles.validationMessage, __source: {
          fileName: _jsxFileName,
          lineNumber: 810
        },
        __self: _this6
      },
      React.createElement(
        "strong",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 811
          },
          __self: _this6
        },
        name
      ),
      ": ",
      message,
      React.createElement(
        "button",
        { className: styles.remove, __source: {
            fileName: _jsxFileName,
            lineNumber: 812
          },
          __self: _this6
        },
        React.createElement(
          "span",
          { className: styles.removeText, __source: {
              fileName: _jsxFileName,
              lineNumber: 813
            },
            __self: _this6
          },
          "Remove"
        ),
        React.createElement(
          "div",
          {
            className: styles.removeX,
            onClick: _this6.removeInvalidFile,
            "data-key": index,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 814
            },
            __self: _this6
          },
          "\xD7"
        )
      )
    );
  };

  this.renderInvalidFiles = function (invalidFiles) {
    return React.createElement(
      "div",
      { className: styles.validationMessages, __source: {
          fileName: _jsxFileName,
          lineNumber: 835
        },
        __self: _this6
      },
      invalidFiles.map(_this6.renderInvalidFile)
    );
  };

  this.renderThumbnail = function (thumbnail_url, file_name) {
    if (!thumbnail_url) return;

    return React.createElement("img", { src: thumbnail_url, alt: file_name, __source: {
        fileName: _jsxFileName,
        lineNumber: 852
      },
      __self: _this6
    });
  };

  this.renderPreviewDetails = function (file_name, thumbnailImage) {
    var _classNames3;

    var isProgressTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var titleClassNames = classNames((_classNames3 = {}, _defineProperty(_classNames3, "" + styles.listItem__title, !isProgressTitle), _defineProperty(_classNames3, "" + styles.progress__title, isProgressTitle), _classNames3));

    var wrapperClassNames = classNames(styles.align_middle, styles.previewItem__details);

    return React.createElement(
      "div",
      { className: wrapperClassNames, __source: {
          fileName: _jsxFileName,
          lineNumber: 879
        },
        __self: _this6
      },
      React.createElement(
        "div",
        { className: styles.listItem__img, __source: {
            fileName: _jsxFileName,
            lineNumber: 880
          },
          __self: _this6
        },
        thumbnailImage
      ),
      React.createElement(
        "div",
        { className: titleClassNames, __source: {
            fileName: _jsxFileName,
            lineNumber: 881
          },
          __self: _this6
        },
        "Uploading: ",
        file_name
      )
    );
  };

  this.renderPreviewItem = function (fileObject, index) {
    var progress = fileObject.progress,
        file = fileObject.file,
        fileAttributes = fileObject.fileAttributes;
    var file_name = fileAttributes.file_name;
    var preview = file.preview;

    var hasThumbnail = hasImageFormatType(file_name);
    var thumbnailImage = hasThumbnail ? _this6.renderThumbnail(preview, file_name) : null;

    var currentProgress = {
      width: progress > 0 ? progress + "%" : "0%"
    };

    return React.createElement(
      "div",
      { className: styles.previewItem, key: index, __source: {
          fileName: _jsxFileName,
          lineNumber: 908
        },
        __self: _this6
      },
      React.createElement(
        "span",
        { className: styles.progress__bar, style: currentProgress, __source: {
            fileName: _jsxFileName,
            lineNumber: 909
          },
          __self: _this6
        },
        _this6.renderPreviewDetails(file_name, thumbnailImage, true)
      ),
      _this6.renderPreviewDetails(file_name, thumbnailImage)
    );
  };

  this.buildPath = function (url, path) {
    var dimension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "original";

    var _ref2 = _this6.context.globalConfig || {},
        uploader = _ref2.uploader;

    if (uploader === "attache") {
      var pattern = /([^/]*)$/;
      var splitPath = path.split(pattern);
      return url.replace("/upload", "/view") + "/" + splitPath[0] + dimension + "/" + splitPath[1];
    } else {
      return url + "/" + path;
    }
  };

  this.buildThumbnailPath = function (original_url) {
    var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "50x";

    var _ref3 = _this6.context.globalConfig || {},
        uploader = _ref3.uploader;

    if (uploader === "attache") {
      return original_url.replace("original", dimension);
    } else {
      return original_url;
    }
  };

  this.renderCustomTemplate = function (fileObject, index, config, attribute) {
    try {
      return extractComponent(config.components, attribute)(fileObject);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  this.customComponentExists = function (config, attribute) {
    if (!config || !attribute) return false;

    var result = false;
    config.components.forEach(function (component) {
      if (component.name === attribute) result = true;
    });
    return result;
  };

  this.renderFiles = function (files) {
    var _React$createElement;

    var isSortable = _this6.state.uploadQueue.length === 0;
    var _props3 = _this6.props,
        config = _props3.config,
        attributes = _props3.attributes;
    var render_uploaded_as = attributes.render_uploaded_as;


    var allFiles = files.map(function (fileObject, index) {
      if (fileObject.file) {
        isSortable = false;
        return _this6.renderPreviewItem(fileObject, index);
      } else {
        var template = _this6.customComponentExists(config, render_uploaded_as) ? _this6.renderCustomTemplate(fileObject, index, config, render_uploaded_as) : _this6.renderDefaultTemplate(fileObject, index);
        return template;
      }
    });

    return React.createElement(
      Sortable,
      (_React$createElement = {
        canRemove: true,
        canSort: isSortable,
        onRemove: _this6.removeFile,
        onDrop: _this6.onDrop
      }, _defineProperty(_React$createElement, "canSort", attributes.sortable), _defineProperty(_React$createElement, "maxHeight", attributes.max_height), _defineProperty(_React$createElement, "__source", {
        fileName: _jsxFileName,
        lineNumber: 1077
      }), _defineProperty(_React$createElement, "__self", _this6), _React$createElement),
      allFiles
    );
  };
};

export default MultiUploadField;