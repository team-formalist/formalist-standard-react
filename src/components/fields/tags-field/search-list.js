import React, {Component} from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import debounce from 'lodash.debounce'
import search from '../../../utils/search'

import styles from './search-list.mcss'

/**
 * Abort request if it exists
 * @param  {RequestObject} req Provided by search
 */
function abortCurrentSearch (req) {
  if (req && req.abort) {
    req.abort()
  }
}

/**
 * Takes a query, does a search, displays a list of results based on
 * that search, allows them to be selected.
 */
class SearchList extends Component {

  constructor (props) {
    super(props)

    this.state = {
      results: [],
    }

    // Binding
    this.onSearchSuccess = this.onSearchSuccess.bind(this)

    const {query} = props
    if (query) {
      // Call with context
      this.doSearch.call(this)
    }
    // Bind afterwards so all the but 1st search is debounced
    this.doSearch = debounce(this.doSearch.bind(this), 250)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.query !== this.props.query) {
      this.doSearch()
    }
  }

  componentWillUnmount () {
    abortCurrentSearch(this.currentRequest)
  }

  doSearch () {
    const {
      query,
      params,
      threshold,
      url,
    } = this.props
    // Abort any existing requests
    abortCurrentSearch(this.currentRequest)

    // Only search if have enough characters
    if (query && query.length >= threshold || threshold === 0) {
      // Save the current request
      const data = Object.assign({}, params, {
        q: query,
      })
      this.onSearchStart()
      const req = search(url, data)
      req.response
        .then(this.onSearchSuccess)
      this.currentRequest = req
    } else {
      this.setState({
        results: [],
      })
    }
  }

  onSearchSuccess (rsp) {
    this.setState({
      results: rsp.results,
    })
    this.onSearchEnd()
  }

  onSearchStart () {
    const {onSearchStart} = this.props
    if (onSearchStart) {
      onSearchStart()
    }
  }

  onSearchEnd () {
    const {onSearchEnd} = this.props
    if (onSearchEnd) {
      onSearchEnd()
    }
  }

  render () {
    const {onSelect} = this.props
    const {results} = this.state
    const hasResults = results.length > 0
    if (hasResults) {
      return (
        <div>
          {results.map((result, i) => {
            return (
              <button
                key={i}
                className={styles.optionButton}
                onClick={(e) => {
                  e.preventDefault()
                  onSelect(result)
                }}
              >
                {result.label}
              </button>
            )
          })}
        </div>
      )
    } else {
      return null
    }
  }
}

export default SearchList
