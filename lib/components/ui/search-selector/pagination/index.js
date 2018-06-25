var _jsxFileName = "src/components/ui/search-selector/pagination/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import * as styles from "./styles";

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
  }

  _createClass(Pagination, [{
    key: "nextPage",
    value: function nextPage() {
      var _props = this.props,
          currentPage = _props.currentPage,
          goToPage = _props.goToPage,
          totalPages = _props.totalPages;

      if (currentPage < totalPages) {
        goToPage(currentPage + 1);
      }
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      var _props2 = this.props,
          currentPage = _props2.currentPage,
          goToPage = _props2.goToPage;

      if (currentPage > 1) {
        goToPage(currentPage - 1);
      }
    }
  }, {
    key: "renderJumpSelect",
    value: function renderJumpSelect(currentPage, totalPages, goToPage) {
      var _this2 = this;

      // Create an array with the number of pages
      var pages = Array.apply(null, { length: totalPages }).map(Number.call, Number);
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return React.createElement(
        "select",
        { onChange: function onChange(e) {
            return goToPage(e.target.value);
          }, value: currentPage, __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          },
          __self: this
        },
        pages.map(function (i) {
          var page = i + 1;
          return React.createElement(
            "option",
            { key: page, value: page, __source: {
                fileName: _jsxFileName,
                lineNumber: 33
              },
              __self: _this2
            },
            page
          );
        })
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props3 = this.props,
          currentPage = _props3.currentPage,
          goToPage = _props3.goToPage,
          totalPages = _props3.totalPages;


      var jumpSelect = this.renderJumpSelect(currentPage, totalPages, goToPage);

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return React.createElement(
        "div",
        { className: styles.base, __source: {
            fileName: _jsxFileName,
            lineNumber: 51
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: styles.info, __source: {
              fileName: _jsxFileName,
              lineNumber: 52
            },
            __self: this
          },
          "Page ",
          jumpSelect,
          " of ",
          totalPages
        ),
        React.createElement(
          "div",
          { className: styles.buttons, __source: {
              fileName: _jsxFileName,
              lineNumber: 55
            },
            __self: this
          },
          React.createElement(
            "button",
            {
              "data-search-selector-pagination": "prev",
              className: styles.prevButton,
              disabled: currentPage === 1,
              onClick: function onClick(e) {
                _this3.prevPage();
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 56
              },
              __self: this
            },
            React.createElement(
              "span",
              { className: styles.buttonArrow, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 64
                },
                __self: this
              },
              "\u2190"
            ),
            React.createElement(
              "span",
              { className: styles.buttonText, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 65
                },
                __self: this
              },
              " Prev"
            )
          ),
          React.createElement(
            "button",
            {
              "data-search-selector-pagination": "next",
              className: styles.nextButton,
              disabled: currentPage === totalPages,
              onClick: function onClick(e) {
                _this3.nextPage();
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 67
              },
              __self: this
            },
            React.createElement(
              "span",
              { className: styles.buttonText, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 75
                },
                __self: this
              },
              "Next "
            ),
            React.createElement(
              "span",
              { className: styles.buttonArrow, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 76
                },
                __self: this
              },
              "\u2192"
            )
          )
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return Pagination;
}(Component);

/**
 * PropTypes
 * @type {Object}
 */


Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired
};

export default Pagination;