"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HubSpotEndpoints = _interopRequireDefault(require("../infra/http/HubSpotEndpoints"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hubSpotEndpoints = new _HubSpotEndpoints.default();

class CreateContactList {
  async execute(firstName, lastName) {
    try {
      return hubSpotEndpoints.createContactList(firstName, lastName);
    } catch (err) {
      console.log(err);
    }
  }

}

exports.default = CreateContactList;