'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _check_box = require('./check_box');

var _check_box2 = _interopRequireDefault(_check_box);

var _date_field = require('./date_field');

var _date_field2 = _interopRequireDefault(_date_field);

var _date_time_field = require('./date_time_field');

var _date_time_field2 = _interopRequireDefault(_date_time_field);

var _number_field = require('./number_field');

var _number_field2 = _interopRequireDefault(_number_field);

var _radio_buttons = require('./radio_buttons');

var _radio_buttons2 = _interopRequireDefault(_radio_buttons);

var _select_box = require('./select_box');

var _select_box2 = _interopRequireDefault(_select_box);

var _text_field = require('./text_field');

var _text_field2 = _interopRequireDefault(_text_field);

var _text_area = require('./text_area');

var _text_area2 = _interopRequireDefault(_text_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrap a React class in with the common Container class
 *
 * @param  {Function} field A React class
 * @return {Function} A function
 */
function wrapField(field) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return function (fieldProps) {
    return _react2.default.createElement(_container2.default, _extends({ field: field, options: options }, fieldProps));
  };
}

/**
 * Wrapped fields for each type
 * @param {Object} options Options specific to the fields.
 * @type {Object}
 */
function fields() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return {
    check_box: wrapField(_check_box2.default, options.check_box),
    date_field: wrapField(_date_field2.default, options.date_field),
    date_time_field: wrapField(_date_time_field2.default, options.date_time_field),
    number_field: wrapField(_number_field2.default, options.number_field),
    radio_buttons: wrapField(_radio_buttons2.default, options.radio_buttons),
    select_box: wrapField(_select_box2.default, options.select_box),
    text_area: wrapField(_text_area2.default, options.text_area),
    text_field: wrapField(_text_field2.default, options.text_field)
  };
}

exports.default = fields;