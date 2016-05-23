import React from 'react'
import Dropzone from 'react-dropzone'
import styles from './index.mcss'
import classNames from 'classnames'

export default React.createClass({

  /**
   * displayName
   */

  displayName: 'DropZone',

  /**
   * propTypes
   */

  propTypes: {
    buttonText: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    renderPreview: React.PropTypes.bool,
    multiple: React.PropTypes.bool,
    children: React.PropTypes.node,
    disableClick: React.PropTypes.bool,
    hideDropZoneBtn: React.PropTypes.bool
  },

  /**
   * getDefaultProps
   */

  getDefaultProps () {
    return {
      disableClick: false
    }
  },

  /**
   * getInitialState
   */

  getInitialState () {
    return {
      files: [],
      isActive: false
    }
  },

  /**
   * onDragOver
   * Set `isActive` to true
   */

  onDragOver (e) {
    e.preventDefault()
    const isActive = e.dataTransfer.types[0] === 'Files'
    if (isActive === this.state.isActive) return
    this.setState({
      isActive
    })
  },

  /**
   * onDragLeave
   * Set `isActive` to false
   */

  onDragLeave (e) {
    e.preventDefault()
    if (!this.state.isActive) return
    this.setState({
      isActive: false
    })
  },

  /**
   * componentDidMount
   * Create event listener for drag events on the body and update state
   */

  componentDidMount () {
    document.addEventListener('dragover', this.onDragOver)
    document.addEventListener('dragleave', this.onDragLeave)
    document.addEventListener('drop', this.onDragLeave)
  },

  /**
   * onDrop
   * If this.props.onChange exists - pass it files.
   * set files on this.state
   * if there is no `children` hide the dropzone (show it on receiveing props)
   * @param  {Array} files
   */

  onDrop (files) {
    const {onChange} = this.props
    if (typeof (onChange) === 'function') onChange(files)
    this.setState({
      files: files
    })
  },

  /**
   * onClick
   * Open the dropzone
   * @param  {event} e
   */

  onClick (e) {
    e.preventDefault()
    this.refs.dropzone.open()
  },

  /**
   * renderPreview
   * Optionally render a preview for any files
   * NOTE: this is mostly handled by the 'onChange' function
   * passed in and triggered  in 'onDrop'
   * @param  {Array} files
   * @return {vnode}
   */

  renderPreview (files) {
    return (
      <div>
        <h2>Uploading {files.length} files...</h2>
        <div>{files.map((file, i) => <img key={i} src={file.preview} />)}</div>
      </div>
    )
  },

  /**
   * renderButton
   * Render a button for the dropzone field
   * @param  {string} buttonText
   * @return {vnode}
   */

  renderButton (buttonText) {
    return (
      <button onClick={this.onClick} className={styles.dropzone__button}>
        {buttonText != null
          ? buttonText
          : 'Upload an image'}
      </button>
    )
  },

  /**
   * renderLabel
   * Render a label for the dropzone field
   * @param  {string} label
   * @return {vnode}
   */

  renderLabel (label) {
    return (
      <span className={styles.dropzone__label}>
        { label || 'Upload an image'}
      </span>
    )
  },

  /**
   * render
   * @return {vnode}
   */

  render () {
    const {files, isActive} = this.state
    const {
      buttonText,
      renderPreview,
      multiple,
      children,
      disableClick,
      hideDropZoneBtn,
      label
    } = this.props

    let dropZoneClassNames = classNames(
      styles.dropzone,
      {
        [`${styles.dropzone__empty}`]: !children,
        [`${styles.dropzone__disable_hover}`]: children,
        [`${styles.dropzone__drag_over}`]: isActive
      }
    )

    return (
      <div>
        <div className='dropzone__container'>
          {!hideDropZoneBtn
            ? this.renderButton(buttonText)
            : null}

          <div className={styles.parent}>
            <Dropzone
              disableClick={disableClick}
              activeClassName={styles.dropzone__active}
              className={dropZoneClassNames}
              multiple={multiple}
              onDrop={this.onDrop}
              ref='dropzone'
              style={{}}>
              {children}
              {this.renderLabel(label)}
            </Dropzone>
          </div>
        </div>
        {renderPreview && files.length > 0 ? this.renderPreview(files) : null}
      </div>
    )
  }
})
