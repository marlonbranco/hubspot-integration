"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = delayBetweenRequests;

function delayBetweenRequests(delayTime) {
  return new Promise(resolve => setTimeout(resolve, delayTime));
}