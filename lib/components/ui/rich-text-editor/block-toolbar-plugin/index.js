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

var blockItemsGroupsMapping = [{
  label: 'Paragraph',
  types: ['unstyled']
}, {
  label: 'Heading',
  types: ['header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six']
}, {
  label: 'Unordered',
  types: ['unordered-list-item']
}, {
  label: 'Ordered',
  types: ['ordered-list-item']
}, {
  label: 'Quote',
  types: ['blockquote', 'pullquote']
}];

var defaults = {
  allowedBlockFormatters: ['unstyled', 'header-one', 'header-two', 'unordered-list-item', 'ordered-list-item', 'blockquote', 'code']
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
  // Filter out the un-allowed block-item types
  var blockItemsGroups = blockItemsGroupsMapping.map(function (group) {
    var types = group.types.filter(function (type) {
      return blockFormatters.indexOf(type) > -1;
    });
    return {
      label: group.label,
      types: types
    };
  }).filter(function (group) {
    return group.types.length > 0;
  });

  return {
    /**
     * Export the `BlockToolbar` component with curried `options`
     *
     * @param  {Object} props Props for the toolbar
     * @return {ReactComponent} The curried component
     */
    BlockToolbar: function BlockToolbar(props) {
      props = Object.assign({}, { blockItemsGroups: blockItemsGroups }, props);
      return _react2.default.createElement(_toolbar2.default, props);
    }
  };
}