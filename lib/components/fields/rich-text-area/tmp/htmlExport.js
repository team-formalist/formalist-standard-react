'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _draftJs = require('draft-js');

var _draftJsUtils = require('draft-js-utils');

var BLOCK_TYPE = {
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
  ATOMIC: 'atomic'
};

var ENTITY_TYPE = {
  LINK: 'LINK',
  IMAGE: 'IMAGE'
};

var INLINE_STYLE = {
  BOLD: 'BOLD',
  CODE: 'CODE',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH',
  UNDERLINE: 'UNDERLINE'
};

// const destinations = {
//   visitBlock (block) {

//   }
// }

var schema = {
  block: {
    type: 0,
    entity: 1,
    children: 2
  },
  inline: {
    styles: 0,
    entity: 1,
    text: 2
  },
  entity: {
    type: 0,
    mutability: 1,
    data: 2
  }
};

function createProcessingContext(context, blocks) {
  var parents = [];
  var currentContext = context;
  var lastBlock = null;
  var lastProcessed = null;

  function processBlockContent(block) {
    // Mostly cribbed from sstur’s implementation in draft-js-export-html
    // https://github.com/sstur/draft-js-export-html/blob/master/src/stateToHTML.js#L222
    var blockType = block.getType();
    var text = block.getText();
    var charMetaList = block.getCharacterList();
    var entityPieces = (0, _draftJsUtils.getEntityRanges)(text, charMetaList);

    return entityPieces.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var entityKey = _ref2[0];
      var stylePieces = _ref2[1];

      var entityData = [];
      var entity = entityKey ? _draftJs.Entity.get(entityKey) : null;
      if (entity) {
        var type = entity.getType();
        entityData = [type, entity.getMutability().toLowerCase(),
        // TODO Revisit this
        // Seems very odd that this accessor through `type` is necessary
        entity.getData()[type]];
      }
      return stylePieces.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2);

        var text = _ref4[0];
        var style = _ref4[1];

        return ['inline', [style.map(function (s) {
          return s.toLowerCase();
        }), entityData, text]];
      });
    });
  }

  return function process(block, index) {
    var type = block.getType();
    var entityData = [];
    var key = block.getEntityAt(0);
    if (type === 'atomic' && key) {
      var entity = _draftJs.Entity.get(key);
      var entityType = entity.getType();
      entityData = [entityType, entity.getMutability().toLowerCase(), entity.getData()];
    }

    var output = ['block', [type, entityData, processBlockContent(block)]];

    // Push into context (or not) based on depth
    // This block is deeper
    if (lastBlock && block.getDepth() > lastBlock.getDepth()) {
      // Extract reference object from flat context
      parents.push(lastProcessed);
      currentContext = lastProcessed[schema.block.children];
    } else if (lastBlock && block.getDepth() < lastBlock.getDepth() && parents.length > 0) {
      // This block is shallower, traverse up the parent
      var parent = parents.pop();
      currentContext = parent[schema.block.children];
    }
    if (!currentContext) {
      currentContext = context;
    }
    currentContext.push(output);
    lastProcessed = output[1];
    lastBlock = block;
  };
}

function htmlExport(config) {
  return function convert(editorState) {

    var content = editorState.getCurrentContent();
    var blocks = content.getBlocksAsArray();

    var context = [];
    var processBlock = createProcessingContext(context, blocks);

    console.log('content', content.getBlockMap().toJS());

    blocks.forEach(processBlock);

    // // let currentBlock = blocks[0]

    // // while (currentBlock) {
    // //   processBlock(currentBlock, context)
    // // }

    console.log('context', JSON.stringify(context, null, 2));
    // content.getBlocksAsArray().map((block) => {
    //   return console.log(block.toJS())
    // })

    return {
      html: content.getPlainText()
    };
  };
}

exports.default = htmlExport;

// Two step process for converting data in/out of Draft.js
// 1. Convert to an AST
// 2. Convert the AST to tags

// AST is an array of blocks
// Each one has:
// type
// attributes (object)
// children (array)

// Split between `blocks` and `inline`

var contentAST = [['block', // content type
['unordered-list-item', // block type
[], // Attributes
[['inline', // content type
[], [], 'Hello there']]]], ['block', // content type
['unordered-list-item', // block type
[], // Attributes
[['inline', // content type
[['bold'], [], 'Hello']], ['inline', [['bold', 'italic'], // styles
[], // attributes
' there']]]]]];