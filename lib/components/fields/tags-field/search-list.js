'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _search = require('../../../utils/search');

var _search2 = _interopRequireDefault(_search);

var _keyCodes = require('../../../utils/key-codes');

var _keyCodes2 = _interopRequireDefault(_keyCodes);

var _searchList = require('./search-list.mcss');

var _searchList2 = _interopRequireDefault(_searchList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('keydown', this.onKeyDown);
      var query = this.props.query;

      if (query) {
        // Call with context
        this.doSearch();
      }
      // Bind afterwards so all the but 1st search is debounced
      this.doSearch = (0, _lodash2.default)(this.doSearch.bind(this), 250);
    }

    /**
     * Trigger a search if a new query comes in
     * @param  {Object} nextProps New props
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.query !== this.props.query) {
        this.doSearch();
      }
    }

    /**
     * Tear down listeners and cancel existing searches
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unmounted = true;
      abortCurrentSearch(this.currentRequest);
      document.removeEventListener('keydown', this.onKeyDown);
    }

    /**
     * Handle focus and selection of the results list
     * @param  {KeyboardEvent} e
     */

  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      var _state = this.state;
      var selectedIndex = _state.selectedIndex;
      var results = _state.results;

      if (e.keyCode === _keyCodes2.default.DOWN) {
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
      } else if (e.keyCode === _keyCodes2.default.UP) {
        // Move focus up
        e.preventDefault();
        selectedIndex = selectedIndex - 1;
        if (selectedIndex < 0) {
          selectedIndex = -1;
        }
        this.setState({
          selectedIndex: selectedIndex
        });
      } else if (e.keyCode === _keyCodes2.default.ENTER && selectedIndex > -1) {
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
    key: 'doSearch',
    value: function doSearch() {
      var _props = this.props;
      var query = _props.query;
      var params = _props.params;
      var threshold = _props.threshold;
      var url = _props.url;
      // Abort any existing requests

      abortCurrentSearch(this.currentRequest);

      // Only search if have enough characters
      if (query && query.length >= threshold || threshold === 0) {
        // Save the current request
        var data = Object.assign({}, params, {
          q: query
        });
        this.onSearchStart();
        var req = (0, _search2.default)(url, data);
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
    key: 'onSearchSuccess',
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
    key: 'onSearchStart',
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
    key: 'onSearchEnd',
    value: function onSearchEnd() {
      var onSearchEnd = this.props.onSearchEnd;

      if (onSearchEnd) {
        onSearchEnd();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var onSelect = this.props.onSelect;
      var _state2 = this.state;
      var results = _state2.results;
      var selectedIndex = _state2.selectedIndex;

      var hasResults = results.length > 0;
      if (hasResults) {
        return _react2.default.createElement(
          'div',
          null,
          results.map(function (result, i) {
            var selected = i === selectedIndex;
            var buttonClassNames = (0, _classnames2.default)(_searchList2.default.optionButton, _defineProperty({}, '' + _searchList2.default.optionButtonFocus, selected));
            var onClick = function onClick(e) {
              e.preventDefault();
              onSelect(result);
            };
            return _react2.default.createElement(
              'button',
              {
                key: i,
                className: buttonClassNames,
                onClick: onClick
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
}(_react.Component);

/**
 * PropTypes
 * @type {Object}
 */


SearchList.propTypes = {
  query: _react2.default.PropTypes.string.isRequired,
  url: _react2.default.PropTypes.string.isRequired,
  params: _react2.default.PropTypes.object,
  threshold: _react2.default.PropTypes.number,
  onSearchStart: _react2.default.PropTypes.func,
  onSearchEnd: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func.isRequired
};

exports.default = SearchList;