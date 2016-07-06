'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blockToolbarPlugin;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _draftJs = require('draft-js');

var _mergeDefaults = require('../../../../utils/merge-defaults');

var _mergeDefaults2 = _interopRequireDefault(_mergeDefaults);

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _atomic = require('./blocks/atomic');

var _atomic2 = _interopRequireDefault(_atomic);

var _pullQuote = require('./blocks/pull-quote');

var _pullQuote2 = _interopRequireDefault(_pullQuote);

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
  blockFormatters: ['unstyled', 'header-one', 'header-two', 'unordered-list-item', 'ordered-list-item', 'blockquote', 'pullquote', 'code'],
  blockSet: {
    atomic: {
      component: _atomic2.default,
      editable: false
    },
    pullquote: {
      component: _pullQuote2.default
    }
  },
  blockRenderMap: {
    pullquote: {
      element: 'blockquote'
    }
  }
};

/**
 * Plugin for the block toolbar

 * @param  {Array} options.blockFormatters Optional list of block commands to
 * allow. Will default to defaults.blockFormatters
 *
 * @return {Object} draft-js-editor-plugin compatible object
 */
function blockToolbarPlugin() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  // Pull out the options
  options = (0, _mergeDefaults2.default)(defaults, options);
  var _options = options;
  var blockFormatters = _options.blockFormatters;
  var blockRenderMap = _options.blockRenderMap;
  var blockSet = _options.blockSet;
  var embeddableForms = _options.embeddableForms;
  var setReadOnly = _options.setReadOnly;

  // Assign the default props for the atomic block
  // Which includes _all_ our embedded form types

  blockSet.atomic.props = {
    setReadOnly: setReadOnly,
    embeddableForms: embeddableForms
  };

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
     * Customer block renderer resolver
     * @param  {ContentBlock} contentBlock The draft `ContentBlock` object to
     * render
     * @return {Object} A compatible renderer object definition
     */

    blockRendererFn: function blockRendererFn(contentBlock) {
      var type = contentBlock.getType();
      // Pull out the renderer from our `blockSet` object
      if (type && blockSet[type]) {
        return blockSet[type];
      }
    },


    /**
     * Merge our blockRenderMap with the draft defaults
     * @type {Map}
     */
    blockRenderMap: _draftJs.DefaultDraftBlockRenderMap.merge(blockRenderMap),

    /**
     * Export the `BlockToolbar` component with curried `options`
     *
     * @param  {Object} props Props for the toolbar
     * @return {ReactComponent} The curried component
     */
    BlockToolbar: function BlockToolbar(props) {
      // Merge a couple of props that are set up in the initial plugin
      // creation
      props = Object.assign({}, {
        blockItemsGroups: blockItemsGroups,
        embeddableForms: embeddableForms
      }, props);
      return _react2.default.createElement(_toolbar2.default, props);
    }
  };
}