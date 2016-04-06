import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import uid from 'uid'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Dropzone from '../../ui/dropzone'
import validate from './validation.js'
import { upload, preSign } from './upload.js'
import bus from './bus'
import styles from './index.mcss'

/**
 * containsObject
 * A helper to determin if an object exists in an array
 * @param  {object} obj
 * @param  {array} list
 * @return {boolean}
 */

function containsObject (obj, list) {
  let x
  for (x in list) {
    if (list.hasOwnProperty(x) && list[x] === obj) {
      return true
    }
  }
  return false
}

/**
 * generateUniqueID
 * @return {[type]} [description]
 */

function generateUniqueID (file_name) {
  return uid(10) + '_' + file_name
}

/**
 * noOp
 * Default param value
 * @return {Function}
 */

const noOp = function () {}

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
    attributes: React.PropTypes.shape({
      label: React.PropTypes.string,
      presign_url: React.PropTypes.string
    }),
    errors: ImmutablePropTypes.list,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    presign_url: React.PropTypes.string,
    token: React.PropTypes.string,
    fileType: React.PropTypes.object,
    maxFileSize: React.PropTypes.number,
    value: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    uploadedFiles: React.PropTypes.array
  },

  /**
   * getInitialState
   * @return {Object}
   */

  getInitialState () {
    return {
      progressValue: 0,
      XHRErrorMessages: [],
      uploadedFiles: this.props.uploadedFiles || [],
      previewFiles: [],
      invalidFiles: []
    }
  },

  /**
   * [removePreviewItem description]
   * @param  {[type]} uid [description]
   * @return {[type]}     [description]
   */

  removePreviewItem (uid) {
    const previewFiles = this.state.previewFiles.filter(file => {
      return file.uid !== uid
    })

    this.setState({
      previewFiles
    })
  },

  /**
   * abortRequest
   * Get the `data-uid` from the clicked preview element.
   * Emit abortUploadRequest() along with the uid
   * @param  {Event} e - click
   */

  abortUploadRequest (e) {
    e.preventDefault()
    const uid = e.target.getAttribute('data-uid')
    bus.emit('abortUploadRequest', uid)
    this.removePreviewItem(uid)
    this.resetState()
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

  onProgress (e, file) {
    const { name } = file
    let previewFiles = this.state.previewFiles.slice(0)

    previewFiles.map(file => {
      if (file.name === name) {
        file.progress = e.percent
      }
    })

    this.setState({
      previewFiles
    })
  },

  /**
   * showProgress
   * set `showProgress` to true
   */

  showProgress () {
    this.setState({
      showProgress: true
    })
  },

  /**
   * resetState
   * reset the original state
   */

  resetState () {
    this.setState({
      progressValue: 0,
      XHRErrorMessages: null,
      files: []
    })
  },

  /**
   * updateUploadedFiles
   * Take a `file`.
   * Iterate previewFiles aand returna ll files that are not `file`
   * Push `file` into uploadedFiles and save the state
   * @param  {Object} file
   */

  updateUploadedFiles (file, response) {
    const { path, geometry } = response

    let previewFiles = this.state.previewFiles.filter((preview) => {
      return preview.name !== file.name
    })

    let uploadedFiles = this.state.uploadedFiles.slice(0)

    if (containsObject(file, uploadedFiles)) {
      uploadedFiles.filter((existingFile) => {
        return existingFile.uid !== file.uid
      })
    } else {
      file.path = path
      file.geometry = geometry
      uploadedFiles.push(file)
    }

    this.setState({
      uploadedFiles,
      previewFiles
    })
  },

  /**
   * storeXHRErrorMessage
   * Assign an XHR message to an array with a unique uid and save to state
   * This allows use to click and remove specific errors
   * @param  {String} message
   */

  storeXHRErrorMessage (message) {
    let XHRErrorMessages = this.state.XHRErrorMessages.slice(0)

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
   * @param {Object} file
   */

  uploadFile (file, onProgress = noOp) {
    if (!file) return
    const { presign_url } = this.props.attributes
    const { token } = this.props
    const self = this

    preSign(file, presign_url, token)
      .then((presignResponse) => {
        return upload(presignResponse, file, token, onProgress)
      })
      .then((uploadResponse) => {
        console.log('success', uploadResponse)
        self.updateUploadedFiles(file, uploadResponse)
      })
      .catch((err) => {
        let error = new Error(err.message)
        self.storeXHRErrorMessage(err.message)
        throw error
      })
  },

  /**
   * onChange
   * Iterate and validate each file spliting valid and invalid file up.
   * For any valid file, call this.uploadFile()
   * @param  {Array} - dropped files
   */

  onChange (files) {
    if (!files.length) return

    let status
    let validFiles = []
    let invalidFiles = this.state.invalidFiles.slice(0)

    // iterate and validate
    files.map(file => {
      status = validate(file)
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

    // Save invalid files
    if (invalidFiles.length) {
      this.setState({
        invalidFiles
      })
    }

    if (!validFiles.length) return

    // Create objects of valid files and assign to `previewFiles`
    // each 'file' object looks something like:
    //
    // {
    //   name: small.jpg,
    //   file: {file},
    //   uid: "wyertyiopdop_small.jpg"
    // }

    let previewFiles = validFiles.map(file => {
      const { name } = file
      const uid = generateUniqueID(name)
      file.uid = uid
      return {
        name,
        file,
        uid
      }
    })

    this.setState({
      previewFiles
    })

    // upload each valid file
    previewFiles.map(file => {
      this.uploadFile(file, this.onProgress)
    })
  },

  /**
   * close
   * reset state
   * @param  {Event} e - click
   */

  close (e) {
    e.preventDefault()
    this.resetState()
  },

  /**
   * renderPreviewItem
   * Take a file object and an index value
   * @param  {Object} Object containing {file, name, uid, progress}
   * @param  {Number} idx
   * @return {vnode}
   */

  renderPreviewItem (obj, idx) {
    const { progress } = obj
    const { preview, name, uid } = obj.file

    let inlineStyleWidth = {
      width: progress ? (progress + '%') : '0%'
    }

    return (
      <div className={ styles.listItem } key={ idx }>
        <div className={ styles.listItem__body }>
          <div className={ styles.listItem__img }>
            <img src={ preview } alt={ name }/>
          </div>
          <div className={ styles.listItem__title }>
            Uploading: { name }
          </div>
        </div>
        <button
          className={ styles.close }
          onClick={ this.abortUploadRequest }
          data-uid={ uid }>{ String.fromCharCode(215) }</button>
        <span
          className={ styles.progress_bar }
          style={ inlineStyleWidth }></span>
      </div>
    )
  },

  /**
   * renderPreviewItems
   * Take an array of file objects, iterate & pass to renderPreviewItem()
   * @param  {Array} files
   * @return {vnode}
   */

  renderPreviewItems (files) {
    return (
      <div className={ styles.previewItems }>
        { files.map(this.renderPreviewItem)}
      </div>
    )
  },

  /**
   * removeItemByUID
   * Iterate an array in state filtering out a specific uid
   * @param  {String} arrayName
   * @param  {Event} e
   * @return {Array}
   */

  removeItemByUID (arrayName, e) {
    const uid = e.target.getAttribute('data-uid')

    return this.state[arrayName].filter((file) => {
      return file.uid !== uid
    })
  },

  /**
   * removeUploadedFile
   * Filter out an file by uid
   * Send the remaining files to this.uploadFile()
   * save remaining files to state
   * @param  {Event} e - click
   */

  removeUploadedFile (e) {
    e.preventDefault()
    const uploadedFiles = this.removeItemByUID('uploadedFiles', e)

    this.setState({
      uploadedFiles
    })

    uploadedFiles.map((file) => {
      this.uploadFile(file)
    })
  },

  /**
   * removeInvalidFile
   * Filter out an file by uid
   * save remaining files to state
   * @param  {Event} e - click
   */

  removeInvalidFile (e) {
    e.preventDefault()
    const invalidFiles = this.removeItemByUID('invalidFiles', e)

    this.setState({
      invalidFiles
    })
  },

  /**
   * removeXHRErrorMessage
   * Filter out an error by uid
   * save remaining errors to state
   * @param  {Event} e - click
   */

  removeXHRErrorMessage (e) {
    e.preventDefault()
    const XHRErrorMessages = this.removeItemByUID('XHRErrorMessages', e)

    this.setState({
      XHRErrorMessages
    })
  },

  /**
   * renderXHRErrorMessage
   * Render an element for each XHR error message
   * @param  {object} error
   * @param  {number} i
   * @return {vnode}
   */

  renderXHRErrorMessage (error, i) {
    const { message, uid } = error

    return (
      <div
        key={ i }
        className={ styles.validationMessage }>
        Server Error: { message }
        <button
          className= { styles.validationMessage_close}
          data-uid={ uid }
          onClick={ this.removeXHRErrorMessage }>
          { String.fromCharCode(215) }
        </button>
      </div>
    )
  },

  /**
   * [renderXHRErrorMessages description]
   * @param  {[type]} XHRErrors [description]
   * @return {[type]}           [description]
   */

  renderXHRErrorMessages (XHRErrors) {
    return (
      <div className={ styles.validationMessages }>
        { XHRErrors.map(this.renderXHRErrorMessage) }
      </div>
    )
  },

  /**
   * renderInvalidFile
   * Render a file validation message
   * @param  {Object} error
   * @param  {Number} i
   * @return {vnode}
   */

  renderInvalidFile (obj, i) {
    const { message, file, uid } = obj
    const { name } = file

    return (
      <div
        key={ i }
        className={ styles.validationMessage }>
        <strong>{ name }</strong>: { message }
        <button
          className= { styles.validationMessage_close}
          data-uid={ uid }
          onClick={ this.removeInvalidFile }>
          { String.fromCharCode(215) }
        </button>
      </div>
    )
  },

  /**
   * renderInvalidFiles
   * Iterate errors and call renderInvalidFile() for each object
   * @param  {Array}
   * @return {vnode}
   */

  renderInvalidFiles (errors) {
    return (
      <div className={ styles.validationMessages }>
        { errors.map(this.renderInvalidFile) }
      </div>
    )
  },

  /**
   * renderPreviewItem
   * Take a file object and an index value
   * @param  {Object} file
   * @param  {Number} idx
   * @return {vnode}
   */

  buildThumbnailPreview (path) {
    const pattern = /([^/]*)$/
    const splitPath = path.split(pattern)
    return 'http://attache.icelab.com.au/view/' + splitPath[0] + '50x/' + splitPath[1]
  },

  /**
   * renderUploadedFileItem
   * Render an node represeting an uploaded file
   * @param  {Object} fileObject
   * @param  {Number} idx
   * @return {vnode}
   */

  renderUploadedFileItem (fileObject, idx) {
    const { file, uid, path } = fileObject
    const { name } = file

    return (
      <div className={ styles.listItem } key={ idx }>
        <div className={ styles.listItem__body }>
          <div className={ styles.listItem__img }>
            <img src={ this.buildThumbnailPreview(path) } alt={ name }/>
          </div>
          <span className={ styles.listItem__title }>{ name }</span>
        </div>
        <button
          className={ styles.close }
          onClick={ this.removeUploadedFile }
          data-uid={ uid } >{ String.fromCharCode(215) }</button>
      </div>
    )
  },

  /**
   * renderUploadedFiles
   * Render existing uploaded files
   * @param  {Array} files
   * @return {vnode}
   */

  renderUploadedFiles (files) {
    return (
      <div className={ styles.uploadedItems }>
        { files.map(this.renderUploadedFileItem) }
      </div>
    )
  },

  /**
   * render
   * @return {vnode}
   */

  render () {
    const { errors, hint, label, name, multiple } = this.props
    const hasErrors = errors.count() > 0
    const {
      XHRErrorMessages,
      uploadedFiles,
      invalidFiles,
      previewFiles
    } = this.state

    return (
      <div>
        <div className=''>
          <FieldHeader
            error={ hasErrors }
            hint={ hint }
            id={ name }
            label={ label }
          />
        </div>
        <div className ={ styles.field }>
          { XHRErrorMessages.length > 0 ? this.renderXHRErrorMessages(XHRErrorMessages) : null }
          { invalidFiles.length > 0 ? this.renderInvalidFiles(invalidFiles) : null }
          { previewFiles.length > 0 ? this.renderPreviewItems(previewFiles) : null }
          { uploadedFiles.length > 0 ? this.renderUploadedFiles(uploadedFiles) : null }
          { hasErrors ? <FieldErrors errors={ errors }/> : null }
          <Dropzone
            multiple={ multiple }
            text={ label }
            onChange={ this.onChange }
          />
        </div>
      </div>
    )
  }
})

export default MultiUploadField
