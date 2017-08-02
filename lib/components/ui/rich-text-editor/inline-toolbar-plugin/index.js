'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inlineToolbarPlugin;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _mergeDefaults = require('../../../../utils/merge-defaults');

var _mergeDefaults2 = _interopRequireDefault(_mergeDefaults);

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _link = require('./entities/link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The inline item mappings
 * @type {Array}
 */

// Components
var formattersMapping = [{
  command: 'bold',
  label: 'Bold',
  style: 'BOLD',
  icon: '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v2c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2v2h11c2.76 0 5-2.24 5-5 0-2-1.18-3.7-2.88-4.5.54-.68.88-1.56.88-2.5 0-2.2-1.78-4-4-4h-10zm6 2h2c1.1 0 2 .9 2 2s-.9 2-2 2h-2v-4zm0 6h3c1.66 0 3 1.34 3 3s-1.34 3-3 3h-3v-6z"/></svg>'
}, {
  command: 'italic',
  label: 'Italic',
  style: 'ITALIC',
  icon: '<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg"><polygon points="3.98071795 2.21767396e-16 3.98071795 1.99750312 7.24130602 1.99750312 7.12128437 2.25717853 3.12056282 12.2446941 2.44044015 14.0024969 0 14.0024969 0 16 10.0018039 16 10.0018039 14.0024969 6.74121583 14.0024969 6.86123747 13.7428215 10.861959 3.75530587 11.5420817 1.99750312 13.9825218 1.99750312 13.9825218 0 3.98071795 0"/></svg>'
}, {
  command: 'code',
  label: 'Code',
  style: 'CODE',
  icon: '<svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M10 0l-6 12h2l6-12h-2zm-8 2l-2 4 2 4h2l-2-4 2-4h-2zm10 0l2 4-2 4h2l2-4-2-4h-2z"></svg>'
}, {
  command: 'underline',
  label: 'Underline',
  style: 'UNDERLINE',
  icon: '<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2 0v8c0 2.2 2.24 4 5 4h1c2.2 0 4-1.8 4-4v-8h-2v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-4zm-2 14v2h14v-2h-14z"/></svg>'
}, {
  command: 'strikethrough',
  label: 'Strikethrough',
  style: 'STRIKETHROUGH',
  icon: '<svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><g><polygon points="0 7 0 8 16 8 16 7"/><path d="M8.61.6c-3.42 0-5.4 1.82-5.4 4.16 0 4.94 7.96 3.32 7.96 5.64 0 1-.92 1.56-2.62 1.56-1.78 0-3.04-.46-4.08-2.18l-1.64 1.96c1.12 1.6 2.82 2.46 5.82 2.46 3.16 0 5.42-1.48 5.42-3.96 0-5.1-7.94-3.02-7.94-5.74 0-.94.84-1.62 2.5-1.62 1.78 0 2.88.7 3.56 2.12l1.9-1.86c-1.34-1.76-3.02-2.54-5.48-2.54z"/></g></svg>'
}];

var entitiesMapping = [{
  type: 'LINK',
  mutability: 'MUTABLE',
  defaultData: {},
  label: 'Link',
  icon: '<svg width="17" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.826 0c-.363.02-.726.06-1.069.181-.544.201-1.069.503-1.512.945-.349.221-.528.632-.451 1.038.077.405.395.722.802.8.406.077.819-.101 1.04-.449.222-.221.484-.342.766-.443.706-.241 1.573-.141 2.137.443.786.784.786 2.092 0 2.896l-3.025 3.017c-.887.885-1.613.965-2.137.945-.524-.02-.827-.261-.827-.261-.317-.18-.706-.177-1.02.007-.314.184-.507.521-.504.885.003.364.199.698.516.878 0 0 .686.443 1.694.503s2.42-.322 3.65-1.569l3.025-3.017c1.573-1.569 1.573-4.103 0-5.652-.565-.563-1.23-.905-1.956-1.066-.363-.08-.766-.08-1.129-.06v-.02zm-4.033 4.646c-1.008-.04-2.4.302-3.589 1.509l-3.025 3.017c-1.573 1.569-1.573 4.103 0 5.652 1.129 1.126 2.742 1.448 4.154.945.544-.201 1.069-.503 1.512-.945.349-.221.528-.632.451-1.038-.077-.405-.395-.722-.802-.8-.406-.077-.819.101-1.04.449-.222.221-.484.342-.766.443-.706.241-1.573.141-2.137-.443-.786-.784-.786-2.092 0-2.896l3.025-3.017c.807-.805 1.512-.905 2.077-.885.565.02.948.181.948.181.323.242.759.268 1.109.066.35-.201.545-.591.497-.991-.048-.4-.331-.732-.719-.845 0 0-.686-.402-1.694-.443v.04z"/></svg>',
  handler: _link2.default.handler,
  decorator: _link2.default.decorator
}];

var defaults = {
  allowedFormatters: ['bold', 'italic', 'code'],
  allowedEntities: ['link'],
  customStyleMap: {
    CODE: {
      fontFamily: 'inconsolata, monospace',
      lineHeight: 1.35,
      wordWrap: 'break-word'
    }
  },
  additionalFormatters: [],
  additionalEntities: []
};

/**
 * Plugin for the inline toolbar

 * @param  {Array} options.allowedFormatters Optional list of inline commands to
 * allow. Will default to defaults.allowedFormatters
 *
 * @return {Object} draft-js-editor-plugin compatible object
 */
function inlineToolbarPlugin() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Pull out the options
  options = (0, _mergeDefaults2.default)({}, options, defaults);
  var _options = options;
  var allowedFormatters = _options.allowedFormatters;
  var allowedEntities = _options.allowedEntities;
  var additionalFormatters = _options.additionalFormatters;
  var additionalEntities = _options.additionalEntities;
  var customStyleMap = _options.customStyleMap;

  // FIXME
  // At the moment this means we override _all_ allowed formatters options here
  // to pass through the additional ones. We really need to reconcile the two
  // lists more effectively

  allowedFormatters = allowedFormatters.concat(additionalFormatters.map(function (formatter) {
    return formatter.command;
  }));

  // Reconcile the lists of formatters and entities from various sources
  var formatters = formattersMapping.concat(additionalFormatters).filter(function (item) {
    return allowedFormatters.indexOf(item.command) > -1;
  });
  var entities = entitiesMapping.concat(additionalEntities).filter(function (entity) {
    return allowedEntities.indexOf(entity.type.toLowerCase()) > -1;
  });

  // Update the customStyleMap
  additionalFormatters.forEach(function (formatter) {
    if (formatter.styleMap) {
      customStyleMap[formatter.style] = formatter.styleMap;
    }
  });

  // Collate the decorators from the inlineEntitiesMaping
  var decorators = entities.map(function (mapping) {
    return mapping.decorator;
  });

  return {
    /**
     * Pass through the decorators
     */
    decorators: decorators,

    /**
     * handleKeyCommand
     *
     * Match a command to the inline or block style to apply.
     *
     * @param  {String}   command The command-as-string as passed by Draft.
     * @param  {EditorState} editorState The current editorState
     * @param  {Function} options.setEditorState Setter for the current editorState
     * @return {Boolean} Handled or not?
     */
    handleKeyCommand: function handleKeyCommand(command, editorState, _ref) {
      var setEditorState = _ref.setEditorState;

      var formatter = formatters.find(function (item) {
        return item.command === command;
      });
      if (formatter) {
        setEditorState(_draftJs.RichUtils.toggleInlineStyle(editorState, formatter.style));
        return 'handled';
      }
      return 'not-handled';
    },

    /**
     * Override the inline style for code to match our typeface.
     * In the future this will hopefully be addressable through CSS when
     * https://github.com/facebook/draft-js/pull/354 is merged.
     * @type {Object}
     */
    customStyleMap: customStyleMap,

    /**
     * Export the `InlineToolbar` component with curried `options`
     *
     * @param  {Object} props Props for the toolbar
     * @return {ReactComponent} The curried component
     */
    InlineToolbar: function InlineToolbar(props) {
      props = Object.assign({}, { formatters: formatters, entities: entities }, props);
      return _react2.default.createElement(_toolbar2.default, props);
    }
  };
}