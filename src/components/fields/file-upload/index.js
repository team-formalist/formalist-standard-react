import React from 'react'
// import classNames from 'classnames'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import FileInput from '../../ui/file-input'
import { validate } from './validation.js'
import { upload, preSign } from './upload-to-S3.js'

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

  /**
   * getInitialState
   * @return {Object}
   */

  getInitialState () {
    return {
      inProgress: false
    }
  },

  /**
   * onChange
   * @param  {Event} e
   * @return {[type]}   [description]
   */

  onChange (e) {
    const file = e.target.files[0]
    if (!file) return

    const self = this
    const { presign_url } = this.props.attributes

    // validate the file
    // then => request a presign to upload file
    // then => update the component state
    // then => upload the file
    // then => update the component state again
    // then => do something useful like show a preview

    validate(file) // 1
      .then(preSign(file, presign_url, 'token'))
      .then((data) => {
        self.setState({
          inProgress: true
        })
        upload(data, file, 'token')
      })
      .then((res) => {
        self.setState({
          inProgress: false
        })
        console.log('res', res)
      })
      .catch((err) => {
        self.setState({
          inProgress: false
        })
        console.log('err', err)
      })
  },

  /**
   * render
   * @return {vnode}
   */

  renderLoadingMessage () {
    return (
      <div>I'm Loading</div>
    )
  },

  render () {
    const { errors, hint, label, name } = this.props
    const hasErrors = errors.count() > 0
    const { inProgress } = this.state

    return (
      <div className=''>
        { inProgress ? this.renderLoadingMessage() : null }
        <div className=''>
          <FieldHeader
            error={ hasErrors }
            hint={ hint }
            id={ name }
            label={ label }
          />
        </div>
        <div className=''>
          <FileInput
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
