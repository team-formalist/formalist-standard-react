import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styles from './section.mcss'

const Section = React.createClass({

  propTypes: {
    hashCode: React.PropTypes.number.isRequired,
    type: React.PropTypes.string,
    attributes: ImmutablePropTypes.map,
    name: React.PropTypes.string,
    children: ImmutablePropTypes.list,
  },

  shouldComponentUpdate (nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return (this.props.hashCode !== nextProps.hashCode)
  },

  render () {
    let label = this.props.attributes.get('label') || this.props.name.replace(/_/, ' ')
    return (
      <section className={styles.base}>
        <h2 className={styles.label}>{label}</h2>
        <div className={styles.children}>
          {this.props.children}
        </div>
      </section>
    )
  },
})

export default Section
export let SectionFactory = React.createFactory(Section)
