"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bigArraySplitter = bigArraySplitter;

function bigArraySplitter(batch, size) {
  const chunks = [];

  while (batch.length) {
    chunks.push(batch.splice(0, size));
  }

  return chunks;
}