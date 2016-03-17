'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _fileInput = require('../../ui/file-input');

var _fileInput2 = _interopRequireDefault(_fileInput);

var _validation = require('./validation.js');

var _upload = require('./upload.js');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import styles
// import styles from './index.mcss'

// import classNames from 'classnames'
exports.default = _react2.default.createClass({

  /**
   * displayName
   */

  displayName: 'FileUploadField',

  /**
   * propTypes
   */

  propTypes: {
    errors: _reactImmutableProptypes2.default.list,
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    name: _react2.default.PropTypes.string,
    presign_url: _react2.default.PropTypes.string,
    token: _react2.default.PropTypes.string
  },

  /**
   * onChange
   * @param  {Event} e
   * @return {[type]}   [description]
   */

  onChange: function onChange(e) {
    var file = e.target.files[0];
    if (!file) return;
    var _props = this.props;
    var presign_url = _props.presign_url;
    var token = _props.token;


    (0, _validation.validate)(file, function (status) {
      console.log(status);

      (0, _upload2.default)(file, 'https://api.myjson.com/bins/1aceb', token).then(function (res) {
        debugger;
      });
    });
  },


  /**
   * render
   * @return {vnode}
   */

  render: function render() {
    var _props2 = this.props;
    var errors = _props2.errors;
    var hint = _props2.hint;
    var label = _props2.label;
    var name = _props2.name;

    var hasErrors = errors.count() > 0;

    return _react2.default.createElement(
      'div',
      { className: '' },
      _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(_header2.default, {
          error: hasErrors,
          hint: hint,
          id: name,
          label: label
        })
      ),
      _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(_fileInput2.default, {
          error: hasErrors,
          id: name,
          name: name,
          onChange: this.onChange
        }),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      )
    );
  }
});

// Import components