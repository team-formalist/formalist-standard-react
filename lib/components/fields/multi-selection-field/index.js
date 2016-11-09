'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _immutable = require('immutable');

var _fuzzy = require('fuzzy');

var _fuzzy2 = _interopRequireDefault(_fuzzy);

var _extractComponent = require('../../../utils/extract-component');

var _extractComponent2 = _interopRequireDefault(_extractComponent);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _popout = require('../../ui/popout');

var _popout2 = _interopRequireDefault(_popout);

var _sortable = require('../../ui/sortable');

var _sortable2 = _interopRequireDefault(_sortable);

var _multiSelectionField = require('./multi-selection-field.mcss');

var _multiSelectionField2 = _interopRequireDefault(_multiSelectionField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Import components


// Import styles


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
var SelectDefault = function SelectDefault(_ref) {
  var option = _ref.option;
  return _react2.default.createElement(
    'div',
    null,
    option.label
  );
};

SelectDefault.propTypes = {
  option: _react2.default.PropTypes.shape({
    label: _react2.default.PropTypes.string
  })
};

/**
 * Selection field
 *
 * Handles a singular select of a set of pre-supplied options.
 *
 */
var SelectionField = _react2.default.createClass({
  displayName: 'SelectionField',


  propTypes: {
    actions: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.object,
    attributes: _react2.default.PropTypes.shape({
      label: _react2.default.PropTypes.string,
      hint: _react2.default.PropTypes.string,
      placeholder: _react2.default.PropTypes.string,
      options: _react2.default.PropTypes.array,
      inline: _react2.default.PropTypes.bool,
      selector_label: _react2.default.PropTypes.string,
      render_option_as: _react2.default.PropTypes.string,
      render_selection_as: _react2.default.PropTypes.string
    }),
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    errors: _reactImmutableProptypes2.default.list,
    value: _reactImmutableProptypes2.default.list
  },

  /**
   * Enable parent to pass context
   */

  contextTypes: {
    globalConfig: _react2.default.PropTypes.object
  },

  /**
   * Default state, blank search
   * @return {Object}
   */
  getInitialState: function getInitialState() {
    return {
      search: null,
      searchFocus: false
    };
  },


  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange: function onChange(value) {
    this.props.actions.edit(function (val) {
      return value;
    });
  },


  /**
   * On choose click, open selector
   * @return {Null}
   */
  onChooseClick: function onChooseClick(e) {
    e.preventDefault();
    this.toggleSelector();
  },


  /**
   * When selected item is removed
   * @param {Number} index Index of the item to remove
   * @return {Null}
   */
  onRemove: function onRemove(index) {
    var value = this.props.value;

    this.onChange(value.delete(index));
  },


  /**
   * When selected item is removed
   * @return {Null}
   */
  onDrop: function onDrop(newOrder) {
    var value = this.props.value.slice();
    var updated = newOrder.map(function (index) {
      return value.get(index);
    });
    this.onChange((0, _immutable.List)(updated));
  },


  /**
   * When a selection is made, trigger change and close the selector
   * @param {Number} id ID of the item to push in
   * @return {Null}
   */
  onSelection: function onSelection(id) {
    this.closeSelector();
    var value = this.props.value;

    value = value || (0, _immutable.List)();
    this.onChange(value.push(id));
  },


  /**
   * Open the selector popout
   * @return {Null}
   */
  openSelector: function openSelector() {
    this._selector.openPopout();
  },


  /**
   * Close the selector popout
   * @return {Null}
   */
  closeSelector: function closeSelector() {
    this._selector.closePopout();
  },


  /**
   * On popout close, reset the search
   * @return {Null}
   */
  onPopoutClose: function onPopoutClose() {
    this.setState({
      search: null
    });
  },


  /**
   * Toggle the selector popout
   * @return {Null}
   */
  toggleSelector: function toggleSelector() {
    this._selector.togglePopout();
  },


  /**
   * On popout open, focus the search input
   * @return {Null}
   */
  onPopoutOpen: function onPopoutOpen() {
    this.refs.search.focus();
  },


  /**
   * Fired when search input is `change`d.
   * Set this.state.search to the value of the input
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSearchChange: function onSearchChange(e) {
    var search = e.target.value;
    this.setState({
      search: search
    });
  },


  /**
   * On search input focus
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSearchFocus: function onSearchFocus(e) {
    this.setState({
      searchFocus: true
    });
  },


  /**
   * On search input blur
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSearchBlur: function onSearchBlur(e) {
    this.setState({
      searchFocus: false
    });
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var attributes = _props.attributes;
    var config = _props.config;
    var errors = _props.errors;
    var hint = _props.hint;
    var label = _props.label;
    var name = _props.name;
    var value = _props.value;
    var _state = this.state;
    var search = _state.search;
    var searchFocus = _state.searchFocus;
    var options = attributes.options;
    var placeholder = attributes.placeholder;
    var selector_label = attributes.selector_label;
    var render_selection_as = attributes.render_selection_as;
    var render_option_as = attributes.render_option_as;

    var hasErrors = errors.count() > 0;

    // Set up field classes
    var fieldClassNames = (0, _classnames2.default)(_multiSelectionField2.default.base, _defineProperty({}, '' + _multiSelectionField2.default.baseInline, attributes.inline));

    // Determine the selection/selected display components
    var Option = SelectDefault;
    var Selection = SelectDefault;

    // Extract them from the passed `config.components` if it exists
    if (config.components) {
      if (render_option_as) {
        Option = (0, _extractComponent2.default)(config.components, render_option_as) || Option;
      }
      if (render_selection_as) {
        Selection = (0, _extractComponent2.default)(config.components, render_selection_as) || Selection;
      }
    }

    // Determine selected options
    var selections = (0, _immutable.List)();
    if (value) {
      selections = value.map(function (id) {
        return options.find(function (option) {
          return option.id === id;
        });
      });
    }
    var numberOfSelections = selections.count();

    // Remove any selected options
    var filteredOptions = options.filter(function (option) {
      var include = true;
      if (value) {
        include = !value.includes(option.id);
      }
      return include;
    });
    // Filter options
    if (search) {
      filteredOptions = filteredOptions.filter(function (option) {
        var values = Object.keys(option).map(function (key) {
          return String(option[key]);
        });
        var results = _fuzzy2.default.filter(search, values);
        return results && results.length > 0;
      });
    }

    // Build the set of options
    var renderedOptions = filteredOptions.map(function (option) {
      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      var onClick = function (e) {
        e.preventDefault();
        this.onSelection(option.id);
      }.bind(_this);
      /* eslint-enable react/jsx-no-bind */
      return _react2.default.createElement(
        'button',
        {
          key: option.id,
          className: _multiSelectionField2.default.optionButton,
          onClick: onClick },
        _react2.default.createElement(Option, { option: option })
      );
    });

    return _react2.default.createElement(
      'div',
      { className: fieldClassNames },
      _react2.default.createElement(
        'div',
        { className: _multiSelectionField2.default.header },
        _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: _multiSelectionField2.default.display },
          _react2.default.createElement(
            'button',
            {
              className: _multiSelectionField2.default.wrapper,
              onClick: this.onChooseClick },
            _react2.default.createElement(
              'div',
              { className: _multiSelectionField2.default.selectionPlaceholder },
              _react2.default.createElement(
                'div',
                null,
                placeholder || 'Make a selection',
                numberOfSelections > 0 ? ' (' + numberOfSelections + ' selected)' : null
              )
            ),
            _react2.default.createElement(
              _popout2.default,
              {
                ref: function ref(c) {
                  _this._selector = c;
                },
                placement: 'left',
                onClose: this.onPopoutClose,
                onOpen: this.onPopoutOpen,
                closeOnEsc: !searchFocus || !search,
                closeOnOutsideClick: true
              },
              _react2.default.createElement(
                'div',
                { className: _multiSelectionField2.default.openSelectorButton },
                selector_label || 'Select'
              ),
              _react2.default.createElement(
                'div',
                { className: _multiSelectionField2.default.options },
                _react2.default.createElement('input', {
                  ref: 'search',
                  type: 'search',
                  className: _multiSelectionField2.default.search,
                  placeholder: 'Type to filter',
                  onBlur: this.onSearchBlur,
                  onFocus: this.onSearchFocus,
                  onChange: this.onSearchChange }),
                _react2.default.createElement(
                  'div',
                  { className: _multiSelectionField2.default.optionsList },
                  renderedOptions.length > 0 ? renderedOptions : _react2.default.createElement(
                    'p',
                    { className: _multiSelectionField2.default.noResults },
                    'No matching results'
                  )
                )
              )
            )
          )
        ),
        numberOfSelections > 0 ? _react2.default.createElement(
          'div',
          { id: name, className: _multiSelectionField2.default.selectedItems },
          _react2.default.createElement(
            _sortable2.default,
            { canRemove: true, onRemove: this.onRemove, onDrop: this.onDrop },
            selections.map(function (option, index) {
              return _react2.default.createElement(Selection, { key: index + '_' + option.id, option: option });
            })
          )
        ) : null,
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      )
    );
  }
});

exports.default = SelectionField;