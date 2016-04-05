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
 * generateUniqueID
 * @return {[type]} [description]
 */

function generateUniqueID (file_name) {
  return uid(10) + '_' + file_name
}

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
      XHRErrorMessage: null,
      uploadedFiles: this.props.uploadedFiles || [],
      previewFiles: []
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
      XHRErrorMessage: null,
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

  updateUploadedFiles (file) {
    let previewFiles = this.state.previewFiles.filter((preview) => {
      return preview.name !== file.name
    })

    let uploadedFiles = this.state.uploadedFiles.slice(0)
    uploadedFiles.push(file)

    this.setState({
      uploadedFiles,
      previewFiles
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

  uploadFile (obj) {
    if (!obj) return
    const { presign_url } = this.props.attributes
    const { token } = this.props
    const { file } = obj
    const self = this

    preSign(file, presign_url, token)
      .then((presignResponse) => {
        return upload(presignResponse, file, token, self.onProgress)
      })
      .then((uploadResponse) => {
        console.log('uploadResponse', uploadResponse)
        self.updateUploadedFiles(file)
      })
      .catch((err) => {
        let error = new Error(err.message)
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
    let invalidFiles = []

    // iterate and validate
    files.map(file => {
      status = validate(file)
      if (!status.success) {
        invalidFiles.push(status)
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

    // Create objects of valid files and assign to `previewFiles`
    // each 'file' object looks something like:
    // {
    //   name: small.jpg,
    //   file: {file},
    //   uid: "wyertyiopdop_small.jpg"
    // }
    if (!validFiles.length) return
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
      this.uploadFile(file)
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
   * renderResult
   * Render the URL for the uploaded file
   * @param  {String} url
   * @return {vnode}
   */

  renderResult (url, error) {
    let result = error || url
    return (
      <div className={ styles.result }>
        <button className={ styles.close } onClick={ this.close }>
          <span className={ styles.closeText }>Close</span>
          <div className={ styles.closeX }>{ String.fromCharCode(215) }</div>
        </button>
        <div className={ styles.message }>
          { result }
        </div>
      </div>
    )
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
   * renderValidationMessage
   * Render a file validation message
   * @param  {Object} error
   * @param  {Number} i
   * @return {vnode}
   */

  renderValidationMessage (error, i) {
    const { message, file } = error
    const { name } = file
    return <div key={ i }>{ name }: { message }</div>
  },

  /**
   * renderValidationErrors
   * Iterate errors and call renderValidationMessage() for each object
   * @param  {Array}
   * @return {vnode}
   */

  renderValidationErrors (errors) {
    return (
      <div className='validationMessages'>
        { errors.map(this.renderValidationMessage) }
      </div>
    )
  },

  /**
   * removeUploadedFile
   * remove the selected file from `uploadedFiles`
   * @param  {Event} e - click
   */

  removeUploadedFile (e) {
    e.preventDefault()
    const name = e.target.getAttribute('data-name')
    console.log('remove: ', name)

    const uploadedFiles = this.state.uploadedFiles.filter((file) => {
      return file.name !== name
    })

    this.setState({
      uploadedFiles
    })
  },

  /**
   * renderPreviewItem
   * Take a file object and an index value
   * @param  {Object} file
   * @param  {Number} idx
   * @return {vnode}
   */

  renderUploadedFileItem (file, idx) {
    const { name, preview } = file

    return (
      <div className={ styles.listItem } key={ idx }>
        <div className={ styles.listItem__body }>
          <div className={ styles.listItem__img }>
            <img src={ preview } alt={ name }/>
          </div>
          <span className={ styles.listItem__title }>{ name }</span>
        </div>
        <button
          className={ styles.close }
          onClick={ this.removeUploadedFile }
          data-name={ name } >{ String.fromCharCode(215) }</button>
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
      XHRErrorMessage,
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
          { XHRErrorMessage ? this.renderResult(XHRErrorMessage) : null }

          <Dropzone
            multiple={ multiple }
            text={ label }
            onChange={ this.onChange }
          />

        { invalidFiles ? this.renderValidationErrors(invalidFiles) : null }
          { previewFiles.length > 0 ? this.renderPreviewItems(previewFiles) : null }
          { uploadedFiles.length > 0 ? this.renderUploadedFiles(uploadedFiles) : null }
          { hasErrors ? <FieldErrors errors={ errors }/> : null }
        </div>
      </div>
    )
  }
})

export default MultiUploadField
