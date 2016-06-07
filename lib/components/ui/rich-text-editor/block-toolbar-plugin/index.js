'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blockToolbarPlugin;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasCommandModifier = _draftJs.KeyBindingUtil.hasCommandModifier;
// Components

/**
 * The block item mappings
 * @type {Array}
 */
var blockItemsMapping = [{
  type: 'unstyled',
  label: 'Paragraph'
}, {
  type: 'paragraph',
  label: 'Paragraph'
}, {
  type: 'header-one',
  label: 'Heading 1'
}, {
  type: 'header-two',
  label: 'Heading 2'
}, {
  type: 'header-three',
  label: 'Heading 3'
}, {
  type: 'header-four',
  label: 'Heading 4'
}, {
  type: 'header-five',
  label: 'Heading 5'
}, {
  type: 'header-six',
  label: 'Heading 6'
}, {
  type: 'unordered-list-item',
  label: 'UL'
}, {
  type: 'ordered-list-item',
  label: 'OL'
}, {
  type: 'blockquote',
  label: 'Blockquote'
}, {
  type: 'code-block',
  label: 'Code'
}];

var defaults = {
  allowedBlockFormatters: ['unstyled', 'header-one', 'unordered-list-item', 'ordered-list-item', 'blockquote-list-item', 'code']
};

/**
 * Plugin for the block toolbar

 * @param  {Array} options.blockFormatters Optional list of block commands to
 * allow. Will default to defaults.allowedBlockFormatters
 *
 * @return {Object} draft-js-editor-plugin compatible object
 */
function blockToolbarPlugin() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


  var blockFormatters = options.blockFormatters || defaults.allowedBlockFormatters;
  var blockItems = blockItemsMapping.filter(function (item) {
    return blockFormatters.indexOf(item.type) > -1;
  });

  return {
    /**
     * Export the `BlockToolbar` component with curried `options`
     *
     * @param  {Object} props Props for the toolbar
     * @return {ReactComponent} The curried component
     */
    BlockToolbar: function BlockToolbar(props) {
      props = Object.assign({}, { blockItems: blockItems }, props);
      return _react2.default.createElement(_toolbar2.default, props);
    }
  };
}