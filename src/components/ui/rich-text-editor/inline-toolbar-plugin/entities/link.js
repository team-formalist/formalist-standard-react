import React, {Component} from "react"
import {
  Entity,
  CompositeDecorator,
} from "draft-js"
import styles from './link.mcss'

class Link extends Component {
  render () {
    const {url} = Entity.get(this.props.entityKey).getData();
    return (
      <a href={url} title={url}>
        {this.props.children}
      </a>
    )
  }
}

Link.propTypes = {
  entityKey: React.PropTypes.string.isRequired,
}

function findLinkEntities (contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType().toLowerCase() === "link"
      )
    },
    callback
  )
}

const decorator = {
  strategy: findLinkEntities,
  component: Link,
}

class ActionHandler extends Component {
  constructor(props) {
    super(props)

    const {entity} = props
    const data = entity.getData()
    // And absence of data means we want to edit it immediately
    this.state = {
      editing: (data.url == null),
    }
    this.persistPopover = this.persistPopover.bind(this)
  }

  componentWillMount () {
    const {entity, forceVisible} = this.props
    const entityData = entity.getData()
    if (entityData.url == null) {
      this.persistPopover()
    }
  }

  persistPopover () {
    const {forceVisible} = this.props
    forceVisible(true)
  }

  unpersistPopover () {
    const {forceVisible} = this.props
    forceVisible(false)
  }

  handleEdit () {
    this.persistPopover()
    this.setState({
      editing: true
    })
  }

  onSubmit (e) {
    e.preventDefault()
    unpersistPopover()
  }

  render() {
    const {entity, remove, forceVisible} = this.props
    const {editing} = this.state
    const data = entity.getData()
    return (
      <div ref={(r) => this._container = r}>
        {
          (editing)
          ? <form onSubmit={this.onSubmit}>
              <input
                ref={(r) => this._url = r}
                type='text'
                defaultValue={data.url}/>
              <button>Save link</button>
            </form>
          : <div className={styles.displayWrapper}>
              <a href={data.url} target='_blank' className={styles.handlerUrl}>{data.url}</a>
              <button
                className={styles.editButton}
                onClick={(e) => {
                  e.preventDefault()
                  this.handleEdit()
                }}>
                Change
              </button>
              <button
                className={styles.removeButton}
                onClick={(e) => {
                  e.preventDefault()
                  remove(entity)
                }}>
                <span className={styles.removeText}>Remove</span>
                <span className={styles.removeX}>×</span>
              </button>
            </div>
        }
      </div>
    )
  }
}

export default {
  handler: ActionHandler,
  decorator,
}
