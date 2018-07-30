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
export const searchMethod = search;

// Component
class SearchSelector extends Component {
  constructor(props) {
    super(props);

    // Instance vars
    this.page = 1;
    this.query = props.query;
    // Persistent request object
    this.currentRequest = null;

    // Default state
    this.state = {
      hasSearched: false,
      loading: false,
      results: [],
      pagination: {}
    };

    // Bindings
    this.doSearch = debounce(this.doSearch.bind(this), 250);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSuccess = this.onSearchSuccess.bind(this);
    this.onSearchBlur = this.onSearchBlur.bind(this);
    this.onSearchFocus = this.onSearchFocus.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  componentWillMount() {
    const { threshold, query } = this.props;
    // Do a search for nothing on load if threshold is 0
    if ((query && query.length >= threshold) || threshold === 0) {
      this.doSearch(query);
    }
  }

  componentWillUnmount() {
    abortCurrentSearch(this.currentRequest);
  }

  doSearch(query) {
    const { params, perPage, threshold, url } = this.props;
    this.query = query != null ? query : this.query;
    // Abort any existing requests
    abortCurrentSearch(this.currentRequest);

    // Only search if have enough characters
    if ((this.query && this.query.length >= threshold) || threshold === 0) {
      // Save the current request
      const data = Object.assign({}, params, {
        q: this.query,
        page: this.page,
        per_page: perPage
      });
      const req = search(url, data);
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

  onSearchBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  onSearchFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  onSearchChange(e) {
    const query = e.target.value;
    // Reset page value to default
    this.page = 1;
    this.doSearch(query);
    if (this.props.onQueryChange) {
      this.props.onQueryChange(query);
    }
  }

  onSearchSuccess(rsp) {
    this.setState({
      loading: false,
      results: rsp.results,
      pagination: rsp.pagination
    });
  }

  goToPage(page) {
    this.page = parseInt(page, 10);
    this.doSearch();
  }

  focusSearch() {
    this._search.focus();
  }

  render() {
    const {
      onSelection,
      optionComponent,
      optionControlComponent,
      selectedIds
    } = this.props;
    const { hasSearched, loading, results, pagination } = this.state;

    // Has query?
    const hasQuery = this.query != null && this.query !== "";

    // OptionControl component
    const OptionControl = optionControlComponent;

    // Render each option
    const Option = optionComponent;
    const options = results.map(option => {
      const selected = selectedIds.indexOf(option.id) > -1;
      let onClick = e => {
        e.preventDefault();
        onSelection(option.id, option);
      };
      const optionButtonClassNames = classNames(styles.optionButton, {
        [`${styles.optionButtonSelected}`]: selected
      });
      return (
        <button
          key={option.id}
          data-value={option.id}
          className={optionButtonClassNames}
          onClick={onClick}
        >
          <Option option={option} />
        </button>
      );
    });

    const resultClassNames = classNames(styles.results, {
      [`${styles.resultsLoading}`]: loading
    });

    return (
      <div data-search-selector className={styles.base}>
        <input
          ref={r => {
            this._search = r;
          }}
          data-search-selector-input
          type="text"
          className={styles.search}
          defaultValue={this.query}
          placeholder="Type to search"
          onBlur={this.onSearchBlur}
          onFocus={this.onSearchFocus}
          onChange={this.onSearchChange}
        />
        {loading ? <Spinner className={styles.spinner} /> : null}
        {OptionControl ? (
          <OptionControl
            hasQuery={hasQuery}
            options={options}
            onSelection={onSelection}
          />
        ) : null}
        {options.length > 0 ? (
          <div data-search-selector-results className={resultClassNames}>
            <div className={styles.pagination}>
              <Pagination
                currentPage={this.page}
                totalPages={pagination.total_pages}
                goToPage={this.goToPage}
              />
            </div>
            <div className={styles.list}>{options}</div>
          </div>
        ) : hasSearched && hasQuery && !loading ? (
          <p className={styles.noResults}>No results matching your search</p>
        ) : null}
      </div>
    );
  }
}

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
function OptionComponent({ option }) {
  return <div>{option.label}</div>;
}

OptionComponent.propTypes = {
  option: PropTypes.object
};

export default SearchSelector;
