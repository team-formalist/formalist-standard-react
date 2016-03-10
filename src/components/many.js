import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styles from './many.mcss'

const ManySet = React.createClass({
  propTypes: {
    children: React.PropTypes.array
  },

  render () {
    return (
      <div className={styles.set}>
        {this.props.children}
      </div>
    )
  }
})

const Many = React.createClass({
  propTypes: {
    hashCode: React.PropTypes.number.isRequired,
    name: React.PropTypes.string,
    type: React.PropTypes.string,
    rules: ImmutablePropTypes.list,
    errors: ImmutablePropTypes.list,
    attributes: ImmutablePropTypes.map,
    template: React.PropTypes.object,
    children: ImmutablePropTypes.list
  },

  shouldComponentUpdate (nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return (this.props.hashCode !== nextProps.hashCode)
  },

  render () {
    let { attributes, children, name } = this.props
    let label = attributes.get('label') || name.replace(/_/, ' ')

    return (
      <div className={styles.base}>
        <h3 className={styles.label}>{label}</h3>
        <div className={styles.controls}><button>Add new {name.replace(/_/, ' ')}</button></div>
        {children.map((setChildren) => (
          <ManySet>
            {setChildren}
          </ManySet>
        ))}
      </div>
    )
  }
})

export default Many
export let ManyFactory = React.createFactory(Many)
