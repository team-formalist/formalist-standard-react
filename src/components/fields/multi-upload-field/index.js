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
 * @param {object} obj
 * @param {array} list
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
 * EXAMPLE PROP FILES
 * An example of previously uploaded files being passed in via props
 * Note: geometry is not being used as yet, but is saved to all
 * file objects created after a successful upload
 *
 * WHY?!
 * We need to give each file a unique id. Instead of jamming it
 * into the actual file object itself, we creat a wrapping objects
 * with all the specific properties we need
 */

// const propFiles = [
//   {
//     name: 'boo.jpg',
//     path: 'b6/4c/62/82/87/6c/f6/33/0a/14/89/55/59/48/ed/e0/sagrada.jpg',
//     geometry: '300x300',
//     uid: 'sdsads_boo.jpg'
//   },
//   {
//     name: 'baz.jpg',
//     path: '49/29/fe/c3/f7/9f/a7/28/76/48/84/9c/17/88/68/bb/sunglasses.jpg',
//     geometry: '300x300',
//     uid: 'sdsads_baz.jpg'
//   }
// ]

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
   * Assign existing uploaded files to `uploadedFiles`
   * See the example `propFiles` format above
   * @return {object}
   */

  getInitialState () {
    return {
      uploadedFiles: this.props.uploadedFiles || []
    }
  },

  /**
   * createFileObjects
   * Create a file object for a file
   * A file object includes the name, the file and a uid
   *
   * {
   * 		name: small.jpg,
   * 		file: { file },
   * 		uid: "wyertyiopdop_small.jpg"
   * }
   *
   * @param {array || object} val - a existing file object or an array of dropped files
   * @return {array || object} an array of objects - of just an object
   */

  createFileObjects (val) {
    // format the object
    function formatObject (file) {
      const { name } = file
      return {
        file,
        name,
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
    const { name } = file
    let previewFiles = this.state.previewFiles
      ? this.state.previewFiles.slice(0)
      : []

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
   * updateUploadedFiles
   * Take a `file`.
   * Iterate previewFiles aand returna ll files that are not `file`
   * Push `file` into uploadedFiles and save the state
   * @param {object} a file object
   */

  updateUploadedFiles (fileObject, response) {
    const { path, geometry } = response

    let previewFiles = this.state.previewFiles.filter((preview) => {
      return preview.name !== fileObject.name
    })

    let uploadedFiles = this.state.uploadedFiles
      ? this.state.uploadedFiles.slice(0)
      : []

    if (containsObject(fileObject, uploadedFiles)) {
      uploadedFiles.filter((existingFile) => {
        return existingFile.uid !== fileObject.uid
      })
    } else {
      // same XHR response properties to file object
      fileObject.path = path
      fileObject.geometry = geometry
      uploadedFiles.push(fileObject)
    }

    this.setState({
      uploadedFiles,
      previewFiles
    })
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

  uploadFile (fileObject, onProgress = noOp) {
    if (!fileObject) return
    const { presign_url } = this.props.attributes
    const { token } = this.props
    const self = this

    preSign(fileObject, presign_url, token)
      .then((presignResponse) => {
        return upload(presignResponse, fileObject, token, onProgress)
      })
      .then((uploadResponse) => {
        self.updateUploadedFiles(fileObject, uploadResponse)
      })
      .catch((err) => {
        this.removeFileFromPreviewFiles(fileObject)
        let error = new Error(err.message)
        self.storeXHRErrorMessage(err.message)
        throw error
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

    let status
    let validFiles = []
    let invalidFiles = this.state.invalidFiles
      ? this.state.invalidFiles.slice(0)
      : []

    // iterate and validate each file
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

    // store invalid files to `invalidFiles`
    if (invalidFiles.length) {
      this.setState({
        invalidFiles
      })
    }

    if (!validFiles.length) return

    // Create 'file objects' of valid files and assign to `previewFiles`
    let previewFiles = validFiles.map(file => {
      return this.createFileObjects(file)
    })

    this.setState({
      previewFiles
    })

    // upload each valid file and passing in a progress event handler
    previewFiles.map(fileObject => {
      this.uploadFile(fileObject, this.onProgress)
    })
  },

  /**
   * renderPreviewItem
   * Take a file object and an index value
   * @param {object} an object containing {file, name, uid, progress}
   * @param {number} i
   * @return {vnode}
   */

  renderPreviewItem (fileObject, i) {
    const { progress, file, uid, name } = fileObject
    const { preview } = file

    let inlineStyleWidth = {
      width: progress ? (progress + '%') : '0%'
    }

    return (
      <div className={ styles.listItem } key={ i }>
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
   * @param {array} and array of file objects
   * @return {vnode}
   */

  renderPreviewItems (fileObjects) {
    return (
      <div className={ styles.previewItems }>
        { fileObjects.map(this.renderPreviewItem)}
      </div>
    )
  },

  /**
   * filterOutItemByUID
   * Iterate an array in state, filtering out a specific `uid`
   * @param {string} stateProperty - a name for an array in state
   * @param {event} e - click event
   * @return {array}
   */

  filterOutItemByUID (stateProperty, e) {
    const uid = e.target.getAttribute('data-uid')

    return this.state[stateProperty].filter((file) => {
      return file.uid !== uid
    })
  },

  /**
   * removeUploadedFile
   * Filter out an file by `uid`
   * Send the remaining files to this.uploadFile()
   * save remaining files to state
   * @param {Event} e - click
   */

  removeUploadedFile (e) {
    e.preventDefault()
    const uploadedFiles = this.filterOutItemByUID('uploadedFiles', e)

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
   * @param {event} e - click
   */

  removeInvalidFile (e) {
    e.preventDefault()
    const invalidFiles = this.filterOutItemByUID('invalidFiles', e)

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
    const previewFiles = this.filterOutItemByUID('previewFiles', e)

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
    const XHRErrorMessages = this.filterOutItemByUID('XHRErrorMessages', e)
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
    const { message, uid } = errorObject

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
   * renderXHRErrorMessages
   * Iterate error objects and call renderXHRErrorMessage() for each object
   * @param {array} XHRErrorObjects - an array of error objects
   * @return {vnode}
   */

  renderXHRErrorMessages (XHRErrorObjects) {
    return (
      <div className={ styles.validationMessages }>
        { XHRErrorObjects.map(this.renderXHRErrorMessage) }
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
    const { message, file, uid } = errorObject
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
   * Iterate error objects and call renderInvalidFile() for each object
   * @param {array} and array of error objects
   * @return {vnode}
   */

  renderInvalidFiles (errorsObjects) {
    return (
      <div className={ styles.validationMessages }>
        { errorsObjects.map(this.renderInvalidFile) }
      </div>
    )
  },

  /**
   * buildThumbnailPreview
   * Take a path and split it before the file name.
   * Insert a preview dimension and return
   * @param {string} path
   * @return {string}
   */

  buildThumbnailPreview (path) {
    const pattern = /([^/]*)$/
    const splitPath = path.split(pattern)
    return 'http://attache.icelab.com.au/view/' + splitPath[0] + '50x/' + splitPath[1]
  },

  /**
   * renderUploadedFileItem
   * Render an node represeting an uploaded file
   * @param {object} fileObject
   * @param {number} idx
   * @return {vnode}
   */

  renderUploadedFileItem (fileObject, idx) {
    const { file, uid, path, name } = fileObject

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
   * @param {array} and array of file objects
   * @return {vnode}
   */

  renderUploadedFiles (filesObjects) {
    return (
      <div className={ styles.uploadedItems }>
        { filesObjects.map(this.renderUploadedFileItem) }
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
          { XHRErrorMessages && XHRErrorMessages.length > 0 ? this.renderXHRErrorMessages(XHRErrorMessages) : null }
          { invalidFiles && invalidFiles.length > 0 ? this.renderInvalidFiles(invalidFiles) : null }
          { previewFiles && previewFiles.length > 0 ? this.renderPreviewItems(previewFiles) : null }
          { uploadedFiles && uploadedFiles.length > 0 ? this.renderUploadedFiles(uploadedFiles) : null }
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
