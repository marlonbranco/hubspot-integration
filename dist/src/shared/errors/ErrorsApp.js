"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ErrorsApp {
  constructor(message, statusCode = 400) {
    this.message = void 0;
    this.statusCode = void 0;
    this.message = message;
    this.statusCode = statusCode;
  }

}

exports.default = ErrorsApp;