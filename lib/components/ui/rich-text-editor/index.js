'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJsAutolistPlugin = require('draft-js-autolist-plugin');

var _draftJsAutolistPlugin2 = _interopRequireDefault(_draftJsAutolistPlugin);

require('./tmp.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Plugins


var RichTextEditor = _react2.default.createClass({
  displayName: 'RichTextEditor',

  propTypes: {},

  getInitialState: function getInitialState() {
    var _props = this.props;
    var editorState = _props.editorState;
    var onChange = _props.onChange;


    return {
      plugins: [(0, _draftJsAutolistPlugin2.default)()]
    };
  },
  render: function render() {
    var _props2 = this.props;
    var editorState = _props2.editorState;
    var onChange = _props2.onChange;


    return _react2.default.createElement(_draftJsPluginsEditor2.default, { editorState: editorState, onChange: onChange, plugins: this.state.plugins });
  }
});

/**
 * Plugins
 */

exports.default = RichTextEditor;