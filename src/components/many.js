import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { actions } from 'formalist-compose'
import validation from 'formalist-validation'
const { addManyContent, deleteManyContent, reorderManyContents, validateMany } = actions

// Components
import FieldErrors from './fields/common/errors'
import Sortable from './ui/sortable'

// Styles
import styles from './many.mcss'

const ManySet = React.createClass({
  propTypes: {
    children: ImmutablePropTypes.list
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
    path: ImmutablePropTypes.list.isRequired,
    contentsPath: ImmutablePropTypes.list.isRequired,
    store: React.PropTypes.object.isRequired,
    type: React.PropTypes.string,
    rules: ImmutablePropTypes.list,
    errors: ImmutablePropTypes.list,
    attributes: ImmutablePropTypes.mapContains({
      label: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      add_label: React.PropTypes.string
    }),
    template: React.PropTypes.object,
    children: ImmutablePropTypes.list
  },

  /**
   * Set an initial `contentsKey` so we can reliably render changes to the
   * contents/children as they are sorted
   * @return {Object}
   */
  getInitialState () {
    return {
      contentsKey: Date.now()
    }
  },

  componentWillReceiveProps (nextProps) {
    // Naive check to see if the children have changed
    // so we can refresh the `contentsKey`
    if (this.props.children.count() !== nextProps.children.count()) {
      this.updateContentsKey()
    }
  },

  shouldComponentUpdate (nextProps, nextState) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    //
    // We also check the `contentsKey` we set in state
    return (this.props.hashCode !== nextProps.hashCode) || (this.state.contentsKey !== nextState.contentsKey)
  },

  updateContentsKey () {
    this.setState({
      contentsKey: Date.now()
    })
  },

  /**
   * Tell the store to inject a new content/child from the template
   * @param {Event} e Mouse/KeyboardEvent
   */
  addChild (e) {
    e.preventDefault()
    let { attributes, store, path } = this.props

    store.batchDispatch([
      addManyContent(path),
      validateMany(path, validation(attributes.get('validation').toJS()))
    ])
    this.updateContentsKey()
  },

  /**
   * When selected item is removed
   * @param {Number} index Index of the item to remove
   * @return {Null}
   */
  onRemove (index) {
    let { attributes, store, contentsPath, path } = this.props
    let childPath = contentsPath.push(index)

    store.batchDispatch([
      deleteManyContent(childPath),
      validateMany(path, validation(attributes.get('validation').toJS()))
    ])
    this.updateContentsKey()
  },

  /**
   * When selected item is removed
   * @return {Null}
   */
  onDrop (newOrder) {
    const { attributes, store, path } = this.props
    store.batchDispatch([
      reorderManyContents(path, newOrder),
      validateMany(path, validation(attributes.get('validation').toJS()))
    ])
    this.updateContentsKey()
  },

  render () {
    const { attributes, children, errors, name } = this.props
    let hasErrors = (errors.count() > 0)
    const { contentsKey } = this.state
    // Extract attributes from Immutable.Map
    let { label, add_label, placeholder } = attributes.toJS()
    label = label || name.replace(/_/, ' ')

    return (
      <div className={styles.base}>
        <div className={styles.header}>
          <h3 className={styles.label}>{label}</h3>
          <div className={styles.controls}>
            <button className={styles.addButton} onClick={this.addChild}>{ add_label || 'Add item'}</button>
          </div>
        </div>
        {(children.count() > 0)
          ? <Sortable canRemove onRemove={this.onRemove} onDrop={this.onDrop} verticalControls>
            {children.map((setChildren, i) => (
              <ManySet key={`${contentsKey}_${i}`}>
                {setChildren}
              </ManySet>
            ))}
          </Sortable>
          : <div className={styles.placeholder}>
              <span className={styles.placeholderText}>
                { placeholder || 'No items have been added.' }
                {' '}
              </span>
              <button className={styles.placeholderButton} onClick={this.addChild}>Add the first?</button>
            </div>}
        {(hasErrors) ? <FieldErrors errors={errors}/> : null}
      </div>
    )
  }
})

export default Many
export let ManyFactory = React.createFactory(Many)
