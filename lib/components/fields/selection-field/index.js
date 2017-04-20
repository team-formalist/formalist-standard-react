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

var _selectionField = require('./selection-field.mcss');

var _selectionField2 = _interopRequireDefault(_selectionField);

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
 * Selection field
 *
 * Handles a singular select of a set of pre-supplied options.
 *
 */

var SelectionField = function (_React$Component) {
  _inherits(SelectionField, _React$Component);

  function SelectionField() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectionField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = SelectionField.__proto__ || Object.getPrototypeOf(SelectionField)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      search: null,
      searchFocus: false
    }, _this.onChange = function (value) {
      _this.props.actions.edit(function (val) {
        return value;
      });
    }, _this.onChooseClick = function (e) {
      e.preventDefault();
      _this.toggleSelector();
    }, _this.onRemoveClick = function (e) {
      e.preventDefault();
      _this.onChange(null);
    }, _this.onSelection = function (id) {
      _this.closeSelector();
      _this.onChange(id);
    }, _this.openSelector = function () {
      _this._selector.openPopout();
    }, _this.closeSelector = function () {
      _this._selector.closePopout();
    }, _this.onPopoutClose = function () {
      _this.setState({
        search: null
      });
    }, _this.toggleSelector = function () {
      _this._selector.togglePopout();
    }, _this.onPopoutOpen = function () {
      _this.refs.search.focus();
    }, _this.onSearchChange = function (e) {
      var search = e.target.value;
      _this.setState({
        search: search
      });
    }, _this.onSearchFocus = function (e) {
      _this.setState({
        searchFocus: true
      });
    }, _this.onSearchBlur = function (e) {
      _this.setState({
        searchFocus: false
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Enable parent to pass context
   */

  /**
   * Default state, blank search
   * @return {Object}
   */


  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */


  /**
   * On choose click, open selector
   * @return {Null}
   */


  /**
   * When selected item is removed
   * @return {Null}
   */


  /**
   * When a selection is made, trigger change and close the selector
   * @return {Null}
   */


  /**
   * Open the selector popout
   * @return {Null}
   */


  /**
   * Close the selector popout
   * @return {Null}
   */


  /**
   * On popout close, reset the search
   * @return {Null}
   */


  /**
   * Toggle the selector popout
   * @return {Null}
   */


  /**
   * On popout open, focus the search input
   * @return {Null}
   */


  /**
   * Fired when search input is `change`d.
   * Set this.state.search to the value of the input
   * @param  {Event} e Keyboard event
   * @return {Null}
   */


  /**
   * On search input focus
   * @param  {Event} e Keyboard event
   * @return {Null}
   */


  /**
   * On search input blur
   * @param  {Event} e Keyboard event
   * @return {Null}
   */


  _createClass(SelectionField, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

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
      var render_option_as = attributes.render_option_as;
      var render_selection_as = attributes.render_selection_as;

      var hasErrors = errors.count() > 0;

      // Set up field classes
      var fieldClassNames = (0, _classnames2.default)(_selectionField2.default.base, _defineProperty({}, '' + _selectionField2.default.baseInline, attributes.inline));

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

      // Determine selection
      var selection = options.find(function (option) {
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
      var renderedOptions = filteredOptions.map(function (option) {
        // TODO Asses whether to remove this binding
        /* eslint-disable react/jsx-no-bind */
        var onClick = function (e) {
          e.preventDefault();
          this.onSelection(option.id);
        }.bind(_this2);
        /* eslint-enable react/jsx-no-bind */
        return _react2.default.createElement(
          'button',
          {
            key: option.id,
            className: _selectionField2.default.optionButton,
            onClick: onClick },
          _react2.default.createElement(Option, { option: option })
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
          selection ? _react2.default.createElement(
            'div',
            { className: _selectionField2.default.wrapper },
            _react2.default.createElement(
              'div',
              { id: name, className: _selectionField2.default.selection },
              _react2.default.createElement(Selection, { option: selection })
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
                '\xD7'
              )
            )
          ) : _react2.default.createElement(
            'button',
            { className: _selectionField2.default.wrapper, onClick: this.onChooseClick },
            _react2.default.createElement(
              'div',
              { className: _selectionField2.default.selectionPlaceholder },
              placeholder || 'Make a selection'
            ),
            _react2.default.createElement(
              _popout2.default,
              {
                ref: function ref(c) {
                  _this2._selector = c;
                },
                placement: 'left',
                onClose: this.onPopoutClose,
                onOpen: this.onPopoutOpen,
                closeOnEsc: !searchFocus || !search,
                closeOnOutsideClick: true
              },
              _react2.default.createElement(
                'div',
                { className: _selectionField2.default.openSelectorButton },
                selector_label || 'Select'
              ),
              _react2.default.createElement(
                'div',
                { className: _selectionField2.default.options },
                _react2.default.createElement('input', {
                  ref: 'search',
                  type: 'search',
                  className: _selectionField2.default.search,
                  placeholder: 'Type to filter',
                  onBlur: this.onSearchBlur,
                  onFocus: this.onSearchFocus,
                  onChange: this.onSearchChange }),
                _react2.default.createElement(
                  'div',
                  { className: _selectionField2.default.optionsList },
                  renderedOptions.length > 0 ? renderedOptions : _react2.default.createElement(
                    'p',
                    { className: _selectionField2.default.noResults },
                    'No matching results'
                  )
                )
              )
            )
          )
        ),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      );
    }
  }]);

  return SelectionField;
}(_react2.default.Component);

SelectionField.propTypes = {
  actions: _propTypes2.default.object,
  name: _propTypes2.default.string,
  config: _propTypes2.default.object,
  attributes: _propTypes2.default.shape({
    label: _propTypes2.default.string,
    hint: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    options: _propTypes2.default.array,
    inline: _propTypes2.default.bool,
    selector_label: _propTypes2.default.string,
    render_option_as: _propTypes2.default.string,
    render_selection_as: _propTypes2.default.string
  }),
  hint: _propTypes2.default.string,
  label: _propTypes2.default.string,
  errors: _reactImmutableProptypes2.default.list,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};
SelectionField.contextTypes = {
  globalConfig: _propTypes2.default.object
};
exports.default = SelectionField;