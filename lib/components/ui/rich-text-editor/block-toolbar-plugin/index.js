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

var blockItemsGroupsMapping = [[{
  type: 'unstyled',
  label: 'Paragraph',
  icon: '<svg width="10" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M9.287 0h-4.616c-3.034 0-4.671 1.49-4.671 3.862 0 2.317 1.637 3.807 4.285 3.844v8.294h1.343v-14.768h2.372v14.768h1.287v-16z"/></svg>'
}], [{
  type: 'header-one',
  label: 'Heading 1',
  icon: '<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><polygon points="9.5 0 9.5 5 4.5 5 4.5 0 0 0 0 14 4.5 14 4.5 9 9.5 9 9.5 14 14 14 14 0"/></svg>'
}, {
  type: 'header-two',
  label: 'Heading 2',
  icon: '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><polygon points="8.5512605 0 8.5512605 4.5 3.46890756 4.5 3.46890756 0 0 0 0 12 3.46890756 12 3.46890756 7.5 8.5512605 7.5 8.5512605 12 12 12 12 0"/></svg>'
}, {
  type: 'header-three',
  label: 'Heading 3',
  icon: '<svg width="10" height="12" xmlns="http://www.w3.org/2000/svg"><polygon points="7.5 0 7.5 5 2.5 5 2.5 0 0 0 0 12 2.5 12 2.5 6.94545455 7.5 6.94545455 7.5 12 10 12 10 0"/></svg>'
}, {
  type: 'header-four',
  label: 'Heading 4',
  icon: '<svg width="10" height="12" xmlns="http://www.w3.org/2000/svg"><polygon points="8.00369686 0 8.00369686 5.09090909 1.97781885 5.09090909 1.97781885 0 0 0 0 12 1.97781885 12 1.97781885 6.76363636 8.00369686 6.76363636 8.00369686 12 10 12 10 0"/></svg>'
}, {
  type: 'header-five',
  label: 'Heading 5',
  icon: '<svg width="8" height="10" xmlns="http://www.w3.org/2000/svg"><polygon points="6.76447876 0 6.76447876 4.36363636 1.23552124 4.36363636 1.23552124 0 0 0 0 10 1.23552124 10 1.23552124 5.5 6.76447876 5.5 6.76447876 10 8 10 8 0"/></svg>'
}, {
  type: 'header-six',
  label: 'Heading 6',
  icon: '<svg width="8" height="9" xmlns="http://www.w3.org/2000/svg"><polygon points="6.76447876 0 6.76447876 3.92727273 1.23552124 3.92727273 1.23552124 0 0 0 0 9 1.23552124 9 1.23552124 4.95 6.76447876 4.95 6.76447876 9 8 9 8 0"/></svg>'
}], [{
  type: 'unordered-list-item',
  label: 'Unordered list',
  icon: '<svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1 0c-.56 0-1 .44-1 1s.44 1 1 1 1-.44 1-1-.44-1-1-1zm3 0v2h12v-2h-12zm-3 5c-.56 0-1 .44-1 1s.44 1 1 1 1-.44 1-1-.44-1-1-1zm3 0v2h12v-2h-12zm-3 5c-.56 0-1 .44-1 1s.44 1 1 1 1-.44 1-1-.44-1-1-1zm3 0v2h12v-2h-12z"/></svg>'
}], [{
  type: 'ordered-list-item',
  label: 'Ordered list',
  icon: '<svg width="16" height="14" xmlns="http://www.w3.org/2000/svg"><g><path d="M6 1v2h10v-2h-10zm0 7h10v-2h-10v2zm0 3v2h10v-2h-10z"/><path d="M3.286 4.026v-3.958h-1.22l-1.23.854v1.08l1.166-.803h.065v2.827h-1.23v.974h3.619v-.974h-1.169zm-2.707 6.587v.021h1.148v-.024c0-.407.294-.694.718-.694.403 0 .673.243.673.605 0 .297-.195.554-.909 1.21l-1.559 1.432v.837h3.75v-.978h-2.078v-.065l.813-.714c.868-.762 1.196-1.258 1.196-1.812 0-.875-.742-1.463-1.842-1.463-1.142 0-1.911.66-1.911 1.644z"/></g></svg>'
}], [{
  type: 'blockquote',
  label: 'Blockquote',
  icon: '<svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M6 0c-3.3 0-6 2.7-6 6v6h6v-6h-4c0-2.22 1.78-4 4-4v-2zm10 0c-3.3 0-6 2.7-6 6v6h6v-6h-4c0-2.22 1.78-4 4-4v-2z"/></svg>'
}, {
  type: 'pullquote',
  label: 'Pullquote',
  icon: '<svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v12l6-6v-6h-6zm10 0v12l6-6v-6h-6z"/></svg>'
}], [{
  type: 'code-block',
  label: 'Code block',
  icon: '<svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M10 0l-6 12h2l6-12h-2zm-8 2l-2 4 2 4h2l-2-4 2-4h-2zm10 0l2 4-2 4h2l2-4-2-4h-2z"></svg>'
}]];

var defaults = {
  blockFormatters: ['unstyled', 'header-one', 'header-two', 'unordered-list-item', 'ordered-list-item', 'blockquote', 'pullquote', 'code-block'],
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
  options = (0, _mergeDefaults2.default)({}, defaults, options);
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
    return group.filter(function (item) {
      return blockFormatters.indexOf(item.type) > -1;
    });
  }).filter(function (group) {
    return group.length > 0;
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