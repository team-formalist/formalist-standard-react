'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManyFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _formalistCompose = require('formalist-compose');

var _formalistValidation = require('formalist-validation');

var _formalistValidation2 = _interopRequireDefault(_formalistValidation);

var _errors = require('./fields/common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _sortable = require('./ui/sortable');

var _sortable2 = _interopRequireDefault(_sortable);

var _many = require('./many.mcss');

var _many2 = _interopRequireDefault(_many);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var addManyContent = _formalistCompose.actions.addManyContent,
    deleteManyContent = _formalistCompose.actions.deleteManyContent,
    reorderManyContents = _formalistCompose.actions.reorderManyContents,
    validateMany = _formalistCompose.actions.validateMany;

// Components


// Styles

var ManySet = function (_React$Component) {
  _inherits(ManySet, _React$Component);

  function ManySet() {
    _classCallCheck(this, ManySet);

    return _possibleConstructorReturn(this, (ManySet.__proto__ || Object.getPrototypeOf(ManySet)).apply(this, arguments));
  }

  _createClass(ManySet, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _many2.default.set },
        this.props.children
      );
    }
  }]);

  return ManySet;
}(_react2.default.Component);

ManySet.propTypes = {
  children: _reactImmutableProptypes2.default.list
};

var Many = function (_React$Component2) {
  _inherits(Many, _React$Component2);

  function Many() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Many);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Many.__proto__ || Object.getPrototypeOf(Many)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      contentsKey: Date.now()
    }, _this2.updateContentsKey = function () {
      _this2.setState({
        contentsKey: Date.now()
      });
    }, _this2.addChild = function (e) {
      e.preventDefault();
      var _this2$props = _this2.props,
          attributes = _this2$props.attributes,
          store = _this2$props.store,
          path = _this2$props.path;

      var validationRules = attributes.get('validation') ? attributes.get('validation').toJS() : null;

      store.batchDispatch([addManyContent(path), validateMany(path, (0, _formalistValidation2.default)(validationRules))]);
      _this2.updateContentsKey();
    }, _this2.onRemove = function (index) {
      var _this2$props2 = _this2.props,
          attributes = _this2$props2.attributes,
          store = _this2$props2.store,
          contentsPath = _this2$props2.contentsPath,
          path = _this2$props2.path;

      var childPath = contentsPath.push(index);
      var validationRules = attributes.get('validation') ? attributes.get('validation').toJS() : null;

      store.batchDispatch([deleteManyContent(childPath), validateMany(path, (0, _formalistValidation2.default)(validationRules))]);
      _this2.updateContentsKey();
    }, _this2.onDrop = function (newOrder) {
      var _this2$props3 = _this2.props,
          attributes = _this2$props3.attributes,
          store = _this2$props3.store,
          path = _this2$props3.path;

      var validationRules = attributes.get('validation') ? attributes.get('validation').toJS() : null;

      store.batchDispatch([reorderManyContents(path, newOrder), validateMany(path, (0, _formalistValidation2.default)(validationRules))]);
      _this2.updateContentsKey();
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  /**
   * Set an initial `contentsKey` so we can reliably render changes to the
   * contents/children as they are sorted
   * @return {Object}
   */


  _createClass(Many, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Naive check to see if the children have changed
      // so we can refresh the `contentsKey`
      if (this.props.children.count() !== nextProps.children.count()) {
        this.updateContentsKey();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      // Use the path hash-code to determine whether or not to rerender this
      // section. This should take account of any change to the AST.
      // It will not account for changes to the overall form definition (but they
      // should not change after runtime anyway)
      //
      // We also check the `contentsKey` we set in state
      return this.props.hashCode !== nextProps.hashCode || this.state.contentsKey !== nextState.contentsKey;
    }

    /**
     * Tell the store to inject a new content/child from the template
     * @param {Event} e Mouse/KeyboardEvent
     */


    /**
     * When selected item is removed
     * @param {Number} index Index of the item to remove
     * @return {Null}
     */


    /**
     * When selected item is removed
     * @return {Null}
     */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          attributes = _props.attributes,
          children = _props.children,
          errors = _props.errors,
          name = _props.name;

      var hasErrors = errors.count() > 0;
      var contentsKey = this.state.contentsKey;

      // Extract attributes from Immutable.Map

      var _attributes$toJS = attributes.toJS(),
          label = _attributes$toJS.label,
          action_label = _attributes$toJS.action_label,
          placeholder = _attributes$toJS.placeholder;

      label = label || name.replace(/_/, ' ');

      // Set up label classes
      var labelClassNames = (0, _classnames2.default)(_many2.default.label, _defineProperty({}, '' + _many2.default.labelErrors, hasErrors));

      return _react2.default.createElement(
        'div',
        { className: _many2.default.base },
        _react2.default.createElement(
          'div',
          { className: _many2.default.header },
          _react2.default.createElement(
            'h3',
            { className: labelClassNames },
            label
          ),
          _react2.default.createElement(
            'div',
            { className: _many2.default.controls },
            _react2.default.createElement(
              'button',
              { className: _many2.default.addButton, onClick: this.addChild },
              action_label || 'Add item'
            )
          )
        ),
        children.count() > 0 ? _react2.default.createElement(
          _sortable2.default,
          { canRemove: true, onRemove: this.onRemove, onDrop: this.onDrop, verticalControls: true },
          children.map(function (setChildren, i) {
            return _react2.default.createElement(
              ManySet,
              { key: contentsKey + '_' + i },
              setChildren
            );
          })
        ) : _react2.default.createElement(
          'div',
          { className: _many2.default.placeholder },
          _react2.default.createElement(
            'span',
            { className: _many2.default.placeholderText },
            placeholder || 'No items have been added.',
            ' '
          ),
          _react2.default.createElement(
            'button',
            { className: _many2.default.placeholderButton, onClick: this.addChild },
            'Add the first?'
          )
        ),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      );
    }
  }]);

  return Many;
}(_react2.default.Component);

Many.propTypes = {
  hashCode: _propTypes2.default.number.isRequired,
  name: _propTypes2.default.string,
  path: _reactImmutableProptypes2.default.list.isRequired,
  contentsPath: _reactImmutableProptypes2.default.list.isRequired,
  store: _propTypes2.default.object.isRequired,
  type: _propTypes2.default.string,
  rules: _reactImmutableProptypes2.default.list,
  errors: _reactImmutableProptypes2.default.list,
  attributes: _reactImmutableProptypes2.default.mapContains({
    label: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    action_label: _propTypes2.default.string
  }),
  template: _propTypes2.default.object,
  children: _reactImmutableProptypes2.default.list
};
exports.default = Many;
var ManyFactory = exports.ManyFactory = _react2.default.createFactory(Many);