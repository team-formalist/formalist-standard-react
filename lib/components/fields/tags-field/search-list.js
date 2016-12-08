'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _search = require('../../../utils/search');

var _search2 = _interopRequireDefault(_search);

var _searchList = require('./search-list.mcss');

var _searchList2 = _interopRequireDefault(_searchList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var _this = _possibleConstructorReturn(this, (SearchList.__proto__ || Object.getPrototypeOf(SearchList)).call(this, props));

    _this.state = {
      results: []
    };

    // Binding
    _this.onSearchSuccess = _this.onSearchSuccess.bind(_this);

    var query = props.query;

    if (query) {
      // Call with context
      _this.doSearch.call(_this);
    }
    // Bind afterwards so all the but 1st search is debounced
    _this.doSearch = (0, _lodash2.default)(_this.doSearch.bind(_this), 250);
    return _this;
  }

  _createClass(SearchList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.query !== this.props.query) {
        this.doSearch();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      abortCurrentSearch(this.currentRequest);
    }
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
        this.setState({
          results: []
        });
      }
    }
  }, {
    key: 'onSearchSuccess',
    value: function onSearchSuccess(rsp) {
      this.setState({
        results: rsp.results
      });
      this.onSearchEnd();
    }
  }, {
    key: 'onSearchStart',
    value: function onSearchStart() {
      var onSearchStart = this.props.onSearchStart;

      if (onSearchStart) {
        onSearchStart();
      }
    }
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
      var results = this.state.results;

      var hasResults = results.length > 0;
      if (hasResults) {
        return _react2.default.createElement(
          'div',
          null,
          results.map(function (result, i) {
            return _react2.default.createElement(
              'button',
              {
                key: i,
                className: _searchList2.default.optionButton,
                onClick: function onClick(e) {
                  e.preventDefault();
                  onSelect(result);
                }
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

exports.default = SearchList;