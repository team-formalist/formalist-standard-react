import React from 'react'
import Dropzone from 'react-dropzone'
import styles from './index.mcss'

export default React.createClass({

  /**
   * displayName
   */

  displayName: 'DropZone',

  /**
   * propTypes
   */

  propTypes: {
    text: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    renderPreview: React.PropTypes.bool
  },

  /**
   * getInitialState
   */

  getInitialState: function () {
    return {
      files: []
    }
  },

  /**
   * onDrop
   * of this.props.onChange exists - pass it files.
   * set files on this.state
   * @param  {Array} files
   */

  onDrop: function (files) {
    const { onChange } = this.props
    if (typeof (onChange) === 'function') onChange(files)
    this.setState({
      files: files
    })
  },

  /**
   * renderPreview
   * Optinally render a preview for any files
   * @param  {Array} files
   * @return {vnode}
   */

  renderPreview (files) {
    return (
      <div ke>
        <h2>Uploading { files.length } files...</h2>
        <div>{ files.map((file, i) => <img key={ i } src={ file.preview } />)}</div>
      </div>
    )
  },

  /**
   * render
   * @return {vnode}
   */

  render () {
    const { files } = this.state
    const { text, renderPreview } = this.props

    let foo = {
       background: 'red', // note the capital 'W' here
       padding: '30px',
       marginTop: '-10px'
    }

    return (
      <div className='dropzone'>
        <Dropzone
          onDrop={ this.onDrop }
          className={ styles.trigger }
          style={{}}
          activeClassName={ styles.pulse }>
          { text }
        </Dropzone>
        { renderPreview && files.length > 0 ? this.renderPreview(files) : null }
      </div>
    )
  }
})
