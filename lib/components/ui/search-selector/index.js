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

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _spinner = require('../spinner');

var _spinner2 = _interopRequireDefault(_spinner);

var _searchSelector = require('./search-selector.mcss');

var _searchSelector2 = _interopRequireDefault(_searchSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function abortCurrentSearch(req) {
  if (req && req.abort) {
    req.abort();
  }
}

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
    _this.doSearch = (0, _lodash2.default)(_this.doSearch.bind(_this), 250);
    _this.onSearchChange = _this.onSearchChange.bind(_this);
    _this.onSearchSuccess = _this.onSearchSuccess.bind(_this);
    _this.onSearchBlur = _this.onSearchBlur.bind(_this);
    _this.onSearchFocus = _this.onSearchFocus.bind(_this);
    _this.goToPage = _this.goToPage.bind(_this);
    return _this;
  }

  _createClass(SearchSelector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var threshold = _props.threshold;
      var query = _props.query;
      // Do a search for nothing on load if threshold is 0

      if (query && query.length >= threshold || threshold === 0) {
        this.doSearch(query);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      abortCurrentSearch(this.currentRequest);
    }
  }, {
    key: 'doSearch',
    value: function doSearch(query) {
      var _props2 = this.props;
      var params = _props2.params;
      var perPage = _props2.perPage;
      var threshold = _props2.threshold;
      var url = _props2.url;

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
        var req = (0, _search2.default)(url, data);
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
    key: 'onSearchBlur',
    value: function onSearchBlur(e) {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: 'onSearchFocus',
    value: function onSearchFocus(e) {
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: 'onSearchChange',
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
    key: 'onSearchSuccess',
    value: function onSearchSuccess(rsp) {
      this.setState({
        loading: false,
        results: rsp.results,
        pagination: rsp.pagination
      });
    }
  }, {
    key: 'goToPage',
    value: function goToPage(page) {
      this.page = parseInt(page);
      this.doSearch();
    }
  }, {
    key: 'focusSearch',
    value: function focusSearch() {
      this._search.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props;
      var onSelection = _props3.onSelection;
      var optionComponent = _props3.optionComponent;
      var selectedIds = _props3.selectedIds;
      var _state = this.state;
      var hasSearched = _state.hasSearched;
      var loading = _state.loading;
      var results = _state.results;
      var pagination = _state.pagination;

      // Has query?

      var hasQuery = this.query != null && this.query !== '';

      // Render each option
      var Option = optionComponent;
      var options = results.map(function (option) {
        var selected = selectedIds.indexOf(option.id) > -1;
        var onClick = function onClick(e) {
          e.preventDefault();
          onSelection(option.id, option);
        };
        var optionButtonClassNames = (0, _classnames2.default)(_searchSelector2.default.optionButton, _defineProperty({}, '' + _searchSelector2.default.optionButtonSelected, selected));
        return _react2.default.createElement(
          'button',
          {
            key: option.id,
            className: optionButtonClassNames,
            onClick: onClick },
          _react2.default.createElement(Option, { option: option })
        );
      });

      var resultClassNames = (0, _classnames2.default)(_searchSelector2.default.results, _defineProperty({}, '' + _searchSelector2.default.resultsLoading, loading));

      return _react2.default.createElement(
        'div',
        { className: _searchSelector2.default.base },
        _react2.default.createElement('input', {
          ref: function ref(r) {
            _this2._search = r;
          },
          type: 'text',
          className: _searchSelector2.default.search,
          defaultValue: this.query,
          placeholder: 'Type to search',
          onBlur: this.onSearchBlur,
          onFocus: this.onSearchFocus,
          onChange: this.onSearchChange }),
        loading ? _react2.default.createElement(_spinner2.default, { className: _searchSelector2.default.spinner }) : null,
        options.length > 0 ? _react2.default.createElement(
          'div',
          { className: resultClassNames },
          _react2.default.createElement(
            'div',
            { className: _searchSelector2.default.pagination },
            _react2.default.createElement(_pagination2.default, { currentPage: this.page, totalPages: pagination.total_pages, goToPage: this.goToPage })
          ),
          _react2.default.createElement(
            'div',
            { className: _searchSelector2.default.list },
            options
          )
        ) : hasSearched && hasQuery && !loading ? _react2.default.createElement(
          'p',
          { className: _searchSelector2.default.noResults },
          'No results matching your search'
        ) : null
      );
    }
  }]);

  return SearchSelector;
}(_react.Component);

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
  onBlur: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onQueryChange: _react2.default.PropTypes.func,
  onSelection: _react2.default.PropTypes.func.isRequired,
  optionComponent: _react2.default.PropTypes.func,
  selectedIds: _react2.default.PropTypes.array,
  params: _react2.default.PropTypes.object,
  perPage: _react2.default.PropTypes.number,
  query: _react2.default.PropTypes.string,
  threshold: _react2.default.PropTypes.number,
  url: _react2.default.PropTypes.string.isRequired
};

/**
 * Default Option Component for the search selector
 */
function OptionComponent(_ref) {
  var option = _ref.option;

  return _react2.default.createElement(
    'div',
    null,
    option.label
  );
}

OptionComponent.propTypes = {
  option: _react2.default.PropTypes.object
};

exports.default = SearchSelector;