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
    dropzoneLabel: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    renderPreview: React.PropTypes.bool,
    multiple: React.PropTypes.bool,
    children: React.PropTypes.node,
    disableClick: React.PropTypes.bool,
    hideDropZoneBtn: React.PropTypes.bool
  },

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
      highlight: false
    }
  },

  /**
   * onDragOver
   * Set `highlight` to true
   */

  onDragOver (e) {
    e.preventDefault()
    this.setState({
      highlight: true
    })
  },

  /**
   * onDragLeave
   * Set `highlight` to false
   */

  onDragLeave (e) {
    e.preventDefault()
    this.setState({
      highlight: false
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
   * of this.props.onChange exists - pass it files.
   * set files on this.state
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
   * renderDropzoneLabel
   * Render a label for the dropzone
   * @param  {string} label
   * @return {vnode}
   */

  renderDropzoneLabel (label) {
    return (
      <span className={styles.dropzone__label}>
        {label != null
          ? label
          : 'Drop image to upload'}
      </span>
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
   * render
   * @return {vnode}
   */

  render () {
    const {files, highlight} = this.state
    const {buttonText, dropzoneLabel, renderPreview, multiple, children, disableClick, hideDropZoneBtn} = this.props

    let dropZoneClassNames = classNames(
      styles.dropzone,
      {
        [`${styles.dropzone__disable_hover}`]: children,
        [`${styles.dropzone__highlight}`]: highlight
      }
    )

    return (
      <div>
        <div className='dropzone__container'>
          {!hideDropZoneBtn
            ? this.renderButton(buttonText)
            : null}
          <Dropzone
            disableClick={disableClick}
            activeClassName={styles.dropzone__active}
            className={dropZoneClassNames}
            multiple={multiple}
            onDrop={this.onDrop}
            ref='dropzone'
            style={{}}
          >
            {children}
            {this.renderDropzoneLabel(dropzoneLabel)}
          </Dropzone>
        </div>
        {renderPreview && files.length > 0 ? this.renderPreview(files) : null}
      </div>
    )
  }
})
