"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _routes = _interopRequireDefault(require("../../../../modules/contacts/http/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/v1', _routes.default);
var _default = routes;
exports.default = _default;