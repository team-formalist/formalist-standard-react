'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
  }

  _createClass(Pagination, [{
    key: 'nextPage',
    value: function nextPage() {
      var _props = this.props;
      var currentPage = _props.currentPage;
      var goToPage = _props.goToPage;
      var totalPages = _props.totalPages;

      if (currentPage < totalPages) {
        goToPage(currentPage + 1);
      }
    }
  }, {
    key: 'prevPage',
    value: function prevPage() {
      var _props2 = this.props;
      var currentPage = _props2.currentPage;
      var goToPage = _props2.goToPage;

      if (currentPage > 1) {
        goToPage(currentPage - 1);
      }
    }
  }, {
    key: 'renderJumpSelect',
    value: function renderJumpSelect(currentPage, totalPages, goToPage) {
      // Create an array with the number of pages
      var pages = Array.apply(null, { length: totalPages }).map(Number.call, Number);
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return _react2.default.createElement(
        'select',
        {
          onChange: function onChange(e) {
            return goToPage(e.target.value);
          },
          value: currentPage },
        pages.map(function (i) {
          var page = i + 1;
          return _react2.default.createElement(
            'option',
            { key: page, value: page },
            page
          );
        })
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props;
      var currentPage = _props3.currentPage;
      var goToPage = _props3.goToPage;
      var totalPages = _props3.totalPages;


      var jumpSelect = this.renderJumpSelect(currentPage, totalPages, goToPage);

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return _react2.default.createElement(
        'div',
        { className: styles.base },
        _react2.default.createElement(
          'div',
          { className: styles.info },
          'Page ',
          jumpSelect,
          ' of ',
          totalPages
        ),
        _react2.default.createElement(
          'div',
          { className: styles.buttons },
          _react2.default.createElement(
            'button',
            {
              className: styles.prevButton,
              disabled: currentPage === 1,
              onClick: function onClick(e) {
                _this2.prevPage();
              } },
            _react2.default.createElement(
              'span',
              { className: styles.buttonArrow },
              '\u2190'
            ),
            _react2.default.createElement(
              'span',
              { className: styles.buttonText },
              ' Prev'
            )
          ),
          _react2.default.createElement(
            'button',
            {
              className: styles.nextButton,
              disabled: currentPage === totalPages,
              onClick: function onClick(e) {
                _this2.nextPage();
              } },
            _react2.default.createElement(
              'span',
              { className: styles.buttonText },
              'Next '
            ),
            _react2.default.createElement(
              'span',
              { className: styles.buttonArrow },
              '\u2192'
            )
          )
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return Pagination;
}(_react.Component);

/**
 * PropTypes
 * @type {Object}
 */


Pagination.propTypes = {
  currentPage: _propTypes2.default.number.isRequired,
  totalPages: _propTypes2.default.number.isRequired,
  goToPage: _propTypes2.default.func.isRequired
};

exports.default = Pagination;