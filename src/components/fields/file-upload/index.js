import React from 'react'
// import classNames from 'classnames'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import FileInput from '../../ui/file-input'
import { validate } from './validation.js'
import { upload, preSign } from './upload-to-S3.js'

import bus from './bus'


// Import styles
// import styles from './index.mcss'

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
    token: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      token: ''
    }
  },

  /**
   * getInitialState
   * @return {Object}
   */

  getInitialState () {
    return {
      showProgress: false,
      progressValue: 0,
      clearInput: false,
      uploadURL: null
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
      showProgress: false,
      uploadUrl: null,
      clearInput: true
    })
  },

  /**
   * onChange
   * @param  {Event} e
   * @return {[type]}   [description]
   */

  onChange (e) {
    const file = e.target.files[0]
    if (!file) return

    const { presign_url } = this.props.attributes
    const { token } = this.props
    const self = this

    // validate the file
    //  => request a presign to upload file
    //  => show progress
    //     pass presignResponse and onProgress handler to 'upload'
    //  => set the uploadResponse to state

    validate(file)
      .then(() => {
        return preSign(file, presign_url, token)
      })
      .then((presignResponse) => {
        self.showProgress()
        return upload(presignResponse, file, token, self.onProgress)
      })
      .then((uploadResponse) => {
        self.setState({
          uploadURL: uploadResponse.upload_url
        });
      })
      .catch((err) => {
        console.log('err', err)
      })
  },

  /**
   * closeProgressIndicator
   * reset state
   * @param  {Event} e - click
   */

  closeProgressIndicator (e) {
    e.preventDefault()
    this.resetState()
  },

  /**
   * renderProgressIndicator
   * display the upload progress or final URL of uploaded file
   * @param  {Number} val - XHR progress event
   * @param  {null / String} uploadURL - the file's url
   * @return {vnode}
   */

  renderProgressIndicator (val, uploadURL) {
    let text = uploadURL != null ? uploadURL : "Uploading"
    let action = uploadURL == null ? this.abortUploadRequest : this.closeProgressIndicator
    return (
      <div>
        { text } { !uploadURL ? val + "%" : null }
        <button onClick={ action }>x</button>
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
    const { progressValue, clearInput, uploadURL, showProgress } = this.state
    console.log('render', showProgress ? 'true' : 'false')
    return (
      <div className=''>
        <div className=''>
          <FieldHeader
            error={ hasErrors }
            hint={ hint }
            id={ name }
            label={ label }
          />
        </div>
        <div className=''>
          { showProgress ? this.renderProgressIndicator(progressValue, uploadURL) : null }
          <FileInput
            clearInput={ clearInput }
            error={ hasErrors }
            id={ name }
            name={ name }
            onChange={ this.onChange }
          />
          { (hasErrors) ? <FieldErrors errors={errors}/> : null }
        </div>
      </div>
    )
  }
})
