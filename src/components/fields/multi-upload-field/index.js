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
import {
  hasImageFormatType,
  sortArrayByOrder,
  generateUniqueID,
  noOp,
  filterUniqueObjects,
  sanitiseFileName
} from "./utils";
import extractComponent from "../../../utils/extract-component";
import parseRegexFromString from "../../../utils/parse-regex-from-string";

/**
 * The default template for uploaded items
 */
class DefaultRenderTemplate extends React.Component {
  static propTypes = {
    fileName: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    originalUrl: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      copied: false,
      copyText: "Copy URL"
    };
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this._button, {
      target: () => this._input
    });
    this.clipboard.on("success", () => {
      this.setState({ copied: true, copyText: "Copied!" });
      this.resetCopyText();
    });
    this.clipboard.on("error", () => {
      this.setState({ copyText: "Press Ctrl + C to copy" });
      this.resetCopyText();
    });
  }

  resetCopyText() {
    window.clearTimeout(this._copyTimeout);
    this._copyTimeout = window.setTimeout(() => {
      this.setState({ copied: false, copyText: "Copy URL" });
    }, 2000);
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    const { fileName, thumbnailUrl, originalUrl } = this.props;
    const { copied, copyText } = this.state;

    const copyUrlButtonClasses = classNames(styles.copyUrlButton, {
      [`${styles.copyUrlButtonCopied}`]: copied
    });

    return (
      <div className={styles.listItem}>
        <div className={styles.listItem__body}>
          <div className={styles.align_middle}>
            {thumbnailUrl ? (
              <div className={styles.listItem__img}>
                <img src={thumbnailUrl} alt={fileName} />
              </div>
            ) : null}
            <div className={styles.listItem__title}>
              <a target="_blank" href={originalUrl}>
                {fileName}
              </a>
            </div>

            <div className={styles.copyUrl}>
              <input
                className={styles.copyUrlField}
                type="text"
                ref={r => (this._input = r)}
                value={originalUrl}
                readOnly
              />
              <button
                className={copyUrlButtonClasses}
                ref={r => (this._button = r)}
                onClick={e => {
                  e.preventDefault();
                }}
              >
                <span className={styles.copyUrlButtonText}>{copyText}</span>
                <svg width="15" height="16" xmlns="http://www.w3.org/2000/svg">
                  <title>Copy</title>
                  <g fill="none">
                    <rect
                      stroke="#000"
                      x="3.5"
                      y="3.5"
                      width="11"
                      height="12"
                      className={styles.copyIconPrimary}
                    />
                    <polygon
                      fill="#000"
                      opacity=".3"
                      points="0 13 3 13 3 12 1 12 1 1 11 1 11 3 12 3 12 0 0 0"
                      className={styles.copyIconSecondary}
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * MultiUploadField
 */

class MultiUploadField extends React.Component {
  /**
   * displayName
   */

  static displayName = "UploadField";

  /**
   * propTypes
   */

  static propTypes = {
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

  /**
   * Enable parent to pass context
   */

  static contextTypes = {
    globalConfig: PropTypes.object
  };

  /**
   * getDefaultProps
   * set 'multiple' as true by default
   */

  static defaultProps = {
    multiple: true
  };

  constructor(props, context) {
    super(props, context);
    let { value } = props;
    const { presign_url, presign_options } = props.attributes;
    const { csrfToken, uploader } = context.globalConfig || {};

    const allowMultipleFiles = props.multiple || props.attributes.multiple;
    value = value ? value.toJS() : value;
    let files = [];

    // Set a per instance ID for talking to the bus
    this.instanceId = uid();

    // check if 'value' exists.
    // if it's an 'object' and put it in array
    if (value != null) {
      if (!allowMultipleFiles && value.length > 1) {
        value = value.splice(0, 1);
      }
      if (!Array.isArray(value) && typeof value === "object") {
        files = [this.populateExistingAttributes(value)];
      } else {
        files = value.map(file => {
          return this.populateExistingAttributes(file);
        });
      }
    }

    this.state = {
      files,
      uploadQueue: []
    };

    // Switch uploaders if specified
    this.uploader = s3Upload;
    this.uploaderPresignArgs = [presign_url, csrfToken, presign_options];
    if (uploader === "attache") {
      this.uploader = attacheUpload;
      this.uploaderPresignArgs = [presign_url, csrfToken];
    }
  }

  /**
   * populateExistingAttributes
   * take an object and copy it's contents to `fileAttributes` of a new object
   * return the new object
   * @param  {obj} file
   * @return {obj}
   */

  populateExistingAttributes = file => {
    var obj = {};
    obj.fileAttributes = {};
    for (var key in file) {
      obj.fileAttributes[key] = file[key];
    }
    return obj;
  };

  /**
   * componentWillReceiveProps
   * Check for new uploadedFiles passed in via 'value'.
   * Also ignore this lifecycle step for a single upload field.
   * First check the props exist and filter out any unique objects passed in.
   * If there are unique objects, add them to 'files' and update state
   * @param {object} nextProps
   */

  componentWillReceiveProps(nextProps) {
    if (!nextProps.multple || !nextProps.value || !nextProps.value.length)
      return;
    let files = this.state.files.slice(0);

    let newValueProps = filterUniqueObjects(files, nextProps.value);
    if (!newValueProps.length) return;

    files = files.concat(newValueProps);
    this.setState({
      files
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

  createFileObjects = val => {
    // format the object
    function formatObject(file) {
      const { name, size, type, lastModifiedDate, lastModified } = file;
      const lastModifiedAsString = lastModifiedDate
        ? lastModifiedDate.toString()
        : lastModified.toString();
      return {
        file,
        fileAttributes: {
          file_name: sanitiseFileName(name)
        },
        size,
        type,
        lastModifiedDate: lastModifiedAsString,
        uid: generateUniqueID(name)
      };
    }

    // iterate array calling formatObject()
    function formatObjects(files) {
      return files.map(file => {
        return formatObject(file);
      });
    }

    if (Array.isArray(val) && val.length > 0) {
      return formatObjects(val);
    } else if (typeof val === "object") {
      return formatObject(val);
    } else {
      return;
    }
  };

  /**
   * abortRequest
   * Pass a file's `uid` to the `deleteXHRRequest` method of attache-upload
   * @param {number} index
   * @param {object} file
   */

  abortUploadRequest = file => {
    this.removeFromUploadQueue(file.uid);
    this.uploader.abortXHRRequest(file.uid);
  };

  /**
   * onProgress
   * Clone and iterate existing files.
   * Assign the progress value to a specific file
   * Update the state of the 'files'
   * @param {event} e - XHR progress
   * @param {object} file - the uploaded file
   */

  onProgress = (e, fileObject) => {
    let files = this.state.files.slice(0);

    files.forEach(existingFile => {
      if (existingFile.uid === fileObject.uid) {
        existingFile.progress = e.percent;
      }
    });

    this.setState({
      files
    });
  };

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

  updateUploadedFiles = (fileObject, response, upload_url) => {
    let copy = Object.assign({}, fileObject);
    delete copy.file;

    // apply response key/values to existing `fileAttributes`
    for (var key in response) {
      copy.fileAttributes[key] = response[key];
    }

    // apply the 'original_url' to existing `fileAttributes`
    copy.fileAttributes["original_url"] = this.buildPath(
      upload_url,
      response.path
    );
    if (hasImageFormatType(copy.fileAttributes["file_name"])) {
      copy.fileAttributes["thumbnail_url"] = fileObject.file.preview;
    }

    let files = this.state.files.slice(0);
    const indexOfFile = files.findIndex(file => file.uid === fileObject.uid);
    files.splice(indexOfFile, 1, copy);

    this.setState({
      files
    });

    this.onUpdate(files);
  };

  /**
   * onUpdate
   * If `multiple` return the array of file(s), otherwise just the first
   * normalise each fileObject, returning its fileAttributes object
   * @param  {array} files
   * @return {array/object}
   */

  onUpdate = files => {
    const uploadedFiles = files.map(this.normaliseFileExport);

    const value =
      this.props.attributes.multiple || this.props.multiple
        ? uploadedFiles
        : uploadedFiles[0];

    this.props.actions.edit(val => Immutable.fromJS(value));
  };

  /**
   * normaliseFileExport
   * Remove 'file_name', 'original_url', 'thumbnail_url' from the fileObject.fileAttributes object
   * return the object
   * @param {object} obj
   */

  normaliseFileExport = obj => {
    const keysToRemove = ["file_name", "original_url", "thumbnail_url"];
    let copy = Object.assign({}, obj.fileAttributes);
    keysToRemove.forEach(key => {
      delete copy[key];
    });
    return copy;
  };

  /**
   * removeFailedUpload
   * If an XHR error has occured while uploading a file,
   * remove the file from the current list of `files` in state
   * @param {object} file object
   */

  removeFailedUpload = fileObject => {
    const files = this.state.files.filter(file => {
      return file.uid !== fileObject.uid;
    });

    this.setState({
      files
    });
  };

  /**
   * storeXHRErrorMessage
   * Assign an XHR message to an array with a unique uid and save to state
   * This allows the user to click and remove specific errors
   * @param {string} message
   */

  storeXHRErrorMessage = message => {
    let XHRErrorMessages = this.state.XHRErrorMessages
      ? this.state.XHRErrorMessages.slice(0)
      : [];

    XHRErrorMessages.push({
      uid: uid(10),
      message
    });

    this.setState({
      XHRErrorMessages
    });
  };

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

  uploadFile = (fileObject, onProgress = noOp) => {
    if (!fileObject) return;
    let upload_url;

    // Push into uploadQueue
    this.addToUploadQueue(fileObject.uid);

    this.uploader.presign
      .apply(this, this.uploaderPresignArgs)
      .then(presignResponse => {
        // assign the return 'url' to upload_url so
        // we can create paths to the file
        upload_url = presignResponse.url;
        return this.uploader.upload(presignResponse, fileObject, onProgress);
      })
      .then(uploadResponse => {
        this.removeFromUploadQueue(fileObject.uid);
        return this.updateUploadedFiles(fileObject, uploadResponse, upload_url);
      })
      .catch(err => {
        const { name } = err;
        if (
          name === "presignRequest" ||
          name === "uploadRequest" ||
          name === "responseStatus"
        ) {
          this.removeFailedUpload(fileObject);
          this.storeXHRErrorMessage(err.message);
          this.removeFromUploadQueue(fileObject.uid);
        } else {
          console.error(err);
          throw err;
        }
      });
  };

  /**
   * Add a file to the upload queue identified by its uid
  */
  addToUploadQueue = id => {
    const { bus } = this.props;
    let { uploadQueue } = this.state;
    uploadQueue = uploadQueue.concat([id]);
    this.setState({
      uploadQueue
    });
    // If the queue is 1, then we have changed from idle to busy
    if (uploadQueue.length === 1) {
      bus.emit(events.internal.FIELD_BUSY, this.instanceId);
    }
  };

  /**
   * Remove a file to the upload queue identified by its uid
  */
  removeFromUploadQueue = id => {
    const { bus } = this.props;
    let uploadQueue = this.state.uploadQueue.slice();
    const index = uploadQueue.indexOf(id);
    if (index > -1) {
      uploadQueue.splice(index, 1);
      this.setState({
        uploadQueue
      });
    }
    // If the queue is 0, then we have changed from busy to idle
    if (uploadQueue.length === 0) {
      bus.emit(events.internal.FIELD_IDLE, this.instanceId);
    }
  };

  /**
   * onChange
   * Iterate and validate each file.
   * Split valid and invalid files up into separate arrays.
   * Create new File Objects from valid files and concat with existing `files`
   * Call this.uploadFile() for each valid file object
   * @param {array} - dropped/uploaded files
   */

  onChange = files => {
    if (!files.length) return;

    const { attributes } = this.props;
    const isMultiple = this.props.attributes.multiple || this.props.multiple;

    if (!isMultiple && this.state.files.length) {
      this.removeFile(0);
    }

    const {
      permitted_file_type_regex,
      permitted_file_type_message,
      max_file_size,
      max_file_size_message
    } = attributes;

    let status;
    let validFiles = [];
    let invalidFiles = this.state.invalidFiles
      ? this.state.invalidFiles.slice(0)
      : [];

    const permittedFileTypeRegex = parseRegexFromString(
      permitted_file_type_regex
    );

    // Iterate and validate each file
    files.forEach(file => {
      status = validate(
        file,
        permittedFileTypeRegex,
        permitted_file_type_message,
        max_file_size,
        max_file_size_message
      );

      if (!status.success) {
        invalidFiles.push({
          file,
          uid: uid(10),
          message: status.message
        });
      } else {
        validFiles.push(file);
      }
    });

    // store invalid files to `invalidFiles`
    if (invalidFiles.length) {
      this.setState({
        invalidFiles
      });
    }

    if (!validFiles.length) return;

    // Create 'file objects' of valid files and assign to `uploadingFiles`
    var uploadingFiles = validFiles.map(file => {
      return this.createFileObjects(file);
    });

    // if `multiple` concat dropped file with existing,
    // otherwise just the dropped file
    const allFiles = isMultiple
      ? this.state.files.concat(uploadingFiles)
      : uploadingFiles;

    this.setState({
      files: allFiles
    });

    // upload each valid file and passing in a progress event handler
    uploadingFiles.forEach(fileObject => {
      this.uploadFile(fileObject, this.onProgress);
    });
  };

  /**
   * onDrop
   * When a sortable upload items is 'dropped' re-arrage `files` to
   * match the same order and save to state
   * @param  {Array} newOrder - an array of indexs returned from Sortable
   */

  onDrop = newOrder => {
    const existingFiles = this.state.files.slice(0);
    const files = sortArrayByOrder(existingFiles, newOrder);

    this.setState({
      files
    });

    this.onUpdate(files);
  };

  /**
   * removeKeyFromState
   * A helper to copy an array from state, and remove a key, returning array
   * @param {string} array - a name for an array in state
   * @param {number/string} key
   * @return {array}
   */

  removeKeyFromState = (array, key) => {
    let arr = this.state[array].slice(0);
    if (typeof key === "string") {
      key = parseInt(key, 10);
    }
    arr.splice(key, 1);
    return arr;
  };

  /**
   * removeFile
   * Copy existing `files` from state.
   * Check if the file at `index` has a `file` property. if so, cancel it's XHR.
   * Remove the file at `index` from `files` and save
   * @param {number} index - sourtable item index passed back from Sortable
   * @param {Event} e - click event passed back from Sortable
   */

  removeFile = (index, e) => {
    if (e) e.preventDefault();
    const files = this.state.files.slice(0);

    const file = files[index];
    if (file.file) this.abortUploadRequest(file);

    files.splice(index, 1);
    this.setState({
      files
    });

    this.onUpdate(files);
  };

  /**
   * removeInvalidFile
   * Filter out an file by key
   * save remaining `invalidFiles` to state
   * @param {event} e - click
   */

  removeInvalidFile = e => {
    e.preventDefault();
    const key = e.target.getAttribute("data-key");
    const invalidFiles = this.removeKeyFromState("invalidFiles", key);

    this.setState({
      invalidFiles
    });
  };

  /**
   * removeXHRErrorMessage
   * Filter out an error by `key`
   * Save remaining `XHRErrorMessages` to state
   * @param {event} e - click event
   */

  removeXHRErrorMessage = e => {
    e.preventDefault();
    const key = e.target.getAttribute("data-key");
    const XHRErrorMessages = this.removeKeyFromState("XHRErrorMessages", key);

    this.setState({
      XHRErrorMessages
    });
  };

  /**
   * renderXHRErrorMessage
   * Render an element for each XHR error object message
   * @param {object} error object
   * @param {number} index
   * @return {vnode}
   */

  renderXHRErrorMessage = (errorObject, index) => {
    const { message } = errorObject;

    return (
      <div key={index} className={styles.validationMessage}>
        {message}
        <button className={styles.remove}>
          <span className={styles.removeText}>Remove</span>
          <div
            className={styles.removeX}
            onClick={this.removeXHRErrorMessage}
            data-key={index}
          >
            ×
          </div>
        </button>
      </div>
    );
  };

  /**
   * renderXHRErrorMessages
   * Iterate `XHRErrorMessages` and call renderXHRErrorMessage() for each object
   * @param {array} XHRErrorMessages - an array of error objects
   * @return {vnode}
   */

  renderXHRErrorMessages = XHRErrorMessages => {
    return (
      <div className={styles.validationMessages}>
        {XHRErrorMessages.map(this.renderXHRErrorMessage)}
      </div>
    );
  };

  /**
   * renderInvalidFile
   * Render a file validation message
   * @param {object} error object
   * @param {number} index
   * @return {vnode}
   */

  renderInvalidFile = (errorObject, index) => {
    const { message, file } = errorObject;
    const { name } = file;

    return (
      <div key={index} className={styles.validationMessage}>
        <strong>{name}</strong>: {message}
        <button className={styles.remove}>
          <span className={styles.removeText}>Remove</span>
          <div
            className={styles.removeX}
            onClick={this.removeInvalidFile}
            data-key={index}
          >
            ×
          </div>
        </button>
      </div>
    );
  };

  /**
   * renderInvalidFiles
   * Iterate `invalidFiles` and call renderInvalidFile() for each object
   * @param {array} invalidFiles
   * @return {vnode}
   */

  renderInvalidFiles = invalidFiles => {
    return (
      <div className={styles.validationMessages}>
        {invalidFiles.map(this.renderInvalidFile)}
      </div>
    );
  };

  /**
   * renderThumbnail
   * Return a thumbnail image based on `thumbnail_url` or building one from 'original_url'
   * @param  {string} thumbnail_url
   * @param  {string} file_name
   * @return {vnode}
   */

  renderThumbnail = (thumbnail_url, file_name) => {
    if (!thumbnail_url) return;

    return <img src={thumbnail_url} alt={file_name} />;
  };

  /**
   * renderPreviewDetails
   * Render the file details for a preview item
   * @param  {string} file_name
   * @param  {image} thumbnailImage
   * @return {vnode}
   */

  renderPreviewDetails = (
    file_name,
    thumbnailImage,
    isProgressTitle = false
  ) => {
    const titleClassNames = classNames({
      [`${styles.listItem__title}`]: !isProgressTitle,
      [`${styles.progress__title}`]: isProgressTitle
    });

    const wrapperClassNames = classNames(
      styles.align_middle,
      styles.previewItem__details
    );

    return (
      <div className={wrapperClassNames}>
        <div className={styles.listItem__img}>{thumbnailImage}</div>
        <div className={titleClassNames}>Uploading: {file_name}</div>
      </div>
    );
  };

  /**
   * renderPreviewItem
   * Render an node represeting an preview (uploading) file
   * @param {object} fileObject
   * @param {number} index
   * @return {vnode}
   */

  renderPreviewItem = (fileObject, index) => {
    const { progress, file, fileAttributes } = fileObject;
    const { file_name } = fileAttributes;
    const { preview } = file;
    const hasThumbnail = hasImageFormatType(file_name);
    const thumbnailImage = hasThumbnail
      ? this.renderThumbnail(preview, file_name)
      : null;

    let currentProgress = {
      width: progress > 0 ? progress + "%" : "0%"
    };

    return (
      <div className={styles.previewItem} key={index}>
        <span className={styles.progress__bar} style={currentProgress}>
          {this.renderPreviewDetails(file_name, thumbnailImage, true)}
        </span>

        {this.renderPreviewDetails(file_name, thumbnailImage)}
      </div>
    );
  };

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

  buildPath = (url, path, dimension = "original") => {
    const { uploader } = this.context.globalConfig || {};
    if (uploader === "attache") {
      const pattern = /([^/]*)$/;
      const splitPath = path.split(pattern);
      return (
        url.replace("/upload", "/view") +
        "/" +
        splitPath[0] +
        dimension +
        "/" +
        splitPath[1]
      );
    } else {
      return `${url}/${path}`;
    }
  };

  /**
   * buildThumbnailPath
   * Replace 'original' with a specific dimension. Defaults to `50x`
   * @param  {string} original_url
   * @param  {string} dimension
   * @return {string}
   */

  buildThumbnailPath = (original_url, dimension = "50x") => {
    const { uploader } = this.context.globalConfig || {};
    if (uploader === "attache") {
      return original_url.replace("original", dimension);
    } else {
      return original_url;
    }
  };

  /**
   * renderDefaultTemplate
   */
  renderDefaultTemplate(fileObject, index) {
    const { fileAttributes } = fileObject;
    let { file_name, thumbnail_url, original_url } = fileAttributes;
    const hasThumbnail = thumbnail_url != null || hasImageFormatType(file_name);
    thumbnail_url = hasThumbnail ? thumbnail_url : null;
    return (
      <DefaultRenderTemplate
        key={index}
        fileName={file_name}
        originalUrl={original_url}
        thumbnailUrl={thumbnail_url}
        index={index}
      />
    );
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

  renderCustomTemplate = (fileObject, index, config, attribute) => {
    try {
      return extractComponent(config.components, attribute)(fileObject);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  /**
   * customComponentExists
   * Does a component with the same name as the `attribute` exist ?
   * @param  {object} config - components: [...]
   * @param  {string} attribute
   * @return {bool}
   */

  customComponentExists = (config, attribute) => {
    if (!config || !attribute) return false;

    let result = false;
    config.components.forEach(component => {
      if (component.name === attribute) result = true;
    });
    return result;
  };

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

  renderFiles = files => {
    const { config, attributes } = this.props;
    const { render_uploaded_as } = attributes;
    let isSortable = this.state.uploadQueue.length === 0 && attributes.sortable;

    var allFiles = files.map((fileObject, index) => {
      if (fileObject.file) {
        isSortable = false;
        return this.renderPreviewItem(fileObject, index);
      } else {
        const template = this.customComponentExists(config, render_uploaded_as)
          ? this.renderCustomTemplate(
              fileObject,
              index,
              config,
              render_uploaded_as
            )
          : this.renderDefaultTemplate(fileObject, index);
        return template;
      }
    });

    return (
      <Sortable
        canRemove
        canSort={isSortable}
        onRemove={this.removeFile}
        onDrop={this.onDrop}
        maxHeight={attributes.max_height}
      >
        {allFiles}
      </Sortable>
    );
  };

  /**
   * render
   * @return {vnode}
   */

  render() {
    const { attributes, hint, label, name, errors } = this.props;
    const { upload_prompt, upload_action_label } = attributes;

    let hasErrors = errors.count() > 0;

    let { XHRErrorMessages, files, invalidFiles } = this.state;

    // Set up field classes
    let fieldClassNames = classNames(styles.base, {
      [`${styles.baseInline}`]: attributes.inline
    });
    const multiple = this.props.attributes.multiple || this.props.multiple;

    return (
      <div
        className={fieldClassNames}
        data-field-name={name}
        data-field-type={multiple ? "multi-upload-field" : "upload-field"}
      >
        <div>
          <div>
            <FieldHeader hint={hint} id={name} label={label} />
          </div>
          {XHRErrorMessages && XHRErrorMessages.length > 0
            ? this.renderXHRErrorMessages(XHRErrorMessages)
            : null}
          {invalidFiles && invalidFiles.length > 0
            ? this.renderInvalidFiles(invalidFiles)
            : null}
          <Dropzone
            multiple={multiple}
            onChange={this.onChange}
            label={upload_prompt}
            buttonText={upload_action_label}
            disableClick={files.length > 0}
          >
            {files.length > 0 ? this.renderFiles(files) : null}
          </Dropzone>
          {hasErrors ? <FieldErrors errors={errors} /> : null}
        </div>
      </div>
    );
  }
}

export default MultiUploadField;
