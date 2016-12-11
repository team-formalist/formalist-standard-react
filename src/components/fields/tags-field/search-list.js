import React, {Component} from 'react'
import classNames from 'classnames'
import debounce from 'lodash.debounce'
import search from '../../../utils/search'
import keyCodes from '../../../utils/key-codes'

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

    // FIXME
    // This is in place for a lifecycle bug in React it seems
    // When we receive the query in componentWillReceiveProps
    // and trigger a setState it can happen _after_ the component is
    // torn down which is an error, so we handle it manually for now
    // even though it shouldn’t be possiel
    this._unmounted = false

    this.state = {
      results: [],
      selectedIndex: -1,
    }

    // Bindings
    this.onSearchSuccess = this.onSearchSuccess.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentWillMount () {
    document.addEventListener('keydown', this.onKeyDown)
    const {query} = this.props
    if (query) {
      // Call with context
      this.doSearch()
    }
    // Bind afterwards so all the but 1st search is debounced
    this.doSearch = debounce(this.doSearch.bind(this), 250)
  }

  /**
   * Trigger a search if a new query comes in
   * @param  {Object} nextProps New props
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.query !== this.props.query) {
      this.doSearch()
    }
  }

  /**
   * Tear down listeners and cancel existing searches
   */
  componentWillUnmount () {
    this._unmounted = true
    abortCurrentSearch(this.currentRequest)
    document.removeEventListener('keydown', this.onKeyDown)
  }

  /**
   * Handle focus and selection of the results list
   * @param  {KeyboardEvent} e
   */
  onKeyDown (e) {
    let {selectedIndex, results} = this.state
    if (e.keyCode === keyCodes.DOWN) {
      // Move focus down
      e.preventDefault()
      selectedIndex = selectedIndex + 1
      // Restrict to length of results
      if (selectedIndex > results.length - 1) {
        selectedIndex = results.length - 1
      }
      this.setState({
        selectedIndex,
      })
    } else if (e.keyCode === keyCodes.UP) {
      // Move focus up
      e.preventDefault()
      selectedIndex = selectedIndex - 1
      if (selectedIndex < 0) {
        selectedIndex = -1
      }
      this.setState({
        selectedIndex,
      })
    } else if (e.keyCode === keyCodes.ENTER && selectedIndex > -1) {
      // Handle selection
      e.preventDefault()
      const {onSelect} = this.props
      onSelect(results[selectedIndex])
    }
  }

  /**
   * Trigger the search over XHR, update with results
   */
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
      if (this._unmounted === false) {
        this.setState({
          results: [],
          selectedIndex: -1,
        })
      }
    }
  }

  /**
   * Reset list when new results come in
   * @param  {Object} rsp Response object from search XHR
   */
  onSearchSuccess (rsp) {
    if (rsp.results) {
      this.setState({
        results: rsp.results,
        selectedIndex: -1,
      })
      this.onSearchEnd()
    }
  }

  /**
   * Fire onSearchStart callback
   */
  onSearchStart () {
    const {onSearchStart} = this.props
    if (onSearchStart) {
      onSearchStart()
    }
  }

  /**
   * Fire onSearchEnd callback
   */
  onSearchEnd () {
    const {onSearchEnd} = this.props
    if (onSearchEnd) {
      onSearchEnd()
    }
  }

  render () {
    const {onSelect} = this.props
    const {results, selectedIndex} = this.state
    const hasResults = results.length > 0
    if (hasResults) {
      return (
        <div>
          {results.map((result, i) => {
            const selected = (i === selectedIndex)
            const buttonClassNames = classNames(
              styles.optionButton,
              {
                [`${styles.optionButtonFocus}`]: selected,
              }
            )
            const onClick = (e) => {
              e.preventDefault()
              onSelect(result)
            }
            return (
              <button
                key={i}
                className={buttonClassNames}
                onClick={onClick}
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

/**
 * PropTypes
 * @type {Object}
 */
SearchList.propTypes = {
  query: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  params: React.PropTypes.object,
  threshold: React.PropTypes.number,
  onSearchStart: React.PropTypes.func,
  onSearchEnd: React.PropTypes.func,
  onSelect: React.PropTypes.func.isRequired,
}

export default SearchList
