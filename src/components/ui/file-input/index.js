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
   * getDefaultProps
   */

  getDefaultProps () {
    return {
      resetInput: false
    }
  },

  /**
   * clearInput
   * reset teh value of the file input
   */

  clearInput() {
    this.refs.fileInput.value = ""
  },

  /**
   * componentWillReceiveProps
   * Check if we need to reset the file input
   */

  componentWillReceiveProps (nextProps) {
    if (nextProps.clearInput) {
      this.clearInput()
    }
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
          ref="fileInput"
          type='file'
          className={ className }
          name={ name }
          id={ name }
          onChange={ onChange } />
      </div>
    )
  }
})
