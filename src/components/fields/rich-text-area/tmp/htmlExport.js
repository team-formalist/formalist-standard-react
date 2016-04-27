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
    entity: 1,
    text: 2,
  },
  entity: {
    type: 0,
    mutability: 1,
    data: 2,
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
      let entityData = []
      let entity = entityKey ? Entity.get(entityKey) : null
      if (entity) {
        let type = entity.getType()
        entityData = [
          type,
          entity.getMutability().toLowerCase(),
          // TODO Revisit this
          // Seems very odd that this accessor through `type` is necessary
          entity.getData()[type]
        ]
      }
      return stylePieces.map(([text, style]) => {
        return [
          'inline',
          [
            style.map((s) => s.toLowerCase()),
            entityData,
            text
          ]
        ]
      })
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
  return function convert (editorState) {

    const content = editorState.getCurrentContent()
    const blocks = content.getBlocksAsArray()

    let context = []
    let processBlock = createProcessingContext(context, blocks)

    console.log('content', content.getBlockMap().toJS());

    blocks.forEach(processBlock)

    // // let currentBlock = blocks[0]

    // // while (currentBlock) {
    // //   processBlock(currentBlock, context)
    // // }

    console.log('context', JSON.stringify(context, null, 2))
    // content.getBlocksAsArray().map((block) => {
    //   return console.log(block.toJS())
    // })

    return {
      html: content.getPlainText()
    }
  }
}

export default htmlExport





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
