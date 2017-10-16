import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as styles from './styles'

class Pagination extends Component {
  nextPage () {
    const {currentPage, goToPage, totalPages} = this.props
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  prevPage () {
    const {currentPage, goToPage} = this.props
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  renderJumpSelect (currentPage, totalPages, goToPage) {
    // Create an array with the number of pages
    const pages = Array.apply(null, {length: totalPages}).map(Number.call, Number)
    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return (
      <select
        onChange={(e) => goToPage(e.target.value)}
        value={currentPage}>
        {
          pages.map((i) => {
            const page = i + 1
            return <option key={page} value={page}>{page}</option>
          })
        }
      </select>
    )
    /* eslint-enable react/jsx-no-bind */
  }

  render () {
    const {currentPage, goToPage, totalPages} = this.props

    const jumpSelect = this.renderJumpSelect(currentPage, totalPages, goToPage)

    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return (
      <div className={styles.base}>
        <div className={styles.info}>
          Page {jumpSelect} of {totalPages}
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.prevButton}
            disabled={(currentPage === 1)}
            onClick={(e) => {
              this.prevPage()
            }}>
            <span className={styles.buttonArrow}>←</span>
            <span className={styles.buttonText}> Prev</span>
          </button>
          <button
            className={styles.nextButton}
            disabled={(currentPage === totalPages)}
            onClick={(e) => {
              this.nextPage()
            }}>
            <span className={styles.buttonText}>Next </span>
            <span className={styles.buttonArrow}>→</span>
          </button>
        </div>
      </div>
    )
    /* eslint-enable react/jsx-no-bind */
  }
}

/**
 * PropTypes
 * @type {Object}
 */
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
}

export default Pagination
