import {Entity} from 'draft-js'
import {getEntityRanges} from 'draft-js-utils'
import flatten from 'flatten'

const schema = {
  block: {
    type: 0,
    entity: 1,
    children: 2,
  },
  inline: {
    styles: 0,
    text: 1,
  },
  entity: {
    type: 0,
    mutability: 1,
    data: 2,
    children: 3,
  }
}

const defaultConfig = {
  allowEmptyTags: false
}

function processBlockContent (block) {
  // Mostly cribbed from sstur’s implementation in draft-js-export-html
  // https://github.com/sstur/draft-js-export-html/blob/master/src/stateToHTML.js#L222
  let blockType = block.getType()
  let text = block.getText()
  let charMetaList = block.getCharacterList()
  let entityPieces = getEntityRanges(text, charMetaList)

  return entityPieces.map(([entityKey, stylePieces]) => {
    let data = []
    let type = 'default'
    let mutability = null
    let entity = entityKey ? Entity.get(entityKey) : null
    if (entity) {
      type = entity.getType()
      mutability = entity.getMutability().toLowerCase()
      data = entity.getData()[type]
    }
    return [
      'entity',
      [
        type,
        mutability,
        data,
        stylePieces.map(([text, style]) => {
          return [
            'inline',
            [
              style.toJS().map((s) => s.toLowerCase()),
              text
            ]
          ]
        })
      ]
    ]
  })
}

function processBlocks(blocks, context = []) {
  let currentContext = context
  let lastBlock = null
  let lastProcessed = null

  // Process individual blocks
  blocks.forEach(processBlock)

  function processBlock (block) {
    let entityData = []

    const type = block.getType()
    const key = block.getEntityAt(0)

    if (type === 'atomic' && key) {
      const entity = Entity.get(key)
      let entityType = entity.getType()
      entityData = [
        entityType,
        entity.getMutability().toLowerCase(),
        entity.getData(),
      ]
    }

    const output = [
      'block',
      [
        type,
        entityData,
        processBlockContent(block)
      ]
    ]

    // Push into context (or not) based on depth
    // This block is deeper
    if (lastBlock && block.getDepth() > lastBlock.getDepth()) {
      // Extract reference object from flat context
      parents.push(lastProcessed)
      currentContext = lastProcessed[schema.block.children]
    } else if (lastBlock && block.getDepth() < lastBlock.getDepth() && parents.length > 0) {
      // This block is shallower, traverse up the parent
      let parent = parents.pop()
      currentContext = parent[schema.block.children]
    }
    if (!currentContext) {
      currentContext = context
    }
    currentContext.push(output)
    lastProcessed = output[1]
    lastBlock = block
  }

  return context
}

function htmlExport (renderers, config) {
  config = Object.assign({}, defaultConfig, config)
  const htmlCompiler = compiler(renderers, config)

  return function convert (editorState) {
    // Retrieve the content
    const content = editorState.getCurrentContent()
    const blocks = content.getBlocksAsArray()
    const processedBlocks = processBlocks(blocks, [])

    // Return the processed values
    return {
      html: htmlCompiler(processedBlocks)
    }
  }
}

export default htmlExport



// Like the formalist compiler
// curry with a config

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
  // TODO
  // this should be a function call so we can fall through
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

function getRendererForBlockType(renderers, type) {
  let renderer = renderers.block[type]
  return (renderer) ? renderer : renderers.block['unstyled']
}

function getRendererForEntityType(renderers, type) {
  let renderer = renderers.entity[type]
  return (renderer) ? renderer : renderers.entity['default']
}

function getRendererForInlineType(renderers, type) {
  let renderer = renderers.inline[type]
  return (renderer) ? renderer : renderers.inline['default']
}

function getRendererForWrapperType(renderers, type) {
  let renderer = renderers.wrapper[type]
  return (renderer) ? renderer : renderers.wrapper['default']
}

function compiler (renderers, config) {

  // TODO deep merge these somehow?
  renderers = renderers || defaultRenderers

  return function (ast) {

    let lastBlockType = null

    const destinations = {
      visitblock (node, first, last) {
        const type = node[schema.block.type]
        const entity = node[schema.block.entity]
        const children = node[schema.block.children]

        // Render general block and its children first
        const renderer = getRendererForBlockType(renderers, type)
        const renderedChildren = children.map((child) => {
          return visit(child)
        })
        const output = renderer(renderedChildren)

        // If there are no children
        if (!config.allowEmptyTags) {
          if (!renderedChildren || renderedChildren.length === 0 || renderedChildren.join('') === '') {
            return null
          }
        }

        // Construct look-behind-wrappers to go around the block
        // This is super-awkward
        // If the first item, check if we need an opening wrapper at the start
        if (first && renderers.wrapper[type]) {
          output.unshift(
            renderers.wrapper[type](type, lastBlockType)
          )
        }
        // If there’s a change in block type
        if (lastBlockType !== type) {
          // Try to insert an opening wrapper (unless it’s the first item) at
          // the start
          if (!first && renderers.wrapper[type]) {
            output.unshift(
              renderers.wrapper[type](type, lastBlockType)
            )
          }
          // Try to insert a closing wrapper (unless it’s the first item)
          // at the end
          if (!first && renderers.wrapper[lastBlockType]) {
            output.unshift(
              renderers.wrapper[lastBlockType](type, lastBlockType)
            )
          }
        }
        // If the last item, check if we need a closing wrapper at the end
        if (last && renderers.wrapper[type]) {
          output.push(
            renderers.wrapper[type](null, type)
          )
        }

        lastBlockType = type
        return flatten(output)
      },

      visitentity (node, first, last) {
        const type = node[schema.entity.type]
        const mutability = node[schema.entity.mutability]
        const data = node[schema.entity.data]
        const children = node[schema.entity.children]
        const renderer = getRendererForEntityType(renderers, type)

        return flatten(renderer(
          type,
          mutability,
          data,
          children.map((child) => {
            return visit(child)
          })
        ))
      },

      visitinline (node, first, last) {
        const styles = node[schema.inline.styles]
        const text = node[schema.inline.text]

        let output = [text]
        styles.forEach((style) => {
          const renderer = getRendererForInlineType(renderers, style)
          output = renderer(output)
        })

        return flatten(output)
      }
    }

    function visit(node, first, last) {
      const type = node[0]
      const content = node[1]
      return destinations['visit'+type](content, first, last)
    }

    // Flatten everything
    return flatten(ast.map((node, index) => {
      const last = (index === ast.length - 1)
      const first = (index === 0)
      return visit(node, first, last)
    }))
  }
}

// Two step process for converting data in/out of Draft.js
// 1. Convert to an AST
// 2. Convert the AST to tags

// AST is an array of blocks
// Each one has:
// type
// attributes (object)
// children (array)

// Split between `blocks` and `inline`

const contentAST = [
  [
    'block', // content type
    [
      'unordered-list-item', // block type
      [], // Attributes
      [
        [
          'inline',  // content type
          [],
          [],
          'Hello there'
        ]
      ],
    ]
  ],
  [
    'block', // content type
    [
      'unordered-list-item', // block type
      [], // Attributes
      [
        [
          'inline', // content type
          [
            [
              'bold'
            ],
            [],
            'Hello'
          ]
        ],
        [
          'inline',
          [
            [
              'bold',
              'italic'
            ], // styles
            [], // attributes
            ' there'
          ]
        ],
      ],
    ],
  ],
]
