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
    text: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    renderPreview: React.PropTypes.bool,
    multiple: React.PropTypes.bool
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
   * onDragEnter
   * Set `highlight` to true
   */

  onDragEnter (e) {
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
    document.addEventListener('dragenter', this.onDragEnter)
    document.addEventListener('dragleave', this.onDragLeave)
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

  onOpenClick (e) {
    e.preventDefault()
    this.refs.dropzone.open();
  },

  /**
   * renderPreview
   * Optinally render a preview for any files
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
   * render
   * @return {vnode}
   */

  render () {
    const {files, highlight} = this.state
    const {text, renderPreview, multiple, children, disableClick, hideDropZoneBtn} = this.props

    let label
    if (multiple && !text) {
      label = 'Drop/Upload Files'
    } else if (!multiple && !text) {
      label = 'Drop/Upload File'
    } else {
      label = text
    }

    let dropZoneClassNames = classNames(
      'js-dropzone',
      styles.dropzone,
      {
        [`${styles.dropzone__highlight}`]: highlight
      }
    )

    return (
      <div>
        <div className='dropzone__container'>
          {!hideDropZoneBtn ? <button onClick={this.onOpenClick}>Click me</button>: null}
          <Dropzone
            disableClick={ disableClick }
            activeClassName={styles.dropzone__active}
            className={dropZoneClassNames}
            multiple={multiple}
            onDrop={this.onDrop}
            ref='dropzone'
            style={{}}
          >
            {children}
          </Dropzone>
        </div>
        {renderPreview && files.length > 0 ? this.renderPreview(files) : null}
      </div>
    )
  }
})
