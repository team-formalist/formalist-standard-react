const defaultRenderers = {
  wrapper: {
    'unordered-list-item': (type, lastBlockType) => {
      if (type === 'unordered-list-item') {
        return '<ul>'
      } else if (lastBlockType === 'unordered-list-item') {
        return '</ul>\n\n'
      }
    },
    'ordered-list-item': (type, lastBlockType) => {
      if (type === 'ordered-list-item') {
        return '<ol>'
      } else if (lastBlockType === 'ordered-list-item') {
        return '</ol>\n\n'
      }
    }
  },
  block: {
    'unstyled': (children) => {
      return [
        '<p>',
        children,
        '</p>\n\n',
      ]
    },
    'unordered-list-item': (children) => {
      return [
        '<li>',
        children,
        '</li>\n\n',
      ]
    },
    'ordered-list-item': (children) => {
      return [
        '<li>',
        children,
        '</li>\n\n',
      ]
    }
  },
  inline: {
    'default': (context) => {
      return context
    },
    'bold': (context) => {
      const output = context.slice(0)
      output.unshift('<strong>')
      output.push('</strong>')
      return output
    },
    'italic': (context) => {
      const output = context.slice(0)
      output.unshift('<em>')
      output.push('</em>')
      return output
    }
  },
  entity: {
    'default': (type, mutability, data, children) => {
      return children
    },
    'mention': (type, mutability, data, children) => {
      return [
        `<span data-entity-type='${type}' data-entity-data='${JSON.stringify(data)}'>`,
        children,
        '</span>',
      ]
    }
  }
}

export default defaultRenderers
