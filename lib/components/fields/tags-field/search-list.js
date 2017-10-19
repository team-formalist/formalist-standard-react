var _jsxFileName = "src/components/fields/tags-field/search-list.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import debounce from "lodash.debounce";
import search from "../../../utils/search";
import keyCodes from "../../../utils/key-codes";

import * as styles from "./search-list-styles";

/**
 * Abort request if it exists
 * @param  {RequestObject} req Provided by search
 */
function abortCurrentSearch(req) {
  if (req && req.abort) {
    req.abort();
  }
}

/**
 * Takes a query, does a search, displays a list of results based on
 * that search, allows them to be selected.
 */

var SearchList = function (_Component) {
  _inherits(SearchList, _Component);

  function SearchList(props) {
    _classCallCheck(this, SearchList);

    // FIXME
    // This is in place for a lifecycle bug in React it seems
    // When we receive the query in componentWillReceiveProps
    // and trigger a setState it can happen _after_ the component is
    // torn down which is an error, so we handle it manually for now
    // even though it shouldn’t be possiel
    var _this = _possibleConstructorReturn(this, (SearchList.__proto__ || Object.getPrototypeOf(SearchList)).call(this, props));

    _this._unmounted = false;

    _this.state = {
      results: [],
      selectedIndex: -1
    };

    // Bindings
    _this.onSearchSuccess = _this.onSearchSuccess.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    return _this;
  }

  _createClass(SearchList, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      document.addEventListener("keydown", this.onKeyDown);
      var query = this.props.query;

      if (query) {
        // Call with context
        this.doSearch();
      }
      // Bind afterwards so all the but 1st search is debounced
      this.doSearch = debounce(this.doSearch.bind(this), 250);
    }

    /**
     * Trigger a search if a new query comes in
     * @param  {Object} nextProps New props
     */

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.query !== this.props.query) {
        this.doSearch();
      }
    }

    /**
     * Tear down listeners and cancel existing searches
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._unmounted = true;
      abortCurrentSearch(this.currentRequest);
      document.removeEventListener("keydown", this.onKeyDown);
    }

    /**
     * Handle focus and selection of the results list
     * @param  {KeyboardEvent} e
     */

  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var _state = this.state,
          selectedIndex = _state.selectedIndex,
          results = _state.results;

      if (e.keyCode === keyCodes.DOWN) {
        // Move focus down
        e.preventDefault();
        selectedIndex = selectedIndex + 1;
        // Restrict to length of results
        if (selectedIndex > results.length - 1) {
          selectedIndex = results.length - 1;
        }
        this.setState({
          selectedIndex: selectedIndex
        });
      } else if (e.keyCode === keyCodes.UP) {
        // Move focus up
        e.preventDefault();
        selectedIndex = selectedIndex - 1;
        if (selectedIndex < 0) {
          selectedIndex = -1;
        }
        this.setState({
          selectedIndex: selectedIndex
        });
      } else if (e.keyCode === keyCodes.ENTER && selectedIndex > -1) {
        // Handle selection
        e.preventDefault();
        var onSelect = this.props.onSelect;

        onSelect(results[selectedIndex]);
      }
    }

    /**
     * Trigger the search over XHR, update with results
     */

  }, {
    key: "doSearch",
    value: function doSearch() {
      var _props = this.props,
          query = _props.query,
          params = _props.params,
          threshold = _props.threshold,
          url = _props.url;
      // Abort any existing requests

      abortCurrentSearch(this.currentRequest);

      // Only search if have enough characters
      if (query && query.length >= threshold || threshold === 0) {
        // Save the current request
        var data = Object.assign({}, params, {
          q: query
        });
        this.onSearchStart();
        var req = search(url, data);
        req.response.then(this.onSearchSuccess);
        this.currentRequest = req;
      } else {
        if (this._unmounted === false) {
          this.setState({
            results: [],
            selectedIndex: -1
          });
        }
      }
    }

    /**
     * Reset list when new results come in
     * @param  {Object} rsp Response object from search XHR
     */

  }, {
    key: "onSearchSuccess",
    value: function onSearchSuccess(rsp) {
      if (rsp.results) {
        this.setState({
          results: rsp.results,
          selectedIndex: -1
        });
        this.onSearchEnd();
      }
    }

    /**
     * Fire onSearchStart callback
     */

  }, {
    key: "onSearchStart",
    value: function onSearchStart() {
      var onSearchStart = this.props.onSearchStart;

      if (onSearchStart) {
        onSearchStart();
      }
    }

    /**
     * Fire onSearchEnd callback
     */

  }, {
    key: "onSearchEnd",
    value: function onSearchEnd() {
      var onSearchEnd = this.props.onSearchEnd;

      if (onSearchEnd) {
        onSearchEnd();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var onSelect = this.props.onSelect;
      var _state2 = this.state,
          results = _state2.results,
          selectedIndex = _state2.selectedIndex;

      var hasResults = results.length > 0;
      if (hasResults) {
        return React.createElement(
          "div",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 179
            },
            __self: this
          },
          results.map(function (result, i) {
            var selected = i === selectedIndex;
            var buttonClassNames = classNames(styles.optionButton, _defineProperty({}, "" + styles.optionButtonFocus, selected));
            var onClick = function onClick(e) {
              e.preventDefault();
              onSelect(result);
            };
            return React.createElement(
              "button",
              { key: i, className: buttonClassNames, onClick: onClick, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 190
                },
                __self: _this2
              },
              result.label
            );
          })
        );
      } else {
        return null;
      }
    }
  }]);

  return SearchList;
}(Component);

/**
 * PropTypes
 * @type {Object}
 */


SearchList.propTypes = {
  query: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  params: PropTypes.object,
  threshold: PropTypes.number,
  onSearchStart: PropTypes.func,
  onSearchEnd: PropTypes.func,
  onSelect: PropTypes.func.isRequired
};

export default SearchList;