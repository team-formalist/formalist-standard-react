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

var _uploadToS = require('./upload-to-S3.js');

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
    attributes: _react2.default.PropTypes.shape({
      label: _react2.default.PropTypes.string,
      presign_url: _react2.default.PropTypes.string
    }),
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
    var presign_url = this.props.attributes.presign_url;


    (0, _validation.validate)(file).then((0, _uploadToS.preSign)(file, presign_url, 'token')).then(function (data) {
      (0, _uploadToS.upload)(data, file, 'token');
    }).then(function (res) {
      console.log('res', res);
    }).catch(function (err) {
      console.log('err', err);
    });
  },


  /**
   * render
   * @return {vnode}
   */

  render: function render() {
    var _props = this.props;
    var errors = _props.errors;
    var hint = _props.hint;
    var label = _props.label;
    var name = _props.name;

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