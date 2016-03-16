import React from 'react'
// import classNames from 'classnames'
// import styles from './index.mcss'

export default React.createClass({

  /**
   * displayName
   */

  displayName: 'FileInput',

  /**
   * propTypes
   */

  propTypes: {
    className: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  /**
   * render
   * @return {vnode}
   */

  render () {
    const { name, onChange, className } = this.props

    return (
      <div className={ className }>
        <input
          type='file'
          className={ className }
          name={ name }
          id={ name }
          onChange={ onChange } />
      </div>
    )
  }
})
