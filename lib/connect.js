"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connect = void 0;

var _react = _interopRequireDefault(require("react"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _storeContext = require("./store-context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var connect = function connect() {
  var mapStateToProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
    return {};
  };
  return function (WrappedComponent) {
    var shouldSubscribe = !!mapStateToProps;

    var WrapperComponent =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(WrapperComponent, _React$Component);

      function WrapperComponent(props, context) {
        var _this;

        _classCallCheck(this, WrapperComponent);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(WrapperComponent).call(this, props, context));

        _this.handleChange = function () {
          if (!_this.unsubscribe) {
            return;
          }

          var nextState = mapStateToProps(_this.context.getState());

          _this.setState({
            subscribed: nextState
          });
        };

        _this.trySubscribe = function () {
          if (shouldSubscribe) {
            _this.unsubscribe = _this.context.subscribe(_this.handleChange);

            _this.handleChange();
          }
        };

        _this.state = _objectSpread({}, mapStateToProps(_this.context.getState()));
        return _this;
      }

      _createClass(WrapperComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.trySubscribe();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.tryUnsubscribe();
        }
      }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
          return !(0, _shallowequal["default"])(this.props, nextProps) || !(0, _shallowequal["default"])(this.state.subscribed, nextState.subscribed);
        }
      }, {
        key: "tryUnsubscribe",
        value: function tryUnsubscribe() {
          if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
          }
        }
      }, {
        key: "render",
        value: function render() {
          var props = _objectSpread({}, this.props, {}, this.state.subscribed, {
            store: this.context
          });

          return _react["default"].createElement(WrappedComponent, props);
        }
      }]);

      return WrapperComponent;
    }(_react["default"].Component);

    WrapperComponent.contextType = _storeContext.StoreContext;
    return WrapperComponent;
  };
};

exports.connect = connect;
var _default = connect;
exports["default"] = _default;