var _jsxFileName = "src/components/ui/search-selector/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from "prop-types";
import React, { Component } from "react";
import classNames from "classnames";
import debounce from "lodash.debounce";
import search from "../../../utils/search";
import Pagination from "./pagination";
import Spinner from "../spinner";

import * as styles from "./styles";

function abortCurrentSearch(req) {
  if (req && req.abort) {
    req.abort();
  }
}

// Export the imported search method as a default for this component
export var searchMethod = search;

// Component

var SearchSelector = function (_Component) {
  _inherits(SearchSelector, _Component);

  function SearchSelector(props) {
    _classCallCheck(this, SearchSelector);

    // Instance vars
    var _this = _possibleConstructorReturn(this, (SearchSelector.__proto__ || Object.getPrototypeOf(SearchSelector)).call(this, props));

    _this.page = 1;
    _this.query = props.query;
    // Persistent request object
    _this.currentRequest = null;

    // Default state
    _this.state = {
      hasSearched: false,
      loading: false,
      results: [],
      pagination: {}
    };

    // Bindings
    _this.doSearch = debounce(_this.doSearch.bind(_this), 250);
    _this.onSearchChange = _this.onSearchChange.bind(_this);
    _this.onSearchSuccess = _this.onSearchSuccess.bind(_this);
    _this.onSearchBlur = _this.onSearchBlur.bind(_this);
    _this.onSearchFocus = _this.onSearchFocus.bind(_this);
    _this.goToPage = _this.goToPage.bind(_this);
    return _this;
  }

  _createClass(SearchSelector, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _props = this.props,
          threshold = _props.threshold,
          query = _props.query;
      // Do a search for nothing on load if threshold is 0

      if (query && query.length >= threshold || threshold === 0) {
        this.doSearch(query);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      abortCurrentSearch(this.currentRequest);
    }
  }, {
    key: "doSearch",
    value: function doSearch(query) {
      var _props2 = this.props,
          params = _props2.params,
          perPage = _props2.perPage,
          threshold = _props2.threshold,
          url = _props2.url;

      this.query = query != null ? query : this.query;
      // Abort any existing requests
      abortCurrentSearch(this.currentRequest);

      // Only search if have enough characters
      if (this.query && this.query.length >= threshold || threshold === 0) {
        // Save the current request
        var data = Object.assign({}, params, {
          q: this.query,
          page: this.page,
          per_page: perPage
        });
        var req = search(url, data);
        req.response.then(this.onSearchSuccess);
        this.currentRequest = req;

        this.setState({
          loading: true,
          hasSearched: true
        });
      } else {
        this.setState({
          loading: false,
          results: [],
          pagination: {},
          hasSearched: true
        });
      }
    }
  }, {
    key: "onSearchBlur",
    value: function onSearchBlur(e) {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: "onSearchFocus",
    value: function onSearchFocus(e) {
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: "onSearchChange",
    value: function onSearchChange(e) {
      var query = e.target.value;
      // Reset page value to default
      this.page = 1;
      this.doSearch(query);
      if (this.props.onQueryChange) {
        this.props.onQueryChange(query);
      }
    }
  }, {
    key: "onSearchSuccess",
    value: function onSearchSuccess(rsp) {
      this.setState({
        loading: false,
        results: rsp.results,
        pagination: rsp.pagination
      });
    }
  }, {
    key: "goToPage",
    value: function goToPage(page) {
      this.page = parseInt(page, 10);
      this.doSearch();
    }
  }, {
    key: "focusSearch",
    value: function focusSearch() {
      this._search.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          onSelection = _props3.onSelection,
          optionComponent = _props3.optionComponent,
          optionControlComponent = _props3.optionControlComponent,
          selectedIds = _props3.selectedIds;
      var _state = this.state,
          hasSearched = _state.hasSearched,
          loading = _state.loading,
          results = _state.results,
          pagination = _state.pagination;

      // Has query?

      var hasQuery = this.query != null && this.query !== "";

      // OptionControl component
      var OptionControl = optionControlComponent;

      // Render each option
      var Option = optionComponent;
      var options = results.map(function (option) {
        var selected = selectedIds.indexOf(option.id) > -1;
        var onClick = function onClick(e) {
          e.preventDefault();
          onSelection(option.id, option);
        };
        var optionButtonClassNames = classNames(styles.optionButton, _defineProperty({}, "" + styles.optionButtonSelected, selected));
        return React.createElement(
          "button",
          {
            key: option.id,
            "data-value": option.id,
            className: optionButtonClassNames,
            onClick: onClick,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 158
            },
            __self: _this2
          },
          React.createElement(Option, { option: option, __source: {
              fileName: _jsxFileName,
              lineNumber: 164
            },
            __self: _this2
          })
        );
      });

      var resultClassNames = classNames(styles.results, _defineProperty({}, "" + styles.resultsLoading, loading));

      return React.createElement(
        "div",
        { "data-search-selector": true, className: styles.base, __source: {
            fileName: _jsxFileName,
            lineNumber: 174
          },
          __self: this
        },
        React.createElement("input", {
          ref: function ref(r) {
            _this2._search = r;
          },
          "data-search-selector-input": true,
          type: "text",
          className: styles.search,
          defaultValue: this.query,
          placeholder: "Type to search",
          onBlur: this.onSearchBlur,
          onFocus: this.onSearchFocus,
          onChange: this.onSearchChange,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 175
          },
          __self: this
        }),
        loading ? React.createElement(Spinner, { className: styles.spinner, __source: {
            fileName: _jsxFileName,
            lineNumber: 188
          },
          __self: this
        }) : null,
        OptionControl ? React.createElement(OptionControl, {
          hasQuery: hasQuery,
          options: options,
          onSelection: onSelection,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 190
          },
          __self: this
        }) : null,
        options.length > 0 ? React.createElement(
          "div",
          { "data-search-selector-results": true, className: resultClassNames, __source: {
              fileName: _jsxFileName,
              lineNumber: 197
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: styles.pagination, __source: {
                fileName: _jsxFileName,
                lineNumber: 198
              },
              __self: this
            },
            React.createElement(Pagination, {
              currentPage: this.page,
              totalPages: pagination.total_pages,
              goToPage: this.goToPage,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 199
              },
              __self: this
            })
          ),
          React.createElement(
            "div",
            { className: styles.list, __source: {
                fileName: _jsxFileName,
                lineNumber: 205
              },
              __self: this
            },
            options
          )
        ) : hasSearched && hasQuery && !loading ? React.createElement(
          "p",
          { className: styles.noResults, __source: {
              fileName: _jsxFileName,
              lineNumber: 208
            },
            __self: this
          },
          "No results matching your search"
        ) : null
      );
    }
  }]);

  return SearchSelector;
}(Component);

/**
 * Default props
 * @type {Object}
 */


SearchSelector.defaultProps = {
  optionComponent: OptionComponent,
  selectedIds: [],
  perPage: 20,
  threshold: 1
};

/**
 * PropTypes
 * @type {Object}
 */
SearchSelector.propTypes = {
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onQueryChange: PropTypes.func,
  onSelection: PropTypes.func.isRequired,
  optionComponent: PropTypes.func,
  optionControlComponent: PropTypes.func,
  selectedIds: PropTypes.array,
  params: PropTypes.object,
  perPage: PropTypes.number,
  query: PropTypes.string,
  threshold: PropTypes.number,
  url: PropTypes.string.isRequired
};

/**
 * Default Option Component for the search selector
 */
function OptionComponent(_ref) {
  var option = _ref.option;

  return React.createElement(
    "div",
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 249
      },
      __self: this
    },
    option.label
  );
}

OptionComponent.propTypes = {
  option: PropTypes.object
};

export default SearchSelector;