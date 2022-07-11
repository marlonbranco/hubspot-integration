"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hubSpotApi = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hubSpotURL = process.env.HUBSPOT_API_URL;

const hubSpotApi = _axios.default.create({
  baseURL: hubSpotURL,
  timeout: 60000
});

exports.hubSpotApi = hubSpotApi;