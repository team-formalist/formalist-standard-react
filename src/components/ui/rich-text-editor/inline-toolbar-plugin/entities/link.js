import React, {Component} from "react"
import {
  Entity,
  CompositeDecorator,
} from "draft-js"

export class Link extends Component {
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

export function findLinkEntities (contentBlock, callback) {
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

export default decorator
