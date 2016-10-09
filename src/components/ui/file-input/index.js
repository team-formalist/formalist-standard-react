import React from 'react'
import triggerEvent from 'trigger-event'

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
    onChange: React.PropTypes.func.isRequired,
  },

  /**
   * getDefaultProps
   */

  getDefaultProps () {
    return {
      resetInput: false,
    }
  },

  /**
   * onClearInput
   * reset teh value of the file input
   */

  onClearInput () {
    this.refs.fileInput.value = ''
  },

  /**
   * triggerClickEvent
   * Clear the input
   */

  triggerClickEvent () {
    triggerEvent(this.refs.fileInput, 'click')
  },

  /**
   * componentWillReceiveProps
   * Check if we need to reset the file input
   */

  componentWillReceiveProps (nextProps) {
    if (nextProps.clearInput) {
      this.onClearInput()
    }

    if (nextProps.triggerClick) {
      this.triggerClickEvent()
    }
  },

  /**
   * render
   * @return {vnode}
   */

  render () {
    const {name, onChange, className} = this.props

    return (
      <div className={className}>
        <input
          ref='fileInput'
          type='file'
          className={className}
          name={name}
          id={name}
          onChange={onChange} />
      </div>
    )
  },
})
