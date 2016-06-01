import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import uid from 'uid'
import classNames from 'classnames'
import {upload, presign} from 'attache-upload'
import Immutable, { List } from 'immutable'

// Import components
import FieldHeader from '../common/header'
import Dropzone from '../../ui/dropzone'
import validate from './validation.js'
import bus from 'bus'
import styles from './index.mcss'
import Sortable from '../../ui/sortable'
import {filenameIsImage, sortArrayByOrder, generateUniqueID, noOp, filterUniqueObjects} from './utils'

/**
 * MultiUploadField
 */

const MultiUploadField = React.createClass({

  /**
   * displayName
   */

  displayName: 'MultiUploadField',

  /**
   * propTypes
   */

  propTypes: {
    actions: React.PropTypes.object,
    attributes: React.PropTypes.shape({
      label: React.PropTypes.string,
      presign_url: React.PropTypes.string
    }),
    name: React.PropTypes.string,
    presign_url: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    fileTypeRegex: React.PropTypes.object,
    fileTypeRegexMessage: React.PropTypes.string,
    maxFileSize: React.PropTypes.number,
    maxFileSizeMessage: React.PropTypes.string,
    buttonText: React.PropTypes.string,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: React.PropTypes.oneOfType([
      ImmutablePropTypes.list,
      React.PropTypes.object
    ])
  },

  /**
   * Enable parent to pass context
   */

  contextTypes: {
    globalConfig: React.PropTypes.object
  },

  /**
   * getDefaultProps
   * set 'multiple' as true by default
   */

  getDefaultProps () {
    return {
      multiple: true
    }
  },

  /**
   * getInitialState
   * Assign existing uploaded files (passed in by `value`) to `uploadedFiles`
   * See the example `propFiles` format above
   * @return {object}
   */

  getInitialState () {
    let {value} = this.props
    value = (value) ? value.toJS() : value
    let uploadedFiles = []
    let previewFiles = []

    value = [
      {
        fileAttributes: {
          "original_url": "http://icelab.attache.me/view/1a/84/db/cb/41/fc/37/f1/fe/da/79/ab/5a/cb/75/c2/original/mullet.png",
          "thumbnail_url": "http://icelab.attache.me/view/1a/84/db/cb/41/fc/37/f1/fe/da/79/ab/5a/cb/75/c2/50x/mullet.png",
          "name": "foo"
        }
      }
    ]

    // is not null/array but is an object
    // or is a List with a size greater than 0
    if (value != null && !Array.isArray(value) && (typeof (value) === 'object')) {
      uploadedFiles = [value]
    } else if (value != null) {
      uploadedFiles = value
    }

    return {
      uploadedFiles,
      previewFiles,
    }
  },

  /**
   * componentWillReceiveProps
   * Check for new uploadedFiles passed in.
   * Also ignore this lifecycle step for a single upload field.
   * First check the props exist and filter out any unique objects passed in.
   * If there are unique objects, add them to uploadedFiles and update state
   * @param {object} nextProps
   */

  componentWillReceiveProps (nextProps) {
    if (!nextProps.multple || !nextProps.value.length) return

    let uploadedFiles = this.state.uploadedFiles.slice(0)
    let newValueProps = filterUniqueObjects(uploadedFiles, nextProps.value)

    if (!newValueProps.length) return
    uploadedFiles = uploadedFiles.concat(newValueProps)

    this.setState({
      uploadedFiles
    })
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

  createFileObjects (val) {
    // format the object
    function formatObject (file) {
      const {name, size, type, lastModifiedDate} = file
      return {
        file,
        file_name: name,
        size,
        type,
        lastModifiedDate: lastModifiedDate.toString(),
        uid: generateUniqueID(name)
      }
    }

    // iterate array calling formatObject()
    function formatObjects (files) {
      return files.map((file) => {
        return formatObject(file)
      })
    }

    if (Array.isArray(val) && val.length > 0) {
      return formatObjects(val)
    } else if (typeof (val) === 'object') {
      return formatObject(val)
    } else {
      return
    }
  },

  /**
   * abortRequest
   * Get the `data-uid` from the clicked preview element.
   * Emit abortUploadRequest() along with the uid
   * @param {event} e - click
   */

  abortUploadRequest (e) {
    e.preventDefault()
    const uid = e.target.getAttribute('data-uid')
    bus.emit('abortUploadRequest', uid)
    this.removePreviewFile(e)
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

  onProgress (e, file) {
    const {name} = file
    let previewFiles = this.state.previewFiles
      ? this.state.previewFiles.slice(0)
      : []

    previewFiles.map((file) => {
      if (file.file_name === name) {
        file.progress = e.percent
      }
    })

    this.setState({
      previewFiles
    })
  },

  /**
   * updateUploadedFiles
   * Take a `file`.
   * Iterate previewFiles and return all files that are not `file`
   * Push `file` into uploadedFiles and save the state
   * @param {object} a file object
   */

  updateUploadedFiles (fileObject, response) {
    const {path, uploadURL} = response

    let previewFiles = this.state.previewFiles.filter((preview) => {
      return preview.file_name !== fileObject.file_name
    })

    let uploadedFiles = this.state.uploadedFiles
      ? this.state.uploadedFiles.slice(0)
      : []

    fileObject.fileAttributes = this.applyAttribute(response, 'original_url', this.buildPath(uploadURL, path))
    uploadedFiles.push(fileObject)

    this.setState({
      uploadedFiles,
      previewFiles
    })

    this.onUpdate(uploadedFiles)
  },

  /**
   * onUpdate
   * normalise each fileObject for export upstream.
   * If `multiple` return the array of file(s), otherwise just the first
   * @param  {array} uploadedFiles
   * @return {array/object}
   */

  onUpdate (fileObjects) {
    const {multiple} = this.props

    const uploadedFiles = fileObjects.map(this.normaliseFileExport)
    const value = multiple ? uploadedFiles : uploadedFiles[0]

    console.log(value)

    this.props.actions.edit(
      (val) => Immutable.fromJS(value)
    )
  },

  /**
   * normaliseFileExport
   * Remove any values we don’t care about persisting, mostly the `file`
   * attribute/object that we use for previewing
   * @param {object} file object
   */

  normaliseFileExport (obj) {
    let copy = Object.assign({}, obj)
    delete obj.fileAttributes.uploadURL
    return obj.fileAttributes
  },

  /**
   * [applyAttribute description]
   * @param  {[type]} obj   [description]
   * @param  {[type]} name  [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */

  applyAttribute (obj, name, value) {
    let copy = Object.assign({}, obj)
    copy[name] = value
    return copy
  },

  /**
   * removeFileFromPreviewFiles
   * If an XHR error has occured while uploading a file,
   * remove the file from the current list of `previewFiles`
   * @param {object} file object
   */

  removeFileFromPreviewFiles (fileObject) {
    const previewFiles = this.state.previewFiles.filter((previewFileObject) => {
      return previewFileObject.uid !== fileObject.uid
    })

    this.setState({
      previewFiles
    })
  },

  /**
   * storeXHRErrorMessage
   * Assign an XHR message to an array with a unique uid and save to state
   * This allows the user to click and remove specific errors
   * @param {string} message
   */

  storeXHRErrorMessage (message) {
    let XHRErrorMessages = this.state.XHRErrorMessages
      ? this.state.XHRErrorMessages.slice(0)
      : []

    XHRErrorMessages.push({
      uid: uid(10),
      message
    })

    this.setState({
      XHRErrorMessages
    })
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

  uploadFile (fileObject, onProgress = noOp, updateUploadedFilesStatus = true) {
    if (!fileObject) return
    const {presign_url} = this.props.attributes
    const {csrfToken} = this.context.globalConfig

    presign(presign_url, csrfToken)
      .then((presignResponse) => {
        return upload(presignResponse, fileObject, onProgress)
      })
      .then((uploadResponse) => {
        if (!updateUploadedFilesStatus) return
        return this.updateUploadedFiles(fileObject, uploadResponse)
      })
      .catch((err) => {
        this.removeFileFromPreviewFiles(fileObject)
        this.storeXHRErrorMessage(err.message)
        throw new Error(err.message)
      })
  },

  /**
   * onChange
   * Iterate and validate each file spliting valid and invalid file up.
   * For any valid file, call this.uploadFile()
   * @param {array} - dropped/uploaded files
   */

  onChange (files) {
    if (!files.length) return

    // if it's a single upload field, remove existing uploadedFiles
    const { multiple } = this.props
    if (!multiple && this.state.uploadedFiles.length) {
      this.setState({
        uploadedFiles: []
      })
    }

    let status
    let validFiles = []
    let invalidFiles = this.state.invalidFiles
      ? this.state.invalidFiles.slice(0)
      : []

    const {
      fileTypeRegex,
      fileTypeRegexMessage,
      maxFileSize,
      maxFileSizeMessage
    } = this.props

    // iterate and validate each file
    files.map((file) => {
      status = validate(file, fileTypeRegex, fileTypeRegexMessage, maxFileSize, maxFileSizeMessage)
      if (!status.success) {
        invalidFiles.push({
          file,
          uid: uid(10),
          message: status.message
        })
      } else {
        validFiles.push(file)
      }
    })

    // store invalid files to `invalidFiles`
    if (invalidFiles.length) {
      this.setState({
        invalidFiles
      })
    }

    if (!validFiles.length) return

    // Create 'file objects' of valid files and assign to `previewFiles`
    let previewFiles = validFiles.map((file) => {
      return this.createFileObjects(file)
    })

    this.setState({
      previewFiles
    })

    // upload each valid file and passing in a progress event handler
    previewFiles.map((fileObject) => {
      this.uploadFile(fileObject, this.onProgress)
    })
  },

  /**
   * onDrop
   * When a sortable upload items is 'dropped' re-arrage `uploadedFiles` to
   * match the same order and save to state
   * @param  {Array} newOrder - an array of indexs returned from Sortable
   */

  onDrop (newOrder) {
    const existingUploadedFiles = this.state.uploadedFiles.slice(0)
    const uploadedFiles = sortArrayByOrder(existingUploadedFiles, newOrder)

    this.setState({
      uploadedFiles
    })
    this.onUpdate(uploadedFiles)
  },

  /**
   * removeKeyFromState
   * Copy and array from state, and remove a key and return array
   * @param {string} array - a name for an array in state
   * @param {number/string} key
   * @return {array}
   */

  removeKeyFromState (array, key) {
    let arr = this.state[array].slice(0)
    if (typeof (key) === 'string') {
      key = parseInt(key)
    }
    arr.splice(key, 1)
    return arr
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

  removeUploadedFile (index) {
    const uploadedFiles = this.removeKeyFromState('uploadedFiles', index)

    this.setState({
      uploadedFiles
    })

    this.onUpdate(uploadedFiles)
  },

  /**
   * removeInvalidFile
   * Filter out an file by uid
   * save remaining files to state
   * @param {event} e - click
   */

  removeInvalidFile (e) {
    e.preventDefault()
    const key = e.target.getAttribute('data-key')
    const invalidFiles = this.removeKeyFromState('invalidFiles', key)
    this.setState({
      invalidFiles
    })
  },

  /**
   * removeInvalidFile
   * Filter out an file by uid
   * save remaining files to state
   * @param {event} e - click
   */

  removePreviewFile (e) {
    e.preventDefault()
    const key = e.target.getAttribute('data-key')
    const previewFiles = this.removeKeyFromState('previewFiles', key)
    this.setState({
      previewFiles
    })
  },

  /**
   * removeXHRErrorMessage
   * Filter out an error by `uid`
   * Save remaining errors back to state
   * @param {event} e - click event
   */

  removeXHRErrorMessage (e) {
    e.preventDefault()
    const key = e.target.getAttribute('data-key')
    const XHRErrorMessages = this.removeKeyFromState('XHRErrorMessages', key)
    this.setState({
      XHRErrorMessages
    })
  },

  /**
   * renderXHRErrorMessage
   * Render an element for each XHR error object message
   * @param {object} error object
   * @param {number} i
   * @return {vnode}
   */

  renderXHRErrorMessage (errorObject, i) {
    const {message} = errorObject

    return (
      <div
        key={i}
        className={styles.validationMessage}>
        Server Error: {message}
        <button className={styles.remove}>
          <span className={styles.removeText}>Remove</span>
          <div
            className={styles.removeX}
            onClick={this.removeXHRErrorMessage}
            data-key={i}>×</div>
        </button>
      </div>
    )
  },

  /**
   * renderXHRErrorMessages
   * Iterate error objects and call renderXHRErrorMessage() for each object
   * @param {array} XHRErrorObjects - an array of error objects
   * @return {vnode}
   */

  renderXHRErrorMessages (XHRErrorObjects) {
    return (
      <div className={styles.validationMessages}>
        {XHRErrorObjects.map(this.renderXHRErrorMessage)}
      </div>
    )
  },

  /**
   * renderInvalidFile
   * Render a file validation message
   * @param {object} error object
   * @param {number} i
   * @return {vnode}
   */

  renderInvalidFile (errorObject, i) {
    const {message, file} = errorObject
    const {name} = file

    return (
      <div
        key={i}
        className={styles.validationMessage}>
        <strong>{name}</strong>: {message}
        <button className={styles.remove}>
          <span className={styles.removeText}>Remove</span>
          <div
            className={styles.removeX}
            onClick={this.removeInvalidFile}
            data-key={i}>×</div>
        </button>
      </div>
    )
  },

  /**
   * renderInvalidFiles
   * Iterate error objects and call renderInvalidFile() for each object
   * @param {array} and array of error objects
   * @return {vnode}
   */

  renderInvalidFiles (errorsObjects) {
    return (
      <div className={styles.validationMessages}>
        {errorsObjects.map(this.renderInvalidFile)}
      </div>
    )
  },

  /**
   * renderThumbnail
   * Return a thumbnail image based on `thumbnail_url` or building one from 'original_url'
   * @param  {string} thumbnail_url
   * @param  {string} original_url
   * @param  {string} name
   * @return {vnode}
   */

  renderThumbnail (thumbnail_url, original_url, name) {
    if (!thumbnail_url && !original_url) return

    return (
      <img src={thumbnail_url || this.buildThumbnailPath(original_url, '50x')} alt={name} />
    )
  },

  /**
   * [renderPreviewDetails description]
   * @param  {[type]} name           [description]
   * @param  {[type]} thumbnailImage [description]
   * @return {[type]}                [description]
   */

  renderPreviewDetails (name, thumbnailImage, isProgressTitle = false) {
    const titleClassNames = classNames(
      {
        [`${styles.listItem__title}`]: !isProgressTitle,
        [`${styles.progress__title}`]: isProgressTitle
      }
    )

    const wrapperClassNames = classNames(
      styles.align_middle,
      styles.previewItem__details
    )

    return (
      <div className={wrapperClassNames}>
        <div className={styles.align_middle__content}>
          <div className={styles.listItem__img}>
            {thumbnailImage}
          </div>
        </div>
        <div className={styles.align_middle__content}>
          <div className={titleClassNames}>
            Uploading: {name}
          </div>
        </div>
      </div>
    )
  },

  renderPreviewItem (fileObject, i) {
    const {progress, file, uid} = fileObject
    const {preview, name} = file
    const hasThumbnail = filenameIsImage(name)
    const thumbnailImage = hasThumbnail
      ? this.renderThumbnail(preview, null, name)
      : null

    let currentProgress = {
      width: progress > 0 ? (progress + '%') : '0%'
    }

    return (
      <div className={styles.previewItem} key={i}>

        <button className={styles.remove}>
          <span className={styles.removeText}>Remove</span>
          <div
            className={styles.removeX}
            onClick={this.abortUploadRequest}
            data-key={i}
            data-uid={uid}>×</div>
        </button>

        <span
          className={styles.progress_bar}
          style={currentProgress}>
          {this.renderPreviewDetails(name, thumbnailImage, true)}
        </span>

        {this.renderPreviewDetails(name, thumbnailImage)}
      </div>
    )
  },

  /**
   * renderPreviewItems
   * Take an array of file objects, iterate & pass to renderPreviewItem()
   * @param {array} and array of file objects
   * @return {vnode}
   */

  renderPreviewItems (fileObjects) {
    return (
      <div className={styles.previewItems}>
        {fileObjects.map(this.renderPreviewItem)}
      </div>
    )
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

  buildPath (url, path, dimension = 'original') {
    const pattern = /([^/]*)$/
    const splitPath = path.split(pattern)
    return url.replace('/upload', '/view') + '/' + splitPath[0] + dimension + '/' + splitPath[1]
  },

  /**
   * buildThumbnailPath
   * @param  {[type]} original_url [description]
   * @param  {[type]} dimension    =             '50x' [description]
   * @return {[type]}              [description]
   */

  buildThumbnailPath (original_url, dimension = '50x') {
    return original_url.replace('original', dimension)
  },


  /**
   * renderUploadedFileItem
   * Render an node represeting an uploaded file
   * @param {object} fileObject
   * @param {number} idx
   * @return {vnode}
   */

  renderUploadedFileItem (fileObject, idx) {
    const {file, fileAttributes} = fileObject
    const {thumbnail_url, original_url} = fileAttributes

    const file_name = fileAttributes.name != null
      ? fileAttributes.name
      : file.name

    const hasThumbnail = (thumbnail_url != null) || filenameIsImage(file_name)
    const thumbnailImage = hasThumbnail
      ? this.renderThumbnail(thumbnail_url, original_url, file_name)
      : null

    const bodyClassNames = classNames(
      styles.listItem__body,
      styles.fade_in
    )

    return (
      <div className={styles.listItem} key={idx}>
        <div className={bodyClassNames}>
          <div className={styles.align_middle}>
            <div className={styles.align_middle__content}>
              <div className={styles.listItem__img}>
                {thumbnailImage}
              </div>
            </div>
            <div className={styles.align_middle__content}>
              <div className={styles.listItem__title}>
                <a target='_blank' href={original_url}>{file_name}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  /**
   * renderUploadedFiles
   * Generate an element passing it's contents to renderUploadedFileItem().
   * Wrap this item in a Sortable component
   * @param  {array} filesObjects
   * @return {vnode}
   */

  renderUploadedFiles (filesObjects) {
    return (
      <div className={styles.uploadedItems}>
        <Sortable canRemove onRemove={this.removeUploadedFile} onDrop={this.onDrop}>
          {filesObjects.map(this.renderUploadedFileItem)}
        </Sortable>
      </div>
    )
  },

  /**
   * render
   * @return {vnode}
   */

  render () {
    const {attributes, hint, label, name, multiple} = this.props
    const {
      XHRErrorMessages,
      uploadedFiles,
      invalidFiles,
      previewFiles
    } = this.state

    // Set up field classes
    let fieldClassNames = classNames(
      styles.base,
      {
        [`${styles.baseInline}`]: attributes.inline
      }
    )

    return (
      <div className={fieldClassNames}>
        <div className={styles.field}>

          <div>
            <FieldHeader hint={hint} id={name} label={label} />
          </div>

          {XHRErrorMessages && XHRErrorMessages.length > 0
            ? this.renderXHRErrorMessages(XHRErrorMessages)
            : null}

          {invalidFiles && invalidFiles.length > 0
            ? this.renderInvalidFiles(invalidFiles)
            : null}

          {previewFiles && previewFiles.length > 0
            ? this.renderPreviewItems(previewFiles)
            : null}

          <Dropzone
            multiple={multiple}
            onChange={this.onChange}
            disableClick={uploadedFiles.length > 0}>
            {uploadedFiles.length > 0
              ? this.renderUploadedFiles(uploadedFiles)
              : null}
          </Dropzone>
        </div>
      </div>
    )
  }
})

export default MultiUploadField
