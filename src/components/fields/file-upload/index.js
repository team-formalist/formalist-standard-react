import React from 'react'
// import classNames from 'classnames'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import FileInput from '../../ui/file-input'

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
    name: React.PropTypes.string,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list
  },

  /**
   * onChange
   * @param  {Event} e
   * @return {[type]}   [description]
   */

  onChange (e) {
    e.preventDefualt
    console.log('test')
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
