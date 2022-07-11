"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ErrorsApp = _interopRequireDefault(require("../../../errors/ErrorsApp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const errorHandling = (err, request, response, _) => {
  if (err instanceof _ErrorsApp.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};

var _default = errorHandling;
exports.default = _default;