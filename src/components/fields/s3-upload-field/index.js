import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import uid from 'uid'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Dropzone from '../../ui/dropzone'
import validate from './validation.js'
import { upload, preSign } from './upload-to-S3.js'
import bus from './bus'
import styles from './index.mcss'

/**
 * generateUniqueID
 * @return {[type]} [description]
 */

function generateUniqueID (file_name) {
  return uid(10) + '_' + file_name
}

export default React.createClass({

  /**
   * displayName
   */

  displayName: 'FileUploadField',

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
    multiple: React.PropTypes.bool
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
    const { name, uid } = file
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
   * uploadFile
   * Create a new uid for this XHR request of this file
   * Take a file and call `preSign` passing it's response to `upload`
   * On completion of 'upload' save the file to `uploadedFiles`
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
        let uploadedFiles = self.state.uploadedFiles.slice(0)
        uploadedFiles.push(file)
        self.setState({
          uploadedFiles
        })
      })
      .catch((err) => {
        let error = new Error(err)
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

    // Save valid files
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
   * @param  {Object} file
   * @param  {Number} idx
   * @return {vNode}
   */

  renderPreviewItem (file, idx) {
    const { preview, name, progress, uid } = file
    let inlineStyleWidth = {
      width: progress + '%'
    }

    return (
      <div className={ styles.previewItem } key={ idx }>
        <div className={ styles.previewItem__body }>
          <div className={ styles.previewImg }>
            <img src={ preview } alt={ name }/>
          </div>
          <span className={ styles.previewTitle }>{ name }</span>
        </div>
        <button className={ styles.close } onClick={ this.abortUploadRequest }>
          <span className={ styles.closeText }>Close</span>
          <div className={ styles.closeX__white } data-uid={ uid }>{ String.fromCharCode(215) }</div>
        </button>
        <span
          className={ styles.progress_bar }
          style={ inlineStyleWidth }></span>
      </div>
    )
  },

  /**
   * renderPreview
   * Take an array of file objects, iterate & pass to renderPreviewItem()
   * @param  {Array} files
   * @return {vNode}
   */

  renderPreview (files) {
    return (
      <div className={ styles.previewItems }>
        { files.map(this.renderPreviewItem)}
      </div>
    )
  },

  /**
   * renderProgress
   * display the upload progress of uploaded file
   * @param  {Number} val - XHR progress event
   * @return {vnode}
   */

  renderProgress (val, files) {
    let inlineStyleWidth = {
      width: val + '%'
    }

    let filesNames = files.map((file) => {
      return file.name
    })

    return (
      <div className={ styles.progress }>
        <button className={ styles.close } onClick={ this.abortUploadRequest }>
          <span className={ styles.closeText }>Close</span>
          <div className={ styles.closeX__white }>{ String.fromCharCode(215) }</div>
        </button>
        <div className={ styles.message }>
          Uploading <span className={ styles.percentage }>{ val + '%' }</span>
        </div>
        <span
          className={ styles.progress_bar }
          style={ inlineStyleWidth }></span>
      </div>
    )
  },

  renderValidationMessage (error, i) {
    const { message, file } = error
    const { name } = file
    return <div key={ i }>{ name }: { message }</div>
  },

  renderValidationErrors (errors) {
    return (
      <div className="validationMessages">
        { errors.map(this.renderValidationMessage) }
      </div>
    )
  },

  renderUploadedFiles (files) {
    return (
      <div className={ styles.uploadedItems }>
        { files.map(this.renderPreviewItem)}
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
      progressValue,
      uploadURL,
      XHRErrorMessage,
      files,
      uploadedFiles,
      invalidFiles,
      previewFiles
    } = this.state

    // console.log('render', uploadedFiles)
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
            multiple={ (multiple === false) ? false : true }
            text={ label }
            onChange={ this.onChange }
          />

        { invalidFiles ? this.renderValidationErrors(invalidFiles) : null }
          { previewFiles.length > 0 ? this.renderPreview(previewFiles) : null }
          { uploadedFiles.length > 0 ? this.renderUploadedFiles(uploadedFiles) : null }

          { hasErrors ? <FieldErrors errors={ errors }/> : null }
        </div>
      </div>
    )
  }
})
