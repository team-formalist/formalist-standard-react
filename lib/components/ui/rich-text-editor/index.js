'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _immutable = require('immutable');

var _draftJsAutolistPlugin = require('draft-js-autolist-plugin');

var _draftJsAutolistPlugin2 = _interopRequireDefault(_draftJsAutolistPlugin);

require('./tmp.css');

var _draftJsMentionPlugin = require('draft-js-mention-plugin');

var _draftJsMentionPlugin2 = _interopRequireDefault(_draftJsMentionPlugin);

require('draft-js-hashtag-plugin/lib/plugin.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Plugins


var mentions = (0, _immutable.fromJS)([{
  name: 'Max Stoiber',
  link: 'https://twitter.com/mxstbr',
  avatar: 'https://pbs.twimg.com/profile_images/681114454029942784/PwhopfmU_400x400.jpg'
}, {
  name: 'Nik Graf',
  link: 'https://twitter.com/nikgraf',
  avatar: 'https://pbs.twimg.com/profile_images/535634005769457664/Ppl32NaN_400x400.jpeg'
}]);

var mentionPlugin = (0, _draftJsMentionPlugin2.default)({
  mentions: mentions
});
var MentionSuggestions = mentionPlugin.MentionSuggestions;


var RichTextEditor = _react2.default.createClass({
  displayName: 'RichTextEditor',

  propTypes: {},

  getInitialState: function getInitialState() {
    var _props = this.props;
    var editorState = _props.editorState;
    var onChange = _props.onChange;


    return {
      plugins: [(0, _draftJsAutolistPlugin2.default)(), mentionPlugin]
    };
  },
  render: function render() {
    var _props2 = this.props;
    var editorState = _props2.editorState;
    var onChange = _props2.onChange;


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_draftJsPluginsEditor2.default, { editorState: editorState, onChange: onChange, plugins: this.state.plugins }),
      _react2.default.createElement(MentionSuggestions, { onSearchChange: function onSearchChange(_ref) {
          var value = _ref.value;
          return console.log(value);
        }, suggestions: mentions })
    );
  }
});

/**
 * Plugins
 */

exports.default = RichTextEditor;