'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

function htmlExport(config) {
  return function convert(editorState) {

    var content = editorState.getCurrentContent();

    console.log('asArray', content.getBlocksAsArray());

    return {
      html: content.getPlainText()
    };
  };
}

exports.default = htmlExport;