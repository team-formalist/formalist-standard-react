import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import { List } from "immutable";
import extractComponent from "../../../utils/extract-component";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";
import Sortable from "../../ui/sortable";
import Popout from "../../ui/popout";
import SearchSelector, {
  searchMethod as search
} from "../../ui/search-selector";

// Import styles
import * as styles from "./styles";

/**
 * Default component for representing a "selected/selection" item
 * @param  {Object} props Taking the shape of:
 *
 * {
 *   option: { label: 'foo'}
 *  }
 *
 * I.e., expecting the option to have a `label` key with a string value.
 *
 * @return {ReactElement}
 */
const SelectDefault = ({ option }) => <div>{option.label}</div>;

SelectDefault.propTypes = {
  option: PropTypes.shape({
    label: PropTypes.string
  })
};

/**
 * Search Selection field
 *
 * Handles the singular select of a
 *
 */
class SearchMultiSelectionField extends Component {
  constructor(props) {
    super(props);

    // Extract existing selection from attributes
    const { value } = props;

    // Keep value as a cached property
    this.cachedSelections = List();
    this.cachedValue = value;

    // Initial state
    this.state = {
      selections: this.cachedSelections,
      selectorFocus: false,
      selectorQuery: null
    };

    // Bindings
    this.onChange = this.onChange.bind(this);
    this.onChooseClick = this.onChooseClick.bind(this);
    this.onSelection = this.onSelection.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.openSelector = this.openSelector.bind(this);
    this.closeSelector = this.closeSelector.bind(this);
    this.toggleSelector = this.toggleSelector.bind(this);
    this.onPopoutOpen = this.onPopoutOpen.bind(this);
    this.onSelectorBlur = this.onSelectorBlur.bind(this);
    this.onSelectorFocus = this.onSelectorFocus.bind(this);
    this.onSelectorQueryChange = this.onSelectorQueryChange.bind(this);
    this.fetchSelectionsData = this.fetchSelectionsData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.cachedValue = nextProps.value;
  }

  /**
   * componentWillMount
   * Do an XHR request for the additional selections data
   * @return {Null}
   */
  componentWillMount() {
    this.fetchSelectionsData();
  }

  /**
   * fetchSelectionsData
   * Do an XHR request for the additional selections data
   * @return {Null}
   */
  fetchSelectionsData() {
    const { attributes, value } = this.props;
    if (value && value.count() > 0) {
      const { search_url } = attributes;
      const req = search(search_url, {
        "ids[]": value.toJS()
      });
      req.response.then(rsp => {
        if (rsp.results && rsp.results.length > 0) {
          const selections = List(rsp.results);
          // Keep as a property so can always know the "true" set
          // and convert to a list
          this.cachedSelections = selections;
          this.setState({
            selections
          });
        }
      });
    }
  }

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange(value, selections) {
    this.cachedValue = value;
    this.cachedSelections = selections;
    this.props.actions.edit(val => {
      return value;
    });
    this.setState({
      selections
    });
  }

  /**
   * On choose click, open selector
   * @return {Null}
   */
  onChooseClick(e) {
    e.preventDefault();
    this.toggleSelector();
  }

  /**
   * When selected item is removed
   * @param {Number} index Index of the item to remove
   * @return {Null}
   */
  onRemove(index) {
    this.onChange(
      this.cachedValue.delete(index),
      this.cachedSelections.delete(index)
    );
  }

  /**
   * When selected item is removed
   * @return {Null}
   */
  onDrop(newOrder) {
    const value = this.cachedValue.slice();
    const selections = this.cachedSelections.slice();
    const updatedValue = newOrder.map(index => value.get(index));
    const updatedSelections = newOrder.map(index => selections.get(index));
    this.onChange(List(updatedValue), List(updatedSelections));
  }

  /**
   * When a selection is made, trigger change and close the selector
   * @return {Null}
   */
  onSelection(id, selection) {
    let value = this.cachedValue;
    value = value || List();
    // Exists already? Remove it
    const index = value.indexOf(id);
    if (index > -1) {
      this.onRemove(index);
    } else {
      this.onChange(value.push(id), this.cachedSelections.push(selection));
    }
  }

  /**
   * Open the selector popout
   * @return {Null}
   */
  openSelector() {
    this._popout.openPopout();
  }

  /**
   * Close the selector popout
   * @return {Null}
   */
  closeSelector() {
    this._popout.closePopout();
  }

