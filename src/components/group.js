import React from 'react'

import styles from './group.mcss'

const Group = React.createClass({
  shouldComponentUpdate (nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return (this.props.key !== nextProps.key)
  },

  render () {
    return (
      <div className={styles.group}>
        {this.props.children.map((child, index) => <div key={index} className={styles.item}>{child}</div>)}
      </div>
    )
  }
})

export default Group
export let GroupFactory = React.createFactory(Group)
