"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _errorHandling = _interopRequireDefault(require("../middlewares/errorHandling"));

var _index = _interopRequireDefault(require("../routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { errors } from 'celebrate';
class App {
  constructor() {
    this.express = void 0;
    this.express = (0, _express.default)();
    this.app();
  }

  app() {
    this.express.use((0, _cors.default)());
    this.express.use(_express.default.json());
    this.express.use(_index.default);
    this.express.use(_errorHandling.default);
  }

}

var _default = new App().express;
exports.default = _default;