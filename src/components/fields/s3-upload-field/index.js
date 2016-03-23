import React from 'react'
// import classNames from 'classnames'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Dropzone from '../../ui/dropzone'
import { validate } from './validation.js'
import { upload, preSign } from './upload-to-S3.js'
import bus from './bus'
import styles from './index.mcss'

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
    value: React.PropTypes.string
  },

  /**
   * getInitialState
   * @return {Object}
   */

  getInitialState () {
    return {
      progressValue: 0,
      uploadURL: null,
      XHRErrorMessage: null,
      files: []
    }
  },

  /**
   * abortRequest
   * abort the upload request and reset state
   * emit a custom event out to the XHR in upload-to-S3.js
   * @param  {Event} e - click
   */

  abortUploadRequest (e) {
    e.preventDefault()
    this.resetState()
    bus.emit('abortUploadRequest')
  },

  /**
   * onProgress
   * set the upload percentage to `progressValue`
   * @param  {Event} e - XHR progress
   */

  onProgress (e) {
    this.setState({
      progressValue: e.percent
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
      uploadURL: null,
      XHRErrorMessage: null,
      files: []
    })
  },

  /**
   * onChange
   * @param  {Event} e
   * @return {[type]}   [description]
   */

  // onDrop: function(files){
  //   var req = request.post('/upload');
    // files.forEach((file)=> {
    //   req.attach(file.name, file);
    // });
  //   req.end(callback);
  // }

  onChange (files) {
    if (!files.length) return
    const { presign_url } = this.props.attributes
    const { token, fileType, maxFileSize } = this.props
    const self = this

    this.setState({
      files: files
    })

    // validate the file
    //  => request a presign to upload file
    //  => show progress
    //     pass presignResponse and onProgress handler to 'upload'
    //  => set the uploadResponse to state

    validate(files, fileType, maxFileSize)
      .then(() => {
        return preSign(files, presign_url, token)
      })
      .then((presignResponse) => {
        return upload(presignResponse, files, token, self.onProgress)
      })
      .then((uploadResponse) => {
        self.setState({
          uploadURL: uploadResponse.upload_url
        })
      })
      .catch((err) => {
        self.setState({
          XHRErrorMessage: err.message
        })
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
   * Render the URL for the uploaded asset
   * @param  {String} url
   * @return {vnode}
   */

  renderResult (url, error) {
    let result = error || url
    return (
      <div className={ styles.result }>
        <span
          className={ styles.close }
          onClick={ this.close }>x</span>
        <div className={ styles.message }>
          { result }
        </div>
      </div>
    )
  },

  /**
   * renderProgress
   * display the upload progress of uploaded asset
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
        <div className={ styles.body }>
          <span
            className={ styles.close__white }
            onClick={ this.abortUploadRequest }>x</span>
          <div className={ styles.message }>
            Uploading { filesNames.join(', ')}
            <span className={ styles.percentage }>
              { val + '%' }
            </span>
          </div>
        </div>
        <span
          className={ styles.progress_bar }
          style={ inlineStyleWidth }></span>
      </div>
    )
  },

  /**
   * render
   * @return {vnode}
   */

  render () {
    const { errors, hint, label, name } = this.props
    const hasErrors = errors.count() > 0
    const {
      progressValue,
      uploadURL,
      XHRErrorMessage,
      files
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
          { progressValue > 0 && !uploadURL ? this.renderProgress(progressValue, files) : null }
          { uploadURL || XHRErrorMessage ? this.renderResult(uploadURL, XHRErrorMessage) : null }

          <Dropzone
            text={ label }
            onChange={ this.onChange }
          />

          { (hasErrors) ? <FieldErrors errors={errors}/> : null }
        </div>
      </div>
    )
  }
})
