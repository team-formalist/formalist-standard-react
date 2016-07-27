import React, {Component} from "react"
import {
  Entity,
  CompositeDecorator,
} from "draft-js"

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
        Entity.get(entityKey).getType() === "LINK"
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

    this.state = {
      editing: false,
    }
  }

  handleEdit () {
    this.setState({
      editing: true
    })
  }

  onSubmit () {

  }

  render() {
    const {entity} = this.props
    const {editing} = this.state
    const data = entity.getData()
    return (
      <div>
        {
          (editing)
          ? <form onSubmit={this.onSubmit}>
              <input type='text' defaultValue={data.url}/>
              <button>Change</button>
            </form>
          : <div>
              <span>{data.url}</span>
              <button onClick={(e) => {
                e.preventDefault()
                this.handleEdit()
              }}>Edit</button>
              <button>Remove</button>
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
