'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _extractComponent = require('../../../utils/extract-component');

var _extractComponent2 = _interopRequireDefault(_extractComponent);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _popout = require('../../ui/popout');

var _popout2 = _interopRequireDefault(_popout);

var _searchSelector = require('../../ui/search-selector');

var _searchSelector2 = _interopRequireDefault(_searchSelector);

var _searchSelectionField = require('./search-selection-field.mcss');

var _searchSelectionField2 = _interopRequireDefault(_searchSelectionField);

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
  option: _react2.default.PropTypes.shape({
    label: _react2.default.PropTypes.string
  })
};

/**
 * Search Selection field
 *
 * Handles the singular select of a
 *
 */

var SearchSelectionField = function (_Component) {
  _inherits(SearchSelectionField, _Component);

  function SearchSelectionField(props) {
    _classCallCheck(this, SearchSelectionField);

    // Initial state
    var _this = _possibleConstructorReturn(this, (SearchSelectionField.__proto__ || Object.getPrototypeOf(SearchSelectionField)).call(this, props));

    _this.state = {
      selectorFocus: false,
      selectorQuery: null
    };

    // Bindings
    _this.onChange = _this.onChange.bind(_this);
    _this.onChooseClick = _this.onChooseClick.bind(_this);
    _this.onRemoveClick = _this.onRemoveClick.bind(_this);
    _this.onSelection = _this.onSelection.bind(_this);
    _this.openSelector = _this.openSelector.bind(_this);
    _this.closeSelector = _this.closeSelector.bind(_this);
    _this.toggleSelector = _this.toggleSelector.bind(_this);
    _this.onPopoutOpen = _this.onPopoutOpen.bind(_this);
    _this.onSelectorBlur = _this.onSelectorBlur.bind(_this);
    _this.onSelectorFocus = _this.onSelectorFocus.bind(_this);
    _this.onSelectorQueryChange = _this.onSelectorQueryChange.bind(_this);
    return _this;
  }

  /**
   * componentWillMount
   * Do an XHR request for the additional selection data
   * @return {Null}
   */


  _createClass(SearchSelectionField, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      // Do an XHR request for the additional selection data
      var _props = this.props;
      var attributes = _props.attributes;
      var value = _props.value;

      if (value) {
        var search_url = attributes.search_url;

        var req = (0, _searchSelector.search)(search_url, {
          'ids[]': [value]
        });
        req.response.then(function (rsp) {
          if (rsp.results && rsp.results.length > 0) {
            var selection = rsp.results[0];
            _this2.setState({
              selection: selection
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
    value: function onChange(value, selection) {
      this.props.actions.edit(function (val) {
        return value;
      });
      this.setState({
        selection: selection
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
     * @return {Null}
     */

  }, {
    key: 'onRemoveClick',
    value: function onRemoveClick(e) {
      e.preventDefault();
      this.onChange(null, null);
    }

    /**
     * When a selection is made, trigger change and close the selector
     * @return {Null}
     */

  }, {
    key: 'onSelection',
    value: function onSelection(id, selection) {
      this.closeSelector();
      this.onChange(id, selection);
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
      var placeholder = attributes.placeholder;
      var selector_label = attributes.selector_label;
      var render_option_as = attributes.render_option_as;
      var render_selection_as = attributes.render_selection_as;
      var _state = this.state;
      var selection = _state.selection;
      var selectorFocus = _state.selectorFocus;
      var selectorQuery = _state.selectorQuery;

      var hasErrors = errors.count() > 0;

      // Set up field classes
      var fieldClassNames = (0, _classnames2.default)(_searchSelectionField2.default.base, _defineProperty({}, '' + _searchSelectionField2.default.baseInline, attributes.inline));

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

      return _react2.default.createElement(
        'div',
        { className: fieldClassNames },
        _react2.default.createElement(
          'div',
          { className: _searchSelectionField2.default.header },
          _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
        ),
        _react2.default.createElement(
          'div',
          { className: _searchSelectionField2.default.display },
          selection ? _react2.default.createElement(
            'div',
            { className: _searchSelectionField2.default.wrapper },
            _react2.default.createElement(
              'div',
              { id: name, className: _searchSelectionField2.default.selection },
              _react2.default.createElement(Selection, { option: selection })
            ),
            _react2.default.createElement(
              'button',
              { className: _searchSelectionField2.default.remove, onClick: this.onRemoveClick },
              _react2.default.createElement(
                'span',
                { className: _searchSelectionField2.default.removeText },
                'Remove'
              ),
              _react2.default.createElement(
                'div',
                { className: _searchSelectionField2.default.removeX },
                '\xD7'
              )
            )
          ) : _react2.default.createElement(
            'button',
            { className: _searchSelectionField2.default.wrapper, onClick: this.onChooseClick },
            _react2.default.createElement(
              'div',
              { className: _searchSelectionField2.default.selectionPlaceholder },
              placeholder || 'Make a selection'
            ),
            _react2.default.createElement(
              _popout2.default,
              {
                ref: function ref(r) {
                  _this3._popout = r;
                },
                placement: 'left',
                onOpen: this.onPopoutOpen,
                closeOnEsc: !selectorFocus || !selectorQuery,
                closeOnOutsideClick: true
              },
              _react2.default.createElement(
                'div',
                { className: _searchSelectionField2.default.openSelectorButton },
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
                threshold: attributes.search_threshold,
                url: attributes.search_url
              })
            )
          ),
          hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
        )
      );
    }
  }]);

  return SearchSelectionField;
}(_react.Component);

/**
 * Enable parent to pass context
 */


SearchSelectionField.contextTypes = {
  globalConfig: _react2.default.PropTypes.object
};

/**
 * PropTypes
 * @type {Object}
 */
SearchSelectionField.propTypes = {
  actions: _react2.default.PropTypes.object,
  name: _react2.default.PropTypes.string,
  config: _react2.default.PropTypes.object,
  attributes: _react2.default.PropTypes.shape({
    label: _react2.default.PropTypes.string,
    hint: _react2.default.PropTypes.string,
    placeholder: _react2.default.PropTypes.string,
    inline: _react2.default.PropTypes.bool,
    search_url: _react2.default.PropTypes.string,
    search_per_page: _react2.default.PropTypes.number,
    search_params: _react2.default.PropTypes.object,
    search_threshold: _react2.default.PropTypes.number,
    selector_label: _react2.default.PropTypes.string,
    selection: _react2.default.PropTypes.object,
    render_option_as: _react2.default.PropTypes.string,
    render_selection_as: _react2.default.PropTypes.string
  }),
  hint: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  errors: _reactImmutableProptypes2.default.list,
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
};

exports.default = SearchSelectionField;