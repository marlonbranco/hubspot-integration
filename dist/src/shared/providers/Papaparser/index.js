"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _promises = require("node:fs/promises");

var _path = _interopRequireDefault(require("path"));

var _papaparse = _interopRequireDefault(require("papaparse"));

var _perf_hooks = require("perf_hooks");

var _ErrorsApp = _interopRequireDefault(require("../../errors/ErrorsApp"));

var _bigArraySplitter = require("../../utils/bigArraySplitter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Uploader {
  async checkIfFileExists(file) {
    try {
      await (0, _promises.access)(file);
      return true;
    } catch {
      return false;
    }
  }

  async readFile(fileName) {
    const initTime = _perf_hooks.performance.now();

    const config = {
      delimiter: ',',
      header: true,
      chunk: true
    };

    const parseStream = _papaparse.default.parse(_papaparse.default.NODE_STREAM_INPUT, config);

    const filePath = _path.default.resolve(fileName);

    try {
      await this.checkIfFileExists(filePath);
    } catch (err) {
      throw new _ErrorsApp.default(err.message, 404);
    }

    const data = [];
    let chunkedData;
    return new Promise((resolve, reject) => {
      _fs.default.createReadStream(filePath).on('error', err => {
        reject(err);
      }).pipe(parseStream).on('data', chunk => {
        const properties = {
          email: chunk.email.toLowerCase(),
          properties: [{
            property: 'firstname',
            value: chunk.first_name
          }, {
            property: 'lastname',
            value: chunk.last_name
          }, {
            property: 'gender',
            value: chunk.gender
          }]
        };
        data.push(properties);
      }).on('end', () => {
        const endTime = _perf_hooks.performance.now();

        const executionTime = (endTime - initTime) * 100 / 1000 / 100;
        chunkedData = (0, _bigArraySplitter.bigArraySplitter)(data, 1000);
        process.stdout.write(`\nFILE READ IN ${executionTime}s\n`);
        resolve(chunkedData);
      });
    });
  }

}

exports.default = Uploader;