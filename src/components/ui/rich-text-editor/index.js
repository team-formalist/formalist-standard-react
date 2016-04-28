import React from 'react'
import Editor from 'draft-js-plugins-editor'
import {fromJS} from 'immutable'

// Plugins
import autoListPlugin from 'draft-js-autolist-plugin'
import './tmp.css'


import createMentionPlugin from 'draft-js-mention-plugin'
import 'draft-js-hashtag-plugin/lib/plugin.css'

const mentions = fromJS([
  {
    name: 'Max Stoiber',
    link: 'https://twitter.com/mxstbr',
    avatar: 'https://pbs.twimg.com/profile_images/681114454029942784/PwhopfmU_400x400.jpg',
  },
  {
    name: 'Nik Graf',
    link: 'https://twitter.com/nikgraf',
    avatar: 'https://pbs.twimg.com/profile_images/535634005769457664/Ppl32NaN_400x400.jpeg',
  },
])

const mentionPlugin = createMentionPlugin({
  mentions
})
const { MentionSuggestions } = mentionPlugin

const RichTextEditor = React.createClass({
  propTypes: {
  },

  getInitialState () {
    const { editorState, onChange } = this.props

    return {
      plugins: [
        autoListPlugin(),
        mentionPlugin
      ]
    }
  },

  render () {
    const { editorState, onChange } = this.props

    return (
      <div className={this.props.className}>
        <Editor editorState={editorState} onChange={onChange} plugins={this.state.plugins}/>
        <MentionSuggestions onSearchChange={({value}) => console.log(value)} suggestions={mentions}/>
      </div>
    )
  }
})


/**
 * Plugins
 */


export default RichTextEditor
