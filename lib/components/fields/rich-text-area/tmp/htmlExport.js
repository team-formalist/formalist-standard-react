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

var schema = {
  block: {
    type: 0,
    entity: 1,
    children: 2
  },
  inline: {
    styles: 0,
    text: 1
  },
  entity: {
    type: 0,
    mutability: 1,
    data: 2,
    children: 3
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

      var data = [];
      var type = 'blank';
      var mutability = null;
      var entity = entityKey ? _draftJs.Entity.get(entityKey) : null;
      if (entity) {
        type = entity.getType();
        mutability = entity.getMutability().toLowerCase();
        data = entity.getData()[type];
      }
      return ['entity', [type, mutability, data, stylePieces.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2);

        var text = _ref4[0];
        var style = _ref4[1];

        return ['inline', [style.toJS().map(function (s) {
          return s.toLowerCase();
        }), text]];
      })]];
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

  var htmlCompiler = compiler();

  return function convert(editorState) {

    var content = editorState.getCurrentContent();
    var blocks = content.getBlocksAsArray();

    var context = [];
    var processBlock = createProcessingContext(context, blocks);
    // Process the blocks
    blocks.forEach(processBlock);

    // console.log('context', JSON.stringify(context, null, 2))
    // console.log('compiled', JSON.stringify(htmlCompiler(context), null, 2))

    return {
      html: htmlCompiler(context)
    };
  };
}

exports.default = htmlExport;

// Like the formalist compiler
// curry with a config

var defaultRenderer = {
  wrapper: {
    'unordered-list-item': function unorderedListItem(type, lastBlockType) {
      if (type === 'unordered-list-item') {
        return '<ul>';
      } else if (lastBlockType === 'unordered-list-item') {
        return '</ul>';
      }
    },
    'ordered-list-item': function orderedListItem(type, lastBlockType) {
      if (type === 'ordered-list-item') {
        return '<ol>';
      } else if (lastBlockType === 'ordered-list-item') {
        return '</ol>';
      }
    }
  },
  // TODO
  // this should be a function call so we can fall through
  block: {
    'unstyled': function unstyled(children) {
      return ['<p>', children, '</p>'];
    },
    'unordered-list-item': function unorderedListItem(children) {
      return ['<li>', children, '</li>'];
    },
    'ordered-list-item': function orderedListItem(children) {
      return ['<li>', children, '</li>'];
    }
  },
  inline: {
    'bold': function bold(context) {
      var output = context.slice(0);
      output.unshift('<strong>');
      output.push('</strong>');
      return output;
    },
    'italic': function italic(context) {
      var output = context.slice(0);
      output.unshift('<em>');
      output.push('</em>');
      return output;
    }
  },
  entity: {
    'blank': function blank(type, mutability, data, children) {
      return children;
    },
    'mention': function mention(type, mutability, data, children) {
      // This entity type doesn’t care about its children
      return ['<span data-entity-type=\'' + type + '\' data-entity-data=\'' + JSON.stringify(data) + '\'>', children, '</span>'];
    }
  }
};

function compiler(config) {

  config = config || defaultRenderer;

  return function (ast) {

    var lastBlockType = null;

    var destinations = {
      visitblock: function visitblock(node, first, last) {
        var type = node[schema.block.type];
        var entity = node[schema.block.entity];
        var children = node[schema.block.children];

        // Construct look-behind-wrappers
        var output = config.block[type](children.map(function (child) {
          return visit(child);
        }));

        // If the first item, check if we need an opening wrapper.
        if (first && config.wrapper[type]) {
          output.unshift(config.wrapper[type](type, lastBlockType));
        }
        // If there’s a change in block type
        if (lastBlockType !== type) {
          // Try to insert an opening wrapper (unless it’s the first item)
          if (!first && config.wrapper[type]) {
            output.unshift(config.wrapper[type](type, lastBlockType));
          }
          // Try to insert a closing wrapper (unless it’s the first item)
          if (!first && config.wrapper[lastBlockType]) {
            output.unshift(config.wrapper[lastBlockType](type, lastBlockType));
          }
        }
        // If the last item, check if we need a closing wrapper.
        if (last && config.wrapper[type]) {
          output.push(config.wrapper[type](null, type));
        }

        lastBlockType = type;
        return output;
      },
      visitentity: function visitentity(node, first, last) {
        var type = node[schema.entity.type];
        var mutability = node[schema.entity.mutability];
        var data = node[schema.entity.data];
        var children = node[schema.entity.children];
        return config.entity[type](type, mutability, data, children.map(function (child) {
          return visit(child);
        }));
      },
      visitinline: function visitinline(node, first, last) {
        var styles = node[schema.inline.styles];
        var text = node[schema.inline.text];

        var output = [text];
        styles.forEach(function (style) {
          output = config.inline[style](output);
        });

        return output;
      }
    };

    function visit(node, first, last) {
      var type = node[0];
      var content = node[1];
      return destinations['visit' + type](content, first, last);
    }

    return ast.map(function (node, index) {
      var last = index === ast.length - 1;
      var first = index === 0;
      return visit(node, first, last);
    });
  };
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