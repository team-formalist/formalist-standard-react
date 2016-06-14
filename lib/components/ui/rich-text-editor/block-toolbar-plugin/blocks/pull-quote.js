'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PullquoteBlock = _react2.default.createClass({
  displayName: 'PullquoteBlock',
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'rte-block__pullquote' },
      _react2.default.createElement(_draftJs.EditorBlock, this.props)
    );
  }
});

exports.default = PullquoteBlock;