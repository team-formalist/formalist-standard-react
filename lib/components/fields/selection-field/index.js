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

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _popout = require('../../ui/popout');

var _popout2 = _interopRequireDefault(_popout);

var _selectionField = require('./selection-field.mcss');

var _selectionField2 = _interopRequireDefault(_selectionField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Import components


// Import styles


function extractComponent(components, name) {
  var component = false;
  components.forEach(function (c) {
    if (c.name === name) {
      component = c.component;
    }
  });
  return component;
}

// DefaultSelected
var SelectedDefault = function SelectedDefault(_ref) {
  var option = _ref.option;
  return _react2.default.createElement(
    'div',
    null,
    option.label
  );
};

// DefaultSelector
var SelectionDefault = function SelectionDefault(_ref2) {
  var option = _ref2.option;
  return _react2.default.createElement(
    'div',
    null,
    option.label
  );
};

/**
 * Selection field
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
      select_button_text: _react2.default.PropTypes.string,
      selected_component: _react2.default.PropTypes.string,
      selection_component: _react2.default.PropTypes.string
    }),
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    errors: _reactImmutableProptypes2.default.list,
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      placeholder: 'Make a selection',
      select_button_text: 'Select'
    };
  },
  getInitialState: function getInitialState() {
    return {
      search: null,
      options: (0, _immutable.List)(this.props.attributes.options)
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.attributes.options) {
      this.setState({
        options: (0, _immutable.List)(nextProps.attributes.options)
      });
    }
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
  onChooseClick: function onChooseClick(e) {
    e.preventDefault();
    this.openSelector();
  },
  onRemoveClick: function onRemoveClick(e) {
    e.preventDefault();
    this.onChange(null);
  },
  onSelection: function onSelection(id) {
    this.closeSelector();
    this.onChange(id);
  },
  openSelector: function openSelector() {
    this.refs.selector.openPopout();
  },
  closeSelector: function closeSelector() {
    this.refs.selector.closePopout();
  },
  onPopoutClose: function onPopoutClose() {
    this.setState({
      search: null
    });
  },
  onPopoutOpen: function onPopoutOpen() {
    this.refs.search.focus();
  },
  onSearchChange: function onSearchChange(e) {
    var search = e.target.value;
    this.setState({
      search: search
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
    var options = _state.options;
    var search = _state.search;
    var placeholder = attributes.placeholder;
    var select_button_text = attributes.select_button_text;
    var selected_component = attributes.selected_component;
    var selection_component = attributes.selection_component;

    var hasErrors = errors.count() > 0;

    // Set up field classes
    var fieldClassNames = (0, _classnames2.default)(_selectionField2.default.base, _defineProperty({}, '' + _selectionField2.default.baseInline, attributes.inline));

    // Determine the selection/selected display components
    var Selected = SelectedDefault;
    var Selection = SelectionDefault;

    // Extract them from the passed `config.components` if it exists
    if (config.components) {
      if (selected_component) {
        Selected = extractComponent(config.components, selected_component) || Selected;
      }
      if (selection_component) {
        Selection = extractComponent(config.components, selection_component) || Selection;
      }
    }

    // Determine selected option
    var selectedOption = options.find(function (option) {
      return option.id === value;
    });

    // Filter options
    var filteredOptions = options;
    if (search) {
      filteredOptions = options.filter(function (option) {
        var values = Object.keys(option).map(function (key) {
          return String(option[key]);
        });
        var results = _fuzzy2.default.filter(search, values);
        return results && results.length > 0;
      });
    }

    // Build the set of options
    var selections = filteredOptions.map(function (option) {
      return _react2.default.createElement(
        'button',
        {
          key: option.id,
          className: _selectionField2.default.selectionButton,
          onClick: function onClick(e) {
            e.preventDefault();
            _this.onSelection(option.id);
          } },
        _react2.default.createElement(Selection, { option: option })
      );
    });
    return _react2.default.createElement(
      'div',
      { className: fieldClassNames },
      _react2.default.createElement(
        'div',
        { className: _selectionField2.default.header },
        _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
      ),
      _react2.default.createElement(
        'div',
        { className: _selectionField2.default.display },
        selectedOption ? _react2.default.createElement(
          'div',
          { className: _selectionField2.default.wrapper },
          _react2.default.createElement(
            'div',
            { className: _selectionField2.default.selected },
            _react2.default.createElement(Selected, { option: selectedOption })
          ),
          _react2.default.createElement(
            'button',
            { className: _selectionField2.default.remove, onClick: this.onRemoveClick },
            _react2.default.createElement(
              'span',
              { className: _selectionField2.default.removeText },
              'Remove'
            ),
            _react2.default.createElement(
              'div',
              { className: _selectionField2.default.removeX },
              '×'
            )
          )
        ) : _react2.default.createElement(
          'button',
          {
            className: _selectionField2.default.wrapper,
            onClick: this.onChooseClick },
          _react2.default.createElement(
            'div',
            { className: _selectionField2.default.selectionPlaceholder },
            placeholder
          ),
          _react2.default.createElement(
            _popout2.default,
            { ref: 'selector', placement: 'left', closeOnEsc: true, onClose: this.onPopoutClose, onOpen: this.onPopoutOpen },
            _react2.default.createElement(
              'div',
              { className: _selectionField2.default.openSelectionsButton },
              select_button_text
            ),
            _react2.default.createElement(
              'div',
              { className: _selectionField2.default.selections },
              _react2.default.createElement('input', {
                ref: 'search',
                type: 'search',
                className: _selectionField2.default.search,
                placeholder: 'Type to filter',
                onChange: this.onSearchChange }),
              _react2.default.createElement(
                'div',
                { className: _selectionField2.default.selectionsList },
                selections.count() > 0 ? selections : _react2.default.createElement(
                  'p',
                  { className: _selectionField2.default.noResults },
                  'No matching results'
                )
              )
            )
          )
        ),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      )
    );
  }
});

exports.default = SelectionField;