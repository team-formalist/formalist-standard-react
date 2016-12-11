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

var _keyCodes = require('../../../utils/key-codes');

var _keyCodes2 = _interopRequireDefault(_keyCodes);

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _popunder = require('../../ui/popunder');

var _popunder2 = _interopRequireDefault(_popunder);

var _spinner = require('../../ui/spinner');

var _spinner2 = _interopRequireDefault(_spinner);

var _searchList = require('./search-list');

var _searchList2 = _interopRequireDefault(_searchList);

var _tagsField = require('./tags-field.mcss');

var _tagsField2 = _interopRequireDefault(_tagsField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import components


// Import styles


/**
 * Tags field
 */
var TagsField = function (_Component) {
  _inherits(TagsField, _Component);

  function TagsField(props) {
    _classCallCheck(this, TagsField);

    var _this = _possibleConstructorReturn(this, (TagsField.__proto__ || Object.getPrototypeOf(TagsField)).call(this, props));

    var attributes = props.attributes;
    var search_url = attributes.search_url;
    var search_threshold = attributes.search_threshold;

    // Initial state

    _this.state = {
      inputFocus: false,
      inputQuery: '',
      tagsLoading: false,
      canSearch: search_url != null,
      searchThreshold: search_threshold || 1
    };

    // Bindings
    _this.onChange = _this.onChange.bind(_this);
    _this.onInputBlur = _this.onInputBlur.bind(_this);
    _this.onInputChange = _this.onInputChange.bind(_this);
    _this.onInputFocus = _this.onInputFocus.bind(_this);
    _this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
    return _this;
  }

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */


  _createClass(TagsField, [{
    key: 'onChange',
    value: function onChange(value) {
      this.props.actions.edit(function (val) {
        return value;
      });
    }

    /**
     * On selector focus
     * @param  {Event} e Keyboard event
     * @return {Null}
     */

  }, {
    key: 'onInputFocus',
    value: function onInputFocus(e) {
      var _state = this.state;
      var canSearch = _state.canSearch;
      var inputQuery = _state.inputQuery;
      var searchThreshold = _state.searchThreshold;

      this.setState({
        inputFocus: true
      });
      if (canSearch && inputQuery.length >= searchThreshold) {
        this._popunder.openPopunder();
      }
    }

    /**
     * On selector blur
     * @param  {Event} e Keyboard event
     * @return {Null}
     */

  }, {
    key: 'onInputBlur',
    value: function onInputBlur(e) {
      this.setState({
        inputFocus: false,
        tagsLoading: false
      });
    }

    /**
     * Handle change event for inputs
     * @param  {Event} e Change event
     */

  }, {
    key: 'onInputChange',
    value: function onInputChange(e) {
      var _state2 = this.state;
      var canSearch = _state2.canSearch;
      var searchThreshold = _state2.searchThreshold;

      var inputQuery = e.target.value;
      this.setState({
        inputQuery: inputQuery
      });
      if (canSearch && inputQuery.length >= searchThreshold) {
        this._popunder.openPopunder();
      } else {
        if (canSearch) {
          this._popunder.closePopunder();
        }
        this.setState({
          inputQuery: '',
          tagsLoading: false
        });
      }
    }

    /**
     * Handle change event for inputs
     * @param  {Event} e Change event
     */

  }, {
    key: 'onInputKeyDown',
    value: function onInputKeyDown(e) {
      switch (e.keyCode) {
        case _keyCodes2.default.ENTER:
          e.preventDefault();
          var added = this.addTag(e.target.value);
          if (added) {
            this.clearInput();
          }
          break;
        case _keyCodes2.default.BACKSPACE:
          if (e.target.value === '') {
            e.preventDefault();
            // Remove the last tag
            this.removeTag(-1);
          }
          break;
      }
    }

    /**
     * Empty the input field
     */

  }, {
    key: 'clearInput',
    value: function clearInput() {
      this._input.value = '';
      this.setState({
        inputQuery: '',
        tagsLoading: false
      });
    }

    /**
     * Remove a tag from the value based on index
     */

  }, {
    key: 'removeTag',
    value: function removeTag(index) {
      var value = this.props.value;

      this.onChange(value.delete(index));
    }

    /**
     * Add tag to end of list
     */

  }, {
    key: 'addTag',
    value: function addTag(tag) {
      var value = this.props.value;

      var valid = tag && tag !== '' && !value.includes(tag);
      if (valid) {
        this.onChange(value.push(tag));
        return true;
      }
      return false;
    }

    /**
     * Render existing tags
     * @return {ReactElement}
     */

  }, {
    key: 'renderTagsList',
    value: function renderTagsList() {
      var _this2 = this;

      var value = this.props.value;

      return value.map(function (tag, i) {
        var key = tag + '-' + i;
        var onClick = function onClick(e) {
          e.preventDefault();
          // Remove only if the span is clicked on
          if (e.target.nodeName === 'SPAN') {
            _this2.removeTag(i);
          }
        };
        var onKeyDown = function onKeyDown(e) {
          if (e.keyCode === _keyCodes2.default.DELETE || e.keyCode === _keyCodes2.default.BACKSPACE) {
            _this2.removeTag(i);
          }
        };

        return _react2.default.createElement(
          'button',
          {
            key: key,
            className: _tagsField2.default.tag,
            onClick: onClick,
            onKeyDown: onKeyDown
          },
          tag,
          _react2.default.createElement(
            'span',
            { className: _tagsField2.default.removeButton },
            '\xD7'
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var attributes = _props.attributes;
      var errors = _props.errors;
      var hint = _props.hint;
      var label = _props.label;
      var name = _props.name;
      var placeholder = attributes.placeholder;
      var search_url = attributes.search_url;
      var search_params = attributes.search_params;
      var _state3 = this.state;
      var canSearch = _state3.canSearch;
      var inputFocus = _state3.inputFocus;
      var inputQuery = _state3.inputQuery;
      var searchThreshold = _state3.searchThreshold;
      var tagsLoading = _state3.tagsLoading;

      var hasErrors = errors.count() > 0;

      placeholder = placeholder || 'Enter a tag';

      // Set up field classes
      var fieldClassNames = (0, _classnames2.default)(_tagsField2.default.base, _defineProperty({}, '' + _tagsField2.default.baseInline, attributes.inline));

      var displayClassNames = (0, _classnames2.default)(_tagsField2.default.display, _defineProperty({}, '' + _tagsField2.default.displayFocus, inputFocus));

      var popunderContainerClassName = (0, _classnames2.default)(_tagsField2.default.popunderContainer, _defineProperty({}, '' + _tagsField2.default.popunderContainerHidden, tagsLoading));

      // TODO Asses whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return _react2.default.createElement(
        'div',
        { className: fieldClassNames },
        _react2.default.createElement(
          'div',
          { className: _tagsField2.default.header },
          _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
        ),
        _react2.default.createElement(
          'div',
          { className: displayClassNames },
          _react2.default.createElement(
            'div',
            { className: _tagsField2.default.tagList },
            this.renderTagsList(),
            canSearch ? _react2.default.createElement(
              _popunder2.default,
              {
                ref: function ref(r) {
                  _this3._popunder = r;
                },
                onClose: this.onPopunderClose,
                onOpen: this.onPopunderOpen,
                className: _tagsField2.default.popunderWrapper,
                closeOnEsc: true,
                closeOnOutsideClick: true,
                containerClassName: popunderContainerClassName
              },
              _react2.default.createElement(
                'div',
                { className: _tagsField2.default.tagInputWrapper },
                _react2.default.createElement('input', {
                  ref: function ref(r) {
                    _this3._input = r;
                  },
                  className: _tagsField2.default.tagInput,
                  onChange: this.onInputChange,
                  onKeyDown: this.onInputKeyDown,
                  onBlur: this.onInputBlur,
                  onFocus: this.onInputFocus,
                  placeholder: placeholder
                }),
                tagsLoading ? _react2.default.createElement(_spinner2.default, { className: _tagsField2.default.spinner }) : null
              ),
              _react2.default.createElement(_searchList2.default, {
                query: inputQuery,
                url: search_url,
                params: search_params,
                threshold: searchThreshold,
                onSearchStart: function onSearchStart() {
                  return _this3.setState({ tagsLoading: true });
                },
                onSearchEnd: function onSearchEnd() {
                  return _this3.setState({ tagsLoading: false });
                },
                onSelect: function onSelect(selection) {
                  var added = _this3.addTag(selection.value);
                  if (added) {
                    _this3.clearInput();
                    _this3._input.focus();
                    _this3._popunder.closePopunder();
                  }
                }
              })
            ) : _react2.default.createElement(
              'div',
              { className: _tagsField2.default.tagInputWrapperNoSearch },
              _react2.default.createElement('input', {
                ref: function ref(r) {
                  _this3._input = r;
                },
                className: _tagsField2.default.tagInput,
                onChange: this.onInputChange,
                onKeyDown: this.onInputKeyDown,
                onBlur: this.onInputBlur,
                onFocus: this.onInputFocus,
                placeholder: placeholder
              })
            )
          ),
          hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return TagsField;
}(_react.Component);

/**
 * Enable parent to pass context
 */


TagsField.contextTypes = {
  globalConfig: _react2.default.PropTypes.object
};

/**
 * PropTypes
 * @type {Object}
 */
TagsField.propTypes = {
  actions: _react2.default.PropTypes.object,
  name: _react2.default.PropTypes.string,
  config: _react2.default.PropTypes.object,
  attributes: _react2.default.PropTypes.shape({
    label: _react2.default.PropTypes.string,
    hint: _react2.default.PropTypes.string,
    placeholder: _react2.default.PropTypes.string,
    inline: _react2.default.PropTypes.bool,
    search_url: _react2.default.PropTypes.string,
    search_params: _react2.default.PropTypes.object,
    search_threshold: _react2.default.PropTypes.number
  }),
  hint: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  errors: _reactImmutableProptypes2.default.list,
  value: _reactImmutableProptypes2.default.list
};

exports.default = TagsField;