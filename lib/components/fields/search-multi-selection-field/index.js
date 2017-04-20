'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _immutable = require('immutable');

var _extractComponent = require('../../../utils/extract-component');

var _extractComponent2 = _interopRequireDefault(_extractComponent);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _sortable = require('../../ui/sortable');

var _sortable2 = _interopRequireDefault(_sortable);

var _popout = require('../../ui/popout');

var _popout2 = _interopRequireDefault(_popout);

var _searchSelector = require('../../ui/search-selector');

var _searchSelector2 = _interopRequireDefault(_searchSelector);

var _searchMultiSelectionField = require('./search-multi-selection-field.mcss');

var _searchMultiSelectionField2 = _interopRequireDefault(_searchMultiSelectionField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  option: _propTypes2.default.shape({
    label: _propTypes2.default.string
  })
};

/**
 * Search Selection field
 *
 * Handles the singular select of a
 *
 */

var SearchMultiSelectionField = function (_Component) {
  _inherits(SearchMultiSelectionField, _Component);

  function SearchMultiSelectionField(props) {
    _classCallCheck(this, SearchMultiSelectionField);

    // Extract existing selection from attributes
    var _this = _possibleConstructorReturn(this, (SearchMultiSelectionField.__proto__ || Object.getPrototypeOf(SearchMultiSelectionField)).call(this, props));

    var value = props.value;

    // Keep value as a cached property

    _this.cachedSelections = (0, _immutable.List)();
    _this.cachedValue = value;

    // Initial state
    _this.state = {
      selections: _this.cachedSelections,
      selectorFocus: false,
      selectorQuery: null
    };

    // Bindings
    _this.onChange = _this.onChange.bind(_this);
    _this.onChooseClick = _this.onChooseClick.bind(_this);
    _this.onSelection = _this.onSelection.bind(_this);
    _this.onRemove = _this.onRemove.bind(_this);
    _this.onDrop = _this.onDrop.bind(_this);
    _this.openSelector = _this.openSelector.bind(_this);
    _this.closeSelector = _this.closeSelector.bind(_this);
    _this.toggleSelector = _this.toggleSelector.bind(_this);
    _this.onPopoutOpen = _this.onPopoutOpen.bind(_this);
    _this.onSelectorBlur = _this.onSelectorBlur.bind(_this);
    _this.onSelectorFocus = _this.onSelectorFocus.bind(_this);
    _this.onSelectorQueryChange = _this.onSelectorQueryChange.bind(_this);
    return _this;
  }

  _createClass(SearchMultiSelectionField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.cachedValue = nextProps.value;
    }

    /**
     * componentWillMount
     * Do an XHR request for the additional selections data
     * @return {Null}
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      // Do an XHR request for the additional selection data
      var _props = this.props;
      var attributes = _props.attributes;
      var value = _props.value;

      if (value && value.count() > 0) {
        var search_url = attributes.search_url;

        var req = (0, _searchSelector.searchMethod)(search_url, {
          'ids[]': value.toJS()
        });
        req.response.then(function (rsp) {
          if (rsp.results && rsp.results.length > 0) {
            var selections = (0, _immutable.List)(rsp.results);
            // Keep as a property so can always know the "true" set
            // and convert to a list
            _this2.cachedSelections = selections;
            _this2.setState({
              selections: selections
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

  }, {
    key: 'onChange',
    value: function onChange(value, selections) {
      this.cachedValue = value;
      this.cachedSelections = selections;
      this.props.actions.edit(function (val) {
        return value;
      });
      this.setState({
        selections: selections
      });
    }

    /**
     * On choose click, open selector
     * @return {Null}
     */

  }, {
    key: 'onChooseClick',
    value: function onChooseClick(e) {
      e.preventDefault();
      this.toggleSelector();
    }

    /**
     * When selected item is removed
     * @param {Number} index Index of the item to remove
     * @return {Null}
     */

  }, {
    key: 'onRemove',
    value: function onRemove(index) {
      this.onChange(this.cachedValue.delete(index), this.cachedSelections.delete(index));
    }

    /**
     * When selected item is removed
     * @return {Null}
     */

  }, {
    key: 'onDrop',
    value: function onDrop(newOrder) {
      var value = this.cachedValue.slice();
      var selections = this.cachedSelections.slice();
      var updatedValue = newOrder.map(function (index) {
        return value.get(index);
      });
      var updatedSelections = newOrder.map(function (index) {
        return selections.get(index);
      });
      this.onChange((0, _immutable.List)(updatedValue), (0, _immutable.List)(updatedSelections));
    }

    /**
     * When a selection is made, trigger change and close the selector
     * @return {Null}
     */

  }, {
    key: 'onSelection',
    value: function onSelection(id, selection) {
      var value = this.cachedValue;
      value = value || (0, _immutable.List)();
      // Exists already? Remove it
      var index = value.indexOf(id);
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

  }, {
    key: 'openSelector',
    value: function openSelector() {
      this._popout.openPopout();
    }

    /**
     * Close the selector popout
     * @return {Null}
     */

  }, {
    key: 'closeSelector',
    value: function closeSelector() {
      this._popout.closePopout();
    }

    /**
     * Toggle the selector popout
     * @return {Null}
     */

  }, {
    key: 'toggleSelector',
    value: function toggleSelector() {
      this._popout.togglePopout();
    }

    /**
     * On popout open, focus the search input
     * @return {Null}
     */

  }, {
    key: 'onPopoutOpen',
    value: function onPopoutOpen() {
      this._selector.focusSearch();
    }

    /**
     * On selector focus
     * @param  {Event} e Keyboard event
     * @return {Null}
     */

  }, {
    key: 'onSelectorFocus',
    value: function onSelectorFocus(e) {
      this.setState({
        selectorFocus: true
      });
    }

    /**
     * On selector blur
     * @param  {Event} e Keyboard event
     * @return {Null}
     */

  }, {
    key: 'onSelectorBlur',
    value: function onSelectorBlur(e) {
      this.setState({
        selectorFocus: false
      });
    }
  }, {
    key: 'onSelectorQueryChange',
    value: function onSelectorQueryChange(selectorQuery) {
      this.setState({
        selectorQuery: selectorQuery
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props;
      var attributes = _props2.attributes;
      var config = _props2.config;
      var errors = _props2.errors;
      var hint = _props2.hint;
      var label = _props2.label;
      var name = _props2.name;
      var value = _props2.value;
      var placeholder = attributes.placeholder;
      var selector_label = attributes.selector_label;
      var render_option_as = attributes.render_option_as;
      var render_selection_as = attributes.render_selection_as;
      var _state = this.state;
      var selections = _state.selections;
      var selectorFocus = _state.selectorFocus;
      var selectorQuery = _state.selectorQuery;

      var hasErrors = errors.count() > 0;

      // Set up field classes
      var fieldClassNames = (0, _classnames2.default)(_searchMultiSelectionField2.default.base, _defineProperty({}, '' + _searchMultiSelectionField2.default.baseInline, attributes.inline));

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

      // Selections
      var numberOfSelections = selections.count();

      return _react2.default.createElement(
        'div',
        { className: fieldClassNames },
        _react2.default.createElement(
          'div',
          { className: _searchMultiSelectionField2.default.header },
          _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
        ),
        _react2.default.createElement(
          'div',
          { className: _searchMultiSelectionField2.default.display },
          _react2.default.createElement(
            'button',
            { className: _searchMultiSelectionField2.default.wrapper, onClick: this.onChooseClick },
            _react2.default.createElement(
              'div',
              { className: _searchMultiSelectionField2.default.selectionPlaceholder },
              placeholder || 'Make a selection',
              numberOfSelections > 0 ? ' (' + numberOfSelections + ' selected)' : null
            ),
            _react2.default.createElement(
              _popout2.default,
              {
                ref: function ref(r) {
                  _this3._popout = r;
                },
                placement: 'left',
                onClose: this.onPopoutClose,
                onOpen: this.onPopoutOpen,
                closeOnEsc: !selectorFocus || !selectorQuery,
                closeOnOutsideClick: true
              },
              _react2.default.createElement(
                'div',
                { className: _searchMultiSelectionField2.default.openSelectorButton },
                selector_label || 'Select'
              ),
              _react2.default.createElement(_searchSelector2.default, {
                ref: function ref(r) {
                  _this3._selector = r;
                },
                onSelection: this.onSelection,
                onBlur: this.onSelectorBlur,
                onFocus: this.onSelectorFocus,
                onQueryChange: this.onSelectorQueryChange,
                optionComponent: Option,
                params: attributes.search_params,
                perPage: attributes.search_per_page,
                query: selectorQuery,
                selectedIds: value ? value.toJS() : [],
                threshold: attributes.search_threshold,
                url: attributes.search_url
              })
            )
          )
        ),
        numberOfSelections > 0 ? _react2.default.createElement(
          'div',
          { id: name, className: _searchMultiSelectionField2.default.selectedItems },
          _react2.default.createElement(
            _sortable2.default,
            { canRemove: true, onRemove: this.onRemove, onDrop: this.onDrop },
            selections.map(function (option, index) {
              return _react2.default.createElement(Selection, { key: index + '_' + option.id, option: option });
            })
          )
        ) : null,
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      );
    }
  }]);

  return SearchMultiSelectionField;
}(_react.Component);

/**
 * Enable parent to pass context
 */


SearchMultiSelectionField.contextTypes = {
  globalConfig: _propTypes2.default.object
};

/**
 * PropTypes
 * @type {Object}
 */
SearchMultiSelectionField.propTypes = {
  actions: _propTypes2.default.object,
  name: _propTypes2.default.string,
  config: _propTypes2.default.object,
  attributes: _propTypes2.default.shape({
    label: _propTypes2.default.string,
    hint: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    inline: _propTypes2.default.bool,
    search_url: _propTypes2.default.string,
    search_per_page: _propTypes2.default.number,
    search_params: _propTypes2.default.object,
    search_threshold: _propTypes2.default.number,
    selector_label: _propTypes2.default.string,
    render_option_as: _propTypes2.default.string,
    render_selection_as: _propTypes2.default.string
  }),
  hint: _propTypes2.default.string,
  label: _propTypes2.default.string,
  errors: _reactImmutableProptypes2.default.list,
  value: _reactImmutableProptypes2.default.list
};

SearchMultiSelectionField.defaultProps = {
  selections: (0, _immutable.List)()
};

exports.default = SearchMultiSelectionField;