"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draftJs = require("draft-js");

var _uid = require("uid");

var _uid2 = _interopRequireDefault(_uid);

var _input = require("../../../input");

var _input2 = _interopRequireDefault(_input);

var _checkbox = require("../../../checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _label = require("../../../label");

var _label2 = _interopRequireDefault(_label);

var _link = require("./link.mcss");

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Components


var Link = function (_Component) {
  _inherits(Link, _Component);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Link).apply(this, arguments));
  }

  _createClass(Link, [{
    key: "render",
    value: function render() {
      var _Entity$get$getData = _draftJs.Entity.get(this.props.entityKey).getData();

      var url = _Entity$get$getData.url;

      return _react2.default.createElement(
        "a",
        { href: url, title: url },
        this.props.children
      );
    }
  }]);

  return Link;
}(_react.Component);

Link.propTypes = {
  entityKey: _react2.default.PropTypes.string.isRequired
};

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && _draftJs.Entity.get(entityKey).getType().toLowerCase() === "link";
  }, callback);
}

var decorator = {
  strategy: findLinkEntities,
  component: Link
};

var ActionHandler = function (_Component2) {
  _inherits(ActionHandler, _Component2);

  function ActionHandler(props) {
    _classCallCheck(this, ActionHandler);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ActionHandler).call(this, props));

    var entityKey = props.entityKey;

    var entity = _draftJs.Entity.get(entityKey);
    var entityData = entity.getData();
    // And absence of data means we want to edit it immediately
    _this2.state = {
      id: (0, _uid2.default)(10),
      editing: entityData.url == null,
      changeData: entityData
    };
    _this2.persistPopover = _this2.persistPopover.bind(_this2);
    _this2.onChange = _this2.onChange.bind(_this2);
    _this2.onSubmit = _this2.onSubmit.bind(_this2);
    return _this2;
  }

  _createClass(ActionHandler, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _props = this.props;
      var entityKey = _props.entityKey;
      var forceVisible = _props.forceVisible;

      var entity = _draftJs.Entity.get(entityKey);
      var entityData = entity.getData();
      if (entityData.url == null) {
        this.persistPopover();
      }
    }

    // TODO: Ideally we focus on load when we‘re creating a link for the first
    // time, but unfortunately there’s no simple hook for this because
    // componentDidMount gets called whenever the selection changes for some
    // reason

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // If we change from not to editing, focus the input
      if (this._url) {
        var input = this._url.getInput();
        if (input && this.state.editing === true && prevState.editing === false) {
          input.focus();
        }
      }
    }
  }, {
    key: "persistPopover",
    value: function persistPopover() {
      var forceVisible = this.props.forceVisible;

      forceVisible(true);
    }
  }, {
    key: "unpersistPopover",
    value: function unpersistPopover() {
      var forceVisible = this.props.forceVisible;

      forceVisible(false);
    }
  }, {
    key: "handleEdit",
    value: function handleEdit() {
      this.persistPopover();
      this.setState({
        editing: true
      });
    }
  }, {
    key: "onChange",
    value: function onChange(key, e, value) {
      var changeData = this.state.changeData;

      // Ensure URLs are well-formed
      // I.e., must start with `.`, `/`, `#`

      if (key === 'url' && !/^(\.|\/|#|https?:\/\/|mailto:|ftp:)/.test(value)) {
        value = "http://" + value;
      }

      var newChangeData = Object.assign({}, changeData, _defineProperty({}, "" + key, value));
      this.setState({
        changeData: newChangeData
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      e.preventDefault();
      var entityKey = this.props.entityKey;
      var changeData = this.state.changeData;

      var entity = _draftJs.Entity.get(entityKey);
      _draftJs.Entity.replaceData(entityKey, changeData);
      this.setState({
        editing: false
      });
      this.unpersistPopover();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props2 = this.props;
      var entityKey = _props2.entityKey;
      var remove = _props2.remove;
      var forceVisible = _props2.forceVisible;
      var _state = this.state;
      var editing = _state.editing;
      var id = _state.id;

      var entity = _draftJs.Entity.get(entityKey);
      var entityData = entity.getData();
      return _react2.default.createElement(
        "div",
        { ref: function ref(r) {
            return _this3._container = r;
          } },
        editing ? _react2.default.createElement(
          "form",
          { onSubmit: this.onSubmit },
          _react2.default.createElement(
            "div",
            { className: _link2.default.field },
            _react2.default.createElement(
              _label2.default,
              { className: _link2.default.label, "for": "url-" + id },
              "Link"
            ),
            _react2.default.createElement(_input2.default, {
              defaultValue: entityData.url,
              name: "url-" + id,
              onChange: this.onChange.bind(this, 'url'),
              placeholder: "http://",
              ref: function ref(r) {
                return _this3._url = r;
              },
              size: "small",
              type: "text" })
          ),
          _react2.default.createElement(
            "div",
            { className: _link2.default.field },
            _react2.default.createElement(
              _label2.default,
              { className: _link2.default.label, "for": "title-" + id },
              "Title"
            ),
            _react2.default.createElement(_input2.default, {
              defaultValue: entityData.title,
              name: "title-" + id,
              onChange: this.onChange.bind(this, 'title'),
              placeholder: "Description of link",
              size: "small",
              type: "text" })
          ),
          _react2.default.createElement(
            "div",
            { className: _link2.default.fieldCheckbox },
            _react2.default.createElement(_checkbox2.default, {
              defaultChecked: entityData.newWindow === true,
              label: "Open in new window?",
              name: "newWindow-" + id,
              onChange: this.onChange.bind(this, 'newWindow')
            })
          ),
          _react2.default.createElement(
            "div",
            { className: _link2.default.actions },
            _react2.default.createElement(
              "button",
              { className: _link2.default.saveButton },
              "Save link"
            )
          )
        ) : _react2.default.createElement(
          "div",
          { className: _link2.default.displayWrapper },
          _react2.default.createElement(
            "a",
            { href: entityData.url, target: "_blank", className: _link2.default.handlerUrl },
            entityData.url
          ),
          _react2.default.createElement(
            "button",
            {
              className: _link2.default.editButton,
              onClick: function onClick(e) {
                e.preventDefault();
                _this3.handleEdit();
              } },
            "Change"
          ),
          _react2.default.createElement(
            "button",
            {
              className: _link2.default.removeButton,
              onClick: function onClick(e) {
                e.preventDefault();
                remove(entity);
              } },
            _react2.default.createElement(
              "span",
              { className: _link2.default.removeText },
              "Remove"
            ),
            _react2.default.createElement(
              "span",
              { className: _link2.default.removeX },
              "×"
            )
          )
        )
      );
    }
  }]);

  return ActionHandler;
}(_react.Component);

exports.default = {
  handler: ActionHandler,
  decorator: decorator
};