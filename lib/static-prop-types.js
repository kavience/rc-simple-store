"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeShape = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storeShape = _propTypes["default"].shape({
  subscribe: _propTypes["default"].func.isRequired,
  setState: _propTypes["default"].func.isRequired,
  getState: _propTypes["default"].func.isRequired
});

exports.storeShape = storeShape;