import React from 'react'
// import classNames from 'classnames'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import FileInput from '../../ui/file-input'
import { validate } from './validation.js'
import upload from './upload.js'

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
    errors: ImmutablePropTypes.list,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    presign_url: React.PropTypes.string,
    token: React.PropTypes.string
  },

  /**
   * onChange
   * @param  {Event} e
   * @return {[type]}   [description]
   */

  onChange (e) {
    const file = e.target.files[0]
    if (!file) return
    const { presign_url, token } = this.props

    validate(file, (status) => {
      console.log(status)

      upload(file, 'https://api.myjson.com/bins/1aceb', token)
        .then(function (res) {
          debugger
        })
    })
  },

  /**
   * render
   * @return {vnode}
   */

  render () {
    const { errors, hint, label, name } = this.props
    const hasErrors = errors.count() > 0

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
