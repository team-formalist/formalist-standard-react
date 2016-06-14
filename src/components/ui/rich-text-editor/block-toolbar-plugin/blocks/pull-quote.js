import React from 'react'
import { EditorBlock } from 'draft-js'

const PullquoteBlock = React.createClass({
  render () {
    return (
      <div className="rte-block__pullquote">
        <EditorBlock {...this.props}/>
      </div>
    )
  }
})

export default PullquoteBlock
