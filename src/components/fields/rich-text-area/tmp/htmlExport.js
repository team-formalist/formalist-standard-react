import {Entity} from 'draft-js'
import {getEntityRanges} from 'draft-js-utils'

const BLOCK_TYPE = {
  // This is used to represent a normal text block (paragraph).
  UNSTYLED: 'unstyled',
  HEADER_ONE: 'header-one',
  HEADER_TWO: 'header-two',
  HEADER_THREE: 'header-three',
  HEADER_FOUR: 'header-four',
  HEADER_FIVE: 'header-five',
  HEADER_SIX: 'header-six',
  UNORDERED_LIST_ITEM: 'unordered-list-item',
  ORDERED_LIST_ITEM: 'ordered-list-item',
  BLOCKQUOTE: 'blockquote',
  PULLQUOTE: 'pullquote',
  CODE: 'code-block',
  ATOMIC: 'atomic',
}

const ENTITY_TYPE = {
  LINK: 'LINK',
  IMAGE: 'IMAGE',
}

const INLINE_STYLE = {
  BOLD: 'BOLD',
  CODE: 'CODE',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH',
  UNDERLINE: 'UNDERLINE',
}

// const destinations = {
//   visitBlock (block) {

//   }
// }

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

function createProcessingContext (context, blocks) {
  let parents = []
  let currentContext = context
  let lastBlock = null
  let lastProcessed = null

  function processBlockContent (block) {
    // Mostly cribbed from sstur’s implementation in draft-js-export-html
    // https://github.com/sstur/draft-js-export-html/blob/master/src/stateToHTML.js#L222
    let blockType = block.getType()
    let text = block.getText()
    let charMetaList = block.getCharacterList()
    let entityPieces = getEntityRanges(text, charMetaList)

    return entityPieces.map(([entityKey, stylePieces]) => {
      let data = []
      let type = 'blank'
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

  return function process (block, index) {
    const type = block.getType()
    let entityData = []
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

    let output = [
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
}

function htmlExport (config) {

  const htmlCompiler = compiler()

  return function convert (editorState) {

    const content = editorState.getCurrentContent()
    const blocks = content.getBlocksAsArray()

    let context = []
    let processBlock = createProcessingContext(context, blocks)
    // Process the blocks
    blocks.forEach(processBlock)

    // console.log('context', JSON.stringify(context, null, 2))
    // console.log('compiled', JSON.stringify(htmlCompiler(context), null, 2))

    return {
      html: htmlCompiler(context)
    }
  }
}

export default htmlExport



// Like the formalist compiler
// curry with a config

const defaultRenderer = {
  // TODO
  // this should be a function call so we can fall through
  block: {
    'unstyled': (children) => {
      return [
        '<p>',
        children,
        '</p>',
      ]
    },
    'unordered-list-item': (children) => {
      return [
        '<li>',
        children,
        '</li>',
      ]
    },
    'ordered-list-item': (children) => {
      return [
        '<li>',
        children,
        '</li>',
      ]
    }
  },
  inline: {
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
    'blank': (type, mutability, data, children) => {
      return children
    },
    'mention': (type, mutability, data, children) => {
      // This entity type doesn’t care about its children
      return [
        `<span data-entity-type=${type} data-entity-data=${JSON.stringify(data)}>`,
        children,
        '</span>',
      ]
    }
  }
}

function compiler (config) {

  config = config || defaultRenderer

  return function (ast) {
    const destinations = {
      visitblock (node) {
        const type = node[schema.block.type]
        const entity = node[schema.block.entity]
        const children = node[schema.block.children]
        return config.block[type](
          children.map(visit)
        )
      },

      visitentity (node) {
        const type = node[schema.entity.type]
        const mutability = node[schema.entity.mutability]
        const data = node[schema.entity.data]
        const children = node[schema.entity.children]
        return config.entity[type](
          type,
          mutability,
          data,
          children.map(visit)
        )
      },

      visitinline (node) {
        console.log('node', node)
        const styles = node[schema.inline.styles]
        const text = node[schema.inline.text]

        let output = [text]
        styles.forEach((style) => {
          output = config.inline[style](output)
        })

        return output
      }
    }

    function visit(node) {
      const type = node[0]
      const content = node[1]
      console.log('type', type)
      return destinations['visit'+type](content)
    }

    return ast.map(visit)
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