  /**
   * Toggle the selector popout
   * @return {Null}
   */
  toggleSelector() {
    this._popout.togglePopout();
  }

  /**
   * On popout open, focus the search input
   * @return {Null}
   */
  onPopoutOpen() {
    this._selector.focusSearch();
  }

  /**
   * On selector focus
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSelectorFocus(e) {
    this.setState({
      selectorFocus: true
    });
  }

  /**
   * On selector blur
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSelectorBlur(e) {
    this.setState({
      selectorFocus: false
    });
  }

  onSelectorQueryChange(selectorQuery) {
    this.setState({
      selectorQuery
    });
  }

  render() {
    const { attributes, config, errors, hint, label, name, value } = this.props;
    const {
      placeholder,
      selector_label,
      render_option_as,
      render_selection_as
    } = attributes;
    const { selections, selectorFocus, selectorQuery } = this.state;
    const hasErrors = errors.count() > 0;

    // Set up field classes
    const fieldClassNames = classNames(styles.base, {
      [`${styles.baseInline}`]: attributes.inline
    });

    // Determine the selection/selected display components
    let Option = SelectDefault;
    let Selection = SelectDefault;

    // Extract them from the passed `config.components` if it exists
    if (config.components) {
      if (render_option_as) {
        Option =
          extractComponent(config.components, render_option_as) || Option;
      }
      if (render_selection_as) {
        Selection =
          extractComponent(config.components, render_selection_as) || Selection;
      }
    }

    // Selections
    const numberOfSelections = selections.count();

    return (
      <div
        className={fieldClassNames}
        data-field-name={name}
        data-field-type="search-multi-selection-field"
      >
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        </div>
        <div className={styles.display}>
          <button
            data-open-selector-button
            className={styles.wrapper}
            onClick={this.onChooseClick}
          >
            <div className={styles.selectionPlaceholder}>
              {placeholder || "Make a selection"}
              {numberOfSelections > 0
                ? ` (${numberOfSelections} selected)`
                : null}
            </div>
            <Popout
              ref={r => {
                this._popout = r;
              }}
              placement="left"
              onClose={this.onPopoutClose}
              onOpen={this.onPopoutOpen}
              closeOnEsc={!selectorFocus || !selectorQuery}
              closeOnOutsideClick
              testId={`search-multi-selection-field:${name}`}
            >
              <div className={styles.openSelectorButton}>
                {selector_label || "Select"}
              </div>
              <SearchSelector
                ref={r => {
                  this._selector = r;
                }}
                onSelection={this.onSelection}
                onBlur={this.onSelectorBlur}
                onFocus={this.onSelectorFocus}
                onQueryChange={this.onSelectorQueryChange}
                optionComponent={Option}
                params={attributes.search_params}
                perPage={attributes.search_per_page}
                query={selectorQuery}
                selectedIds={value ? value.toJS() : []}
                threshold={attributes.search_threshold}
                url={attributes.search_url}
              />
            </Popout>
          </button>
        </div>
        {numberOfSelections > 0 ? (
          <div className={styles.selectedItems}>
            <Sortable canRemove onRemove={this.onRemove} onDrop={this.onDrop}>
              {selections.map((option, index) => (
                <Selection key={`${index}_${option.id}`} option={option} fetchSelectionsData={this.fetchSelectionsData} />
              ))}
            </Sortable>
          </div>
        ) : null}
        {hasErrors ? <FieldErrors errors={errors} /> : null}
      </div>
    );
  }
}

/**
 * Enable parent to pass context
 */
SearchMultiSelectionField.contextTypes = {
  globalConfig: PropTypes.object
};

/**
 * PropTypes
 * @type {Object}
 */
SearchMultiSelectionField.propTypes = {
  actions: PropTypes.object,
  name: PropTypes.string,
  config: PropTypes.object,
  attributes: PropTypes.shape({
    label: PropTypes.string,
    hint: PropTypes.string,
    placeholder: PropTypes.string,
    inline: PropTypes.bool,
    search_url: PropTypes.string,
    search_per_page: PropTypes.number,
    search_params: PropTypes.object,
    search_threshold: PropTypes.number,
    selector_label: PropTypes.string,
    render_option_as: PropTypes.string,
    render_selection_as: PropTypes.string
  }),
  hint: PropTypes.string,
  label: PropTypes.string,
  errors: ImmutablePropTypes.list,
  value: ImmutablePropTypes.list
};

SearchMultiSelectionField.defaultProps = {
  selections: List()
};

export default SearchMultiSelectionField;
